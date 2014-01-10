////Onload event
window.onload = autoLoader;

////Event handlers

//This is the prototype button
var btnAction = document.getElementById("idRandom");

////Canvas and console variables
var canvas = document.getElementById("idCanvas");
var context = canvas.getContext("2d");
var cons = document.getElementById("idConsole");

////Object creation
// -- fence should be addressed later
//                     image, armorClass, attackBonus, color, currentHP, desc, inventory, maxHP, pass, x, y

/* The real problem with the attack function was that assailant/hero wasn't properly intitialized
 * Though heroLoader assigns values to these properties they were still undefined or NaN in the
 * attack function because hero was getting instantiated without those other values inside the
 * constructor. I think it is best to cut down the arguments on the constructor
 * just to image, and that way everything else can be added on its own--I believe that will work.
 * A problem is with fence, at least. What's the most convenient way to make an object that will
 * occur many times yet need to be distinct from its copies? Perhaps image, maxHP, armorClass
 * should be the only paramaters. currentHp could get maxHp in being() anyway.
 * If you go back to the other version of code and change it yourself you should see the change.
 * */

//image, armorClass, attackBonus, color, currentHP, damage, desc, inventory, maxHP, pass, x, y
//I think there is a better way to do this. This will get confusing down the line. It's already confusing.
//Fixed so it's less confusing. Now you just pass the x y values. 
var hero = new being("images/rogue.png", 0, 0);
var enemy = new being("images/octopod.png", mapWidth-1, mapHeight-1);
// Let's give fence some paramaters so we can destroy it!
var fence = new being("images/fence.png", -1,-1);

////Global variables
var xSize = 16;
var ySize = 24;
var mapWidth = 11;
var mapHeight = 11;

//We only need this if we are making barriers
//var numberOfBarriers;

////Matrix creation / declaration
var coordinates = new Array(mapWidth);
for (var i =0; i <mapWidth; i++) {
	coordinates[i] = new Array(mapHeight);			
}

//sets array to 0 which is not an object
for (var i=0; i<mapWidth; i++) {
	for (var j=0; j<mapHeight; j++) {
		coordinates[i][j] = 0;
	}
}

////Functions (try to keep these in alphabetical order after object)

/* cons.innerHTML is working. I fiddled with it and made it += with a break. So if you get
 * a crit it will then tell you whether or not it confirms instead of overwriting it quick.
 * Additionally, critical miss needed to come first so that miss messages aren't repeated.
 * Added a death check that makes defender's x,y in coordinates 0. 
 * */

function attack(assailant, defender)
{
	console.log(assailant.desc + " attacks " + defender.desc);
	cons.innerHTML = assailant.desc + " attacks " + defender.desc;
	
	attackDie = rollDice(20);
	cons.innerHTML += "You rolled a " + attackDie;
	console.log("You rolled a " + attackDie);
	
	//Critical miss
	if (attackDie == 1)
	{
		cons.innerHTML += "<br />You poor excuse for an adventurer. You widely miss and stagger!!";
		console.log("You poor excuse for an adventurer. You widely miss and stagger!!");
	} else
	if (attackDie == 20) //Critical Threat
	{
		cons.innerHTML += "<br />A critical threat!";
		console.log("A critical threat!");
		attackDie = rollDice(20) + assailant.attackBonus;
		if (attackDie >= defender.armorClass)
		{
			cons.innerHTML += "<br />Oho! You've scored an excellent hit!!";
			console.log("Oho! You've scored an excellent hit!!");
			damageDie = rollDice(assailant.damage) * 2;
			console.log("You did " + damageDie + " damage!!")
			defender.currentHP -= damageDie;
			console.log("Your enemy now has " + defender.currentHP + " HP left.");
		} else 
		{
			cons.innerHTML += "<br />But it did not confirm.";
			console.log("But it did not confirm.");
			damageDie = rollDice(assailant.damage);
			cons.innerHTML += "<br /> You hit for " + damageDie + " damage.";
			console.log("You did " + damageDie + " damage.")
			defender.currentHP -= damageDie;
			console.log("Your enemy now has " + defender.currentHP + " HP left.");
		}	  
	} else if (attackDie + assailant.attackBonus >= defender.armorClass)
	{
			cons.innerHTML = "You've scored a hit.";
			damageDie = rollDice(assailant.damage);
			console.log("You did " + damageDie + " damage.")
			cons.innerHTML += "<br /> You did " + damageDie + " damage.";
			defender.currentHP -= damageDie;
			console.log("Your enemy now has " + defender.currentHP + " HP left.");
	}
		else 
		{
			cons.innerHTML += "<br />You miss!!";
			console.log("You miss!!");
			console.log("Your enemy still has " + defender.currentHP + " HP left.");
		}
	console.log(assailant, defender);
	checkDeath(assailant, defender);
}

