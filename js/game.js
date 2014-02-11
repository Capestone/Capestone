//TODO: 
//Random Forest level
//EQUIP function
//Wandering monster behavior
//Enemy behavior case statement for different enemies, default being normal behavior
//random movement between 1 and 10 1 - 2 do something 3 - 4 do something etc
//Make sure equip function ADDS to 10 
//home

////Event handlers
window.onload = autoLoader;
////Canvas and console variables
var canvas = document.getElementById("idCanvas");
var context = canvas.getContext("2d");
var cons = document.getElementById("idConsole");

var enemyIncrementer = 0;
//enemyList['enemy' + enemyIncrementer] = new being();

////Global variables
var xSize = 16;
var ySize = 24;
var mapWidth = 20;
var mapHeight = 20;
var widthPixels = 320;
var heightPixels = 480;
var enemyList = new Array();
var equipMenu = false;
var itemOnGround = false;
var timePassed = 0;
var xLocation, yLocation;


////Object instantiation
var hero = "";
var enemy = new being("images/octopod.png", mapWidth-1, mapHeight-1);
var fence = new being("images/brokenFence.png", 0, 0);

////Matrix creation / declaration
var coordinates = new Array(mapWidth);
for (var i = 0; i <mapWidth; i++) {
    coordinates[i] = new Array(mapHeight);			
}

//sets array to 0 which is not an object
for (var i=0; i<mapWidth; i++) {
    for (var j=0; j<mapHeight; j++) {
        coordinates[i][j] = 0;
    }
}

////Functions (alphabetical)
function startGame()
{
    displayControls();
    cons.innerHTML += "Welcome to Capestone.<br/>";
    cons.innerHTML += "Press enter to start.";
}

function environment()
{
    this.image = new Image();
    this.armorClass = 0;
    this.currentHP = 0;
    this.desc = "";
    this.inventory = new Array();
    this.pass = false;
    this.x = 0;
    this.y = 0;
}

function item()
{
    this.image = new Image();
    this.action = "";
    this.armorClass = 0;
    this.attackBonus = 0;
    this.damage = 0;
    this.description = "";
    this.health = 0;
    this.itemName = "";
    this.itemType = "";
}

function placeWeapon(index, x, y)
{
    coordinates[x][y] = new item();
    coordinates[x][y].image.src = "images/sword.png";
    coordinates[x][y].action = weaponData[index].action;
    coordinates[x][y].armorClass = weaponData[index].armorClass;
    coordinates[x][y].attackBonus = weaponData[index].attackBonus;
    coordinates[x][y].damage = weaponData[index].damage;
    coordinates[x][y].description = weaponData[index].description;
    coordinates[x][y].health = weaponData[index].health;
    coordinates[x][y].itemName = weaponData[index].itemName;
    coordinates[x][y].itemType = weaponData[index].itemType;
}

function getRandomDungeon()
{
    
    console.log(dungeonCode[0](0, 0));
    
    //PHP Handles the randomization
    dungeonCode[0](0, 0);
    dungeonCode[1](10, 0);
    dungeonCode[2](0, 10);
    dungeonCode[3](10, 10);
    
    placeWeapon(0, 1, 0);
}

