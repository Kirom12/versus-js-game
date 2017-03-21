//Doc ES6: http://es6-features.org/#ClassDefinition

class Character {
	constructor(id, name) {
		this.id = id;
		this.name = name;

		//Primary stats
		this.strength = this.randomValue();
		this.constitution = this.randomValue();
		this.intelligence = this.randomValue();
		this.wisdom = this.randomValue();

		//Secondary stats
		this.maxHp = this.randomValue(10, 20) + this.constitution;
		this.hp = this.maxHp;
		this.modAttack = this.getModifier(this.strength);
		this.modConst = this.getModifier(this.constitution);
		this.modIntell = this.getModifier(this.intelligence);
		this.modWisdom = this.getModifier(this.wisdom);

		//Items
		this.healKits = 3;
	}

	attack(target) {
		let damages = this.des(8)+parseInt(this.modAttack);
		console.log(this.name + " attacks " + target.name + " for " + damages + " hp");

		target.takeDamage(damages);
	}

	takeDamage(damages) {
		this.hp = this.hp-damages;
	}

	defense() {

	}

	heal() {
		this.hp += this.des(8);
		this.hp = (this.hp > this.maxHp) ? this.maxHp : this.hp;
	}

	/*
	 *	Return a random value in a range
	 */
	randomValue(min = 6, max = 18) {
		return Math.floor(Math.random() * (max-min)) + (min);
	}

	/*
	 *	Return a random dice value
	 */
	des(value) {
		return Math.round(Math.random()*(value - 1)+1);
	}


	getModifier(baseValue) {
		if (baseValue > 17) {
			return "+3";
		} else if (baseValue > 15) {
			return "+2";
		} else if (baseValue > 12) {
			return "+1";
		} else if (baseValue > 8) {
			return "+0";
		} else if (baseValue > 5) {
			return "-1";
		} else if (baseValue > 3) {
			return "-2";
		} else {
			return "-3";
		}
	}

	toString() {
		console.log("strength : " + this.strength);
		console.log("Constitution : " + this.constitution);
		console.log("Intelligence : " + this.intelligence);
		console.log("Wisdom : " + this.wisdom);

		console.log("Hp : " + this.hp);
		console.log("Attack : " + this.attack);
	}
}