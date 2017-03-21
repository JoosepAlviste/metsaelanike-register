# Serializers define the API representation.
from rest_framework import serializers

from forest_creatures.models import Animal, AnimalSighting


class AnimalSightingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalSighting
        fields = ('id', 'location', 'time')


class AnimalSerializer(serializers.ModelSerializer):
    latest_sighting = AnimalSightingSerializer(read_only=True)

    class Meta:
        model = Animal
        fields = ('id', 'name', 'species', 'latest_sighting')
