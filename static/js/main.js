$(function() {

	const Game = {
		players: [],
		contentDiv: $("#content"),
		currentPlayer: null, passivePlayer: null,
		currentPlayerDiv: null, passivePlayerDiv: null,
		solo: false,
		firstIa: true,

		init() {
			//Init character or ia
			this.createCharacter();

			//Initialize board, display the two players
			for (let i in this.players) {
				let playerCard = `
					<div id="player_`+this.players[i].id+`" class="col-md-6 player-zone">
						<h2>`+this.players[i].name+`</h2>
						<div class="progress">
							<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
							`+this.players[i].hp+`/`+this.players[i].maxHp+`
							</div>
						</div>
						<ul>
							<li>Constitution : `+this.players[i].constitution+`</li>
							<li>Force : `+this.players[i].strength+`</li>
							<li>Intelligence : `+this.players[i].intelligence+`</li>
							<li>Sagesse : `+this.players[i].wisdom+`</li>
						</ul>

						<ul>
							<li>Max HP : `+this.players[i].maxHp+`</li>
							<li>MOD attaque : `+this.players[i].modAttack+`</li>
							<li>MOD intell : `+this.players[i].modIntell+`</li>
							<li>MOD sagesse : `+this.players[i].modWisdom+`</li>
						</ul>

						<h3>Actions</h3>
						<div class="text-center button">
							<button class="action_attack" class="btn btn-default" type="submit">Attaque ! (1d8`+this.players[i].modAttack+`)</button>
							<button class="action_defense" class="btn btn-default" type="submit">Défense (+5)</button>
							<button class="action_heal" class="btn btn-default" type="submit">Soin (heal kits : `+this.players[i].healKits+`)</button>
							<button class="action_ulti" class="btn btn-default" type="submit">?</button>
						</div>
						<div class="alert-turn">Votre tour !</div>
					</div>
				`;

				$(this.contentDiv).append(playerCard);

				//players[i].toString();
			}

			//Set first turn
			this.newTurn();
		},

		setBaseUi() {
			var _this = this;

			$("#mode_selector").on("click", function() {
				if (_this.solo) {
					_this.solo = false;
					$(this).html("Solo");
					$("h1").html("Versus Multi");
				} else {
					_this.solo = true;
					$(this).html("Multi");
					$("h1").html("Versus Solo");
				}


				$(_this.contentDiv).empty();
				_this.init();
			});
		},

		createCharacter() {
			if (this.solo) {
				if (this.firstIa) {
					this.players[0] = new MainCharacter(0, "Régis le juste");	
				}
				this.players[1] = new IaOpponent(1, "Méchante IA");
			} else {
				this.players[0] = new MainCharacter(0, "Régis le juste");
				this.players[1] = new MainCharacter(1, "Robert le fourbe");
			}

			//Set initiative, Use intell for initiative
			if (this.firstIa) {
				if ((this.players[0].intelligence <= this.players[1].intelligence) && !this.solo) {
					this.currentPlayer = this.players[1];
					this.passivePlayer = this.players[0];
				} else {
					this.currentPlayer = this.players[0];
					this.passivePlayer = this.players[1];
				}
			}
		},

		newTurn() {

			//REFACTOR THIS SHIT !
			this.currentPlayerDiv = $("#player_"+this.currentPlayer.id);
			this.passivePlayerDiv = $("#player_"+this.passivePlayer.id);
			//****

			//Update player UI
			this.updatePlayerUi(this.currentPlayerDiv, this.passivePlayerDiv);

			//Higlight current player and disable buttons
			this.passivePlayerDiv.removeClass("current-player");
			this.passivePlayerDiv.addClass("passive-player");

			var _this = this;

			//If solo mode, ia automatic turn
			if (this.solo && this.currentPlayer.id === 1) {
				setTimeout(function() {
					_this.log(_this.currentPlayer.selectAction(_this.passivePlayer));
					_this.endTurn();
				}, 1000)
			} else {
				this.currentPlayerDiv.removeClass("passive-player");
				this.currentPlayerDiv.addClass("current-player");

				//Set Events
				$(".action_attack").on("click", function(){
					_this.log(_this.currentPlayer.attack(_this.passivePlayer));
					_this.endTurn();
				});
				$(".action_ulti").on("click", function(){
					_this.log(_this.currentPlayer.attackUlti(_this.passivePlayer));
					_this.endTurn();
				});
				$(".action_defense").on("click", function() {
					_this.log(_this.currentPlayer.defensive());
					_this.endTurn();
				});
				$(".action_heal").on("click", function() {
					_this.log(_this.currentPlayer.heal());
					_this.endTurn();
				});
			}
		},

		endTurn() {
			if (this.players[0].hp > 0 && this.players[1].hp > 0) {

				//Remove defense bonus
				this.passivePlayer.defense = 0;

				//Switch players turn
				let tmp = this.currentPlayer;
				this.currentPlayer = this.passivePlayer;
				this.passivePlayer = tmp;

				//Disable click actions
				$(".action_attack").off("click");
				$(".attack_ulti").off("click");
				$(".action_defense").off("click");
				$(".action_heal").off("click");

				this.newTurn();
			} else {

				if (this.solo) {
					if (this.currentPlayer.id == 0) {
						this.log("Vous avez vaincu une IA !");

						this.replaceIa();
					} else {
						this.log("Vous avez perdu !");
					}
					this.updatePlayerUi(this.currentPlayerDiv, this.passivePlayerDiv);
				} else {
					if (this.players[0].hp > 0) {
						log(this.players[0].name + " a gagné !");
					} else {
						log(this.players[1].name + " a gagné !");
					}
				}
			}
		},

		replaceIa() {
			this.firstIa = false;

			this.init();
			this.updatePlayerUi(this.currentPlayerDiv, this.passivePlayerDiv);
		},

		updatePlayerUi(currentPlayerDiv, passivePlayerDiv) {
			passivePlayerDiv.find(".progress-bar").html(this.passivePlayer.hp+"/"+this.passivePlayer.maxHp);
			currentPlayerDiv.find(".progress-bar").html(this.currentPlayer.hp+"/"+this.currentPlayer.maxHp);

			passivePlayerDiv.find(".progress-bar").attr("style", "width:"+(this.passivePlayer.hp/this.passivePlayer.maxHp)*100+"%;");
			currentPlayerDiv.find(".progress-bar").attr("style", "width:"+(this.currentPlayer.hp/this.currentPlayer.maxHp)*100+"%;");

			passivePlayerDiv.find(".action_heal").html("Soin (heal kits : "+this.passivePlayer.healKits+")");
		},

		//Display all actions in log div
		log(message) {
			$("#log").prepend(message + "<br>");
		}
	}

	Game.setBaseUi();
	Game.init();
});