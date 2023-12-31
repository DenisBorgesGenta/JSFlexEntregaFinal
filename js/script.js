const body = document.body
const btnRelaxMode = document.getElementById("btn-relax-mode")
const inventario = './productos.json'
const contenedorInventario = document.getElementById("contenedorInventario")
const contenedorCarrito = document.getElementById("contenedorCarrito")
const contenedorTotalCarrito = document.getElementById("totalCarrito")

function guardarEnStorage(){
  localStorage.setItem("CART", JSON.stringify(carrito))
  imprimirItemsCarrito()
  }

let carrito = JSON.parse(localStorage.getItem("CART")) || []
guardarEnStorage()

const llamarInventario = async () => {
  const resp = await fetch(inventario)
  const items = await resp.json()
  imprimirInventario(items)}

  function imprimirInventario(productos){
    productos.forEach((item) =>{
      let card = document.createElement("column")
      card.innerHTML = `<div class="card" style="width: 18rem; display: inline-block; margin: auto; ">
         <img src="${item.img}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${item.nombre}</h5>
           <p class="card-text" style = "text-align: left">${item.precio} USD</p>
           <p class="card-text" style = "text-align: left">${item.contenido}</p>
           <p class="card-text" style = "text-align: left">${item.beneficios}</p>
           <p class="card-text" style = "text-align: left">${item.recomendaciones}</p>
           <button id="${item.id}" class="btnstyling">Agregar al carrito.</div>
         </div>
       </div>`
      contenedorInventario.appendChild(card)
      const btnAgregarACarrito = document.getElementById(`${item.id}`)
      btnAgregarACarrito.addEventListener("click", ()=> {
        agregarACarrito(productos, item.id)
      })
    })
  }
  
llamarInventario()

 function agregarACarrito(productos,id){
  if(carrito.some((item) => item.id === id)){
    Swal.fire({
      text: "En nuestro prelanzamiento, limitamos la cantidad de artículos a uno por usuario para que todos tengan la oportunidad de acceder a ellos.",
      confirmButtonColor: "#ff0055",
      confirmButtonText: 'CONTINUAR',
      showClass: {
        popup: `
          animate__animated
          animate__fadeInDown
          animate__faster
          
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }else{
  const artSeleccionado = productos.find((item) => item.id===id)
  carrito.push(artSeleccionado)
  }  
  guardarEnStorage()
  imprimirItemsCarrito()
  imprimirTotalCarrito()
}

  function imprimirItemsCarrito(productos, id){
    contenedorCarrito.innerHTML=""
    carrito.forEach((item) => {
      contenedorCarrito.innerHTML+=`
      <img src="${item.img}" height="100px" alt="..."></div>
      <div class="itemCarrito">${item.nombre}</div>
      <div class="itemCarrito">Unidades: ${item.unidades}</div>
      <div class="itemCarrito">${item.precio} ${item.moneda}</div>`
    })
    imprimirTotalCarrito()
    proseguirACompra()
    }

function imprimirTotalCarrito(){
  let precioTotal = 0
  contenedorTotalCarrito.innerHTML = ""
  carrito.forEach((item) => {
    contenedorTotalCarrito.innerHTML =
    precioTotal += item.precio * item.unidades
  })
  contenedorTotalCarrito.innerHTML= `Tu total es: ${precioTotal} USD`
}

imprimirTotalCarrito()

function vaciarCarrito(){
  const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito")
  btnVaciarCarrito.innerHTML="VACIAR CARRITO"
  btnVaciarCarrito.addEventListener("click", ()=> {
  localStorage.removeItem("CART")
  carrito = []
  imprimirItemsCarrito()}
  )}

  vaciarCarrito()


  function proseguirACompra (){
    const btnproseguir = document.getElementById("btn-proseguir")
    btnproseguir.innerHTML=`<a href="../redirecting.html"><button class="btnstyling">PROCEDER A COMPRA.</button></a>`
    if(carrito.length === 0){
      btnproseguir.classList.add("invisible")
    }else{btnproseguir.classList.remove("invisible")}
  }
    
 
 
