//Objeto tipo diccionario para almacenar las expresiones regulares que validan los campos 
//El key debe ser el "name" que tiene el input en el HTML
let regex = {
    nombre: /^(?!.*(.)\1\1)[A-Za-z0-9 &.,-]{3,80}$/,
    contacto: /^([A-Za-zÀ-ÿ]+[’']?[A-Za-zÀ-ÿ]{1,39})(\s([A-Za-zÀ-ÿ]+[’']?[A-Za-zÀ-ÿ]{1,39})){1,}$/,
    correo: /^(?!\.)(?!.*\.\.)[A-Za-z0-9+](?:[A-Za-z0-9.+]*[A-Za-z0-9+])?@([A-Za-z0-9-]+\.)+[A-Za-z]{2,24}$/,
    telefono: /^\+?\d{7,15}$/,
    ciudad: /^[A-Za-zÀ-ÿ]+(?:[\s-][A-Za-zÀ-ÿ]+)*$/,
    etiquetas: /^([A-Za-z0-9-]{2,24})(,([A-Za-z0-9-]{2,24}))*$/
}

document.querySelectorAll("input").forEach(e => {
    e.addEventListener("input", (i) => {
        let dataInput = i.target;
        let name = dataInput.name;
        if(name !="buscador" )
            validationName(dataInput, regex[name]); 

    });
});

function validationName($element, $regex) {
    const value = $element.value;
    $element.value = value.replace("  ", " ")

    if (!$regex.test(value)) {
        $element.style.border = "2px solid red";
        $element.setAttribute('isValid', '0');

    } else {
        $element.style.border = "2px solid green";
        $element.setAttribute('isValid', '1');
    }
}