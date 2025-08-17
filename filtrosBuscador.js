import { actualizarTabla } from "./clientesTabla.js";

function obtenerClientes() {
    return JSON.parse(localStorage.getItem("clientes")) || [];
}

function buscarClientes(texto, clientes) {
    if (!texto) return clientes;
    texto = texto.toLowerCase();

    return clientes.filter(c =>
        c.nombre.toLowerCase().includes(texto) ||
        c.correo.toLowerCase().includes(texto) ||
        c.ciudad.toLowerCase().includes(texto)
    );
}

function filtrarPorEstado(estado, clientes) {
    if (!estado) return clientes;
    return clientes.filter(c => c.estado === estado);
}

function aplicarFiltros() {
    let clientes = obtenerClientes();

    const texto = document.getElementById("buscador").value;
    const estado = document.getElementById("filtroEstado").value;

    clientes = buscarClientes(texto, clientes);
    clientes = filtrarPorEstado(estado, clientes);

    actualizarTabla(clientes);
}

document.getElementById("buscador").addEventListener("input", aplicarFiltros);
document.getElementById("filtroEstado").addEventListener("change", aplicarFiltros);
