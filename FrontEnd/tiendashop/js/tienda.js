
//var URL_API = 'http://192.168.0.19:8000/'
var URL_API = 'http://localhost:8000/'
var productos_carrito = new Array()

$(document).ready(function () {

    listarCategorias()
    listarProductosBase()
    
    $(document).on('click', '.cargar_categoria', function () {
        var data = this.dataset
        if (data.id > 0) {
            $.ajax({
                method: 'GET',  
                dataType: 'json',
                url: URL_API + "api/productos/categoria/" + data.id, // URL de la api,
            }).done(function (res) {
                $('#lista-productos').html("");
                if (res.error === 0) {
                    productos = res.data
                    if (productos.length > 0) {

                        productos.forEach(function (prod) {
                            var html = `<div class="col-4 pb-2">
                        <div class="card">
                          <img src="${prod.url_image}" class="card-img-top img-size" alt="${prod.name}">
                          <div class="card-body">
                            <h5 class="card-title">${prod.name}</h5>`
                            html += prod.discount > 0 ? '<p class="card-text text-red"><span class="badge badge-danger">' + prod.discount + '%</span></p>' : ''
                            html += `</div>
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">${prod.price}</li>
                          </ul>
                          <div class="card-body">
                            <a class="card-link hand-cursor cargarCarrito" data-id="${prod.id}"><i class="fas fa-cart-plus"></i></a>
                          </div>
                        </div>
                      </div>`

                            $('#lista-productos').append(html);
                        });
                    } else {
                        $('#lista-productos').html(`<div class="col-4 pb-2">No hay productos para esta categoria</div>`);
                    }
                } else {
                    $('#lista-productos').html(`<div class="col-4 pb-2">Fallor al cargar productos de esta categoria</div>`);
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown)
                console.log(textStatus)
            });
        }

    })

    $('#input_search').keydown(function (e) {
        var tecla = e.keyCode;
        if (tecla == 13) {
            var valor = this.value
            buscarProductos(valor)
        }
    })

    $(document).on('click', '.cargarCarrito', function () {
        var data = this.dataset
        if (data.id > 0) {
            $.ajax({
                method: 'GET', 
                dataType: 'json', 
                url: URL_API + "api/producto/" + data.id, // URL de la api,
            }).done(function (res) {
                if (res.error === 0) {
                    var productoagregar = res.data
                    var comprobar = buscar(productos_carrito, productoagregar.id)
                    if (comprobar != null) {
                        comprobar.cantidad = comprobar.cantidad + 1;
                    } else {
                        productoagregar.cantidad = 1
                        productos_carrito.push(productoagregar)
                    }

                    alert("Producto agregado al carrito")
                } else {
                    alert("Error al cargar producto al carrito")
                }

            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown)
                console.log(textStatus)
            });
        }

    })


    $('#verCarrito').click(function (e) {
        $('#listaCarrito').html('');
        $('#modalCarrito').modal({ keyboard: false })
        loadCarrito()
    })

    $(document).on('click', '.deleteItem', function () {
        var data = this.dataset
        if (data.id > 0) {
            var comprobar = buscar(productos_carrito, data.id)
            if (comprobar != null) {
                if (comprobar.cantidad == 1) {
                    productos_carrito.pop(comprobar)
                } else {
                    comprobar.cantidad = comprobar.cantidad - 1;
                }
                $('#listaCarrito').html('');
                loadCarrito()
            }
        }
    })
});

function loadCarrito() {
    if (productos_carrito.length > 0) {
        var item = 1;
        productos_carrito.forEach(function (prod) {
            var opcion = `<div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary btn-sm deleteItem" data-id="${prod.id}"><i class="fa fa-times"></i></button>
          </div>`

            if (prod.discount > 0) {
                var discount = (prod.price * prod.discount) / 100
                var precio = (prod.price - discount) * prod.cantidad
            } else {
                var precio = prod.price * prod.cantidad
            }
            var row = `<tr>
                <td>${item}</td>
                <td>${prod.name}</td>
                <td>${prod.cantidad}</td>
                <td>${precio}</td>
                <td>${prod.discount > 0 ? prod.discount + '%' : 'N/A'}</td>
                <td>${opcion}</td>
            </tr>`

            $('#listaCarrito').append(row);
            item++;
        })


    } else {
        var row = `<tr>
            <td colspan="5">El carrito no tiene productos</td>
          </tr>`
        $('#listaCarrito').html(row);
    }
}

function buscar(arrar, valor) {
    for (var i = 0; i < arrar.length; i++) {
        if (arrar[i].id == valor) {
            return arrar[i];
        }
    }
    return null;
}

function listarCategorias() {

    $.ajax({
        method: 'GET', 
        dataType: 'json', 
        url: URL_API + "api/categorias", // URL de la api
    }).done(function (res) {
        if (res.error === 0) {
            categorias = res.data
            categorias.forEach(function (item) {
                var html = `<a class="list-group-item list-group-item-action hand-cursor cargar_categoria" data-id="${item.id}" data-name="${item.name}">${item.name}</a>`
                $('#lista-categorias').append(html);
                
            });

        } else {
            alert("Error al cargar categorias")
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown)
        console.log(textStatus)
    });
}

function listarProductosBase() {

    $.ajax({
        method: 'GET', 
        dataType: 'json',
        url: URL_API + "api/productos_base", // URL de la api
    }).done(function (res) {

        if (res.error === 0) {
            productos = res.data
            productos.forEach(function (prod) {
                var html = `<div class="col-4 pb-2">
                <div class="card">
                  <img src="${prod.url_image}" class="card-img-top img-size" alt="${prod.name}">
                  <div class="card-body">
                    <h5 class="card-title">${prod.name}</h5>`
                html += prod.discount > 0 ? '<p class="card-text text-red"><span class="badge badge-danger">' + prod.discount + '%</span></p>' : ''
                html += `</div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">$ ${prod.price}</li>
                  </ul>
                  <div class="card-body">
                    <a class="card-link hand-cursor cargarCarrito" data-id="${prod.id}"><i class="fas fa-cart-plus fa-1.5x"></i></a>
                  </div>
                </div>
              </div>`

                $('#lista-productos').append(html);
            });

        } else {
            alert("Error al cargar categorias")
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown)
        console.log(textStatus)
    });
}

function buscarProductos(filtro) {

    $.ajax({
        method: 'GET', 
        dataType: 'json',
        url: URL_API + "api/productos/filter?like=" + filtro, // URL de la api
    }).done(function (res) {
        $('#lista-productos').html("");
        if (res.error === 0) {
            productos = res.data
            if (productos.length > 0) {
                productos.forEach(function (prod) {
                    var html = `<div class="col-4 pb-2">
                <div class="card">
                  <img src="${prod.url_image}" class="card-img-top img-size" alt="${prod.name}">
                  <div class="card-body">
                    <h5 class="card-title">${prod.name}</h5>`
                    html += prod.discount > 0 ? '<p class="card-text text-red"><span class="badge badge-danger">' + prod.discount + '%</span></p>' : ''
                    html += `</div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">${prod.price}</li>
                  </ul>
                  <div class="card-body">
                    <a class="card-link hand-cursor cargarCarrito" data-id="${prod.id}"><i class="fas fa-cart-plus"></i></a>
                  </div>
                </div>
              </div>`

                    $('#lista-productos').append(html);
                });

            } else {
                $('#lista-productos').html(`<div class="col-4 pb-2">No hay productos para esta categoria</div>`);
            }
        } else {
            $('#lista-productos').html(`<div class="col-4 pb-2">Fallor al cargar productos de esta categoria</div>`);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown)
        console.log(textStatus)
    });
}
