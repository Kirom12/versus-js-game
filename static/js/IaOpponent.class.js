class IaOpponent extends Character {
	constructor(id, name) {
		super(id, name);
	}

	selectAction(target) {

		if (target.history[target.history.length - 1] == "heal" && this.hp < 20) {
			return this.heal();
		}
		else if (this.hp < 10 && this.healKits > 0) {
			return this.heal();
		} else if (target.history[target.history.length - 1 ] == "defensive") {
			if (target.history[target.history.length - 2] == "defensive") {
				return this.attack(target);
			} else {
				return this.defensive();		
			}
		} else {
			return this.attack(target);
		}
	}

	toString() {
		console.log("Je suis une IA AHAH");

		super.toString();
	}
}