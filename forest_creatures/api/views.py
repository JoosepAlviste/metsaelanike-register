from django.http import JsonResponse

from forest_creatures.api.serializers import AnimalSerializer, AnimalSightingSerializer
from forest_creatures.models import Animal, AnimalSighting


def animals(request):

    _animals = Animal.objects.all()
    serializer = AnimalSerializer(_animals, many=True)

    return JsonResponse(serializer.data, safe=False)


def animal(request, animal_id):

    _animal = Animal.objects.get(pk=animal_id)
    serializer = AnimalSerializer(instance=_animal)

    return JsonResponse(serializer.data, safe=False)


def sightings(request, animal_id):

    sighting = AnimalSighting.objects.filter(animal_id=animal_id)
    serializer = AnimalSightingSerializer(sighting, many=True)

    return JsonResponse(serializer.data, safe=False)
