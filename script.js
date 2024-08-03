document.addEventListener('DOMContentLoaded', () => {
    const car = document.querySelector('.car');
    const gameArea = document.querySelector('.gameArea');
    const lanes = document.querySelectorAll('.lane');
    const scoreDisplay = document.querySelector('.score');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const menuButton = document.getElementById('menuButton');
    let carLeft = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    let carTop = gameArea.offsetHeight - car.offsetHeight - 20;
    let score = 0;
    let gameInterval, enemyInterval;

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
    menuButton.addEventListener('click', showMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && carLeft > 0) {
            carLeft -= 10;
        } else if (e.key === 'ArrowRight' && carLeft < gameArea.offsetWidth - car.offsetWidth) {
            carLeft += 10;
        } else if (e.key === 'ArrowUp' && carTop > 0) {
            carTop -= 10;
        } else if (e.key === 'ArrowDown' && carTop < gameArea.offsetHeight - car.offsetHeight) {
            carTop += 10;
        }
        car.style.left = `${carLeft}px`;
        car.style.top = `${carTop}px`;
    });

    function startGame() {
        document.querySelector('.menu').style.display = 'none';
        gameArea.style.display = 'block';
        carLeft = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
        carTop = gameArea.offsetHeight - car.offsetHeight - 20;
        car.style.left = `${carLeft}px`;
        car.style.top = `${carTop}px`;
        gameInterval = setInterval(moveEnemies, 50);
        enemyInterval = setInterval(createEnemy, 2000);
    }

    function resetGame() {
        clearInterval(gameInterval);
        clearInterval(enemyInterval);
        document.querySelectorAll('.enemy').forEach(enemy => enemy.remove());
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        startGame();
    }

    function showMenu() {
        clearInterval(gameInterval);
        clearInterval(enemyInterval);
        document.querySelectorAll('.enemy').forEach(enemy => enemy.remove());
        gameArea.style.display = 'none';
        document.querySelector('.menu').style.display = 'flex';
    }

    function createEnemy() {
        for (let i = 0; i < 3; i++) {
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            const laneIndex = Math.floor(Math.random() * lanes.length);
            enemy.style.left = `${lanes[laneIndex].offsetLeft + lanes[laneIndex].offsetWidth / 2 - 25}px`;
            enemy.style.top = `-${Math.floor(Math.random() * 100 + 100)}px`;
            gameArea.appendChild(enemy);
        }
    }

    function moveEnemies() {
        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => {
            let enemyTop = parseInt(enemy.style.top);
            if (enemyTop > gameArea.offsetHeight) {
                enemy.remove();
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            } else {
                enemy.style.top = `${enemyTop + 5}px`;
                checkCollision(enemy);
            }
        });
    }

    function checkCollision(enemy) {
        const carRect = car.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();

        if (
            carRect.left < enemyRect.left + enemyRect.width &&
            carRect.left + carRect.width > enemyRect.left &&
            carRect.top < enemyRect.top + enemyRect.height &&
            carRect.top + carRect.height > enemyRect.top
        ) {
            alert('O\'yin tamom! Boshidan boshlang.');
            resetGame();
        }
    }
});
