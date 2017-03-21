from django.contrib import admin

from .models import Animal, AnimalSighting

admin.site.register(Animal)
admin.site.register(AnimalSighting)
