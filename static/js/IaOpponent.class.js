class IaOpponent extends Character {
	constructor(id, name) {
		super(id, name);
	}

	selectAction(target) {
		console.log(this.hp);

		if (this.hp < 10 && this.healKits > 0) {
			return this.heal();
		} else if (target.defense > 0) {
			return this.defensive();
		} else {
			return this.attack(target);
		}
	}

	toString() {
		console.log("Je suis une IA AHAH");

		super.toString();
	}
}