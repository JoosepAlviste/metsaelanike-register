from django.db import models


class Animal(models.Model):

    name = models.CharField(max_length=255)
    species = models.TextField()

    def __str__(self):
        return self.name

    @property
    def latest_sighting(self):
        return self.sightings.first()


class AnimalSighting(models.Model):

    animal = models.ForeignKey(Animal, related_name='sightings', on_delete=models.CASCADE)
    location = models.TextField()
    time = models.DateTimeField()

    class Meta:
        ordering = ('-time',)

    def __str__(self):
        return 'Saw ' + self.animal.name + ' at ' + self.location + ' at ' + str(self.time)

