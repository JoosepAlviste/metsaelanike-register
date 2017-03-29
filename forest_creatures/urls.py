from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^templates/one_animal/$', views.one_animal_template, name='one_animal'),
    url(r'^templates/one_species/$', views.one_species_template, name='one_species'),
    url(r'^templates/animals/$', views.animals_template, name='animals_template'),
    url(r'^templates/species/$', views.species_list_template, name='species_list_template'),
    url(r'^templates/locations/$', views.locations_template, name='locations'),
    url(r'^templates/one_location/$', views.one_location_template, name='one_location'),
    url(r'^templates/search/$', views.search_template, name='search_template'),
    url(r'^templates/edit/$', views.edit_template, name='edit_template'),
    url(r'^templates/add/$', views.add_template, name='add_template'),
]
