from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<animal_id>[0-9]+)/$', views.show, name='show'),
    url(r'^species/(?P<species_id>[0-9]+)$', views.one_species, name='one_species'),
    url(r'^templates/animals/$', views.animals_template, name='animals_template'),
    url(r'^templates/species/$', views.species_list_template, name='species_list_template'),
    url(r'^templates/locations/$', views.locations_template, name='locations'),
    url(r'^templates/search/$', views.search_template, name='search_template'),
]
