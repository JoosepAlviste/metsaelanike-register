from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import render

from forest_creatures.models import Animal
from forest_creatures.models import Species


def index(request):

    return render(request, 'forest_creatures/index.html')


def one_animal_template(request):
    return render(request, 'forest_creatures/one_animal.html')


def one_species_template(request):
    return render(request, 'forest_creatures/one_species.html')


def species_list_template(request):
    return render(request, 'forest_creatures/species_list.html')


def locations_template(request):
    return render(request, 'forest_creatures/locations.html')


def one_location_template(request):
    return render(request, 'forest_creatures/one_location.html')


def animals_template(request):
    return render(request, 'forest_creatures/animals.html')


def search_template(request):
    return render(request, 'forest_creatures/search.html')


def edit_template(request):
    return render(request, 'forest_creatures/edit.html')


def add_template(request):
    return render(request, 'forest_creatures/add.html')
