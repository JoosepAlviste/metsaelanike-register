from django.db import models


class Animal(models.Model):

    name = models.CharField(max_length=255)
    species = models.TextField()


class AnimalSighting(models.Model):

    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    location = models.TextField()
    time = models.DateTimeField()
