from rest_framework import generics

# Create your views here.
from locations.models import Location
from locations.serializers import LocationSerializer


class LocationList(generics.ListAPIView):

    queryset = Location.objects.all()
    serializer_class = LocationSerializer
