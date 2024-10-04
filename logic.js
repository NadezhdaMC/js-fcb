//variables - storage of values

let board;
let score = 0;
let rows = 4;
let columns = 4;

//if true no need to congratulate again
let is2048Exist = false; 
let is4096Exist = false;
let is8192Exist = false;

// x = 4
// y = 2
// x + y = 6

function setGame(){
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

// board is the backend board to design and 
//modify teh tiles of the frontend board.

//loop to chek the tiles
	for (let r=0; r<rows; r++){
		for(let c = 0; c<columns; c++){

			//create div element
			let tile = document.createElement("div");
			
			//assign an id based on the position of the tile
			tile.id = r.toString() + "-" + c.toString();
			
			//gets the number of the tile from the backend board
			let num = board[r][c];
			
			//function name
			updateTile(tile,num);
			document.getElementById("board").append(tile);
		}
	}
	setTwo();
	setTwo();
}

//This function is to update the color of the tile based
//on its num value.
function updateTile(tile,num){

	tile.innerText = "";
	tile.classList.value = "";

	//<div class="tile"></div>
	tile.classList.add("tile");

	if (num > 0 ){
		//<div class="tile">2</div>
		tile.innerText = num.toString();

		if (num < 8192){
			tile.classList.add("x" + num.toString());
		}
		else
		{
			tile.classList.add("x8192");
		}
	}
}

window.onload = function(){
	setGame();

}

function handleSlide(e){
	console.log(e.code);
	//e is the event of pressing the key.
	//code is the key pressed in that specific event.
	//if di arrow keys ang pressed, di gagana

	if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)){
		if (e.code == "ArrowLeft"){
			slideLeft();
			setTwo();
		}
		else if (e.code == "ArrowRight"){
			slideRight();
			setTwo();
		}
		else if (e.code == "ArrowUp"){
			slideUp();
			setTwo();
		}
		else if (e.code == "ArrowDown"){
			slideDown();
			setTwo();
		}
	}


	document.getElementById("score").innerText = score;

		setTimeout(()=>{
			checkWin();

		}, 100);


				

	if (hasLost() == true){
		setTimeout(() => {
			alert("Game over. You have lost the game. Game will restart");
			restartGame();
			alert("Click any arrow key to restart");
		}, 100);
	}	
}

 document.addEventListener("keydown", handleSlide);




//func filterZero ignores zero 
function filterZero(row){
	return row.filter(num => num != 0);
	
}
//func slide for merging
function slide(tiles){
	//[2 0 2 2] --> [ 2 2 2]
	tiles = filterZero(tiles);

	for (let i=0; i < tiles.length-1; i++){

		if (tiles[i]==tiles[i+1]){ //true
			tiles[i] = tiles[i]*2; // [4 2 2]
			tiles[i+1] = 0; //[4 0 2]

			score += tiles[i];
		}
	}

	tiles = filterZero(tiles); //[4 2]

	while(tiles.length < columns){
		tiles.push(0); //[4 2 0 0]
	}
	return tiles;
}
//slide func to merge adjacent tiles

function slideLeft(){
	for (let r=0; r<rows; r++){

		let row = board[r];
		row = slide(row);
		board[r] = row;

			for (let c=0; c<columns;c++){
				let tile = document.getElementById(r.toString() + "-" + c.toString());
				let num = board[r][c];
				updateTile(tile,num);
		}
	}
}

function slideRight(){
	for (let r=0; r<rows; r++){

		let row = board[r];

		row.reverse(); // 2 2 2 0 --> 0 2 2 2
		row = slide(row);
		row.reverse(); // 4 2 0 0 --> 0 0 2 4

		board[r] = row; 


			for (let c=0; c<columns;c++){
				let tile = document.getElementById(r.toString() + "-" + c.toString());
				let num = board[r][c];
				updateTile(tile,num);
		}
	}
}

function slideUp(){
	for (let c=0; c<columns; c++){

		let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
		col = slide(col);

	

	for (let r=0; r<rows;r++){
		board[r][c] = col[r];

		let tile = document.getElementById(r.toString() + "-" + c.toString());
		let num = board[r][c];
		updateTile(tile,num); // updates the color and number of the tiles
		}
	}
}


