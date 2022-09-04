from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from database import Database

# Create your views here.

def categorias(request):
    db = Database()
    query = "SELECT * FROM category"
    categorias = db.select(query)
    db.closedb()
    if len(categorias):
        return JsonResponse({"error":0,"data":categorias})
    
    return JsonResponse({"error":1,"mensaje":"Error al cargar categorias"})

def producto(request,product):
    db = Database()
    query = "select id, name, price, discount from product where id = "+ str(product)
    productos = db.select(query)
    db.closedb()
    if len(productos):
        return JsonResponse({"error":0,"data":productos[0]})
    
    return JsonResponse({"error":1,"mensaje":"Error al cargar data del producto"})

def productos_base(request):
    db = Database()
    query = "select  * from product limit 5"
    productos = db.select(query)
    db.closedb()
    if len(productos):
        return JsonResponse({"error":0,"data":productos})
    
    return JsonResponse({"error":1,"mensaje":"Error al cargar productos"})

def productos_filtro(request):
    try:
        db = Database()
        filtro = request.GET['like']
        query = """select product.* 
            from product 
            inner join category on category.id = product.category
            where product.name like '%{}%' or category.name like '{}%'"""
        query = query.format(filtro,filtro)
        productos = db.select(query)
        db.closedb()
        return JsonResponse({"error":0,"data":productos})
    except:
        return JsonResponse({"error":1,"mensaje":"Error al cargar productos por filtro"})

def productos_xCategoria(request, categoria):
    try:
        db = Database()
        query = "select  * from product where category = " + str(categoria)
        productos = db.select(query)
        db.closedb()
        return JsonResponse({"error":0,"data":productos})
    except:
        return JsonResponse({"error":1,"mensaje":"Error al cargar productos por categoria"})