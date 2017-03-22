from django.db import models


class Species(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Animal(models.Model):

    name = models.CharField(max_length=255)
    species = models.ForeignKey(Species, related_name='animals', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    @property
    def latest_sighting(self):
        return self.sightings.first()


class AnimalSighting(models.Model):

    animal = models.ForeignKey(Animal, related_name='sightings', on_delete=models.CASCADE)
    location = models.ForeignKey('locations.Location', related_name='sightings', on_delete=models.CASCADE)
    time = models.DateTimeField()

    class Meta:
        ordering = ('-time',)

    def __str__(self):
        return 'Saw ' + self.animal.name + ' at ' + self.location.name + ' at ' + self.time.strftime('%-H:%M %d/%m/%Y')
