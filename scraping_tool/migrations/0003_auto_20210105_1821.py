# Generated by Django 2.2.5 on 2021-01-05 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scraping_tool', '0002_scheduledzoom'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mail',
            name='url_numbers',
        ),
        migrations.AddField(
            model_name='mail',
            name='comment',
            field=models.TextField(max_length=256, null=True, verbose_name='Comment'),
        ),
        migrations.AddField(
            model_name='mail',
            name='event_datetime',
            field=models.DateTimeField(null=True, verbose_name='Date and Time of Event'),
        ),
        migrations.AddField(
            model_name='mail',
            name='is_scheduled',
            field=models.BooleanField(default=False, verbose_name='Scheduled'),
        ),
        migrations.AddField(
            model_name='mail',
            name='name',
            field=models.CharField(max_length=64, null=True, verbose_name='Event Name'),
        ),
        migrations.AlterField(
            model_name='mail',
            name='sender',
            field=models.CharField(max_length=32, null=True, verbose_name='Sender'),
        ),
        migrations.AlterField(
            model_name='mail',
            name='url_list',
            field=models.TextField(max_length=1024, verbose_name='Zoom URL List'),
        ),
        migrations.DeleteModel(
            name='ScheduledZoom',
        ),
    ]
