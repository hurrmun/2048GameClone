//* Write Functions here


//* board state
const board = [
    [ 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0 ] 
] 

let score = 0
let highScore = 0
let isGameOver = false
let isGameWon = false

const updateHighScore = () => {
    if (score > highScore) {
        highScore = score
        $(".highScore").text(highScore)
    }
}

const gameOver = () => {
    updateHighScore()
    $(".continue").remove()
    $(document).off("keydown")
    $("#moveLeft").off("click", buttonLeft)
    $("#moveRight").off("click", buttonRight)
    $("#moveUp").off("click", buttonUp)
    $("#moveDown").off("click", buttonDown)
    $('#modalLabel').text("You Lose!")
    $('#gameOverModal').modal({
        show: true
    })
}

const youWin = () => {
    isGameWon = true
    $('#modalLabel').text("You Win!")
    $('#gameOverModal').modal({
        show: true
    })
    const $continueButton = $('<button>').addClass("continue btn btn-outline-primary").text("Continue Playing")
    $continueButton.attr("data-dismiss", "modal").attr("type", "button")
    $('.modal-footer').append($continueButton)
}



const check2048 = (number) => number === 2048

const checkGameOver = () => {
    updateHighScore()
    const allTiles = board[0].concat(board[1], board[2], board[3])
    if (isStaticLeft() && isStaticRight() && isStaticUp() && isStaticDown()) {
        isGameOver = true
        return gameOver()
    } else if (allTiles.some(check2048)) {
        if (isGameWon) {
            return null
        } else {
            return youWin()
        }
    }
    return isGameOver = false
}

const restartGame = () => {
    updateHighScore()
    for (let i = 0; i < board.length; i++) {
        board[i] = board[i].map((number) => number = 0)
    }
    isGameOver = false
    score = 0
    $(".continue").remove()
    $(document).off("keydown")
    $("#moveLeft").off("click", buttonLeft)
    $("#moveRight").off("click", buttonRight)
    $("#moveUp").off("click", buttonUp)
    $("#moveDown").off("click", buttonDown)
    startControls()
    $("#moveLeft").on("click", buttonLeft)
    $("#moveRight").on("click", buttonRight)
    $("#moveUp").on("click", buttonUp)
    $("#moveDown").on("click", buttonDown)
    startGame()
    renderBoard()
}

//* update user's display to reflect board state
const renderBoard = () => {
    for (let i = 0; i < board.length; i++ ) {
        for (let j = 0; j < board[i].length; j++) {
            //* if there is no value or if false-y
            if (board[i][j]) {
                $('.tilerow').eq(i).children().eq(j).text(board[i][j])
            } else {
                $('.tilerow').eq(i).children().eq(j).text("-")
            }
        }
    }
    $('.gameScore').text(score)
    $( ".tile:contains('-')" ).css( "background-color", "#ddeaf9" );
    $( ".tile:contains('2')" ).css( "background-color", "#c9e4f8" );
    $( ".tile:contains('4')" ).css( "background-color", "#a9c7ef" );
    $( ".tile:contains('8')" ).css( "background-color", "#b1acec" );
    $( ".tile:contains('16')" ).css( "background-color", "#8e8ecd" );
    $( ".tile:contains('32')" ).css( "background-color", "#7369dd" );
    $( ".tile:contains('64')" ).css( "background-color", "#2366be" );
    $( ".tile:contains('128')" ).css( "background-color", "#1565A2" );
    $( ".tile:contains('256')" ).css( "background-color", "#15447A" );
    $( ".tile:contains('512')" ).css( "background-color", "#389ae5" );
    $( ".tile:contains('1024')" ).css( "background-color", "#a98375" );
    $( ".tile:contains('2048')" ).css( "background-color", "#c78283" );
}

//* Merging Tiles
const mergeTilesLeft = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === board[i][j + 1]) {
                board[i][j] = board[i][j] * 2
                board[i][j+1] = 0
            }
        }
    }
}

const mergeTilesRight = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j > 0; j--) {
            if (board[i][j] === board[i][j - 1]) {
                board[i][j] = board[i][j] * 2
                board[i][j-1] = 0
            }
        }
    }
}

const mergeTilesUp = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === board[i + 1][j]) {
                board[i][j] = board[i][j] * 2
                board[i + 1][j] = 0
            }
        }
    }
}

const mergeTilesDown = () => {
    for (let i = 3; i > 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === board[i - 1][j]) {
                board[i][j] = board[i][j] * 2
                board[i - 1][j] = 0
            }
        }
    }
}

const shiftTilesLeft = () => {
    for (let i = 0; i < board.length; i++ ) {
        //* sorts the board so 0 is pushed to the right
        board[i].sort((a, b) => {
            if (!b) {
                return -1
            }
        })
    }
}


const shiftTilesRight = () => {
    for (let i = 0; i < board.length; i++ ) {
        //* sorts the board so 0 is pushed to the right
        board[i].sort((a, b) => {
            if (!a) {
                return -1
            }
        })
        
    }
}


const shiftTilesUp = () => {
    for (let i = 0; i < board.length; i++ ) {
        for (let j = 0; j < board[i].length; j++) {
            //* checks if there is a value on the board and if it is the first row
            if (board[i][j] && i !== 0) {
                //* save value of that number
                //* if the above row's number is 0 shift it up
                if (i > 2 && !board[i-3][j]) { //! if i is 3
                    let x = board[i].splice(j, 1, 0)
                    board[i-3][j] = x[0]
                } else if (i > 1 && !board[i-2][j]) { //! if i is 2 or 3
                    let x = board[i].splice(j, 1, 0)
                    board[i-2][j] = x[0]
                } else if (i > 0 && !board[i-1][j]) { //! if i is 1, 2 or 3
                    let x = board[i].splice(j, 1, 0)
                    board[i-1][j] = x[0]
                } 
            }
        }
    }
}

