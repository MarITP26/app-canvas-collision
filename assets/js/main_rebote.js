(function () {

const canvas = document.getElementById("canvas3");
let ctx = canvas.getContext("2d");

const window_height = canvas.clientHeight;
const window_width = canvas.clientWidth;

canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "rgb(7, 149, 238)";

// 🔢 N dinámico
let N = 10;
let circles = [];

class Circle {
    constructor(x, y, radius, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.baseColor = "silver";
        this.color = this.baseColor;
        this.text = text;
        this.speed = speed;

        this.dx = (Math.random() - 0.5) * this.speed * 2;
        this.dy = (Math.random() - 0.5) * this.speed * 2;
    }

    draw(context) {
        context.beginPath();

        context.fillStyle = this.color;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this.text, this.posX, this.posY);

        // ✨ efecto glass
    context.fillStyle = "rgba(255,255,255,0.1)";
    context.strokeStyle = "rgba(255,255,255,0.6)";
    context.lineWidth = 2;

    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

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

function crearCirculos() {
    circles = [];

    for (let i = 0; i < N; i++) {
        let radius = Math.random() * 30 + 20;
        let x = Math.random() * (window_width - radius * 2) + radius;
        let y = Math.random() * (window_height - radius * 2) + radius;

        circles.push(new Circle(x, y, radius, i + 1, 3));
    }
}

function detectarColisiones() {
    circles.forEach(c => c.color = c.baseColor);

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let dx = circles[j].posX - circles[i].posX;
            let dy = circles[j].posY - circles[i].posY;

            let distancia = Math.sqrt(dx * dx + dy * dy);
            let sumaRadios = circles[i].radius + circles[j].radius;

            if (distancia < sumaRadios) {

                circles[i].color = "gold";
                circles[j].color = "gold";

                let nx = dx / distancia;
                let ny = dy / distancia;

                let p =
                    2 * (circles[i].dx * nx + circles[i].dy * ny -
                         circles[j].dx * nx - circles[j].dy * ny) / 2;

                circles[i].dx -= p * nx;
                circles[i].dy -= p * ny;

                circles[j].dx += p * nx;
                circles[j].dy += p * ny;
            }
        }
    }
}

// 🔥 SOLO ESTA FUNCIÓN QUEDA GLOBAL
window.actualizarCantidad3 = function(nuevoN) {
    N = parseInt(nuevoN);
    crearCirculos();
};

function animar() {
    requestAnimationFrame(animar);

    ctx.clearRect(0, 0, window_width, window_height);

    detectarColisiones();
    circles.forEach(c => c.update(ctx));
}

// INIT
crearCirculos();
animar();

})();