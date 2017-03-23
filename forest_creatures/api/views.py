from django.db.models import Q
from rest_framework import generics

from forest_creatures.api.serializers import AnimalSerializer, AnimalSightingSerializer, SpeciesSerializer
from forest_creatures.models import Animal, AnimalSighting, Species


class SpeciesList(generics.ListAPIView):

    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class AnimalDetail(generics.RetrieveAPIView):

    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer


class AnimalList(generics.ListAPIView):

    serializer_class = AnimalSerializer

    def get_queryset(self):
        queryset = Animal.objects.all()
        keyword = self.request.query_params.get('q', None)
        if keyword is not None:
            queryset = Animal.objects.filter(Q(name__icontains=keyword) | Q(species__name__icontains=keyword))

        return queryset


class SightingList(generics.ListAPIView):

    serializer_class = AnimalSightingSerializer

    def get_queryset(self):
        animal_id = self.kwargs['animal_id']
        return AnimalSighting.objects.filter(animal_id=animal_id)


class AnimalListBySpecies(generics.ListAPIView):

    serializer_class = AnimalSerializer

    def get_queryset(self):
        species_id = self.kwargs['species_id']
        return Animal.objects.filter(species_id=species_id)
