const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const gridSize = 30;
let snake = [{x: 8, y: 10}];
let direction = {x: 1, y: 0};
let food = {x: 15, y: 10};
let growing = false;
let gameOver = false;
let score = 0;
function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw snake
    snake.forEach((part, i) => drawCell(part.x, part.y, i === 0 ? '#0f0' : '#fff'));
    // Draw food
    drawCell(food.x, food.y, '#f00');
    // Draw score
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 24);
}
function update() {
    if (gameOver) return;
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    // Wall collision
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        gameOver = true;
        setTimeout(() => alert('Game Over! Score: ' + score), 100);
        return;
    }
    // Self collision
    if (snake.some((part, i) => i > 0 && part.x === head.x && part.y === head.y)) {
        gameOver = true;
        setTimeout(() => alert('Game Over! Score: ' + score), 100);
        return;
    }
    snake.unshift(head);
    // Food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}
function placeFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
    } while (snake.some(part => part.x === newFood.x && part.y === newFood.y));
    food = newFood;
}
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && direction.y !== 1) direction = {x: 0, y: -1};
    else if (e.key === 'ArrowDown' && direction.y !== -1) direction = {x: 0, y: 1};
    else if (e.key === 'ArrowLeft' && direction.x !== 1) direction = {x: -1, y: 0};
    else if (e.key === 'ArrowRight' && direction.x !== -1) direction = {x: 1, y: 0};
});
function gameLoop() {
    update();
    draw();
    if (!gameOver) setTimeout(gameLoop, 100);
}
window.startSnakeGame = function() {
    // Reset game state
    snake = [{x: 8, y: 10}];
    direction = {x: 1, y: 0};
    food = {x: 15, y: 10};
    growing = false;
    gameOver = false;
    score = 0;
    placeFood();
    gameLoop();
}
