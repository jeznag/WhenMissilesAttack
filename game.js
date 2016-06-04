(function () {
    'use strict';
    let britney = document.querySelector('#britneySpears');
    let gameBoard = document.querySelector('#gameBoundary');
    let missile = document.querySelector('#missile');
    let targetExplosion = document.querySelector('#targetExplosion');
    const MAX_LEFT = 250;
    const MIN_LEFT = 15;
    const MIN_TOP = 20;
    const MOVEMENT_STEP = 10;
    const MAX_LEFT_MISSILE = 300;
    let moveRight = true;

    let movementInterval = setInterval(moveBritney, 50);
    addKeyListeners();

    function showTargetExplosion() {
        targetExplosion.style.display = 'block';
        //hide image again after 500ms
        window.setTimeout(function () {
            targetExplosion.style.display = 'none';
        }, 500);
    }

    function addKeyListeners() {
        const ENTER_KEY = 13;
        const LEFT_ARROW_KEY = 37;
        const RIGHT_ARROW_KEY = 39;
        document.body.addEventListener('keydown', function (e) {
            
            if (e.keyCode === ENTER_KEY) {
                handleFireMissile(e);
            } else if (e.keyCode === LEFT_ARROW_KEY) {
                handleMoveLeft(e);
            } else if (e.keyCode === RIGHT_ARROW_KEY) {
                handleMoveRight(e);
            }
            
        });
    }

    function handleFireMissile(e) {
        let currentTop = parseInt(window.getComputedStyle(missile).top.replace('px', '')) || 0;
        let shootMissileInterval = setInterval(function () {
            if (currentTop < MIN_TOP) {
                clearInterval(shootMissileInterval);
                if (calculateDistanceBetweenMissileAndTarget() < 28 ) {
                    showTargetExplosion();
                } else {
                    alert('you missed' + calculateDistanceBetweenMissileAndTarget());
                }
                currentTop = 290;
            }
            currentTop -= 10;
            missile.style.top = currentTop;

        }, 20);
    }

    function handleMoveRight(e){
        let currentLeft = parseInt(window.getComputedStyle(missile).left.replace('px', '')) || 0;
        if (currentLeft < MAX_LEFT_MISSILE) {
            missile.style.left = getNextPosition(currentLeft, true);
        }
    }

    function handleMoveLeft(e) {
        
        let currentLeft = parseInt(window.getComputedStyle(missile).left.replace('px', '')) || 0;
        if (currentLeft > MIN_LEFT) {
            missile.style.left = getNextPosition(currentLeft, false);
        }
    }
    function getCurrentTargetTop() {
        return (parseInt(britney.style.top.replace('px', '')) || 0);
    }

    function getCurrentTargetLeft() {
        return (parseInt(britney.style.left.replace('px', '')) || 0);
    }

    function getCurrentTargetMidpointLeft() {
        //add 25px because the target is 50px wide so 25px is middle of it
        return getCurrentTargetLeft() + 25;
    }

    function getCurrentMissileLeft() {
        return  parseInt(missile.style.left.replace('px', '')) || 0;
    }

    function  getCurrentMissileTop() {
        return parseInt(missile.style.top.replace('px', '')) || 0;
    }

    function calculateDistanceBetweenMissileAndTarget() {
        let xDist = Math.pow(getCurrentMissileLeft() - getCurrentTargetMidpointLeft(), 2);
        //assume that the missile is at the same height as the target
        let yDist = 0;
        return Math.sqrt(xDist + yDist);
    }

    function moveBritney () {
        let currentLeft = getCurrentTargetLeft();
        if (currentLeft > MAX_LEFT) {
            moveRight = false;
        }
        else if (currentLeft < MIN_LEFT) {
            moveRight = true;
        }

        britney.style.left = getNextPosition(currentLeft, moveRight) + 'px'; 
    }

    function getNextPosition(currentLeft, moveRight) {
        if (moveRight) {
            return currentLeft + MOVEMENT_STEP;
        }
        return currentLeft - MOVEMENT_STEP;
    }
})();
