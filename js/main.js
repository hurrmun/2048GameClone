//* Write Functions here

// display: $('.tilerow').eq(0).children().eq(0)
//* board state
const board = [
    [ 2, 0, 0, 0 ], 
    [ 0, 0, 0, 0 ], 
    [ 0, 0, 4, 0 ], 
    [ 0, 0, 0, 0 ]
] 
// to select a tile you would need 2 parameters, the row and column and call board[row][column]


//* update user's display to reflect board state
const renderBoard = () => {
    for (let i = 0; i < board.length; i++ ) {
        for (let j = 0; j < board[i].length; j++) {
            $('.tilerow').eq(i).children().eq(j).text(board[i][j])
        }
    }
}




//* Run Functions here
const main = () => { 
    
    
    
    renderBoard()
    // console.log($('.tilerow').eq(0).children().eq(0).text())
    // const $row0 = $('.tilerow').eq(0)
    // const $row0tiles = $row0.children()
    // const $tile1 = $row0tiles.eq(0)
    // console.log($tile1.text())
    // test()
}

$(main)