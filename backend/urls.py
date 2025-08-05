from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='home'),
    path('articles/',views.articles, name='articles'),
    path('articles/incepta/',views.incepta_article, name='incepta_article'),
    path('contact/',views.contact_form, name='contact_form'),
]