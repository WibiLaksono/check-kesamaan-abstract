from django.urls import path
from .views import CompareAbstracts

urlpatterns = [
    path('compare/', CompareAbstracts.as_view(), name='compare_abstracts'),
]
