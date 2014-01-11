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
var fence = new being("images/brokenFence.png", 0, 0);

////Global variables
var xSize = 16;
var ySize = 24;
var mapWidth = 21;
var mapHeight = 21;
var widthPixels = 336;
var heightPixels = 528;
var enemyList = new Array();

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
    cons.innerHTML += assailant.desc + " attacks " + defender.desc + "!<br/>";
    attackDie = rollDice(20);
    cons.innerHTML += "They rolled a " + attackDie + ".";

    if (attackDie === 1) //Critical miss
    {
        cons.innerHTML += "<br/>What a poor excuse for an attack! They widely misses and staggers!!";
    } 

    else if (attackDie === 20) //Critical Threat
    {
        cons.innerHTML += "<br/>A critical threat!";
        attackDie = rollDice(20) + assailant.attackBonus;
        if (attackDie >= defender.armorClass)
        {
            cons.innerHTML += "<br/>Oho! They scored an excellent hit!!";
            damageDie = rollDice(assailant.damage) * 2;
            cons.innerHTML += "<br/>They did " + damageDie + " damage!!";
            defender.currentHP -= damageDie;
        } 
        else 
        {
            cons.innerHTML += "<br/>But it did not confirm.";
            damageDie = rollDice(assailant.damage);
            cons.innerHTML += "<br/>They hit for " + damageDie + " damage.";
            defender.currentHP -= damageDie;
        }	  
    } 
    else if (attackDie + assailant.attackBonus >= defender.armorClass)
    {
        cons.innerHTML += "<br/>They scored a hit!";
        damageDie = rollDice(assailant.damage);
        cons.innerHTML += "<br />They did " + damageDie + " damage.";
        defender.currentHP -= damageDie;
    }
        else 
        {
            cons.innerHTML += "<br />They missed!!";
        }
    cons.innerHTML += "<br/>";
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
        coordinates[defender.x][defender.y] = 0;
        redrawCoordinates();
        cons.innerHTML = "";
        cons.innerHTML += assailant.desc + " strikes down " + defender.desc + " with the fury of the Gods!";
        //looooooooooooooooooooot
        if (defender.inventory.length > 0) {
            cons.innerHTML += "<br />They received " + defender.inventory + ".";
            //This will now pick up everything in the inventory
            for (i = 0; i <= defender.inventory.length; i++)
            {
                assailant.inventory.push(defender.inventory.pop());
            }
        } 
        else 
        {
            cons.innerHTML += "<br />But they found nothing.";
        }
        //return true; //This isn't used yet.
    } 
    else 
    {
        //return false; //This isn't used either.
    }
}

function enemyBehavior(creature)
{
    //Compare the values of hero and enemy and if hero x value is less than enemy value, move left etc
    //Move right towards the hero
    if (creature.currentHP > 0)
    {
        if (hero.x > creature.x)
        {
            if (coordinates[creature.x+1][creature.y] === 0) 
            {
                coordinates[creature.x][creature.y] = 0;
                creature.x++;
                coordinates[creature.x][creature.y] = creature;
                redrawCoordinates();
            }
            else if (coordinates[creature.x+1][creature.y].currentHP > 0) 
            {
                attack(creature,coordinates[creature.x+1][creature.y]);
            }
        }
        //Move left towards the hero
        if (hero.x < creature.x)
        {
            if (coordinates[creature.x-1][creature.y] === 0) 
            {
                coordinates[creature.x][creature.y] = 0;
                creature.x--;
                coordinates[creature.x][creature.y] = creature;
                redrawCoordinates();
            } 
            else if (coordinates[creature.x-1][creature.y].currentHP > 0) 
            {
                attack(creature,coordinates[creature.x-1][creature.y]);
            }
        }
        //Move down towards the hero
        if (hero.y > creature.y)
        {
            if (coordinates[creature.x][creature.y+1] === 0) 
            {
                coordinates[creature.x][creature.y] = 0;
                creature.y++;
                coordinates[creature.x][creature.y] = creature;
                redrawCoordinates();
            } 
            else if (coordinates[creature.x][creature.y+1].currentHP > 0) 
            {
                attack(creature,coordinates[creature.x][creature.y+1]);
            }
        }
        //Move up towards the hero
        if (hero.y < creature.y)
        {
            if (coordinates[creature.x][creature.y-1] === 0) 
            {
                coordinates[creature.x][creature.y] = 0;
                creature.y--;
                coordinates[creature.x][creature.y] = creature;
                redrawCoordinates();
            }
            else if (coordinates[creature.x][creature.y-1].currentHP > 0) 
            {
                attack(creature,coordinates[creature.x][creature.y-1]);
            }
        }
    //coordinates[creatureList.x][creatureList.y] = creatureList;
    }
    
}



