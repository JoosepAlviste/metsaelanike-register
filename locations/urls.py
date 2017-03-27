from django.conf.urls import url

from locations import views

urlpatterns = [
    url(r'^$', views.LocationList.as_view(), name='location_list'),
    url(r'^(?P<pk>[0-9]+)/$', views.LocationDetails.as_view(), name='location_detail'),
]