function checkDeath(assailant, defender) {
	// Death check
	// Should probably be another function that attack calls, which will accomplish this
	// as well as increment exp and dole out wealth etc, which should also probably be
	// properties of being. Or like dnd calculate exp based on a level property.
	// Spit balling: if the constructor initialized image and a level property, a loader
	// function could initialize stats according to level, which would probably come from
	// a swithc--or, better yet, a formula. Octopods have 10hp per level or something so
	// initializing them means maxHP = level * 10. Maybe attackBonus would be = level.
	// Additionally, painfully, we could put static values for the scaling of the properties
	// into an array of arrays, and each monster type has an ID that determines the array
	// of scaling values for its properties. Now I'm going crazy. Let's maybe talk about this.
	
	// Also adds opponent's inventory

	
	if (defender.currentHP <= 0) {
		console.log("VICTORY");
		cons.innerHTML = "<font size = +2>You defeated your enemy!</font>"
		coordinates[defender.x][defender.y] = 0;
		redrawCoordinates();
		//looooooooooooooooooooot
		if (defender.inventory.length > 0) {
			cons.innerHTML += "<br />You found " + defender.inventory;
			//This will now pick up everything in the inventory
			for (i = 0; i <= defender.inventory.length; i++)
			{
				assailant.inventory.push(defender.inventory.pop());
			}
			
		} else {
			cons.innerHTML += "<br />You found nothing.";
		}
		
		console.log(assailant.inventory);
		
		
		//return true; //This isn't used yet.
	} else {
		//return false; //This isn't used either.
	}
}

function autoLoader()
{
	canvasBackground();
	enemyLoader();
	heroLoader();	
	fenceLoader();
}

//Barrier now creates a destroyable, unique fence in each place
function barrier(y)
{
	for (i=0; i<mapWidth; i++) {
		coordinates[i][y] = new being("images/fence.png", i, y);
		
		//add an item to the sixth fence's inventory.
		if (i==5) {
			coordinates[i][y].inventory.push("Corellon's Arrow");
		}
	}
	redrawCoordinates();
}


//image, armorClass, attackBonus, color, currentHP, desc, color, inventory, maxHP, pass, x, y
function being(image, x, y) 
{
	this.image = new Image();
	this.armorClass = 0;
	this.attackBonus = 0;
	this.color = "";
	this.currentHP = 0;
	this.damage = 0;
	this.desc = "";
	this.image.src = image;
	this.inventory = new Array();
	this.maxHP = 0;
	this.pass = false;
	this.x = x;
	this.y = y;
}

function canvasBackground()
{
	context.fillStyle = "#212121";
	context.fillRect(0, 0, 176, 264);
}

function clearHTML()
{
	cons.HTML = "";
}

function enemyLoader()
{	
	randomInventory(enemy);
	//Enemy attributes
	enemy.armorClass = 10;
	enemy.attackBonus = 1;
	enemy.color = "red";
	enemy.currentHP = 10;
	enemy.desc = "Octopod, son of Octothorpe";
	enemy.image.src = "images/octopod.png"
	enemy.maxHP = 10;
	enemy.pass = "";
	enemy.x = mapWidth-1;
	enemy.y = mapHeight-1;
	//enemy.image.src="octopod.png"; //Defined, as above
	coordinates[enemy.x][enemy.y] = enemy;
	redrawCoordinates();

	//cons.innerHTML = "Can you defeat your enemy?";
}

function fenceLoader()
{
	//barrier(5);
	fence.armorClass = 1;
	fence.attackBonus = 0;
	fence.color = "red";
	fence.currentHP = 50;
	fence.desc = "a fence";
	fence.inventory = ["Some wood"];
	fence.maxHP = 50;
	fence.pass = false;
	fence.x = 5;
	fence.y = 5;
	coordinates[fence.x][fence.y] = fence;
	redrawCoordinates();
	//image, armorClass, attackBonus, color, currentHP, desc, inventory, maxHP, pass, x, y
	//var fence = new being("fence.png", 1, 0, "red", 50, "a fence", "wood", 50, false, -1,-1);

}


