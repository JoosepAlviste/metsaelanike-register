from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<animal_id>[0-9]+)/$', views.show, name='show'),
    url(r'^species/$', views.species, name='species'),
    url(r'^animals/$', views.animals, name='animals'),
    url(r'^all_species/$', views.all_species, name='all_species'),
    url(r'^locations/$', views.locations, name='locations'),
    url(r'^sightings/$', views.sightings, name='sightings'),
    url(r'^search/$', views.search, name='search'),
]