const shiftTilesDown = () => {
    for (let i = board.length - 1; i >= 0; i-- ) {
        for (let j = 0; j < board[i].length; j++) {
            //* checks if there is a value on the board and if it is the last row
            if (board[i][j] && i !== 3) {
                if (i < 1 && !board[i+3][j]) { //! 
                    let x = board[i].splice(j, 1, 0)
                    board[i+3][j] = x[0]
                } else if (i < 2 && !board[i+2][j]) { //! if i is 1 or 0
                    let x = board[i].splice(j, 1, 0)
                    board[i+2][j] = x[0]
                } else if (i < 3 && !board[i+1][j]) { //! if i is 2, 1 or 0
                    let x = board[i].splice(j, 1, 0)
                    board[i+1][j] = x[0]
                }  
            }
        }
    }
}
//* Combine shift and merge to get move tile function
const moveTilesLeft = () => {
    shiftTilesLeft();
    mergeTilesLeft();
    shiftTilesLeft();
    generateTile()
    renderBoard()
}

const moveTilesRight = () => {
    shiftTilesRight();
    mergeTilesRight();
    shiftTilesRight();
    generateTile()
    renderBoard()
}

const moveTilesUp = () => {
    shiftTilesUp();
    mergeTilesUp();
    shiftTilesUp();
    generateTile()
    renderBoard()
}

const moveTilesDown = () => {
    shiftTilesDown();
    mergeTilesDown();
    shiftTilesDown();
    generateTile()
    renderBoard()
}


//* Generate a random tile on an empty space
const random1to4 = () => Math.floor(Math.random()*4)
const random1to10 = () => Math.floor(Math.random()*10)


const generateTile = () => {
    let y = random1to4()
    let x = random1to4()
    //* when selected tile is filled, find a new empty tile
    while (board[y][x] !== 0) {
        y = random1to4()
        x = random1to4()
    }
    const randomNewTile = [2, 4]
    if (random1to10() < 9) {
        board[y][x] = randomNewTile[0]
        score += 10
    } else {
        board[y][x] = randomNewTile[1]
        score += 20
    }
}


//* Starts the game with 2 randomly generated tiles
const startGame = () => {
    generateTile()
    generateTile()
    renderBoard()
}

//* Check if the board is static or not

const isStaticLeft = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            //? if current tile is a 0 and the next tile has a value not OR if two tiles have the same value
            if (board[i][j] === 0 && board[i][j+1] || board[i][j] === board[i][j+1] && board[i][j] !== 0) {
                return false
            } 
        }
    }
    return true
}

const isStaticRight = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 3; j > 0; j--) {
            //? if current tile is a 0 and the next tile has a value not OR if two tiles have the same value
            if (board[i][j] === 0 && board[i][j-1] || board[i][j] === board[i][j-1] && board[i][j] !== 0) {
                return false
            } 
        }
    }
    return true
}


const isStaticUp = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            //? if current tile is a 0 and the next tile has a value not OR if two tiles have the same value
            if (board[i][j] === 0 && board[i+1][j] || board[i][j] === board[i+1][j] && board[i][j] !== 0) {
                return false
            } 
        }
    }
    return true
}

const isStaticDown = () => {
    for (let i = 3; i > 0; i--) {
        for (let j = 0; j < 4; j++) {
            //? if current tile is a 0 and the next tile has a value not OR if two tiles have the same value
            if (board[i][j] === 0 && board[i-1][j] || board[i][j] === board[i-1][j] && board[i][j] !== 0) {
                return false
            } 
        }
    }
    return true
}

const startControls = () => {
    $(document).on("keydown", (event) => {
        if (event.which === 37 || event.which === 65) { //? left
            if (isStaticLeft()) {
                console.log("Invalid move!")
            } else {
                moveTilesLeft()
                checkGameOver()
            }
        } else if (event.which === 39 || event.which === 68) { //? right
            if (isStaticRight()) {
                console.log("Invalid move!")
            } else {
                moveTilesRight()
                checkGameOver()
            }
        } else if (event.which === 38 || event.which === 87) { //? up
            if (isStaticUp()) {
                console.log("Invalid move!")
            } else {
                moveTilesUp()
                checkGameOver()
            }
        } else if (event.which === 40 || event.which === 83) { //? down
            if (isStaticDown()) {
                console.log("Invalid move!")
            } else {
                moveTilesDown()
                checkGameOver()
            }
        }
    })
}

const buttonLeft = () => {
    if (isStaticLeft()) {
        console.log("Invalid move!")
    } else {
        moveTilesLeft()
    }
    checkGameOver()
}

const buttonRight = () => {
    if (isStaticRight()) {
        console.log("Invalid move!")
    } else {
        moveTilesRight()
    }
    checkGameOver()
}

const buttonUp = () => {
    if (isStaticUp()) {
        console.log("Invalid move!")
    } else {
        moveTilesUp()
    }
    checkGameOver()
}

const buttonDown = () => {
    if (isStaticDown()) {
        console.log("Invalid move!")
    } else {
        moveTilesDown()
    }
    checkGameOver()
}


//* Run Functions here
const main = () => { 
    startGame()
    startControls()
    renderBoard()
    const $newGameButton = $(".restart").on("click", restartGame)
    const $buttonLeft = $("#moveLeft").on("click", buttonLeft)
    const $buttonRight = $("#moveRight").on("click", buttonRight)
    const $buttonUp = $("#moveUp").on("click", buttonUp)
    const $buttonDown = $("#moveDown").on("click", buttonDown)
}

$(main)


