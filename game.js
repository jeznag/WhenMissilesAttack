
(function () {

    'use strict';
    let britney = document.querySelector('#britneySpears');
    let gameBoard = document.querySelector('#gameBoundary');
    let missile = document.querySelector('#missile');
    const MAX_LEFT = 250;
    const MIN_LEFT = 15;
    const MOVEMENT_STEP = 10;
    let moveRight = true;
    const MIN_TOP = 100;

    let movementInterval = setInterval(moveBritney, 50);
    addKeyListeners();

    function addKeyListeners() {
        const ENTER_KEY = 13;
        document.body.addEventListener('keypress', function (e) {
            
            if (e.keyCode === ENTER_KEY) {
                //shoot missile
                missile.style.alignSelf = 'auto';
                let currentTop = parseInt(window.getComputedStyle(missile).top.replace('px', '')) || 0;
                let shootMissileInterval = setInterval(function () {
                    if (currentTop < MIN_TOP) {
                        currentTop = 300;
                        clearInterval(shootMissileInterval);
                    }
                    currentTop -= 10;
                    missile.style.top = currentTop;
                },100);
            }
            //move missile left and right
        });
    }

    function moveBritney () {
        let currentLeft = parseInt(britney.style.left.replace('px', '')) || 0;
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
