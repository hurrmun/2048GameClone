//* Write Functions here

// display: $('.tilerow').eq(0).children().eq(0)
//* board state
const board = [
    [ 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0 ], 
    [ 0, 0, 0, 0 ], 
    [ 4, 0, 0, 0 ]
] 
// to select a tile you would need 2 parameters, the row and column and call board[row][column]

let isGameOver = false
let maybeGameOver = 0
// 4 counts for row
// 12 counts for column
// if 16 is reached, it means all adjacent tiles are unique


const gameOver = () => {

}

const checkGameOver = () => {
    checkColumn(board)
    for (let i = 0; i < board.length; i++ ) {
        //* check if all rows are still in play
        checkRow(board[i])
        //* check if all columns are still in play
    }
    if (maybeGameOver === 16) {
        isGameOver = true
        return gameOver()
    }
    return isGameOver = false
}

const checkRow = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0 || arr[i] === arr[i+1]) {
            return isGameOver = false
        }
    }
    return maybeGameOver += 1
}

//? Accepts an array of arrays
const checkColumn = (arr) => {
    //* checking all the numbers at once instead of 1 by 1
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === 0 || arr[i][j] === arr[i + 1][j]) {
                isGameOver = false
            }
            maybeGameOver += 1
        }
    }
}


//* update user's display to reflect board state
const renderBoard = () => {
    for (let i = 0; i < board.length; i++ ) {
        for (let j = 0; j < board[i].length; j++) {
            //* if there is no value or if false-y
            if (!board[i][j]) {
                $('.tilerow').eq(i).children().eq(j).text("-")
            } else {
                $('.tilerow').eq(i).children().eq(j).text(board[i][j])
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
        for (let j = 3; j > 0; j--) {
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
const randomNewTile = [2, 4]

const random1to4 = () => Math.floor(Math.random()*4)
const random1to2 = () => Math.floor(Math.random()*2)

const generateTile = () => {
    let y = random1to4()
    let x = random1to4()
    //* when selected tile is filled, find a new empty tile
    while (board[y][x] !== 0) {
        y = random1to4()
        x = random1to4()
    }
    board[y][x] = randomNewTile[random1to2()]
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
        for (let j = 0; j < board[i].length; j++) {
            //? if current tile is a 0 and the next tile has a value not OR if two tiles have the same value
            if (board[i][j] === 0 && board[i][j+1] || board[i][j] === board[i][j+1] && board[i][j] !== 0) {
                console.log(board[i][j], board[i][j+1])
                return false
            } 
        }
    }
    return true
}

const isStaticLeft = () => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            //? if current tile is a 0 and the next tile has a value not OR if two tiles have the same value
            if (board[i][j] === 0 && board[i][j+1] || board[i][j] === board[i][j+1] && board[i][j] !== 0) {
                console.log(board[i][j], board[i][j+1])
                return false
            } 
        }
    }
    return true
}






//* Run Functions here
const main = () => { 
    // startGame()
    $(document).on("keydown", (event) => {
        if (event.which === 37) { //? left
            if (!isStaticLeft()) {
                moveTilesLeft()
                checkGameOver()
            }
        } else if (event.which === 39) { //? right
            moveTilesRight()
            checkGameOver()
        } else if (event.which === 38) { //? up
            moveTilesUp()
            checkGameOver()
        } else if (event.which === 40) { //? down
            moveTilesDown()
            checkGameOver()
        }
    })
    
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