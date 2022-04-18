from .base import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo_1',
        'USER': 'serg',
        'PASSWORD': '12345',
        'HOST': 'db',
        'PORT': '5432'
    }
}