function displayControls()
{
    cons.innerHTML = "Controls <br/>";
    cons.innerHTML += "C: Display this help file<br/>";
    cons.innerHTML += "E: Equip Item<br/>";
    cons.innerHTML += "I: Inventory<br/>";
    cons.innerHTML += "1: Move Down and Left<br/>";
    cons.innerHTML += "2: Move Down<br/>";
    cons.innerHTML += "3: Move Down and Right<br/>";
    cons.innerHTML += "4: Move Left<br/>";
    cons.innerHTML += "5: Wait a turn<br/>";
    cons.innerHTML += "6: Move Right<br/>";
    cons.innerHTML += "7: Move Up and Left<br/>";
    cons.innerHTML += "8: Move Up<br/>";
    cons.innerHTML += "9: Move Up and Right<br/>";
    cons.innerHTML += "Move toward enemy: Attack enemy<br/>";
}

function autoLoader()
{
    canvasBackground();
    randomBarrier();
    enemyLoader();
    heroLoader();	
    fenceLoader();
    
}

//image, armorClass, attackBonus, color, currentHP, desc, color, inventory, maxHP, pass, x, y
function being(image, x, y, options) 
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
    context.fillRect(0, 0, widthPixels, heightPixels);
}

//Kind of a useless function right now
function clearConsole()
{
    cons.innerHTML = "";
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
    enemy.image.src = "images/octopod.png";
    enemy.maxHP = 10;
    enemy.pass = "";
    enemy.x = mapWidth-1;
    enemy.y = mapHeight-1;
    coordinates[enemy.x][enemy.y] = enemy;
    enemyList.push(enemy);
    redrawCoordinates();
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
    hero.desc = "Player";
    hero.image.src = "images/rogue.png";
    hero.maxHP = 10;
    hero.pass = false;	
    hero.x = 0;
    hero.y = 0;
    coordinates[hero.x][hero.y] = hero;
    redrawCoordinates();
}
/*
 * //This function is going to be replaced soon
function item(image, x, y) 
{
    this.image = new Image();
    this.image.src = image;
    this.damage = 0;
    this.price = 0;
    this.x = x;
    this.y = y;
}
*/

function randomBarrier()
{
    var x, y, barriers = rollDice(30);
    for (var i = 0; i < barriers; i++) 
    {
        x = RNG(20);
        y = RNG(20);
        coordinates[x][y] = new being("images/brokenFence.png", x, y, {"currentHP" : "10"});
    }

    barriers = rollDice(30);
    for (var i = 0; i < barriers; i++) 
    {
        x = RNG(20);
        y = RNG(20);
        coordinates[x][y] = new being("images/stableFence.png", x, y, {"currentHP" : "10"});	
    }

    redrawCoordinates();	
}

