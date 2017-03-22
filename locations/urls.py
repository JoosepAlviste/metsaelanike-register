from django.conf.urls import url

from locations import views

urlpatterns = [
    url(r'^$', views.LocationList.as_view(), name='location_list')
]
