# Generated by Django 5.0.6 on 2024-05-30 16:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_employee'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='joining_date',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='resignation_date',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='salary',
        ),
    ]
