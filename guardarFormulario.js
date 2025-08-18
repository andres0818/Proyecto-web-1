import { setClientes, getClientes, actualizarTabla, actualizarCliente} from "./clientesTabla.js";
import { mostrarPopup } from "./popup.js";

document.getElementById('fecha').value = new Date().toISOString().slice(0, 10);
const form = document.getElementById('registrarse');

if (!localStorage.getItem("crm:schemaVersion")) {
    localStorage.setItem("crm:schemaVersion", "v1");
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll("input")
    const clientes = getClientes();
    const datos = {
        nombre: form.nombre.value.trim(),
        contacto: form.contacto.value.trim(),
        correo: form.correo.value.trim(),
        telefono: form.telefono.value.trim(),
        ciudad: form.ciudad.value.trim(),
        estado: form.estado.value,
        fecha: form.fecha.value,
        etiquetas: procesarEtiquetas(form.etiquetas.value)
    };

    if (form.dataset.editando === "true") {
        actualizarCliente(datos, clientes);
        actualizarTabla()
        reiniciarFormulario();
        form.dataset.editando = "false"; // limpiar estado
        return;
    } else {

        const $validarCorreo = validarCorreo(datos.correo, clientes);
        const $validarFormulario = validarEstadoFormulario(inputs);

        if ($validarFormulario.validado && !$validarCorreo) {
            guardarFormulario(datos, clientes);
            actualizarTabla();
            reiniciarFormulario();
        } else {
            mostrarPopup($validarFormulario.mensaje);
        }
    }

});

function procesarEtiquetas(str) {
    return [...new Set(
        str.split(",")
           .map(e => e.trim().toLowerCase())
           .filter(e => e.length >= 2 && e.length <= 24)
    )].join(", ");
}


function reiniciarFormulario (){
    form.reset()
    const inputs = document.querySelectorAll("input");
    
    inputs.forEach(($element) => {
        $element.style.border = "solid 1px";
    })

    document.getElementById('fecha').value = new Date().toISOString().slice(0, 10);
}

function validarEstadoFormulario($inputs, $formularioValido = true ) {
    let mensaje = "Los campos "

    $inputs.forEach(($element) => {
        if (!parseInt($element.getAttribute("isValid")) && $element.name != "fecha" && $element.name != "buscador") {
            mensaje += `${$element.name}, ` ;
            $formularioValido = false;
        }
    })
    mensaje += "no cumple con las validaciones"

    return {
        mensaje,
        validado: $formularioValido,
    };
}

function guardarFormulario(datos, $clientes) {
    $clientes.push(datos);
    setClientes($clientes);
}

function validarCorreo($correo, $clientes) {

    const correoExiste = $clientes.some(cliente =>
        cliente.correo.toLowerCase() === $correo.toLowerCase()
    );

    if (correoExiste){

        const correo = document.getElementById("correo"); 
        correo.style.border = "2px solid red";
        correo.setAttribute('isValid', '0');

        alert("Este correo ya está registrado.");;
        return true;
    }
return false;
}