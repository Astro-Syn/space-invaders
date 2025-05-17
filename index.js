
const board = document.querySelector('.board');
const results = document.querySelector('.results');
let restartBtn = document.querySelector('.restartBtn');

const width = 15;
const enemiesRemoved = [];
let currentShipIndex = 202;
let enemiesId;
let rightDirection = true;
let direction = 1;
let finalResults = 0;


restartBtn.style.display = 'none'

for (let i=0; i < width * width; i++){
    const square = document.createElement('div');
    
    board.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.board div'));

console.log(squares)

const enemies = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
    15, 16,17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39

]

const draw = () => {
    for(let i=0; i < enemies.length; i++){
        if(!enemiesRemoved.includes(i)){
            squares[enemies[i]].classList.add('enemy')
        }
        
    }
}
draw()

squares[currentShipIndex].classList.add('ship');

const remove = () => {
    for(let i = 0; i < enemies.length; i++){
        squares[enemies[i]].classList.remove('enemy')
    }
}

const moveShip = (e) => {
    squares[currentShipIndex].classList.remove('ship');
    switch(e.key){
        case 'ArrowLeft':
            if(currentShipIndex % width !== 0) currentShipIndex -=1
            break
        case 'ArrowRight': 
            if(currentShipIndex % width < width -1) currentShipIndex +=1;
            break
    }
    squares[currentShipIndex].classList.add('ship');
}

document.addEventListener('keydown', moveShip)

const moveEnemies = () => {
    const leftEdge = enemies[0] % width === 0;
    const rightEdge = enemies[enemies.length -1] % width === width -1;
    remove();
    
    if(rightEdge && rightDirection){
        for(let i= 0; i < enemies.length; i++){
        enemies[i] += width + 1;
        direction = -1;
        rightDirection = false;
    }
    }

    if(leftEdge && !rightDirection){
        for(let i = 0; i < enemies.length; i++){
            enemies[i] + width -1;
            direction = 1;
            rightDirection = true;
        }
    }

    for(let i=0; i < enemies.length; i++){
        enemies[i] += direction
    }

    
    draw()

    if(squares[currentShipIndex].classList.contains('enemy')){
        results.innerHTML = `GAME OVER!`
        clearInterval(enemiesId)
        restartBtn.style.display = 'block';
    }
    if(enemiesRemoved.length === enemies.length){
        results.innerHTML = `YOU WIN!`
        clearInterval(enemiesId);
        restartBtn.style.display = 'block'
    }
     restartBtn.addEventListener('click', () => {
        location.reload();
    })
   
}

enemiesId = setInterval(moveEnemies, 700);

const shoot = (e) => {
    let laserId
    let currentLaserIndex = currentShipIndex;


    const moveLaser = () => {
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        if(squares[currentLaserIndex].classList.contains('enemy')){
            squares[currentLaserIndex].classList.remove('enemy')
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.add('explosion')

            setTimeout(() => squares[currentLaserIndex].classList.remove('explosion'), 200);
            clearInterval(laserId)

            const ememyRemoved = enemies.indexOf(currentLaserIndex);
            enemiesRemoved.push(ememyRemoved);
            finalResults ++
            results.innerHTML = finalResults;
        }
    }
    
    if(e.key === "ArrowUp"){
        switch(e.key){
        case 'ArrowUp':
            laserId = setInterval(moveLaser, 100)
            break   
    }
    }
}

document.addEventListener('keydown', shoot)