function slideDown(){
	for (let c=0; c<columns; c++){

		let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
		col.reverse();
		col = slide(col);
		col.reverse();

	for (let r=0; r<rows;r++){
		board[r][c] = col[r];

				let tile = document.getElementById(r.toString() + "-" + c.toString());
				let num = board[r][c];
				updateTile(tile,num); // updates the color and number of the tiles
		}
	}
}

function hasEmptyTile(){

for (let r=0; r<rows; r++){
		for(let c = 0; c<columns; c++){
			if(board[r][c] == 0){
				return true;
			}

		}
	}
	return false;
}

//set random two in random coordinates
function setTwo(){
	if(hasEmptyTile() == false){
		return;
	}

	let found = false;
	while(found == false){
		//generate random value base on the rows and columns value (0-3)
		let r = Math.floor(Math.random() * rows);//[random r]
		let c = Math.floor(Math.random() * columns);//[random c]

		//if (board[random r][random c] == 0)
		if(board[r][c] == 0){
			
			//if the tile is an empty tile, we convert the empty tile to 2
			board [r][c] = 2; //0 --> 2
			let tile = document.getElementById(r.toString() + "-" + c.toString());

			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;
		}
	}
}

function checkWin(){
	for (let r=0; r<rows; r++){
		for(let c = 0; c<columns; c++){
			
			//2048 congratulatory message
			if(board[r][c] == 2048 && is2048Exist == false){
				alert("You Win! You got 2048");
				is2048Exist = true;
			}
			
			//4096 congratulatory message
			else if(board[r][c] == 4096 && is4096Exist == false){
				alert("You Win! You are unstoppable at 4096! You are fantastically unstoppable!");
				is4096Exist = true;
			}

			//8192 congratulatory message
			else if(board[r][c] == 8192 && is8192Exist == false){
				alert("Victory! You have reached 8192! You are increadibly awesome!");
				is8192Exist = true;
			}
		}
	}
}

function hasLost(){

	for (let r=0; r<rows; r++){
		for(let c = 0; c<columns; c++){
			
			if (board[r][c] == 0){
				return false;
			}
	//const to return true should be inside the loop
	const currentTile = board[r][c];

		if (
			//if selcted tile is equal to the uppertile. if may match sa uppertile.
			r > 0 && board[r-1][c] === currentTile || //uppertile
			//to check if currenttile match sa lowertile or last row
			r < 3 && board[r+1][c] === currentTile || // lowertile
			//current tile match sa lefttile checking
			c > 0 && board[r][c-1] === currentTile || //lefttile
			//current tile match sa righttile cheking
			c < 3 && board [r][c+1] === currentTile //righttile
			){
			return false;
		//triple equal is stricter in data types.
		}
		// no possible moves = meaning true, the user has lost

		}
	}

	return true;
	
}


function restartGame(){
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	
	score = 0;
	setTwo();

}

// function hasLost(){
	
// 	let count = 0;


// 	for (let r=0; r<rows; r++){
// 		for(let c = 0; c<columns; c++){
			
// 			if (board[r][c] == 0){
// 				return false;
// 			}
// 			else{
// 				count++;
// 			}

// 		}
// 		if(count==16){
// 			return true;
// 		}
// 	}

// 	const currentTile = board[r][c];

// 	if (
// 		//if selcted tile is equal to the uppertile. if may match sa uppertile.
// 		r > 0 && board[r-1][c] === currentTile || //uppertile
// 		//to check if currenttile match sa lowertile or last row
// 		r < 3 && board[r+1][c] === currentTile || // lowertile
// 		//current tile match sa lefttile checking
// 		c > 0 && board[r][c-1] === currentTile || //lefttile
// 		//current tile match sa righttile cheking
// 		c < 3 && board [r][c+1] === currentTile //righttile
// 		){
// 		return false;
// 	//triple equal is stricter in data types.
// 	}
// 	// no possible moves = meaning true, the user has lost
// 	return true;
// }




