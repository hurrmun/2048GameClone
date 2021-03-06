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
let isGameWon = false

const updateHighScore = () => {
    if (score > highScore) {
        highScore = score
        $(".highScore").text(highScore)
    }
}

const gameOver = () => {
    $(".continue").remove()
    stopControls()
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
    const allTiles = board[0].concat(board[1], board[2], board[3])
    if (isStaticLeft() && isStaticRight() && isStaticUp() && isStaticDown()) {
        return gameOver()
    } else if (allTiles.some(check2048)) {
        if (isGameWon) {
            return null
        } else {
            return youWin()
        }
    }
}

const restartGame = () => {
    for (let i = 0; i < board.length; i++) {
        board[i] = board[i].map((number) => number = 0)
    }
    isGameWon = false
    score = 0
    $(".continue").remove()
    stopControls()
    startControls()
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
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length - 1; j++) {
            if (board[i][j] === board[i][j + 1]) {
                board[i][j] = board[i][j] * 2
                board[i][j+1] = 0
            }
        }
    }
}

const mergeTilesRight = () => {
    for (let i = 0; i < board.length; i++) {
        for (let j = board[i].length - 1; j > 0; j--) {
            if (board[i][j] === board[i][j - 1]) {
                board[i][j] = board[i][j] * 2
                board[i][j-1] = 0
            }
        }
    }
}

const mergeTilesUp = () => {
    for (let i = 0; i < board.length - 1; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === board[i + 1][j]) {
                board[i][j] = board[i][j] * 2
                board[i + 1][j] = 0
            }
        }
    }
}

const mergeTilesDown = () => {
    for (let i = board.length - 1; i > 0; i--) {
        for (let j = 0; j < board[i].length; j++) {
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
            //? if b is 0 sort a before b
            if (b === 0) {
                return -1
            }
        })
    }
}


const shiftTilesRight = () => {
    for (let i = 0; i < board.length; i++ ) {
        //* sorts the board so 0 is pushed to the right
        board[i].sort((a, b) => {
            //? if a is 0 sort a before b
            if (a === 0) {
                return -1
            }
        })
        
    }
}


const shiftTilesUp = () => {
    for (let i = 1; i < board.length; i++ ) {
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
}

const moveTilesRight = () => {
    shiftTilesRight();
    mergeTilesRight();
    shiftTilesRight();
}

const moveTilesUp = () => {
    shiftTilesUp();
    mergeTilesUp();
    shiftTilesUp();
}

const moveTilesDown = () => {
    shiftTilesDown();
    mergeTilesDown();
    shiftTilesDown();
}


//* Generate a random tile on an empty space
const generateTile = () => {
    const arr = board[0].concat(board[1], board[2], board[3],)
    const zeroIndex = arr.map((zeroTile, index) => {
        if (zeroTile === 0) {
            return index
        } else {
            return null
        }
    })
    const zeroIndexArr = zeroIndex.filter(element => element !== null)
    const randomZeroIndex = Math.floor(Math.random() * zeroIndexArr.length)
    const randomZeroTileIndex = zeroIndexArr[randomZeroIndex]

    const randomRow = Math.floor(randomZeroTileIndex/4)
    const randomColumn = randomZeroTileIndex % 4
    const randomNewTile = [2, 4]
    const random1to10 = () => Math.floor(Math.random()*10)
    if (random1to10() < 9) {
        board[randomRow][randomColumn] = randomNewTile[0]
        score += 10
    } else {
        board[randomRow][randomColumn] = randomNewTile[1]
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
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length - 1; j++) {
            //? if current tile is a 0 and the next tile has a value not OR if two tiles have the same value
            if (board[i][j] === 0 && board[i][j+1] || board[i][j] === board[i][j+1] && board[i][j] !== 0) {
                return false
            } 
        }
    }
    return true
}

const isStaticRight = () => {
    for (let i = 0; i < board.length; i++) {
        for (let j = board[i].length - 1; j > 0; j--) {
            //? if current tile is a 0 and the next tile has a value not OR if two tiles have the same value
            if (board[i][j] === 0 && board[i][j-1] || board[i][j] === board[i][j-1] && board[i][j] !== 0) {
                return false
            } 
        }
    }
    return true
}


const isStaticUp = () => {
    for (let i = 0; i < board.length - 1; i++) {
        for (let j = 0; j < board[i].length; j++) {
            //? if current tile is a 0 and the next tile has a value not OR if two tiles have the same value
            if (board[i][j] === 0 && board[i+1][j] || board[i][j] === board[i+1][j] && board[i][j] !== 0) {
                return false
            } 
        }
    }
    return true
}

const isStaticDown = () => {
    for (let i = board.length - 1; i > 0; i--) {
        for (let j = 0; j < board[i].length; j++) {
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
                generateTile()
                renderBoard()
                updateHighScore()
                checkGameOver()
            }
        } else if (event.which === 39 || event.which === 68) { //? right
            if (isStaticRight()) {
                console.log("Invalid move!")
            } else {
                moveTilesRight()
                generateTile()
                renderBoard()
                updateHighScore()
                checkGameOver()
            }
        } else if (event.which === 38 || event.which === 87) { //? up
            if (isStaticUp()) {
                console.log("Invalid move!")
            } else {
                moveTilesUp()
                generateTile()
                renderBoard()
                updateHighScore()
                checkGameOver()
            }
        } else if (event.which === 40 || event.which === 83) { //? down
            if (isStaticDown()) {
                console.log("Invalid move!")
            } else {
                moveTilesDown()
                generateTile()
                renderBoard()
                updateHighScore()
                checkGameOver()
            }
        }
    })
    $("#moveLeft").on("click", buttonLeft)
    $("#moveRight").on("click", buttonRight)
    $("#moveUp").on("click", buttonUp)
    $("#moveDown").on("click", buttonDown)
}

const stopControls = () => {
    $(document).off("keydown")
    $("#moveLeft").off("click", buttonLeft)
    $("#moveRight").off("click", buttonRight)
    $("#moveUp").off("click", buttonUp)
    $("#moveDown").off("click", buttonDown)
}

const buttonLeft = () => {
    if (isStaticLeft()) {
        console.log("Invalid move!")
    } else {
        moveTilesLeft()
        generateTile()
        renderBoard()
        checkGameOver()
        updateHighScore()
    }
}

const buttonRight = () => {
    if (isStaticRight()) {
        console.log("Invalid move!")
    } else {
        moveTilesRight()
        generateTile()
        renderBoard()
        checkGameOver()
        updateHighScore()
    }
}

const buttonUp = () => {
    if (isStaticUp()) {
        console.log("Invalid move!")
    } else {
        moveTilesUp()
        generateTile()
        renderBoard()
        checkGameOver()
        updateHighScore()
    }
}

const buttonDown = () => {
    if (isStaticDown()) {
        console.log("Invalid move!")
    } else {
        moveTilesDown()
        generateTile()
        renderBoard()
        checkGameOver()
        updateHighScore()
    }
}

//* Run Functions here
const main = () => { 
    startGame()
    startControls()
    renderBoard()
    const $newGameButton = $(".restart").on("click", restartGame)
}

$(main)


