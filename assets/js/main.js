const canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");

// Dimensiones
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

// 🔢 Número inicial de círculos
let N = 10;
let circles = [];

// 🔵 CLASE
class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
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
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        // Rebote en paredes
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

// 🔥 CREAR CÍRCULOS DINÁMICAMENTE
function crearCirculos() {
    circles = [];

    for (let i = 0; i < N; i++) {
        let radius = Math.random() * 30 + 20;
        let x = Math.random() * (window_width - radius * 2) + radius;
        let y = Math.random() * (window_height - radius * 2) + radius;

        circles.push(new Circle(x, y, radius, "blue", i + 1, 3));
    }
}

// 🔥 FUNCIÓN GLOBAL (LA QUE TE PEDÍ)
function actualizarCantidad(nuevoN) {
    N = parseInt(nuevoN);
    crearCirculos();
}

// 🔁 ANIMACIÓN
function updateCircle1() {
    requestAnimationFrame(updateCircle1);

    ctx.clearRect(0, 0, window_width, window_height);

    circles.forEach(c => c.update(ctx));
}

updateCircle1();
// 🚀 INICIALIZAR
crearCirculos();
