(function () {

const canvas = document.getElementById("canvas2");
let ctx = canvas.getContext("2d");

// 🔥 USAR TAMAÑO DEL CARD (IMPORTANTE)
const window_height = canvas.clientHeight;
const window_width = canvas.clientWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "rgb(7, 7, 7)";

// 🔢 N dinámico
let N = 10;
let circles = [];

class Circle {
    constructor(x, y, radius, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.baseColor = "blue";
        this.color = this.baseColor;
        this.text = text;
        this.speed = speed;

        this.dx = (Math.random() - 0.5) * this.speed * 2;
        this.dy = (Math.random() - 0.5) * this.speed * 2;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.lineWidth = 2;

        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        context.stroke();

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "16px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;

        this.draw(context);
    }
}

// 🔥 CREAR CÍRCULOS
function crearCirculos() {
    circles = [];

    for (let i = 0; i < N; i++) {
        let radius = Math.random() * 20 + 15;
        let x = Math.random() * (window_width - radius * 2) + radius;
        let y = Math.random() * (window_height - radius * 2) + radius;

        circles.push(new Circle(x, y, radius, i + 1, 2));
    }
}

// 🔥 COLISIÓN (SIN REBOTE)
function detectarColisiones() {
    circles.forEach(c => c.color = c.baseColor);

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let dx = circles[i].posX - circles[j].posX;
            let dy = circles[i].posY - circles[j].posY;

            let distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia <= circles[i].radius + circles[j].radius) {
                circles[i].color = "red";
                circles[j].color = "red";
            }
        }
    }
}

// 🔥 FUNCIÓN GLOBAL (PARA EL SLIDER)
window.actualizarCantidad2 = function(nuevoN) {
    N = parseInt(nuevoN);
    crearCirculos();
};

// 🎬 ANIMACIÓN
function animar() {
    requestAnimationFrame(animar);

    ctx.clearRect(0, 0, window_width, window_height);

    detectarColisiones();
    circles.forEach(c => c.update(ctx));
}

// 🚀 INIT
crearCirculos();
animar();

})();