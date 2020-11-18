import Game from './engine/game.js'

let game = new Game(4)

const renderBoard = function() {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    let html = startNewGame()

    $root.append(html)

    fillBoard()

    $(document).keydown(function(event) {
        var key = event.keyCode
        if(key == '37') {
            game.move('left')
            fillBoard()
        } else if(key == '38') {
            game.move('up')
            fillBoard()
        } else if(key == '39') {
            game.move('right')
            fillBoard()
        } else if(key == '40') {
            game.move('down')
            fillBoard()
        }
    })

    game.onWin(function() {
        document.querySelector('.checker').innerHTML = "YOU WIN!!! YOU FOUND THE 2048 TILE!"
    })

    game.onLose(function() {
        document.querySelector('.checker').innerHTML = "You Lose! You should try again by hitting the 'Reset Game' button."
    })

    $root.on("click", ".reset", resetGame)

};

$(function() {
    renderBoard();
});

const resetGame = function() {
    game.setupNewGame()
    fillBoard()
    document.querySelector('.checker').innerHTML = ""
}

const startNewGame = function() {

    let html = `<div class="container">
                    <div class="header">
                        <h2 class="title has-text-weight-bold">2048</h2>
                    </div>
                    <p class="subtitle is-5">Join the numbers and get to the <strong>2048 tile!</strong></p>
                    <p class="subtitle is-5">By using the arrow keys, you can move the tiles around the board. Numbers will combine when two numbers with the same value collide with each other!</p>
                </div>

                <div class="scoreContainer">
                    <h3>SCORE:</h3>
                    <h3 id="scoreCounter">0</h3>
                </div>

                <div class="checker"></div>

                <div class="grid">
                    <div class="row">
                        <div id="zero"></div>
                        <div id="four"></div>
                        <div id="eight"></div>
                        <div id="twelve"></div>
                    </div>
                    <div class="row">
                        <div id="one"></div>
                        <div id="five"></div>
                        <div id="nine"></div>
                        <div id="thirteen"></div>
                    </div>
                    <div class="row">
                        <div id="two"></div>
                        <div id="six"></div>
                        <div id="ten"></div>
                        <div id="fourteen"></div>
                    </div>
                    <div class="row">
                        <div id="three"></div>
                        <div id="seven"></div>
                        <div id="eleven"></div>
                        <div id="fifteen"></div>
                    </div>
                </div>

                <div class="buttonContainer">
                    <button class="reset">Reset Game</button>
                </div>`

    return html

}

const fillBoard = function() {

    let nums = [['zero', 'one', 'two', 'three'],
                ['four', 'five', 'six', 'seven'],
                ['eight', 'nine', 'ten', 'eleven'],
                ['twelve', 'thirteen', 'fourteen', 'fifteen']];

    for(let i = 0; i < nums.length; i++) {
        for(let j = 0; j < nums.length; j++) {
            let associatedWord = nums[i][j]
            if(game.officialBoard[i][j] == 0) {
                document.getElementById(associatedWord).innerHTML = ''
            } else {
                document.getElementById(associatedWord).innerHTML = game.officialBoard[i][j]
            }
            document.getElementById('scoreCounter').innerHTML = game.gameState.score
        }
    }
}