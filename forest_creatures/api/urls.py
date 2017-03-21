from django.conf.urls import url

from forest_creatures.api import views

urlpatterns = [
    url(r'^$', views.animals, name='index'),
    url(r'^(?P<animal_id>[0-9]+)/$', views.animal, name='animal'),
    url(r'^(?P<animal_id>[0-9]+)/sightings$', views.sightings, name='animal'),
]
