const form = document.getElementById('registrarse');

actualizarTabla()

export function actualizarTabla($clientes = (JSON.parse(localStorage.getItem("clientes")) || [])) {

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
            <td>
                <button onclick="editarCliente('${c.correo}')">✏️</button>
                <button onclick="eliminarCliente('${c.correo}')">❌</button>
            </td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}

export function actualizarCliente(datos, $clientes) {
    const index = $clientes.findIndex(c => c.correo === datos.correo);
    if (index !== -1) {
        $clientes[index] = datos;
        localStorage.setItem("clientes", JSON.stringify($clientes));    
    }
}

function editarCliente(correo) {
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const cliente = clientes.find(c => c.correo === correo);

    if (!cliente) return alert("Cliente no encontrado.");

    // rellenar el formulario
    form.nombre.value = cliente.nombre;
    form.contacto.value = cliente.contacto;
    form.correo.value = cliente.correo;
    form.telefono.value = cliente.telefono;
    form.ciudad.value = cliente.ciudad;
    form.estado.value = cliente.estado;
    form.fecha.value = cliente.fecha;
    form.etiquetas.value = cliente.etiquetas;

    // Marcar que estamos editando
    form.dataset.editando = "true";
}

function eliminarCliente(correo) {
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    clientes = clientes.filter(c => c.correo !== correo);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    actualizarTabla();
}

window.editarCliente = editarCliente;
window.eliminarCliente = eliminarCliente;