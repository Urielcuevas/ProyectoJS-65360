
const EDAD_PERSONA = parseInt (prompt("ingresa tu edad"));

  if (EDAD_PERSONA >= 0 && EDAD_PERSONA <= 17) {
    console.log("Eres menor de edad. No tienes permiso para continuar.");
    alert("Eres menor de edad. No tienes permiso para navegar en este sitio.");
    
    window.close(); 
  } else if (EDAD_PERSONA >= 18 && EDAD_PERSONA <= 99) {
    console.log("Eres mayor de edad. Acceso permitido.");
    alert("Eres mayor de edad. Puedes continuar navegando.");
  } else {
    alert("Edad fuera de rango.");
    console.log("La edad ingresada no es válida para este sistema.");
  }




const nombresProductos = ["Fume", "Ignite","Lost mary"]
console.log("nombrs de productos", nombresProductos);


let productos = [
  { nombre: "Fume", precio: 20000, stock: 15 },
  { nombre: "Ignite", precio: 35000, stock: 35 },
  { nombre: "Lost mary", precio: 40000, stock: 3 }
];
console.log("Producto y precios", productos);


let cantidadPuff = [5000, 15000, 25000];
console.log("Cantidad de puff:", cantidadPuff);


for (let i = 0; i < productos.length; i++) {
  let producto = productos[i];
  if (producto.stock < 5) {
    console.log(`Alerta: El stock del producto "${producto.nombre}" es bajo (${producto.stock} unidades).`);
  } else {
    console.log(`El producto "${producto.nombre}" tiene un stock suficiente (${producto.stock} unidades).`);
  }
}

