from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import render

from forest_creatures.models import Animal
from forest_creatures.models import Species


def index(request):

    return render(request, 'forest_creatures/index.html')


def show(request, animal_id):

    try:
        animal = Animal.objects.get(pk=animal_id)
    except Animal.DoesNotExist:
        raise Http404("Animal does not exist")

    return render(request, 'forest_creatures/show.html', {'animal': animal})


def one_species(request, species_id):
    try:
        specie = Species.objects.get(pk=species_id)
    except Species.DoesNotExist:
        raise Http404("Species does not exist")

    return render(request, 'forest_creatures/one_species.html', {'species_id': specie.id, 'species_name': specie.name})


def species_list_template(request):
    return render(request, 'forest_creatures/species_list.html')


def locations_template(request):
    return render(request, 'forest_creatures/locations.html')


def animals_template(request):
    return render(request, 'forest_creatures/animals.html')


def search_template(request):
    return render(request, 'forest_creatures/search.html')
