"""TiendaBack URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/categorias', views.categorias, name='categorias'),
    path('api/producto/<int:product>', views.producto, name='producto'),
    path('api/productos_base', views.productos_base, name='productos_base'),
    path('api/productos/filter', views.productos_filtro, name='productos_filtro'),
    path('api/productos/categoria/<int:categoria>', views.productos_xCategoria, name='productos_categoria'),

    
    
]

# todo quedo igual por aho
# solo cambie este archivo 