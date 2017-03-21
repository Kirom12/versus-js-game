$(function() {
	//Create players
	var players = [new Character("Régis le juste"), new Character("Robert le fourbe")];

	let contentDiv = $("#content");
	let playerCard, currentPlayer;

	//Initialize board, display the two players
	for (let i in players) {
		playerCard = `
			<div id="player_`+i+`" class="col-md-6 player-zone">
				<h2>`+players[i].name+`</h2>
				<div class="progress">
					<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
					`+players[i].hp+`/`+players[i].maxHp+`
					</div>
				</div>
				<ul>
					<li>Constitution : `+players[i].constitution+`</li>
					<li>Force : `+players[i].strength+`</li>
					<li>Intelligence : `+players[i].intelligence+`</li>
					<li>Sagesse : `+players[i].wisdom+`</li>
				</ul>

				<ul>
					<li>Max HP : `+players[i].maxHp+`</li>
					<li>MOD attaque : `+players[i].modAttack+`</li>
					<li>MOD intell : `+players[i].modIntell+`</li>
					<li>MOD sagesse : `+players[i].modWisdom+`</li>
				</ul>

				<h3>Actions</h3>
				<div class="text-center">
					<button id="action_attack" class="btn btn-default" type="submit">Attaque !!1 (1d8`+players[i].modAttack+`)</button>
					<button id="action_defense" class="btn btn-default" type="submit">Défense (+5)</button>
					<button id="action_heal" class="btn btn-default" type="submit">Soin (heal kits : `+players[i].healKits+`)</button>
				</div>
			</div>
		`;

		$(contentDiv).append(playerCard);

		players[i].toString();
	}

	//Start first turn
	//Use intell for initiative
	if (players[0].intelligence >= players[1].intelligence) {
		currentPlayer = players[0];
	} else {
		currentPlayer = players[1];
	}

	while (players[0].hp > 0 && players[1].hp > 0) {
		
	}



});