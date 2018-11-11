<DOCTYPE HTML>
<html>
<head>
	<title> Крестики-нолики </title>
	<meta charset="utf-8">
	<style>
			#wrapper {
				height: 306px;
				width: 306px;
				border: 1px solid black;
				margin: 0 auto;
				font-size: 0;
			}
			.cell {
				height: 100px;
				width: 100px;
				line-height: 100px;
				text-align: center;
				font-family: arial;
				display: inline-block;
				font-size: 26px;
				border: 1px solid #000;
				cursor: pointer;
				vertical-align: middle;
				transition: background .1s;
			}
			.cell:hover {
				background: #eee;
			}
			#statistics {
				position: absolute;
				right: 10px;
				top: 10px;
				border: 1px solid;
				padding: 0 20px;
				display: inline-block;
			}
			p {
				text-align: center;
			}
			button {
				margin: 0 auto;
				display: block;
			}
	</style>
</head>
<body>
	<div id='wrapper'>
		<div class='cell' value='0'> </div>
		<div class='cell' value='1'> </div>
		<div class='cell' value='2'> </div>
		<div class='cell' value='3'> </div>
		<div class='cell' value='4'> </div>
		<div class='cell' value='5'> </div>
		<div class='cell' value='6'> </div>
		<div class='cell' value='7'> </div>
		<div class='cell' value='8'> </div>
	</div>
	<div id='statistics'>
		<p> Выиграл X: <span id='winnerX'> 0 </span></p>
		<p> Выиграл O: <span  id='winnerO'> 0 </span></p>
		<p> Ничья : <span id='draw'> 0 </span></p>
	</div>
	<p id='message'> Ходит игрок: X  </p>
	<button> Начать сначала </button>
	<script>
		let cell = document.getElementsByClassName('cell');
		let winnerX = document.getElementById('winnerX');
		let winnerO = document.getElementById('winnerO');
		let draw = document.getElementById('draw');
		let message  = document.getElementById('message');
		let reset = document.querySelector('button');
		
		for (let i = 0; i < cell.length; i++) {
			cell[i].addEventListener('click', letsPlay);
		}
		reset.onclick = startNewGame;

		let winIndex = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
			arrayX = [];
			arrayO = [];
			player = 'X';
			step = 0;
			inStatisticsX = 0;
			inStatisticsO = 0;
			inStatisticsDraw = 0;

		function letsPlay() {			
			let num = +this.getAttribute('value');	
			if (!this.innerText) {	
				this.innerHTML = player;
				step++
				changePlayer();
				if (this.innerHTML == 'X') {
					arrayX.push(num);
				}
				else {
					arrayO.push(num);
				}
				if (arrayX.length > 2 || arrayO.length > 2) {
					checkOnTheWinner(winIndex, arrayX);
					checkOnTheWinner(winIndex, arrayO);
					if (checkOnTheWinner(winIndex, arrayX) || checkOnTheWinner(winIndex, arrayO)) {
						message.innerHTML = 'Победитель: ' + this.innerHTML; 
						for (let k = 0; k < cell.length; k++) {
							cell[k].removeEventListener('click', letsPlay);
						}
						if (player !== 'X') {
							inStatisticsX++;
						}
						else {
							inStatisticsO++;
						}
						step = 0;
					}
				}
				if (step == 9) {
					message.innerHTML = 'Ничья';
					inStatisticsDraw++;
				}
				displayStatistics();
			}	
		}

		function changePlayer() {
			if (player === 'X') {
				player = 'O';
			}
			else {
				player = 'X';
			}
			message.innerHTML = 'Ходит игрок: ' + player;
		}

		function checkOnTheWinner(array, player) {
			let count = 0;
			for (let i = 0; i < array.length; i++) {
				let winner = array[i];
				for (let j = 0; j < player.length; j++) {
					if (winner.includes(player[j])) {
						count++;
						if (count == 3) {
							return true;
						}
					}
				}
				count = 0; 
			}
		}

		function startNewGame() {
			for (let i = 0; i < cell.length; i++) {
				cell[i].innerHTML = '';
			}
			arrayX = [];
			arrayO = [];
			changePlayer();
			step = 0;
			for (let j = 0; j < cell.length; j++) {
				cell[j].addEventListener('click', letsPlay);
			}
		}

		function displayStatistics () {
			winnerX.innerHTML = inStatisticsX;
			winnerO.innerHTML = inStatisticsO;
			draw.innerHTML = inStatisticsDraw;
		}
	</script>
</body>
</html>