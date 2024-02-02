let carrito = obtenerCarritoLocalStorage() || [];

function obtenerCarritoLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarritoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(producto, precio, imagen) {
    carrito.push({ producto, precio, imagen });
    mostrarCarrito();
    guardarCarritoLocalStorage();

    //Confirmación SweetAlert
    Swal.fire({
        title: '¡Producto Agregado!',
        text: `${producto} ha sido agregado al carrito.`,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

function quitarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    guardarCarritoLocalStorage();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');
    listaCarrito.innerHTML = '';
    
    let total = 0;

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.imagen}" alt="${item.producto}" class="product-image"> ${item.producto} - $${item.precio.toFixed(2)} <button onclick="quitarDelCarrito(${index})">Quitar</button>`;
        listaCarrito.appendChild(li);
        total += item.precio;
    });

    totalElement.textContent = total.toFixed(2);
}

function finalizarCompra() {
    Swal.fire({
        title: '¡Gracias por tu compra!',
        text: 'Te agradecemos por elegir nuestros productos.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

// Mostrar Carrito 
document.addEventListener('DOMContentLoaded', function() {
    mostrarCarrito();
});
