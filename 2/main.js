function Bar(barmans = [], waiters = [], drinks = [], tips = 0, orderLists = []) {
	this.barmans = barmans;
	this.waiters = waiters;
	this.drinks = drinks;
	this.tips = tips;
	this.orderLists = orderLists;
}

Bar.prototype.addStaff = function (name, age, post) {
		if (post === "barman") this.barmans.push(name);
		if (post === "waiter") this.waiters.push(name);
		
		return this;
};

Bar.prototype.reStaff = function (name, post) {
		if (post === "barman") var staff = this.barmans;
		if (post === "waiter") var staff = this.waiters;

		var a = staff.find(e => e.name === name);
		var person = staff.indexOf(staff.find(e => e.name === name));
		if(person === -1) return null;
		staff.splice(person, 1);				

		return this;
};

Bar.prototype.addDrink = function (title, quontity, bar) {

	var drink = this.drinks.find(e => e[title]);

	if ((drink !== undefined) && ([title] in drink)) drink[title] += quontity;
	else  new Drink(title, quontity, bar);
	
	return this.drinks;
};

Bar.prototype.splitTip = function () {
	var barman = this.barmans,
		waiter = this.waiters,
		tip = this.tips / (barman.length + waiter.length);
	
	for (var i = 0; i < barman.length; i++) {
		barman[i].tips = tip;
	};
	for (var i = 0; i < waiter.length; i++) {
		waiter[i].tips = tip;
	};
	this.tips = 0;
};

function Person(name, age, post, bar) {
	this.name = name;
	this.age = age;
	this.bar = bar;
	
	if (post === "barman") bar.barmans.push(this);
	if (post === "waiter") bar.waiters.push(this);
		
	return this;
}

Person.prototype.coctail = function (coctail){
	this.coctail = coctail;
};

Person.prototype.takeOrder = function (title, quontity) {

	var drink = this.bar.drinks.find(e => e[title]),
		order = this.bar.orderLists;

	if ((drink !== undefined) && 
		((order === undefined || drink[title] < quontity) || 
		(order !== undefined && drink[title] - order[title] < quontity))) 
	console.log(`Недостаточно запасов ${title}, пополните склад`);// учитываем количество на складе и уже заказанной выпивки.
	else {
		var quol = (order[title] !== undefined ?
					order[title] : 0) + quontity;
		for (var i in order){
				i = title; 
		};
		if (i !== title){
			this.bar.orderLists[title] = quontity;
			} else if (i === title) {
			this.bar.orderLists[title] = quol;
		}
	}
};

Person.prototype.takeTips = function (money) {
	this.bar.tips += money;

	return this; 
};

Person.prototype.compliteTheOrder = function (title, quontity) {
	if (title !== undefined) { 
	(this.bar.drinks.find(e => e[title]))[title] -= quontity}  
	else {for (var key in this.bar.orderLists) {
		this.bar.drinks.find(e => e[key])[key] -= this.bar.orderLists[key];
		this.bar.orderLists[key] = 0;
		}
	}
	
	return this.bar.drinks;
};		

function Drink (title, quontity, bar) {
	this[title]= quontity;
	bar.drinks.push(this);

	return this;
}

let theFitz = new Bar();	
	
let ryan = new Person("Ryan", 25, "barman", theFitz);
let bryan = new Person("Bryan", 27, "barman", theFitz);

let mylie = new Person("Mylie", 18, "waiter", theFitz);
let kylie = new Person("Kylie", 20, "waiter", theFitz);
let riley = new Person("Riley", 21, "waiter", theFitz);

let beer = new Drink("Beer", 1000, theFitz);
let whiskey = new Drink("Whiskey", 150, theFitz);
let rum = new Drink("Rum", 100, theFitz);
let quantro = new Drink("Quantro", 200, theFitz);
let tequila = new Drink("Tequila", 120, theFitz);

console.log(theFitz);

let vasya = new Person("Vasiliy", 40, "barman", theFitz);

theFitz.addStaff(vasya);
console.log(theFitz);
theFitz.addDrink("Beer", 600);
theFitz.addDrink("Tequila", 50);
theFitz.addDrink("Quantro", 30);
theFitz.addDrink("Bourbon", 200, theFitz);
theFitz.addDrink("Bourbon", 245);
console.log(theFitz);
ryan.coctail("B-52");
bryan.coctail("Hirosima");
vasya.coctail("Screwdriver");
console.log(theFitz);
mylie.takeOrder("Beer", 150);
kylie.takeOrder("Whiskey", 50);
riley.takeOrder("Quantro", 20);
kylie.takeOrder("Rum", 7);
riley.takeOrder("Tequila", 11);
riley.takeOrder("Rum", 8);
riley.takeOrder("Beer", 600);
kylie.takeOrder("Tequila", 180);
kylie.takeOrder("Quantro", 50);
kylie.takeOrder("Whiskey", 160);
riley.takeOrder("Beer", 900);
kylie.takeOrder("Bourbon", 40);
kylie.takeOrder("Bourbon", 500);
console.log(theFitz);
mylie.takeTips(200);
console.log(theFitz);
ryan.compliteTheOrder();
ryan.compliteTheOrder("Quantro", 2);
console.log(theFitz);
theFitz.reStaff("Bryan", "barman");
theFitz.reStaff("Mylie", "waiter");
console.log(theFitz);
theFitz.splitTip();
console.log(theFitz);