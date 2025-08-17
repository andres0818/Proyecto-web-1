import { agregarCliente } from "./clientesTabla.js";

document.getElementById('fecha').value = new Date().toISOString().slice(0, 10);
const form = document.getElementById('registrarse');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll("input")

    const datos = {
        nombre: form.nombre.value.trim(),
        contacto: form.contacto.value.trim(),
        correo: form.correo.value.trim(),
        telefono: form.telefono.value.trim(),
        ciudad: form.ciudad.value.trim(),
        estado: form.estado.value,
        fecha: form.fecha.value,
        etiquetas: form.etiquetas.value.trim()
    };

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    let $validarCorreo = validarCorreo(datos.correo, clientes);
    let $validarFormulario = validarEstadoFormulario(inputs);
    
    if ($validarFormulario.validado, !$validarCorreo) {
        guardarFormulario(datos, clientes);
        agregarCliente(clientes);
        reiniciarFormulario();
    } else {
        alert($validarFormulario.mensaje);
    }
});

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
        if (!parseInt($element.getAttribute("isValid")) && $element.name != "fecha") {
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
    localStorage.setItem("clientes", JSON.stringify($clientes));
}

function validarCorreo($correo, $clientes) {

    const correoExiste = $clientes.some(cliente =>
        cliente.correo.toLowerCase() === $correo.toLowerCase()
    );

    if (correoExiste){

        let correo = document.getElementById("correo"); 
        correo.style.border = "2px solid red";
        correo.setAttribute('isValid', '0');

        alert("Este correo ya está registrado.");;
        return true;
    }
return false;
}