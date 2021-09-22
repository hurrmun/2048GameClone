//* Write Functions here

// display: $('.tilerow').eq(0).children().eq(0)
//* board state
const board = [
    [ 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0 ]
] 
// to select a tile you would need 2 parameters, the row and column and call board[row][column]

let isGameOver = false
let maybeGameOver = 0
// 4 counts for row
// 12 counts for column
// if 16 is reached, it means all adjacent tiles are unique

//! WIP 
const gameOver = () => {
    $(document).off("keydown")
    $('.container').append($('<h2>').text("You Lose :("))
    const $restartButton = $('<button>').addClass("restart").text("Restart Game")
    $('.container').append($restartButton)
}

const youWin = () => {
    $(document).off("keydown")
    $('.container').append($('<h2>').text("You Win :)"))
    const $restartButton = $('<button>').addClass("restart").text("Restart Game")
    $('.container').append($restartButton)
    const $continueButton = $('<button>').addClass("restart").text("Continue Playing")
    $('.container').append($continueButton)
}

const check2048 = (number) => number === 2048

const checkGameOver = () => {
    const allTiles = board[0].concat(board[1], board[2], board[3])
    if (isStaticLeft() && isStaticRight() && isStaticUp() && isStaticDown()) {
        isGameOver = true
        return gameOver()
    } else if (allTiles.some(check2048)) {
        return youWin()
    }
    return isGameOver = false
}

const restartGame = () => {
    for (let i = 0; i < board.length; i++) {
        board[i] = board[i].map((number) => number = 0)
    }
    isGameOver = false
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
    for (let i = 3; i >= 0; i--) {
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
            //* checks if there is a value on the board and if it is the first tile
            if (board[i][j] && i !== 0) {
                //* save value of that number
                //* if the above row's number is 0 shift it up
                if (i > 2 && !board[i-3][j]) {
                    let x = board[i].splice(j, 1, 0)
                    board[i-3][j] = x[0]
                } else if (i > 1 && !board[i-2][j]) {
                    let x = board[i].splice(j, 1, 0)
                    board[i-2][j] = x[0]
                } else if (i > 0 && !board[i-1][j]) {
                    let x = board[i].splice(j, 1, 0)
                    board[i-1][j] = x[0]
                } 
            }
        }
    }
}

const shiftTilesDown = () => {
    for (let i = 0; i < 3; i++ ) {
        for (let j = 0; j < board[i].length; j++) {
            //* checks if there is a value on the board and if it is the first tile
            if (board[i][j] && i !== 3) {
                //* save value of that number
                //* if the above row's number is 0 shift it up
                //? 
                if (i < 1 && !board[i+3][j]) {
                    let x = board[i].splice(j, 1, 0)
                    board[i+3][j] = x[0]
                //?
                } else if (i < 2 && !board[i+2][j]) {
                    let x = board[i].splice(j, 1, 0)
                    board[i+2][j] = x[0]
                //? 
                } else if (i < 3 && !board[i+1][j]) {
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
    } else {
        board[y][x] = randomNewTile[1]
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




//* Run Functions here
const main = () => { 
    startGame()
    $(document).on("keydown", (event) => {
        if (event.which === 37) { //? left
            if (isStaticLeft()) {
                console.log("Invalid move!")
            } else {
                moveTilesLeft()
                checkGameOver()
            }
        } else if (event.which === 39) { //? right
            if (isStaticRight()) {
                console.log("Invalid move!")
            } else {
                moveTilesRight()
                checkGameOver()
            }
        } else if (event.which === 38) { //? up
            if (isStaticUp()) {
                console.log("Invalid move!")
            } else {
                moveTilesUp()
                checkGameOver()
            }
        } else if (event.which === 40) { //? down
            if (isStaticDown()) {
                console.log("Invalid move!")
            } else {
                moveTilesDown()
                checkGameOver()
            }
        }
    })
    $(".restart").on("click", restartGame)
    
    renderBoard()
    // console.log($('.tilerow').eq(0).children().eq(0).text())
    // const $row0 = $('.tilerow').eq(0)
    // const $row0tiles = $row0.children()
    // const $tile1 = $row0tiles.eq(0)
    // console.log($tile1.text())
    // test()
}

$(main)

//keydown is better for arrow keys

