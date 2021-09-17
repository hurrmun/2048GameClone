What is 2048?

2048 is a game played on a 4 x 4 grid of squares where you combine numbers to reach 2048. By using the arrow keys, you move blocks in the respective directions and when two blocks with similar values collide, they merge into another block that is double the value of original.

MVP

- 4 x 4 grid of tiles (that starts with 2 randomly filled tiles with values 2 or 4)
- Arrow keys move all the tiles in respective direction
  - If a tile collides with the edge it stops
  - If a tile collides with another tile it will:
    - Check if that tile has a similar value
    - If it does it will merge to form a tile with double the original value
    - If it doesn't it will stop
- Check if the game is over. Game over scenarios:
  - Win: player obtains the 2048 tile
  - Lose: all tiles have an adjacent tile that is not the same value as itself

Fleshing the game out

- Instructions on the game page
- Restart game button (that can be clicked at any time)
- Score tracker
- Mobile Integration with swipes instead of arrow key input
- Game can go beyond 2048 (will display a win screen with option to carry on)
- Animation when tiles are moved

A user should be able to:

- Start playing the game
- Restart the game at any point in time
- View a live update of the score
- Manipulate the tiles with inputs from their keyboard or phone
- Get a win screen when they get a 2048 tile
- Get a lose screen when all adjacent tiles are unique

Technology

- HTML 5
- CSS
- JavaScript ES6 (With jQuery)
