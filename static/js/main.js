$(function() {

	//Create players
	var players = [new Character(0, "Régis le juste"), new Character(1, "Robert le fourbe")];

	let contentDiv = $("#content");
	let playerCard, currentPlayer, passivePlayer, currentPlayerDiv, tmp;

	let newTurn = function() {
		currentPlayerDiv = $("#player_"+currentPlayer.id);
		passivePlayerDiv = $("#player_"+passivePlayer.id);

		//console.log("Courant : " + currentPlayer.name);	
		//console.log("Passif : " + passivePlayer.name);

		//console.log(currentPlayerDiv);

		currentPlayer.find(".progress-bar").html(passivePlayer.hp+"/"+passivePlayer.maxHp);
		passivePlayer.find(".progress-bar").html(currentPlayer.hp+"/"+currentPlayer.maxHp);

		

		//Higlight current player and disable buttons
		passivePlayerDiv.removeClass("current-player");
		passivePlayerDiv.addClass("passive-player");
		currentPlayerDiv.removeClass("passive-player");
		currentPlayerDiv.addClass("current-player");

		//Set Events
		$(".action_attack").on("click", currentPlayer.attack(passivePlayer), endTurn);
		$(".action_defense").on("click", currentPlayer.defense(), endTurn);
		$(".action_heal").on("click", currentPlayer.heal(), endTurn);
	}

	//Callback function
	let endTurn = function() {
		if (players[0].hp > 0 && players[1].hp > 0) {
			updatePlayer();

			tmp = currentPlayer;
			currentPlayer = passivePlayer;
			passivePlayer = tmp;

			//Disable click actions
			$(".action_attack").off("click");
			$(".action_defense").off("click");
			$(".action_heal").off("click");

			newTurn();
		} else {

		}
	}

	//Update player information (hp, ...)
	let updatePlayer = function() {
		console.log(currentPlayer.name + " : " + currentPlayer.hp);
		console.log(passivePlayer.name + " : " + passivePlayer.hp);

		//refresh hp

	}

	//Initialize board, display the two players
	for (let i in players) {
		playerCard = `
			<div id="player_`+players[i].id+`" class="col-md-6 player-zone">
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
				<div class="text-center button">
					<button class="action_attack" class="btn btn-default" type="submit">Attaque !!1 (1d8`+players[i].modAttack+`)</button>
					<button class="action_defense" class="btn btn-default" type="submit">Défense (+5)</button>
					<button class="action_heal" class="btn btn-default" type="submit">Soin (heal kits : `+players[i].healKits+`)</button>
				</div>
				<div class="alert-turn">Votre tour !</div>
			</div>
		`;

		$(contentDiv).append(playerCard);

		//players[i].toString();
	}

	//Use intell for initiative
	if (players[0].intelligence >= players[1].intelligence) {
		currentPlayer = players[0];
		passivePlayer = players[1];

	} else {
		currentPlayer = players[1];
		passivePlayer = players[0];
	}

	//Set first turn
	newTurn();

});