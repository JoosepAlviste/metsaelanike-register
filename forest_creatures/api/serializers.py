# Serializers define the API representation.
import itertools
from rest_framework import serializers
from django.utils.text import slugify

from forest_creatures.models import Animal, AnimalSighting, Species
from locations.models import Location
from locations.serializers import LocationSerializer, LocationWithoutSightingSerializer


class AnimalSightingSerializer(serializers.ModelSerializer):
    location = LocationWithoutSightingSerializer(read_only=True)
    time = serializers.DateTimeField(required=True, format='%H:%M %d.%m.%Y', input_formats=['%H:%M %d.%m.%Y'])
    location_id = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(), source='locations', write_only=True, required=True)
    id = serializers.IntegerField(required=False)

    class Meta:
        model = AnimalSighting
        fields = ('id', 'location', 'time', 'location_id')


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = ('id', 'name')


class AnimalSerializer(serializers.ModelSerializer):
    latest_sighting = AnimalSightingSerializer(read_only=True)
    species = SpeciesSerializer(read_only=True)
    sightings = AnimalSightingSerializer(many=True, write_only=True, required=False)

    slug = serializers.CharField(read_only=True)
    name = serializers.CharField(required=True, max_length=255)
    species_id = serializers.PrimaryKeyRelatedField(queryset=Species.objects.all(), source='species', write_only=True)

    class Meta:
        model = Animal
        fields = ('id', 'name', 'slug', 'species', 'latest_sighting', 'species_id', 'sightings')

    def create(self, validated_data):

        animal = Animal(
            name=validated_data.get('name'),
            species=validated_data.get('species'),
            slug=get_animal_slug_from_name(validated_data.get('name')),
        )

        animal.save()
        return animal

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.species = validated_data.get('species', instance.species)
        instance.slug = get_animal_slug_from_name(validated_data.get('name', instance.name))

        handled_sightings = []
        for request_sighting in validated_data.get('sightings'):
            if request_sighting.get('id', None) is None:
                # Create a new sighting
                sighting = AnimalSighting(
                    time=request_sighting['time'],
                    location=request_sighting['locations'],
                    animal_id=instance.id
                )
                sighting.save()
                handled_sightings.append(sighting.id)
            else:
                # Get an existing sighting and set its stuffs
                sighting = AnimalSighting.objects.filter(id=request_sighting['id']).first()
                sighting.time = request_sighting['time']
                sighting.location = request_sighting['locations']
                sighting.save()
                handled_sightings.append(request_sighting['id'])

        for sighting in instance.sightings.all():
            if sighting.id in handled_sightings:
                handled_sightings.remove(sighting.id)
            else:
                sighting.delete()

        instance.save()
        return instance


class SearchResultSerializer(serializers.Serializer):
    animals = AnimalSerializer(read_only=True, many=True)
    locations = LocationSerializer(read_only=True, many=True)
    species = SpeciesSerializer(read_only=True, many=True)


def get_animal_slug_from_name(name):
    slug = orig = slugify(name)

    for x in itertools.count(1):
        if not Animal.objects.filter(slug=slug).exists():
            break
        slug = '%s-%d' % (orig, x)

    return slug
