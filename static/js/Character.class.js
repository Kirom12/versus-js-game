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
		this.defense = 0;

		//Items
		this.healKits = 3;
	}

	/*
	 *	Attack a character with 1d8 + strength mod
	 *
	 *	@param Character target character
	 *	@return String log line
	 */
	attack(target) {
		let damages = this.des(8)+parseInt(this.modAttack);
		target.takeDamage(damages)

		return "<i>" + this.name + "</i> inflige <span class=\"red-c\">" + damages + " hp</span> <span class=\"blue-c\">(" + target.defense + " Def)</span> à <i>" + target.name + "</i>";
	}

	/*
	 *	Take damage
	 *
	 *	@param int damages taken
	 */
	takeDamage(damages) {
		if (damages > this.defense) {
			this.hp -= (damages-this.defense);
		}
	}


 	/*
 	 *	Give reduction damage to current player (1 turn)
 	 *
 	 *	@return String log line
 	 */	
	defensive() {
		this.defense = 5;

		return "<i>" + this.name + "</i> gagne <span class=\"blue-c\">+5 défense</span> (1 tour)";
	}

	/*
	 *	Heal current character of 1d8 + wisdom mod
	 *
	 *	@return String log line
	 */
	heal() {
		if (this.healKits > 0) {
			let heal = this.des(8)+parseInt(this.modWisdom);
			this.hp += heal;
			this.hp = (this.hp > this.maxHp) ? this.maxHp : this.hp;
			this.healKits--;
			return "<i>" + this.name + "</i> gagne <span class=\"green-c\">" + heal + " hp</span>";
		}

		return "<i>" + this.name + "</i> n'a plus de médikits";
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

	/*
	 *	Find the modifier of a stat
	 *	
	 *	@param int stat value
	 *	@return String modifiers (-3 to +3)
	 */
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
		console.log("Name : " + this.name);

		console.log("Strength : " + this.strength);
		console.log("Constitution : " + this.constitution);
		console.log("Intelligence : " + this.intelligence);
		console.log("Wisdom : " + this.wisdom);

		console.log("Hp : " + this.hp);
		console.log("Attack : " + this.modAttack);
	}
}