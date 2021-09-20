//* Write Functions here

// display: $('.tilerow').eq(0).children().eq(0)
//* board state
const board = [
    [ 0, 0, 0, 0 ], 
    [ 2, 2, 2, 2 ], 
    [ 0, 2, 0, 0 ], 
    [ 16, 0, 0, 2 ]
] 
// to select a tile you would need 2 parameters, the row and column and call board[row][column]


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

//* move version 1
// const moveTilesLeft = () => {
//     for (let i = 0; i < board.length; i++ ) {
//         for (let j = 0; j < board[i].length; j++) {
//             //* checks if there is a value on the board and if it is the first tile
//             if (board[i][j] && j !== 0) {
//                 let x = board[i].splice(j, 1, board[i][j + 1])
//                 board[i][j-1] = x[0]
//             }
//         }
//     }
//     renderBoard()
// }

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
        for (let j = 1; j < 4; j++) {
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
    for (let i = 1; i < 4; i++) {
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
                // } else if (!board[i-1][j]) {
                //     let x = board[i].splice(j, 1, 0)
                //     board[i-1][j] = x[0]
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



const generateTile = () => {

}


//* Run Functions here
const main = () => { 
    const $boardDiv = $('#gameboard')
    $(document).on("keydown", (event) => {
        if (event.which === 37) { //? left
            shiftTilesLeft();
            mergeTilesLeft();
            shiftTilesLeft();
            renderBoard();
        } else if (event.which === 39) { //? right
            shiftTilesRight();
            mergeTilesRight();
            shiftTilesRight();
            renderBoard();
        } else if (event.which === 38) { //? up
            shiftTilesUp();
            mergeTilesUp();
            shiftTilesUp();
            renderBoard();
        } else if (event.which === 40) { //? down
            shiftTilesDown();
            mergeTilesDown();
            shiftTilesDown();
            renderBoard();
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