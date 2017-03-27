from rest_framework import serializers

from forest_creatures.models import Animal, AnimalSighting, Species
from locations.models import Location


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = ('id', 'name')


class AnimalSerializerNoSightings(serializers.ModelSerializer):
    species = SpeciesSerializer(read_only=True)

    class Meta:
        model = Animal
        fields = ('id', 'name', 'species')


class AnimalSightingNoLocationSerializer(serializers.ModelSerializer):
    time = serializers.DateTimeField(format='%-H:%M %d.%m.%Y')
    animal = AnimalSerializerNoSightings(read_only=True, many=False)

    class Meta:
        model = AnimalSighting
        fields = ('id', 'time', 'animal')


class LocationSerializer(serializers.ModelSerializer):
    latest_sighting = AnimalSightingNoLocationSerializer(read_only=True)

    class Meta:
        model = Location
        fields = ('id', 'name', 'latest_sighting')


class LocationWithSightingsSerializer(serializers.ModelSerializer):

    sightings = AnimalSightingNoLocationSerializer(read_only=True, many=True)

    class Meta:
        model = Location
        fields = ('id', 'name', 'sightings')
