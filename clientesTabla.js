const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

export function agregarCliente($clientes){
   const tbody = document.querySelector("#tablaClientes tbody");
    tbody.innerHTML = "";
    $clientes.forEach(c => {
        const fila = `<tr>
            <td>${c.nombre}</td>
            <td>${c.contacto}</td>
            <td>${c.correo}</td>
            <td>${c.telefono}</td>
            <td>${c.ciudad}</td>
            <td>${c.estado}</td>
            <td>${c.fecha}</td>
            <td>${c.etiquetas}</td>
        </tr>`;
        tbody.innerHTML += fila;
    });
};


agregarCliente(clientes)