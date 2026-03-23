const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

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

        context.fillStyle = this.color;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();

        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        // Rebote contra paredes
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

// 🔥 COLISIONES CON REBOTE
function detectarColisiones(circles) {

    // reset color
    circles.forEach(c => c.color = c.baseColor);

    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let dx = circles[j].posX - circles[i].posX;
            let dy = circles[j].posY - circles[i].posY;

            let distancia = Math.sqrt(dx * dx + dy * dy);
            let sumaRadios = circles[i].radius + circles[j].radius;

            if (distancia < sumaRadios) {

                // 🔴 Cambiar color al colisionar
                circles[i].color = "red";
                circles[j].color = "red";

                // 🔥 NORMALIZAR VECTOR
                let nx = dx / distancia;
                let ny = dy / distancia;

                // 🔥 INTERCAMBIO DE VELOCIDADES (rebote simple)
                let p =
                    2 * (circles[i].dx * nx + circles[i].dy * ny -
                         circles[j].dx * nx - circles[j].dy * ny) / 2;

                circles[i].dx = circles[i].dx - p * nx;
                circles[i].dy = circles[i].dy - p * ny;

                circles[j].dx = circles[j].dx + p * nx;
                circles[j].dy = circles[j].dy + p * ny;

                // 🔥 SEPARAR PARA EVITAR QUE SE QUEDEN PEGADOS
                let overlap = sumaRadios - distancia;

                circles[i].posX -= overlap * nx / 2;
                circles[i].posY -= overlap * ny / 2;

                circles[j].posX += overlap * nx / 2;
                circles[j].posY += overlap * ny / 2;
            }
        }
    }
}

// 🔢 N CÍRCULOS
let N = 10;
let circles = [];

for (let i = 0; i < N; i++) {
    let radius = Math.random() * 30 + 20;
    let x = Math.random() * (window_width - radius * 2) + radius;
    let y = Math.random() * (window_height - radius * 2) + radius;

    circles.push(new Circle(x, y, radius, i + 1, 3));
}

// 🎬 ANIMACIÓN
function updateCircle() {
    requestAnimationFrame(updateCircle);

    ctx.clearRect(0, 0, window_width, window_height);

    detectarColisiones(circles);

    circles.forEach(c => c.update(ctx));
}

updateCircle();