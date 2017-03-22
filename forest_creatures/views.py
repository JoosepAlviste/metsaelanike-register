from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import render

from forest_creatures.models import Animal


def index(request):

    return HttpResponse('Hello World!')


def show(request, animal_id):

    try:
        animal = Animal.objects.get(pk=animal_id)
    except Animal.DoesNotExist:
        raise Http404("Animal does not exist")

    return render(request, 'forest_creatures/show.html', {'animal': animal})


def species(request, name):
    return render(request, 'forest_creatures/species.html')
