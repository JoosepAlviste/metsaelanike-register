# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-05 08:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forest_creatures', '0006_animal_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animal',
            name='slug',
            field=models.SlugField(max_length=255, unique=True),
        ),
    ]
