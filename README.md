# Documentation
## Tienda Online


Es un proyecto realizado con Django Framework ya que con este se podra controlar el BackEnd de la aplicacion, en conjunto con HTML, CSS y JavaScript para realizar el FrontEnd con el fin de que el ususario pueda visualizar de una manera atractiva la aplicacion.

- FrontEnd
- BackEnd


## FrontEnd

- HTML
- CSS
- JavaScript

### HTML

Se realizaron tres archivos para la interfaz de usuario estas se dividen en las siguientes paginas:

| Archivo | Funcion |
| ------ | ------ |
| index.html | Donde se aloja el contenido principal y el usuario va a visualizar|
| tienda.html | Donde se realizan las compras y se visualizan los productos  |
| contacto.html | Es donde se aloja la informacion de documentacion API |

### CSS

El estilo CSS de la pagina web es controlado mediante el archivo nombrado gestion.css donde se realizan cambios de estilo a cada uno de los archivos mencionados en el apartado HTML.

Se realizo el diseño de los objetos, sliders, placeholder, buttons, lists mediante bootstrap v.5.4 para una mayor facilidad de administracion al momento de agragar un formato a la pagina y a los visuales.

### JavaScript

En el archivo tienda.js se aloja todos aquellos requerimientos y eventos que el DOM va a realizar para que el usuario pueda interaccionar con la informacion alojada en el BackEnd de la Tienda Online.

Se lee la direccion de la web a la que se va a reconocer todas las acciones que se van a realizar dentro del DOM.
```sh
var URL_API = 'https://tiendaonlineapi.herokuapp.com/'
```
 Estas funciones se realiza al inicio de el codigo para especificar que se inicie el cargue de toda la informacion contenido antes de que toda la demas.
 
```sh
listarCategorias()
listarProductosBase()
```
| Archivo | Funcion |
| ------ | ------ |
| listarCategorias() |Realiza el llamado de las categorias alojadas en la base de datos y las ordena en una lista desordenada|
| listarProductosBase() | Realiza el llamado de los productos con sus propiedades especificadas en la base de datos, nombre, url_image, descuento, precio y los almacen en una clase card para darle una forma atractiva de visualizar los datos para el usuario|

Para el llamado del BackEnd al FrontEnd es necesario utilizar JSON y metodos GET con el fin de enlazar la data con la experiencia de usuario, en cada evento que se deea realizar con fin de traer la data se realiza de la siguiente forma:

```sh
method: 'GET', 
dataType: 'json', 
url: URL_API + "api/productos_base",
```

method: nos permite realizar un comando en funcion de lo que se desee realizar con la data en este caso se utilza el metodo 'GET' que nos permite consultar la data hallada en la base de datos y utilizarla.

dataType: Es utilizado para especificar que se uilizara JSON ya que es lo necesario para una ApiRest.

url: Es donde se enlazar las url contenidas en el BackEnd con el fin de consultar la data alojada en los objetos realizados en este.

## BackEnd

### Installation

Para el BackEnd se utilizo [Django](https://www.djangoproject.com) v4.0.

Para la instalacion del framework se utiliza la siguente linea de comandos en la carpeta donde se realizara el proyecto.

```sh
python -m venv venv //Es para realizar una carpeta enviroment para Django
venv\Scripts\activate // Activa los Scripts para los comandos
python pip install django //Instalara django para empezar el proyecto
django-admin startproject TiendaOnline //Empezara a crear el proyecto
```
Una vez creado el proyecto y realizando su funcionamiento correcto dentro del proyecto procederemos a crear una app en la cual se realizara todo el backend de la Tienda Online.
```sh
django manage.py startapp api
```
Una vez iniciado la nueva app solo queda empezar a realizar la creacion del BackEnd y para realizar purebas de como ira funcionando el proyecto se utilza la siguiente linea de comandos.
```sh
django manage.py runserver
```

Donde toda la documentacion realacionada estara disponible aqui [ApiRest]( https://documenter.getpostman.com/view/23150122/VUxXJ32A)

