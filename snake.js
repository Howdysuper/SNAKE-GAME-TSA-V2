const canvas1 = document.getElementById('gameCanvas1'); // Get canvas for Player 1
const ctx1 = canvas1.getContext('2d'); // Get context for Player 1's canvas
const canvas2 = document.getElementById('gameCanvas2'); // Get canvas for Player 2
const ctx2 = canvas2.getContext('2d'); // Get context for Player 2's canvas

const gridSize = 20; // Size of each grid cell
const canvasWidth = canvas1.width; // Width of the canvas
const canvasHeight = canvas1.height; // Height of the canvas

let snake1 = [{ x: 60, y: 200 }]; // Initial position of Player 1's snake
let snake2 = [{ x: 340, y: 200 }]; // Initial position of Player 2's snake
let direction1 = 'RIGHT'; // Initial direction of Player 1's snake
let direction2 = 'LEFT'; // Initial direction of Player 2's snake
let apple1 = { x: getRandomInt(0, canvasWidth / gridSize) * gridSize, y: getRandomInt(0, canvasHeight / gridSize) * gridSize }; // Initial position of Player 1's apple
let apple2 = { x: getRandomInt(0, canvasWidth / gridSize) * gridSize, y: getRandomInt(0, canvasHeight / gridSize) * gridSize }; // Initial position of Player 2's apple
let score1 = 0; // Initial score of Player 1
let score2 = 0; // Initial score of Player 2

document.addEventListener('keydown', changeDirection); // Listen for key presses to change direction

function gameLoop() {
    if (score1 >= 10) { // Check if Player 1 has won
        alert('Player 1 wins!'); // Display win message
        resetGame(); // Reset the game
    } else if (score2 >= 10) { // Check if Player 2 has won
        alert('Player 2 wins!'); // Display win message
        resetGame(); // Reset the game
    } else {
        update(); // Update game state
        draw(); // Draw game state
        setTimeout(gameLoop, 100); // Loop the game every 100ms
    }
}

function update() {
    moveSnake(snake1, direction1); // Move Player 1's snake
    moveSnake(snake2, direction2); // Move Player 2's snake

    if (checkCollision(snake1, apple1)) { // Check if Player 1's snake has eaten the apple
        score1++; // Increase Player 1's score
        apple1 = { x: getRandomInt(0, canvasWidth / gridSize) * gridSize, y: getRandomInt(0, canvasHeight / gridSize) * gridSize }; // Generate new apple for Player 1
        snake1.push({}); // Grow Player 1's snake
    }

    if (checkCollision(snake2, apple2)) { // Check if Player 2's snake has eaten the apple
        score2++; // Increase Player 2's score
        apple2 = { x: getRandomInt(0, canvasWidth / gridSize) * gridSize, y: getRandomInt(0, canvasHeight / gridSize) * gridSize }; // Generate new apple for Player 2
        snake2.push({}); // Grow Player 2's snake
    }
}

function draw() {
    ctx1.clearRect(0, 0, canvasWidth, canvasHeight); // Clear Player 1's canvas
    ctx2.clearRect(0, 0, canvasWidth, canvasHeight); // Clear Player 2's canvas

    drawSnake(ctx1, snake1, '#008000'); // Draw Player 1's snake in green
    drawSnake(ctx2, snake2, '#0000FF'); // Draw Player 2's snake in blue
    drawApple(ctx1, apple1); // Draw Player 1's apple
    drawApple(ctx2, apple2); // Draw Player 2's apple
}

function moveSnake(snake, direction) {
    const head = { ...snake[0] }; // Copy the head of the snake

    switch (direction) {
        case 'UP':
            head.y -= gridSize; // Move up
            break;
        case 'DOWN':
            head.y += gridSize; // Move down
            break;
        case 'LEFT':
            head.x -= gridSize; // Move left
            break;
        case 'RIGHT':
            head.x += gridSize; // Move right
            break;
    }

    snake.unshift(head); // Add new head to the snake
    snake.pop(); // Remove the last segment of the snake
}

function changeDirection(event) {
    const keyPressed = event.keyCode; // Get the key code of the pressed key

    switch (keyPressed) {
        case 87: // W
            if (direction1 !== 'DOWN') direction1 = 'UP'; // Change direction of Player 1's snake to up
            break;
        case 83: // S
            if (direction1 !== 'UP') direction1 = 'DOWN'; // Change direction of Player 1's snake to down
            break;
        case 65: // A
            if (direction1 !== 'RIGHT') direction1 = 'LEFT'; // Change direction of Player 1's snake to left
            break;
        case 68: // D
            if (direction1 !== 'LEFT') direction1 = 'RIGHT'; // Change direction of Player 1's snake to right
            break;
        case 38: // Up Arrow
            if (direction2 !== 'DOWN') direction2 = 'UP'; // Change direction of Player 2's snake to up
            break;
        case 40: // Down Arrow
            if (direction2 !== 'UP') direction2 = 'DOWN'; // Change direction of Player 2's snake to down
            break;
        case 37: // Left Arrow
            if (direction2 !== 'RIGHT') direction2 = 'LEFT'; // Change direction of Player 2's snake to left
            break;
        case 39: // Right Arrow
            if (direction2 !== 'LEFT') direction2 = 'RIGHT'; // Change direction of Player 2's snake to right
            break;
    }
}

function checkCollision(snake, apple) {
    return snake[0].x === apple.x && snake[0].y === apple.y; // Check if the snake's head is at the same position as the apple
}

function drawSnake(ctx, snake, color) {
    ctx.fillStyle = color; // Set the color for the snake
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize); // Draw each segment of the snake
    });
}

function drawApple(ctx, apple) {
    ctx.fillStyle = 'red'; // Set the color for the apple
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize); // Draw the apple
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; // Generate a random integer between min and max
}

function resetGame() {
    snake1 = [{ x: 60, y: 200 }]; // Reset Player 1's snake
    snake2 = [{ x: 340, y: 200 }]; // Reset Player 2's snake
    direction1 = 'RIGHT'; // Reset Player 1's direction
    direction2 = 'LEFT'; // Reset Player 2's direction
    apple1 = { x: getRandomInt(0, canvasWidth / gridSize) * gridSize, y: getRandomInt(0, canvasHeight / gridSize) * gridSize }; // Reset Player 1's apple
    apple2 = { x: getRandomInt(0, canvasWidth / gridSize) * gridSize, y: getRandomInt(0, canvasHeight / gridSize) * gridSize }; // Reset Player 2's apple
