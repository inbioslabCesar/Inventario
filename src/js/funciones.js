import { listProducts } from "./api-fetch.js";

const datos = await listProducts();

export const cargaDeDatos = () => {
    const baseDeDatos = JSON.parse(localStorage.getItem("datos"));

    if(!baseDeDatos){
        localStorage.setItem("datos", JSON.stringify(datos));
    }
}