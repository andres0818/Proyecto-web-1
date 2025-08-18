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


function exportarClientes() {
    const clientes = obtenerClientes();
    const json = JSON.stringify(clientes, null, 2);

    const textarea = document.createElement("textarea");
    textarea.value = json;
    document.body.appendChild(textarea);
}

function importarClientes(json) {
    try {
        const datos = JSON.parse(json);

        if (!Array.isArray(datos)) throw new Error("El JSON debe ser un array");

        const correos = new Set();
        for (const c of datos) {
            if (!c.correo || typeof c.correo !== "string") {
                throw new Error("Falta correo en un registro");
            }
            const correo = c.correo.toLowerCase();
            if (correos.has(correo)) {
                throw new Error(`Correo duplicado: ${correo}`);
            }
            correos.add(correo);
        }

        localStorage.setItem("crm:clientes", JSON.stringify(datos));
        actualizarTabla();
    } catch (e) {
        mostrarAviso("Error al importar: " + e.message);
    }
}