function redrawCoordinates() {
    canvasBackground();
    for (var i=0; i < mapWidth; i++) {
        for (var j=0; j < mapHeight; j++) {
            if (coordinates[i][j] !== 0) {
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

//KEYHANDLER GET!!!
// -- AWWWWWW YEEEEAAAAAH
document.onkeypress=function(e)
{
    if(hero.currentHP > 0)
    {
        cons.innerHTML = "";
        var e=window.event || e;
        //Displays the key code you are trying to use, this is for debugging and also to determine what's what when you program functionality.
        console.log("CharCode value: "+e.charCode);
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
                if (coordinates[hero.x-1][hero.y+1] === 0) 
                {
                    coordinates[hero.x][hero.y] = 0;
                    hero.x--;
                    hero.y++;
                    coordinates[hero.x][hero.y] = hero;
                    redrawCoordinates();
                }
                else if (coordinates[hero.x-1][hero.y+1].currentHP > 0) 
                {
                    attack(hero,coordinates[hero.x-1][hero.y+1]);
                }
            }
            break;

            //Numpad 2
            //Move down
            case 50:
            if (hero.y+1 < mapHeight) 
            {
                if (coordinates[hero.x][hero.y+1] === 0) {
                    coordinates[hero.x][hero.y] = 0;
                    hero.y++;
                    coordinates[hero.x][hero.y] = hero;
                    redrawCoordinates();
                } 
                else if (coordinates[hero.x][hero.y+1].currentHP > 0) 
                {
                    attack(hero,coordinates[hero.x][hero.y+1]);
                }
            }
            break;

            //Numpad 3
            //Move down and right
            case 51:
            if ((hero.x+1<mapWidth) && (hero.y+1<mapHeight)) 
            {
                if (coordinates[hero.x+1][hero.y+1] === 0) {
                    coordinates[hero.x][hero.y] = 0;
                    hero.x++;
                    hero.y++;
                    coordinates[hero.x][hero.y] = hero;
                    redrawCoordinates();
                }
                else if (coordinates[hero.x+1][hero.y+1].currentHP > 0) 
                {
                    attack(hero,coordinates[hero.x+1][hero.y+1]);
                }
            }
            break;


            //Numpad 4
            //Move left
            case 52:
            if (hero.x-1>=0) 
            {
                if (coordinates[hero.x-1][hero.y] === 0) {
                    coordinates[hero.x][hero.y] = 0;
                    hero.x--;
                    coordinates[hero.x][hero.y] = hero;
                    redrawCoordinates();
                }
                else if (coordinates[hero.x-1][hero.y].currentHP > 0) 
                {
                    attack(hero,coordinates[hero.x-1][hero.y]);
                }
            }
            break;

            //Numpad 5
            //Wait a turn
            case 53:
                redrawCoordinates();
                cons.innerHTML += "You wait in anticipation...";
                break;


            //Numpad 6
            //Move right
            case 54:
                if (hero.x+1 < mapWidth) 
                {
                    if (coordinates[hero.x+1][hero.y] === 0) {
                        coordinates[hero.x][hero.y] = 0;
                        hero.x++;
                        coordinates[hero.x][hero.y] = hero;
                        redrawCoordinates();
                    }
                    else if (coordinates[hero.x+1][hero.y].currentHP > 0) 
                    {
                        attack(hero,coordinates[hero.x+1][hero.y]);
                    }
                }
                break;

            //Numpad 7
            //Move up and left
            case 55:
                if ((hero.x-1>=0) && (hero.y-1>=0))
                {
                    if (coordinates[hero.x-1][hero.y-1] === 0) {
                        coordinates[hero.x][hero.y] = 0;
                        hero.x--;
                        hero.y--;
                        coordinates[hero.x][hero.y] = hero;
                        redrawCoordinates();
                    }
                    else if (coordinates[hero.x-1][hero.y-1].currentHP > 0) 
                    {
                        attack(hero,coordinates[hero.x-1][hero.y-1]);
                    }
                }
                break;

            //Numpad 8
            //Move up
            case 56:
                if (hero.y-1>=0) 
                {
                    if (coordinates[hero.x][hero.y-1] === 0) {
                        coordinates[hero.x][hero.y] = 0;
                        hero.y--;
                        coordinates[hero.x][hero.y] = hero;
                        redrawCoordinates();
                    }
                    else if (coordinates[hero.x][hero.y-1].currentHP > 0) 
                    {
                        attack(hero,coordinates[hero.x][hero.y-1]);
                    }
                }
                break;

            //Numpad 9
            //Move up and right
            case 57:
                if ((hero.x+1<mapWidth) && (hero.y-1>=0))
                {
                    if (coordinates[hero.x+1][hero.y-1] === 0) {
                        coordinates[hero.x][hero.y] = 0;
                        hero.x++;
                        hero.y--;
                        coordinates[hero.x][hero.y] = hero;
                        redrawCoordinates();
                    }
                    else if (coordinates[hero.x+1][hero.y-1].currentHP > 0) 
                    {
                        attack(hero,coordinates[hero.x+1][hero.y-1]);
                    }
                }
                break;

            case 99:
                displayControls();
                break;

            case 101:
                equipItems();
                break;

            case 105:
                displayInventory();
                break;
        }
        for(var i = 0; i < enemyList.length; i++)
        {
            enemyBehavior(enemyList[i]);
        }
    }
    else
        cons.innerHTML = "You have died...";
    
    redrawCoordinates();
};

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
];

//Note the curly braces!
//You can't use indices so you can't get random values this way. It's a key:value pair 
//so we would have to pass damageTable["Bastard Sword"]
var damageTable = {
    "Bastard Sword" : 10,
    "Morningstar" : 8,
    "Handaxe" : 6,
    "Dagger" : 4,
    "Gauntlet" : 3
};

var armorTable = [
    "Studded Leather",
    "Scalemail",
    "Chainmail",
    "Splintmail",
    "Half-plate",
    "Full-plate"
];

var acTable = {
    "Studded Leather" : 3,
    "Scalemail" : 4,
    "Chainmail" : 5,
    "Splintmail" : 6,
    "Half-plate" : 7,
    "Full-plate" : 8
};



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
    //hero.inventory.sort();
    cons.innerHTML = "You have the following items:<br/> ";
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
    if (indexArrow !== -1) {
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
                    dirX = 1;
                    dirY = 1;
                    break;
                // 4 left
                case 52:
                    dirX = -1;
                    dirY = 0;
                    break;
                // 5 Wait a turn
                case 53:
                    cons.innerHTML += "<br/>You wait in anticipation...";
                    break;
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
                if (coordinates[x][y] !== 0) {
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
        } 
        else 
        {
            cons.innerHTML += "<br />There is no target in that direction.";
        }
    } 
    else 
    {
        cons.innerHTML = "You have not found Corellon's Arrow!";
    }
}
