const form = document.getElementById('registrarse');
const STORAGE_KEY = 'crm:clientes';
actualizarTabla()

export function setClientes(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

export function getClientes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}


export function actualizarTabla($clientes = getClientes()) {

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
        setClientes($clientes);
    }
}

function editarCliente(correo) {
    const clientes = getClientes();
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
    const tbody = document.querySelector("#tablaClientes tbody");
    const fila = [...tbody.rows].find(r => r.cells[2].textContent === correo);

    if (fila) {
        const confirmCell = fila.insertCell(-1);
        confirmCell.colSpan = 2;
        confirmCell.innerHTML = `
            <span>¿Eliminar?</span>
            <button onclick="confirmarEliminacion('${correo}', true)">Sí</button>
            <button onclick="confirmarEliminacion('${correo}', false)">No</button>
        `;
    }
}

function confirmarEliminacion(correo, confirmar) {
    if (confirmar) {
        let clientes = getClientes() || [];
        clientes = clientes.filter(c => c.correo !== correo);
       setClientes(clientes);
        actualizarTabla(clientes);
    } else {
        actualizarTabla(); 
    }
}
window.confirmarEliminacion = confirmarEliminacion;
window.editarCliente = editarCliente;
window.eliminarCliente = eliminarCliente;