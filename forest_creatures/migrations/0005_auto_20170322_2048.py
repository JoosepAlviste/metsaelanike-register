# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-22 20:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('forest_creatures', '0004_auto_20170322_1905'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animalsighting',
            name='location',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sightings', to='locations.Location'),
        ),
    ]
