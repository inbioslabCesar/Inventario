import { listProducts } from "./api-fetch.js";
import { Product } from "./clases.js";

const info = await listProducts();

const cuerpoTabla = document.querySelector("#cuerpo-tabla");
const myModal = new bootstrap.Modal(document.getElementById("modalProduct"));
const modalCrearProductos = new bootstrap.Modal(document.getElementById("modalCrearProductos"));



let idProductoUpdate = null;

window.crearModalProductos = () => {
  modalCrearProductos.show();

}

window.mostrarModal = (id) => {
  idProductoUpdate = id;

  let index = info.findIndex((item) => item.id == idProductoUpdate);

  document.querySelector("#productoModal").value = info[index].name;
  document.querySelector("#areaModal").value = info[index].area;
  document.querySelector("#loteModal").value = info[index].lote;
  document.querySelector("#stockModal").value = info[index].stock;
  document.querySelector("#ingresoModal").value = info[index].ingreso;
  document.querySelector("#venceModal").value = info[index].vence;

  myModal.show();
  
};

const productUpdate = (event) => {
  event.preventDefault();
  let index = info.findIndex((item) => item.id == idProductoUpdate);

  info[index].name = document.querySelector("#productoModal").value;
  info[index].area = document.querySelector("#areaModal").value;
  info[index].lote = document.querySelector("#loteModal").value;
  info[index].stock = document.querySelector("#stockModal").value;
  info[index].ingreso = document.querySelector("#ingresoModal").value;
  info[index].vence = document.querySelector("#venceModal").value;

  cargarTabla();
  myModal.hide();
  
};



//variables para la paginacion

let limite = 5;
let desde = 0;
let paginas = info.length / limite;
let paginaActiva = 1;

let arreglo = info.slice(desde, limite);

const cargarTabla = () => {
  cuerpoTabla.innerHTML = "";

  info.map((producto) => {
    const fila = document.createElement("tr");
    fila.setAttribute("key", producto.id);

    const celdas = `
              <th scope="row">${producto.id}</th>
              <td>${producto.name}</td>
              <td>${producto.area}</td>
              <td>${producto.lote}</td>
              <td>${producto.stock}</td>
              <td>${producto.ingreso}</td>
              <td>${producto.vence}</td>
              <td>
                  <button class="btn btn-sm btn-primary" onclick="mostrarModal(${producto.id})"><i class="fa-solid fa-pencil"></i></button>
                  <button class="btn btn-sm btn-danger" onclick="borrarProduct(${producto.id})"><i class="fa-solid fa-trash-can"></i></button>
              </td>

    `;

    fila.innerHTML = celdas;
    cuerpoTabla.append(fila);
  });
  cargarItemPaginacion();
  
};

const cargarItemPaginacion = () => {
  document.querySelector("#items").innerHTML = "";

  for (let index = 0; index < paginas; index++) {
    const item = document.createElement("li");
    item.classList = `page-item ${paginaActiva == index + 1 ? "active" : ""}`;
    const enlace = `<button class="page-link" onclick="pasarPagina(${index})">${
      index + 1
    }</button>`;

    item.innerHTML = enlace;
    document.querySelector("#items").append(item);
  }
};

const modificarArregloProductos = () => {
  arreglo = info.slice(desde, limite * paginaActiva);
  cargarTabla();
};

window.pasarPagina = (pagina) => {
  paginaActiva = pagina + 1;
  desde = limite * pagina;

  if (desde <= info.length) {
    modificarArregloProductos();
  }
};

window.nextPage = () => {
  if (paginaActiva < paginas) {
    desde += 5;
    paginaActiva++;
    modificarArregloProductos();
  }
};

window.previusPage = () => {
  if (desde > 0) {
    paginaActiva--;
    desde -= 5;
    modificarArregloProductos();
  }
};

// Agregar un producto

const agregarProduct = (event) => {
  event.preventDefault();
  let id = info.at(-1).id + 1;
  let name = document.querySelector("#producto").value;
  let area = document.querySelector("#area").value;
  let lote = document.querySelector("#lote").value;
  let stock = document.querySelector("#stock").value;
  let ingreso = document.querySelector("#ingreso").value;
  let vence = document.querySelector("#vence").value;

  info.push(new Product(id, name, area, lote, stock, ingreso, vence));
  document.querySelector("#formProduct").reset();
  cargarTabla();
  modalCrearProductos.hide();
 
};

window.borrarProduct = (id) => {
  let index = info.findIndex((item) => item.id == id);

  let validar = confirm(
    `Está seguro/a que quiere eliminar el producto ${info[index].name}?`
  );

  if (validar) {
    info.splice(index, 1);
    cargarTabla();
  }
};

cargarTabla();


document
  .querySelector("#formProduct")
  .addEventListener("submit", agregarProduct);

document
  .querySelector("#modalProduct")
  .addEventListener("submit", productUpdate);
