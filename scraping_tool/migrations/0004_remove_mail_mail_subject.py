# Generated by Django 3.1.5 on 2021-01-06 10:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('scraping_tool', '0003_auto_20210105_1821'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mail',
            name='mail_subject',
        ),
    ]
