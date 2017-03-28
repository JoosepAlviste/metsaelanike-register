# Serializers define the API representation.
from rest_framework import serializers

from forest_creatures.models import Animal, AnimalSighting, Species
from locations.serializers import LocationSerializer, LocationWithoutSightingSerializer


class AnimalSightingSerializer(serializers.ModelSerializer):
    location = LocationWithoutSightingSerializer(read_only=True)
    time = serializers.DateTimeField(format='%-H:%M %d.%m.%Y')

    class Meta:
        model = AnimalSighting
        fields = ('id', 'location', 'time')


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = ('id', 'name')


class AnimalSerializer(serializers.ModelSerializer):
    latest_sighting = AnimalSightingSerializer(read_only=True)
    species = SpeciesSerializer(read_only=True)

    name = serializers.CharField(required=True, max_length=255)

    class Meta:
        model = Animal
        fields = ('id', 'name', 'species', 'latest_sighting')


class SearchResultSerializer(serializers.Serializer):
    animals = AnimalSerializer(read_only=True, many=True)
    locations = LocationSerializer(read_only=True, many=True)
    species = SpeciesSerializer(read_only=True, many=True)
