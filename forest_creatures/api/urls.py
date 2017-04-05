from django.conf.urls import url

from forest_creatures.api import views

urlpatterns = [
    url(r'^$', views.AnimalList.as_view(), name='index'),
    url(r'^species/?$', views.SpeciesList.as_view(), name='all_species'),
    url(r'^species/(?P<pk>[0-9]+)/?$', views.SpeciesDetail.as_view(), name='one_species'),
    url(r'^species/(?P<species_id>[0-9]+)/animals/?$', views.AnimalListBySpecies.as_view(), name='animals_by_species'),
    url(r'^search/?$', views.Search.as_view(), name='search'),
    url(r'^(?P<slug>[-\w\d]+)/?$', views.AnimalDetail.as_view(), name='animal'),
    url(r'^(?P<slug>[-\w\d]+)/sightings/?$', views.SightingList.as_view(), name='sightings'),
]
