from django.db import models


class Location(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    @property
    def latest_sighting(self):
        return self.sightings.first()
