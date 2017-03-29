from django.db.models import Q
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from forest_creatures.api.serializers import AnimalSerializer, AnimalSightingSerializer, SpeciesSerializer, \
    SearchResultSerializer
from forest_creatures.models import Animal, AnimalSighting, Species
from locations.models import Location


class SpeciesList(generics.ListAPIView):

    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class SpeciesDetail(generics.RetrieveAPIView):

    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class AnimalDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

    def put(self, request, *args, **kwargs):
        animal = self.update(request, *args, **kwargs)

        return animal


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


class Search(APIView):

    queryset = Animal.objects.all()

    def get(self, request, format=None):

        animals = Animal.objects.all()
        locations = Location.objects.all()
        species = Species.objects.all()

        keyword = request.query_params.get('q', None)
        if keyword is not None:
            animals = Animal.objects.filter(Q(name__icontains=keyword) | Q(species__name__icontains=keyword))
            locations = Location.objects.filter(name__icontains=keyword)
            species = Species.objects.filter(name__icontains=keyword)

        serializer = SearchResultSerializer({
            'animals': animals,
            'locations': locations,
            'species': species
        })
        return Response(serializer.data)