//Attack function
function attack(assailant, defender)
{
    cons.innerHTML += assailant.desc + " attacks " + defender.desc + "!<br/>";
    attackDie = rollDice(20);
    cons.innerHTML += "They rolled a " + attackDie + ".";

    if (attackDie === 1) //Critical miss
    {
        cons.innerHTML += "<br/>What a poor excuse for an attack! They widely miss and stagger!!";
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

//Autoloader function
function autoLoader()
{
    canvasBackground();
    //dungeonLoader();
    //randomBarrier();
    getRandomDungeon();
    enemyLoader();
    heroLoader();	
    //fenceLoader();
    startGame();
    
    
}

//Being object
function being(image, xValue, yValue, options) 
{
    this.image = new Image();
    this.armorClass = 0;
    this.attackBonus = 0;
    this.currentHP = 0;
    this.damage = 0;
    this.desc = "";
    this.image.src = image;
    this.inventory = new Array();
    this.maxHP = 0;
    this.pass = false;
    this.x = xValue;
    this.y = yValue;
}

function canvasBackground()
{
    context.fillStyle = "#212121";
    context.fillRect(0, 0, widthPixels, heightPixels);
}

//Check death function
//I plan on changing this completely
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
        //cons.innerHTML += "";
        cons.innerHTML += assailant.desc + " strikes down " + defender.desc + " with the fury of the Gods!";
        //looooooooooooooooooooot
        if (defender.inventory.length > 0) {
            cons.innerHTML += "<br />They received " + defender.inventory + ".";
            //This will now pick up everything in the inventory
            for (var i = 0; i <= defender.inventory.length; i++)
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

//Kind of a useless function right now
function clearConsole()
{
    cons.innerHTML = "";
}

//Display Controls function
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

function displayInventory()
{
    //hero.inventory.sort();
    cons.innerHTML = "You have the following items:<br/> ";
    for (var i = 0; i < hero.inventory.length; i++)
    {
        cons.innerHTML += (i+1) + "..." + hero.inventory[i].itemName + "<br/>";
    }
    console.log(hero.damage);
    console.log(hero.armorClass);
}

//Enemy Behavior function
function enemyBehavior(creature)
{
    console.log("The creature:");
    console.log(creature);
    //If the player is within 10 squares of the enemy and the enemy is still alive...
    if ((Math.abs(creature.x - hero.x)) < 10 && ((Math.abs(creature.y - hero.y)) < 10 && creature.currentHP > 0))
    {   
        //Compare the x and y values of hero and enemy and if hero x value is less than enemy x value, move left etc.
        //Move right towards the hero
        if (hero.x > creature.x)
        {
            if (coordinates[creature.x+1][creature.y] === 0) 
            {
                coordinates[creature.x][creature.y] = 0;
                creature.x++;
                coordinates[creature.x][creature.y] = creature;
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
            }
            else if (coordinates[creature.x][creature.y-1].currentHP > 0) 
            {
                attack(creature,coordinates[creature.x][creature.y-1]);
            }
        }
    }
    //Otherwise, wander around until you find something of interest to attack
    else if (creature.currentHP > 0)
    {
        //TODO: Get enemy to move in random directions until it finds something 
    }
    //coordinates[creatureList.x][creatureList.y] = creatureList;
}

function enemyLoader()
{	
    //Enemy attributes
    var randomMonster = monsterData[rollDice(4)];
    enemyList[enemyIncrementer] = new being();
    console.log(enemyList);
    enemyList[enemyIncrementer].armorClass = randomMonster.armorClass;
    enemyList[enemyIncrementer].attackBonus = randomMonster.attackBonus;
    enemyList[enemyIncrementer].currentHP = randomMonster.currentHP;
    enemyList[enemyIncrementer].damage = randomMonster.damage;
    enemyList[enemyIncrementer].desc = randomMonster.monsterName;
    enemyList[enemyIncrementer].image.src = randomMonster.imagePath;
    enemyList[enemyIncrementer].maxHP = randomMonster.maxHP;
    enemyList[enemyIncrementer].pass = randomMonster.pass;
    enemyList[enemyIncrementer].x = RNG(20);
    enemyList[enemyIncrementer].y = RNG(20);
    coordinates[enemyList[enemyIncrementer].x][enemyList[enemyIncrementer].y] = enemyList[enemyIncrementer];
    enemyIncrementer++;
}
/*
function equipItems()
{
    //fix this
    equipMenu = true;
    while (equipMenu)
    {
        switch(keyPressed)
        {
            case 49:
                //If number exists in the array...
                console.log("equip the first item...");
                break;
            case 50:
                console.log("equip the second item...");
                break;
            case 51:
                console.log("equip the third item...");
                break;
            case 52:
                console.log("equip the fourth item...");
                break;
            case 53:
                console.log("equip the fifth item...");
                break;
        }
        keyPressed = e.charCode;
    }
    
    
    equipMenu = false;
}
*/

function fenceLoader()
{
    //barrier(5);
    fence.armorClass = 1;
    fence.attackBonus = 0;
    fence.currentHP = 100;
    fence.desc = "a fence";
    fence.inventory = ["Corellon's Arrow"];
    fence.maxHP = 50;
    fence.pass = false;
    fence.x = 12;
    fence.y = 12;
    coordinates[fence.x][fence.y] = fence;
    //image, armorClass, attackBonus, color, currentHP, desc, inventory, maxHP, pass, x, y
    //var fence = new being("fence.png", 1, 0, "red", 50, "a fence", "wood", 50, false, -1,-1);
}

function heroLoader()
{
    hero = new being("images/rogue.png", 0, 0);
    //Gives hero.armorClass and hero.damage
    randomInventory(hero);
    hero.attackBonus = 10 + parseInt(heroData.attackBonus);
    hero.currentHP = 20 + parseInt(heroData.currentHP);
    hero.desc = heroData.description;
    hero.image.src = heroData.imagePath;
    hero.maxHP = parseInt(heroData.maxHP);
    hero.name = heroData.userName;
    if (heroData.pass == 0)
    {
        hero.pass = false;
    }
    else 
    {
        hero.pass = true;
    }
    hero.x = parseInt(heroData.x);
    hero.y = parseInt(heroData.y);
    coordinates[hero.x][hero.y] = hero;
    
    hero.moveDownAndLeft = function() 
    {
        if ((hero.x-1 >= 0) && (hero.y+1 <= mapHeight) )
        {
            if (coordinates[hero.x-1][hero.y+1] === 0) 
            {
                coordinates[hero.x][hero.y] = 0;
                hero.x--;
                hero.y++;
                coordinates[hero.x][hero.y] = hero;
            }
            else if (coordinates[hero.x-1][hero.y+1].currentHP > 0) 
            {
                attack(hero,coordinates[hero.x-1][hero.y+1]);
            }
        }
    }
    
    hero.moveDown = function()
    {
        if (hero.y+1 < mapHeight) 
        {
            if (coordinates[hero.x][hero.y+1] === 0) {
                coordinates[hero.x][hero.y] = 0;
                hero.y++;
                coordinates[hero.x][hero.y] = hero;
            } 
            else if (coordinates[hero.x][hero.y+1].currentHP > 0) 
            {
                attack(hero,coordinates[hero.x][hero.y+1]);
            }
        }
    }
    
    hero.moveDownAndRight = function()
    {
        if ((hero.x+1<mapWidth) && (hero.y+1<mapHeight)) 
        {
            if (coordinates[hero.x+1][hero.y+1] === 0) {
                coordinates[hero.x][hero.y] = 0;
                hero.x++;
                hero.y++;
                coordinates[hero.x][hero.y] = hero;
            }
            else if (coordinates[hero.x+1][hero.y+1].currentHP > 0) 
            {
                attack(hero,coordinates[hero.x+1][hero.y+1]);
            }
        }    
    }
    
    hero.moveLeft = function()
    {
        if (hero.x-1>=0) 
        {
            if (coordinates[hero.x-1][hero.y] === 0) {
                coordinates[hero.x][hero.y] = 0;
                hero.x--;
                coordinates[hero.x][hero.y] = hero;
            }
            else if (coordinates[hero.x-1][hero.y].currentHP > 0) 
            {
                attack(hero,coordinates[hero.x-1][hero.y]);
            }
        }
    }
    
    hero.moveRight = function()
    {
        xLocation = hero.x+1;
        yLocation = hero.y;
        if (anItemIsAt(xLocation, yLocation))
        {
            itemOnGround = true;
        }
        else if (hero.x+1 < mapWidth) 
        {
            if (coordinates[hero.x+1][hero.y] === 0) {
                coordinates[hero.x][hero.y] = 0;
                hero.x++;
                coordinates[hero.x][hero.y] = hero;
            }
            else if (coordinates[hero.x+1][hero.y].currentHP > 0) 
            {
                attack(hero,coordinates[hero.x+1][hero.y]);
            }
        }
    }
        
    hero.moveUpAndLeft = function()
    {
        if ((hero.x-1>=0) && (hero.y-1>=0))
        {
            if (coordinates[hero.x-1][hero.y-1] === 0) {
                coordinates[hero.x][hero.y] = 0;
                hero.x--;
                hero.y--;
                coordinates[hero.x][hero.y] = hero;
            }
            else if (coordinates[hero.x-1][hero.y-1].currentHP > 0) 
            {
                attack(hero,coordinates[hero.x-1][hero.y-1]);
            }
        }
    }
    
    
    hero.moveUp = function()
    {
        if (hero.y-1>=0) 
        {
            if (coordinates[hero.x][hero.y-1] === 0) {
                coordinates[hero.x][hero.y] = 0;
                hero.y--;
                coordinates[hero.x][hero.y] = hero;
            }
            else if (coordinates[hero.x][hero.y-1].currentHP > 0) 
            {
                attack(hero,coordinates[hero.x][hero.y-1]);
            }
        }
    }
    
    hero.moveUpAndRight = function()
    {
        if ((hero.x+1<mapWidth) && (hero.y-1>=0))
        {
            if (coordinates[hero.x+1][hero.y-1] === 0) {
                coordinates[hero.x][hero.y] = 0;
                hero.x++;
                hero.y--;
                coordinates[hero.x][hero.y] = hero;
            }
            else if (coordinates[hero.x+1][hero.y-1].currentHP > 0) 
            {
                attack(hero,coordinates[hero.x+1][hero.y-1]);
            }
        } 
    }
}

function randomBarrier()
{
    var x, y, barriers = rollDice(15);
    for (var i = 0; i < barriers; i++) 
    {
        x = RNG(20);
        y = RNG(20);
        coordinates[x][y] = new being("images/bareTree.png", x, y);
        coordinates[x][y].currentHP = "10";
        coordinates[x][y].desc = "withered tree";
    }

    barriers = rollDice(15);
    for (var i = 0; i < barriers; i++) 
    {
        x = RNG(20);
        y = RNG(20);
        coordinates[x][y] = new being("images/evergreen.png", x, y);
        coordinates[x][y].currentHP = "25";
        coordinates[x][y].desc = "evergreen";
    }	
}




function randomInventory(possessor){
    console.log(weaponData);
    var weaponIndex = RNG(weaponData.length);
    possessor.inventory.push(weaponData[weaponIndex]);
    possessor.damage = weaponData[weaponIndex].damage;
    console.log(hero);
    var armorIndex = RNG(armorTable.length);
    possessor.inventory.push(armorTable[RNG(armorTable.length)]);
    possessor.armorClass = acTable[armorTable[armorIndex]];
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

//This now seems to work!
function saveData() 
{
    var imageData = new Image();
    imageData = hero.image;
    delete hero.image;
    //var stringified = JSON.stringify(hero);
    $.ajax({url:"processSave.php",
            type:"POST",
            data:"heroData=" + JSON.stringify(hero, null, " "),
            success: function(response) {alert(response);},
            error: function(){alert("Something went wrong dude");}
                });
                
    hero.image = imageData;
    console.log(hero);
}

//KEYHANDLER GET!!!
// -- AWWWWWW YEEEEAAAAAH
document.onkeypress=function(e)
{
    timePassed++;
    console.log("Turns: " + timePassed);
    
    cons.innerHTML = "";
    e=window.event || e;
    //Displays the key code you are trying to use, this is for debugging and also to determine what's what when you program functionality.
    console.log("CharCode value: "+e.charCode);
    keyPressed = e.charCode;

    /* Added a check to see if the space hero would move into has currentHp > 0, and if it does
     * he attacks it. Another way to do it is add an isEnemy true/false properties to being.
     * The shape of it changed because 1st and foremost we check to see if where he wants to go
     * is in the array, if it is we check to see if its empty, and if it isn't then we attack it.
     * This structure avoids all weird undefined runtime errors.
     * */
        
    if(hero.currentHP > 0 && equipMenu == false && itemOnGround == false)
    {
        //Makes a new monster every 50 turns
        if (timePassed % 50 == 0)
        {
            enemyLoader();
        }
        
        switch (keyPressed)
        {
            //Keyboard S (capital)
            // Throw Corellon's arrow
            case 83:
                throwArrow();
            break;

            //Move down and left - Numpad 1
            case 49:
                hero.moveDownAndLeft();
                break;

            //Move down - Numpad 2
            case 50:
                hero.moveDown();
                break;

            //Move down and right - Numpad 3
            case 51:
                hero.moveDownAndRight();
                break;

            //Move left - Numpad 4
            case 52:
                hero.moveLeft();
                break;

            //Wait a turn - Numpad 5
            case 53:
                cons.innerHTML += "You wait in anticipation...";
                break;

            //Move right - Numpad 6
            case 54:
                hero.moveRight();
                break;

            //Move up and left - Numpad 7
            case 55:
                hero.moveUpAndLeft();
                break;

            //Move up - Numpad 8
            case 56:
                hero.moveUp();
                break;

            //Move up and right - Numpad 9
            case 57:
                hero.moveUpAndRight();
                break;
            
            //Only for testing... - a
            case 97:
                hero.inventory.push("AWESOME THING");
                console.log("HERO INVENTORY LENGTH: " + hero.inventory.length);
                
                break;
            
            //Display Controls - c
            case 99:
                displayControls();
                break;
                
            //Drop Item - d
            case 100:
                //dropItem();
                break;
            
            //Equip Item - e
            case 101:
                displayInventory();
                equipMenu = true;
                break;
            
            //Display Inventory - i
            case 105:
                displayInventory();
                break;
                
            //Save Data - s
            case 115:
                saveData();
                console.log("saving data...");
                break;
        }
        if (keyPressed === 99 || keyPressed === 101 || keyPressed === 105|| keyPressed === 115) 
        {
            //Do nothing (don't move monsters)
        }
        else
        {
            for(var i = 0; i < enemyList.length; i++)
            {
                enemyBehavior(enemyList[i]);
            }
        }
        redrawCoordinates();
    }
    else if (equipMenu == true &&
            (keyPressed == 48 || keyPressed == 49 || keyPressed == 50 || keyPressed == 51 || 
             keyPressed == 52 || keyPressed == 53 || keyPressed == 54 || keyPressed == 55 || 
             keyPressed == 56 || keyPressed == 57 || keyPressed == 58 || keyPressed == 59 ))
    {
        equipItem(keyPressed);
    }
    else if(itemOnGround && (keyPressed == 89 || keyPressed == 78))
    {
        pickUpItem(keyPressed);
    }
    else
        cons.innerHTML = "You have died...";
};

function pickUpItem(keyPressed)
{
    switch (keyPressed)
    {
        case 89:
            if (hero.inventory.length < 9)
            {
                cons.innerHTML = "You pick up the " + coordinates[xLocation][yLocation].itemName;
                hero.inventory.push(coordinates[xLocation][yLocation]);
                coordinates[xLocation][yLocation] = 0;
            }
            else
            {
                cons.innerHTML += "You're carrying too much to pick up the " + coordinates[xLocation][yLocation].itemName + "!";
            }
            break;
        case 78:
            cons.innerHTML += "You leave it there.";
            break;
    }
    itemOnGround = false;
}

function anItemIsAt(x, y)
{
    if (coordinates[x][y].itemName)
    {
        cons.innerHTML += "There is a " + coordinates[x][y].itemName + " here.<br/>";
        cons.innerHTML += "Do you wish to pick it up? Y/N";
        
        return true;
    }
    else 
    {
        return false;
    }
}

function equipItem(keyPressed)
{
    displayInventory();
    var haveItem = true;

    if(hero.inventory.length < keyPressed - 48)
    {
        haveItem = false;
        cons.innerHTML += "You don't have an item in that slot!";
    }

    if (haveItem)
    {
       switch(keyPressed)
        {
            case 49:
                cons.innerHTML += "You equip the " + hero.inventory[0].itemName + ".";
                break;
            case 50:
                cons.innerHTML += "You equip the " + hero.inventory[1].itemName + ".";
                break;
            case 51:
                cons.innerHTML += "You equip the " + hero.inventory[2].itemName + ".";
                break;
            case 52:
                cons.innerHTML += "You equip the " + hero.inventory[3].itemName + ".";
                break;
            case 53:
                cons.innerHTML += "You equip the " + hero.inventory[4].itemName + ".";
                break;
            case 54:
                cons.innerHTML += "You equip the " + hero.inventory[5].itemName + ".";
                break;
            case 55:
                cons.innerHTML += "You equip the " + hero.inventory[6].itemName + ".";
                break;
            case 56:
                cons.innerHTML += "You equip the " + hero.inventory[7].itemName + ".";
                break;
            case 57:
                cons.innerHTML += "You equip the " + hero.inventory[8].itemName + ".";
                break;
            default:
                cons.innerHTML += "Never mind...";
                break;
        } 
    }

    equipMenu = false;
    
    for(var i = 0; i < enemyList.length; i++)
    {
        enemyBehavior(enemyList[i]);
    }
    redrawCoordinates();
}

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
