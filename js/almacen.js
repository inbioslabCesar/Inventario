import { listProducts } from "./api-fetch.js";
import { Product } from "./clases.js";

const info = await listProducts();

const cuerpoTabla = document.querySelector("#cuerpo-tabla");

//variables para la paginacion

let limite = 5;
let desde = 0;
let paginas = info.length / limite;
let paginaActiva = 1;

let arreglo = info.slice(desde, limite);

const cargarProductos = () => {
  cuerpoTabla.innerHTML = "";

  arreglo.map((producto) => {
    const fila = document.createElement("tr");
    fila.setAttribute("key", producto.id);

    const contenido = `
              <th scope="row">${producto.id}</th>
              <td>${producto.name}</td>
              <td>${producto.area}</td>
              <td>${producto.lote}</td>
              <td>${producto.stock}</td>
              <td>${producto.ingreso}</td>
              <td>${producto.vence}</td>
              <td>
                  <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>
                  <button class="btn btn-sm btn-danger"><i class="fa-solid fa-trash-can"></i></button>
              </td>

    `;

    fila.innerHTML = contenido;
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
  cargarProductos();
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
    event.preventDefault()
  let id = info.at(-1).id + 1;
  let producto = document.querySelector("#producto").value;
  let area = document.querySelector("#area").value;
  let lote = document.querySelector("#lote").value;
  let stock = document.querySelector("#stock").value;
  let ingreso = document.querySelector("#ingreso").value;
  let vence = document.querySelector("#vence").value;
  
  info.push(new Product(id, producto, area, lote, stock, ingreso, vence));
  console.log(info)
  document.querySelector("#formProduct").reset();
  cargarProductos();
};


document.querySelector("#formProduct").addEventListener("submit", () => agregarProduct);

cargarProductos();