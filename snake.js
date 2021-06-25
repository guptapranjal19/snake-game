function init() {
    canvas = document.body.querySelector("#mycanvas")
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cs = 66;
    game_over = false;
    score = 5;
    food_img = new Image();
    trophy = new Image();
    trophy.src = "Assets/android-chrome-512x512 2.png"
    food_img.src = "Assets/android-chrome-512x512.png";

    food = getRandomfood();

    snake = {
        init_len: 5,
        color: "#c44536",
        // color: "#8d5b4c",
        cells: [],
        direction: "right",

        createSnake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },

        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }
        },

        updateSnake: function () {
            // check if the snake is colliding with the food object, increse the length of the snake and 
            // generate rsndom food object.
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if (headX == food.x && headY == food.y) {
                // generate new food object
                food = getRandomfood();
                score++;
            }
            else {
                this.cells.pop();
            }

            var nextX, nextY;
            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if (this.direction == "up") {
                nextX = headX;
                nextY = headY - 1;
            }
            else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }
            this.cells.unshift({ x: nextX, y: nextY });
            // boundary condition
            // last_x last_y are endpoints coordinates
            var last_x = Math.round(W / cs);
            var last_y = Math.round(H / cs);

            if (this.cells[0].x > last_x || this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].y < 0 || this.cells[0].y > last_y) {
                game_over = true;
            }

        }
    };

    snake.createSnake();
    // Add a Event Listener on the document object.
    // keypressed is a callback funtion
    document.addEventListener("keydown", keypressed);
    function keypressed(e) {
        if (e.key == "ArrowRight") {
            snake.direction = "right";
        }
        else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        }
        else if (e.key == "ArrowDown") {
            snake.direction = "down";
        }
        else if (e.key == "ArrowUp") {
            snake.direction = "up";
        }
    }
}


function draw() {
    // erase the old frame
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    performance.fillStyle = food.color;
    pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
    pen.fillStyle = "#e63946";
    pen.font = "40px Roboto";
    pen.drawImage(trophy, 20, 20, 2 * cs, 2 * cs);
    pen.fillText(score, 75, 70);
}

function update() {
    snake.updateSnake();

}

function getRandomfood() {
    var foodX = Math.round(Math.random() * (W - cs) / cs);
    var foodY = Math.round(Math.random() * (H - cs) / cs);

    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    };
    return food;
}

function gameloop() {
    if (game_over) {
        clearInterval(f);
        alert("Game Over!");
        return;
    }
    draw();
    update();
}
init();
var f = setInterval(gameloop, 120);
