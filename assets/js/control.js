const range = document.getElementById("rangeCircles");
const valor = document.getElementById("valorCirculos");

let cantidadCirculos = range.value;
valor.textContent = cantidadCirculos;

range.addEventListener("input", () => {
    cantidadCirculos = range.value;
    valor.textContent = cantidadCirculos;

    // 🔥 LLAMAR A LOS 3 CANVAS
    if (window.actualizarCantidad) {
        window.actualizarCantidad(cantidadCirculos);
    }

    if (window.actualizarCantidad2) {
        window.actualizarCantidad2(cantidadCirculos);
    }

    if (window.actualizarCantidad3) {
        window.actualizarCantidad3(cantidadCirculos);
    }
});