function heroLoader()
{
	//Gives hero.armorClass and hero.damage
	randomInventory(hero);

	hero.armorClass = 10;
	hero.attackBonus = 1;
	hero.color = "blue";	
	hero.currentHP = 10;
	hero.desc = "Buttlord, Lord of the Glut";
	hero.image.src = "images/rogue.png"
	hero.maxHP = 10;
	hero.pass = false;	
	hero.x = 0;
	hero.y = 0;
	coordinates[hero.x][hero.y] = hero;
	redrawCoordinates();
}

function item(image, x, y) 
{
	this.image = new Image();
	this.image.src = image;
	this.damage = 0;
	this.price = 0;
	this.x = x;
	this.y = y;
}


var sword = new item("images/sword.png", 6, 6);
coordinates[sword.x][sword.y] = sword;
redrawCoordinates();

//var hero = new being("images/rogue.png", 0, 0);


/*
function randomBarrier()
{
	//coordinates[fence.x][fence.y] == 0 && 
	//This needs to be rewritten, as it stands now you can overwrite old barriers so the collision detection isn't really working for that purpose.
	// -- *See above*
	fence.x = RNG(mapWidth);
	fence.y = RNG(mapHeight);
	if (coordinates[fence.x][fence.y] == 0) {
		coordinates[fence.x][fence.y] = fence;
	}
	redrawCoordinates();	
}*/

function redrawCoordinates() {
	canvasBackground();
	
	for (var i=0; i < mapWidth; i++) {
		for (var j=0; j < mapHeight; j++) {
			if (coordinates[i][j] != 0) {
				context.drawImage(coordinates[i][j].image, i*xSize, j*ySize);
			}
		}
	}
}

function RNG(maxNum)
{
	return Math.floor(Math.random()*maxNum);
}

function rollDice(maxDie)
{
	return Math.floor(Math.random()*maxDie + 1);
}

// Just a kind of test, working with inventory and advancedish battle behaviors
// will throw Corellon's arrow if it is in the inventory. I know that doesn't do much
// dynamically-- i.e. find a spell and use a spell. It makes me think items will need
// to be their own sort of object, so that armor/weapon/spells/potions can be differentiated.
// And their quantities too.

function throwArrow() {
	var indexArrow = hero.inventory.indexOf("Corellon's Arrow");
	var willSplice = false; // By commenting out willSplice = true, corellon's arrow is infinite
	var targetX;
	var targetY;
	// rather than reiterating conditions separately, I'm setting values to these two vars
	// that will then be applied to coordinates to search for a target
	var dirX;
	var dirY;
	var foundTarget = false;
	
	var damage = 0;
	
	// presently arrow has unlimited range.
	if (indexArrow != -1) {
		cons.innerHTML = "Choose a direction to cast the heavenly, god-slaying bolt."
		alert();
		// find coordinates of target
		document.onkeypress=function(f) {
			console.log(f);
			var f=window.event || f
			keyPressed = f.charCode;
			
			switch (keyPressed) {
				// 1 down left
				case 49:
					dirX = -1;
					dirY = 1;
					break;
				// 2 down
				case 50:
					dirX = 0;
					dirY = 1;
					break;
				// 3 down right
				case 51:
					dirX = 1
					dirY = 1;
					break;
				// 4 left
				case 52:
					dirX = -1;
					dirY = 0;
					break;
				/* 5
				case 53:
					break;*/
				// 6 right
				case 54:
					dirX = 1;
					dirY = 0;
					break;
				// 7 up left
				case 55:
					dirX = -1;
					dirY = -1;
					break;
				// 8 up
				case 56:
					dirX = 0;
					dirY = -1;
					break;
				// 9 up right
				case 57:
					dirX = 1;
					dirY = -1;
					break;
			}
		}
		
		//This looks weird, but it will increment x and y in the direction that we
		//are asking them to go until one of the exits the map.
		for (var x=0; (x>=0) && (x<mapWidth); x+=dirX) {
			for (var y=0; (y>=0) && (y<mapHeight); y+=dirY) {
				//check to see if it is not empty
				if (coordinates[x][y] != 0) {
					//check to see if it is a monster, sort of
					if (coordinates[x][y].currentHP>0) {
						targetX = x;
						targetY = y;
						foundTarget = true;
					}
				}
			}
		}
		
		if (foundTarget) {
			for (var i=0; i<5; i++) {
				damage += rollDice(6);
			}
			coordinates[targetX][targetY].currentHP -= damage;
			
			cons.innerHTML = "You struck " + coordinates[targetX][targetY].desc + " for " + damage + " damage!";
			cons.innerHTML += "Hei Corellon shar-sheleru!";
			
			checkDeath(hero, coordinates[targetX][targetY]);
		} else {
			cons.innerHTML += "<br />There is no target in that direction."
		}
		
	} else {
		cons.innerHTML = "You have not found Corellon's Arrow!";
	}
}

