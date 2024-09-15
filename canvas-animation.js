const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let symbols = [];
const symbolCount = 50;
const symbolSpeed = 0.5;
const symbolTypes = ['X', 'O'];

class Symbol {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = Math.random() * 30 + 20;
        this.speedY = Math.random() * symbolSpeed + 0.5;
    }

    draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(this.type, this.x, this.y);
    }

    update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }
}

function initSymbols() {
    for (let i = 0; i < symbolCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const type = symbolTypes[Math.floor(Math.random() * symbolTypes.length)];
        symbols.push(new Symbol(x, y, type));
    }
}

function animateSymbols() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    symbols.forEach(symbol => {
        symbol.update();
        symbol.draw();
    });
    requestAnimationFrame(animateSymbols);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initSymbols();
animateSymbols();
