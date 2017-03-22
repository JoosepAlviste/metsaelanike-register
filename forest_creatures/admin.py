from django.contrib import admin

from .models import Animal, AnimalSighting, Species

admin.site.register(Animal)
admin.site.register(AnimalSighting)
admin.site.register(Species)