//KEYHANDLER GET!!!
// -- AWWWWWW YEEEEAAAAAH
document.onkeypress=function(e)
{
	var e=window.event || e
    //Displays the key code you are trying to use, this is for debugging and also to determine what's what when you program functionality.
    console.log("CharCode value: "+e.charCode)
    keyPressed = e.charCode;
    
    /* Added a check to see if the space hero would move into has currentHp > 0, and if it does
     * he attacks it. Another way to do it is add an isEnemy true/false properties to being.
     * The shape of it changed because 1st and foremost we check to see if where he wants to go
     * is in the array, if it is we check to see if its empy, and if it isn't then we attack it.
     * This structure avoids all weird undefined runtime errors.
     * */
    // S activates throwArrow(); 
    
    switch (keyPressed)
    {
		//Keyboard S (capital)
		// Throw Corellon's arrow
		case 83:
			throwArrow();
		break;
		
		//Numpad 1
		//Move down and left
		case 49:
    		if ((hero.x-1 >= 0) && (hero.y+1 <= mapHeight) )
	 		{
			if (coordinates[hero.x-1][hero.y+1] == 0) {
				coordinates[hero.x][hero.y] = 0;
				hero.x--;
				hero.y++;
				coordinates[hero.x][hero.y] = hero;
				redrawCoordinates();
			}else if (coordinates[hero.x-1][hero.y+1].currentHP > 0) {
				attack(hero,coordinates[hero.x-1][hero.y+1]);
			}
		}
			break;

		//Numpad 2
		//Move down
		case 50:
    		if (hero.y+1 < mapHeight) 
	 		{
				if (coordinates[hero.x][hero.y+1] == 0) {
					coordinates[hero.x][hero.y] = 0;
					hero.y++;
					coordinates[hero.x][hero.y] = hero;
					redrawCoordinates();
				} else
				if (coordinates[hero.x][hero.y+1].currentHP > 0) {
					attack(hero,coordinates[hero.x][hero.y+1]);
				}
			}
			
			break;

		//Numpad 3
		//Move down and right
		case 51:
		if ((hero.x+1<mapWidth) && (hero.y+1<mapHeight)) 
			{
			if (coordinates[hero.x+1][hero.y+1] == 0) {
				coordinates[hero.x][hero.y] = 0;
				hero.x++;
				hero.y++;
				coordinates[hero.x][hero.y] = hero;
				redrawCoordinates();
			}else if (coordinates[hero.x+1][hero.y+1].currentHP > 0) {
				attack(hero,coordinates[hero.x+1][hero.y+1]);
				}
			}
			break;
		

		//Numpad 4
		//Move left
		case 52:
		if (hero.x-1>=0) {
			
			if (coordinates[hero.x-1][hero.y] == 0) {
				coordinates[hero.x][hero.y] = 0;
				hero.x--;
				coordinates[hero.x][hero.y] = hero;
				redrawCoordinates();
			}else if (coordinates[hero.x-1][hero.y].currentHP > 0) {
				attack(hero,coordinates[hero.x-1][hero.y]);
			}
		}
			break;

		//Numpad 5
		//Wait a turn
		// -- In the future it would be smart for each move (including wait) to increment a sort of clock huh?
		//	that way poisons/healing effects would occur when you wait.
		case 53:
			if (coordinates[hero.x][hero.y] == 0) 
			{
				coordinates[hero.x][hero.y] = 0;
				coordinates[hero.x][hero.y] = hero;
				redrawCoordinates();
			}
			break;

		//Numpad 6
		//Move right
		case 54:
			if (hero.x+1 < mapWidth) 
			{
			if (coordinates[hero.x+1][hero.y] == 0) {
				coordinates[hero.x][hero.y] = 0;
				hero.x++;
				coordinates[hero.x][hero.y] = hero;
				redrawCoordinates();
			}else if (coordinates[hero.x+1][hero.y].currentHP > 0) {
				attack(hero,coordinates[hero.x+1][hero.y]);
			}
			}
			break;

		//Numpad 7
		//Move up and left
		case 55:
			if ((hero.x-1>=0) && (hero.y-1>=0))
			{
			if (coordinates[hero.x-1][hero.y-1] == 0) {
				coordinates[hero.x][hero.y] = 0;
				hero.x--;
				hero.y--;
				coordinates[hero.x][hero.y] = hero;
				redrawCoordinates();
			}else if (coordinates[hero.x-1][hero.y-1].currentHP > 0) {
				attack(hero,coordinates[hero.x-1][hero.y-1]);
			}
			}
			break;

		//Numpad 8
		//Move up
		case 56:
			if (hero.y-1>=0) 
			{
			if (coordinates[hero.x][hero.y-1] == 0) {
				coordinates[hero.x][hero.y] = 0;
				hero.y--;
				coordinates[hero.x][hero.y] = hero;
				redrawCoordinates();
			}else if (coordinates[hero.x][hero.y-1].currentHP > 0) {
				attack(hero,coordinates[hero.x][hero.y-1]);
			}
			}
			break;

		//Numpad 9
		//Move up and right
		case 57:
			if ((hero.x+1<mapWidth) && (hero.y-1>=0))
			{
			if (coordinates[hero.x+1][hero.y-1] == 0) {
				coordinates[hero.x][hero.y] = 0;
				hero.x++;
				hero.y--;
				coordinates[hero.x][hero.y] = hero;
				redrawCoordinates();
			}else if (coordinates[hero.x+1][hero.y-1].currentHP > 0) {
				attack(hero,coordinates[hero.x+1][hero.y-1]);
			}
			}
			break;

		case 101:
			equipItems();
			break;

		case 105:
			displayInventory();
			break;

	}
}

