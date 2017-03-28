class MainCharacter extends Character {
	constructor(id, name) {
		super(id, name);
	}

	attackUlti(target) {
		target.takeDamage(100);

		this.saveActionInHistory("attack");

		return "<i>" + this.name + "</i> inflige <span class=\"red-c\">100 hp</span> <span class=\"blue-c\">(" + target.defense + " Def)</span> à <i>" + target.name + "</i>";
	}

	toString() {
		console.log("Je suis un joueur MDR");

		super.toString();
	}
}