# Serializers define the API representation.
from rest_framework import serializers

from forest_creatures.models import Animal, AnimalSighting, Species
from locations.serializers import LocationSerializer


class AnimalSightingSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)

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

    class Meta:
        model = Animal
        fields = ('id', 'name', 'species', 'latest_sighting')
