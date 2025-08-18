export function mostrarPopup(mensaje) {
    const popup = document.getElementById("popupError");
    const popupMessage = document.getElementById("popupMessage");
    const popupClose = document.getElementById("popupClose");

    popupMessage.textContent = mensaje;
    popup.style.display = "block";

    // cerrar al hacer click en X
    popupClose.onclick = () => {
        popup.style.display = "none";
    };

    // cerrar al hacer click fuera del contenido
    window.onclick = (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    };
}