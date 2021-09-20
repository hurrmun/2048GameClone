//* Write Functions here

// .children(".tile")

const board = [
    [ 
        {tile: 0, display: $('.tilerow').eq(0).children().eq(0), value: 0}, 
        {tile: 1, display: $('.tilerow').eq(0).children().eq(1), value: 0}, 
        {tile: 2, display: $('.tilerow').eq(0).children().eq(2), value: 0}, 
        {tile: 3, display: $('.tilerow').eq(0).children().eq(3), value: 0} 
    ], [ 
        {tile: 0, display: $('.tilerow').eq(1).children().eq(0), value: 0}, 
        {tile: 1, display: $('.tilerow').eq(1).children().eq(1), value: 0}, 
        {tile: 2, display: $('.tilerow').eq(1).children().eq(2), value: 0}, 
        {tile: 3, display: $('.tilerow').eq(1).children().eq(3), value: 0} 
    ], [ 
        {tile: 0, display: $('.tilerow').eq(2).children().eq(0), value: 0}, 
        {tile: 1, display: $('.tilerow').eq(2).children().eq(1), value: 0}, 
        {tile: 2, display: $('.tilerow').eq(2).children().eq(2), value: 0}, 
        {tile: 3, display: $('.tilerow').eq(2).children().eq(3), value: 0} 
    ], [ 
        {tile: 0, display: $('.tilerow').eq(2).children().eq(0), value: 0}, 
        {tile: 1, display: $('.tilerow').eq(2).children().eq(1), value: 0}, 
        {tile: 2, display: $('.tilerow').eq(2).children().eq(2), value: 0}, 
        {tile: 3, display: $('.tilerow').eq(2).children().eq(3), value: 0} 
    ]
]









//* Run Functions here
const main = () => {
    // console.log($('.tilerow').eq(0).children().eq(0).text())
    // const $row0 = $('.tilerow').eq(0)
    // const $row0tiles = $row0.children()
    // const $tile1 = $row0tiles.eq(0)
    // console.log($tile1.text())
    console.log(board[0][1].display.text())
}

$(main)