//---------------------------------------------------------------------------------------------------------
//We should put this in the main code after you check it out, I just wanted to keep it all in the same place
//so you could view it easily. I also updated some stuff, check out my notes at the top.

//Note the square brackets!
//Weapon table and damage table are associated, so make sure if you add weapons to update the damage table.
//I did it this way so we can assign random weapons when starting. To get the damage, view the damage table. 
var weaponTable = [
	"Bastard Sword",
	"Morningstar",
	"Handaxe",
	"Dagger",
	"Gauntlet"
]

//Note the curly braces!
//You can't use indices so you can't get random values this way. It's a key:value pair 
//so we would have to pass damageTable["Bastard Sword"]
var damageTable = {
	"Bastard Sword" : 10,
	"Morningstar" : 8,
	"Handaxe" : 6,
	"Dagger" : 4,
	"Gauntlet" : 3
}

var armorTable = [
	"Studded Leather",
	"Scalemail",
	"Chainmail",
	"Splintmail",
	"Half-plate",
	"Full-plate"
]

var acTable = {
	"Studded Leather" : 3,
	"Scalemail" : 4,
	"Chainmail" : 5,
	"Splintmail" : 6,
	"Half-plate" : 7,
	"Full-plate" : 8
}



function randomInventory(possessor){
	var weaponIndex = RNG(weaponTable.length);
	possessor.inventory.push(weaponTable[weaponIndex]);
	possessor.damage = damageTable[weaponTable[weaponIndex]];

	var armorIndex = RNG(armorTable.length);
	possessor.inventory.push(armorTable[RNG(armorTable.length)]);
	possessor.armorClass = acTable[armorTable[armorIndex]];
}



function displayInventory()
{
	hero.inventory.sort();
	cons.innerHTML += "<br/>You have the following items:<br/> ";
	for (i = 0; i < hero.inventory.length; i++)
	{
		cons.innerHTML += (i+1) + "..." + hero.inventory[i] + "<br/>";
	}
	console.log(hero.damage);
	console.log(hero.ac);
}

function equipItems()
{
	//How can we implement this??? It's going to be tough!
	cons.innerHTML = "What do you wish to equip?<br/>"
	displayInventory();
}




/* For whatever reason, it appears that btnAction can't complete any function that takes
 * paramaters. I went back to some old code. The button wouldn't not excute randomeBarrier()
 * but it would execture randomBarrier;. To double check, comment out the line below and
 * comment in the one below it. */

//btnAction.onclick = function() { console.log(cons); };
//btnAction.onclick = attack(hero,enemy);