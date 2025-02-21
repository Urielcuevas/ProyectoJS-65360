// Datos 
const productos = [
    { id: 1, nombre: 'Elfbar40', precio: 45.000, imagen: './assets/vapes/elfbar.jpeg', descripcion: 'Elfbar de 40 mil puff.' },
    { id: 2, nombre: 'Elfbar10', precio: 25.000, imagen: './assets/vapes/elfbardiez.jpeg', descripcion: 'Elfbar de 10 mil puff.' },
    { id: 3, nombre: 'Fume', precio: 20.000, imagen: './assets/vapes/fume.jpeg', descripcion: 'Fume de 5 mil puff.' },
    { id: 4, nombre: 'Geekbar', precio: 40.000, imagen: './assets/vapes/geekbar.jpeg', descripcion: 'Geekbar de 35 mil puff.' },
    { id: 5, nombre: 'Ignite', precio: 30.000, imagen: './assets/vapes/ignite.jpeg', descripcion: 'Ignite de 15 mil puff.' },
    { id: 6, nombre: 'LostMary', precio: 35.000, imagen: './assets/vapes/lostmary.jpeg', descripcion: 'Lost Mary de 25 mil puff.' },
  ];
  
  // Carrito de compra se guarda en localstorage 
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  // Guarda el carrito en localstorage 
  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
  }
  
  // Actualiza el contador de productos en el carrito (barra navegacion)
  function actualizarContador() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.getElementById('cart-count').textContent = totalItems;
  }
  
  // Productos en el DOM
  function renderProductos() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    productos.forEach(prod => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="product-card">
          <img src="${prod.imagen}" alt="${prod.nombre}" class="product-img">
          <h5 class="mt-2">${prod.nombre}</h5>
          <p>${prod.descripcion}</p>
          <p><strong>$${prod.precio.toFixed(3)}</strong></p>
          <button class="btn btn-primary" onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
        </div>
      `;
      productList.appendChild(col);
    });
  }
  
  // Funcion para agregar un producto al carrito
  function agregarAlCarrito(productId) {
    const producto = productos.find(p => p.id === productId);
    const indice = carrito.findIndex(item => item.id === productId);
    if (indice !== -1) {
      carrito[indice].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      text: `${producto.nombre} se agregó al carrito.`,
      timer: 1500,
      showConfirmButton: false
    });
  }
  
  //Funcion quitar producto del carrito
  function quitarDelCarrito(productId) {
    carrito = carrito.filter(item => item.id !== productId);
    guardarCarrito();
    mostrarCarrito(); 
  }


  // Sweetalert2 carrito vacio
  function mostrarCarrito() {
    if (carrito.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Carrito vacío',
        text: 'No tienes productos en el carrito.'
      });
      return;
    }
  
    //Cards
    let contenido = '<ul class="list-group">';
    carrito.forEach(item => {
      contenido += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            ${item.nombre} - Cantidad: ${item.cantidad}
          </div>
          <div>
            <span>$${(item.precio * item.cantidad).toFixed(3)}</span>
            <button class="btn btn-danger btn-sm ml-2" data-id="${item.id}">Quitar</button>
          </div>
        </li>
      `;
    });
    contenido += '</ul>';
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    contenido += `<p class="mt-3"><strong>Total: $${total.toFixed(3)}</strong></p>`;
    contenido += `<button class="btn btn-success mt-2" id="btn-finalizar">Finalizar compra</button>`;
  
    //Sweetalert2 ver carrito
    Swal.fire({
      title: 'Tu Carrito',
      html: contenido,
      showConfirmButton: false,
      didOpen: () => {
        const btnFinalizar = Swal.getPopup().querySelector('#btn-finalizar');
        if(btnFinalizar){
          btnFinalizar.addEventListener('click', () => {
            Swal.close();
            $('#purchaseModal').modal('show');
          });
        }

  //Boton para quitar del carrito
  const botonesQuitar = Swal.getPopup().querySelectorAll('button[data-id]');
  botonesQuitar.forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.getAttribute('data-id'));
      quitarDelCarrito(productId);
        });
      });
      }
  });
}
  
  //Formulario de compra
  document.getElementById('purchase-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const direccion = document.getElementById('customer-address').value;
  
    //Sweetalert2 compra exitosa
    Swal.fire({
      icon: 'success',
      title: 'Compra exitosa',
      text: `Gracias ${nombre}, tu pedido está en proceso.`,
      timer: 2000,
      showConfirmButton: false
    });
  
    //Limpia carrito 
    carrito = [];
    guardarCarrito();
    document.getElementById('purchase-form').reset();
    $('#purchaseModal').modal('hide');
    actualizarContador();
  });
  
  //Mostrar el carrito clic en el link del navbar
  document.getElementById('view-cart').addEventListener('click', function(e) {
    e.preventDefault();
    mostrarCarrito();
  });
  
  //Funcion para guardar datos del formulario
  function precargarDatosFormulario() {
    const datosCliente = JSON.parse(localStorage.getItem('datosCliente'));
    if (datosCliente) {
      document.getElementById('customer-name').value = datosCliente.nombre || '';
      document.getElementById('customer-email').value = datosCliente.email || '';
      document.getElementById('customer-address').value = datosCliente.direccion || '';
    }
  }
  
  //Guarda los datos del usuario
  document.getElementById('purchase-form').addEventListener('change', function() {
    const datos = {
      nombre: document.getElementById('customer-name').value,
      email: document.getElementById('customer-email').value,
      direccion: document.getElementById('customer-address').value,
    };
    localStorage.setItem('datosCliente', JSON.stringify(datos));
  });
  

  renderProductos();
  actualizarContador();
  precargarDatosFormulario();
  