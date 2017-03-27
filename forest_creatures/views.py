from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import render

from forest_creatures.models import Animal


def index(request):

    return render(request, 'forest_creatures/index.html')


def show(request, animal_id):

    try:
        animal = Animal.objects.get(pk=animal_id)
    except Animal.DoesNotExist:
        raise Http404("Animal does not exist")

    return render(request, 'forest_creatures/show.html', {'animal': animal})


def species(request):
    return render(request, 'forest_creatures/species.html')


def animals(request):
    return render(request, 'forest_creatures/animals.html')


def all_species(request):
    return render(request, 'forest_creatures/all_species.html')


def locations(request):
    return render(request, 'forest_creatures/locations.html')


def sightings(request):
    return render(request, 'forest_creatures/sightings.html')


def search(request):
    return render(request, 'forest_creatures/search.html')
