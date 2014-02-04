//TODO: 
//Random Forest level
//EQUIP function
//Wandering monster behavior
//Enemy behavior case statement for different enemies, default being normal behavior
//random movement between 1 and 10 1 - 2 do something 3 - 4 do something etc
//Make sure equip function ADDS to 10 




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
var timePassed = 0;

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

function quadrantOneLoader()
{
    //dungeon quadrant one
    var x = 0;
    var y = 10;
    coordinates[x + 1][y + 1] = new environment();
    coordinates[x + 1][y + 1].image.src = "images/column.png";
    coordinates[x + 3][y + 1] = new environment();
    coordinates[x + 3][y + 1].image.src = "images/column.png";
    coordinates[x + 1][y + 3] = new environment();
    coordinates[x + 1][y + 3].image.src = "images/brokenColumn.png";
    coordinates[x + 3][y + 3] = new environment();
    coordinates[x + 3][y + 3].image.src = "images/column.png";
    coordinates[x + 2][y + 2] = new environment();
    coordinates[x + 2][y + 2].image.src = "images/altar.png";
    
    coordinates[x + 1][y + 6] = new environment();
    coordinates[x + 1][y + 6].image.src = "images/rockWall.png";
    coordinates[x + 1][y + 8] = new environment();
    coordinates[x + 1][y + 8].image.src = "images/rockWall.png";
    coordinates[x + 5][y + 6] = new environment();
    coordinates[x + 5][y + 6].image.src = "images/rockWall.png";
    coordinates[x + 5][y + 8] = new environment();
    coordinates[x + 5][y + 8].image.src = "images/rockWall.png";
    
    coordinates[x + 3][y + 7] = new environment();
    coordinates[x + 3][y + 7].image.src = "images/candelabra.png";
    
    for (var i = 5; i < 9; i++)
    {
        coordinates[x + i][y + 4] = new environment();
        coordinates[x + i][y + 4].image.src = "images/rockWall.png";
    }
    
    for (var i = 1; i < 6; i++)
    {
        coordinates[x + i][y + 5] = new environment();
        coordinates[x + i][y + 5].image.src = "images/rockWall.png";
    }
    
    for (var i = 0; i < 5; i++)
    {
        coordinates[x + 9][y + i] = new environment();
        coordinates[x + 9][y + i].image.src = "images/rockWall.png";
    }
    
    for (var i = 1; i < 6; i++)
    {
        coordinates[x + i][y + 9] = new environment();
        coordinates[x + i][y + 9].image.src = "images/rockWall.png";
    }
}

function quadrantTwoLoader()
{
    //dungeon quadrant two
    var x = 0;
    var y = 0;
    
    for (var i = 0; i < 10; i++)
    {
        if (i % 2 === 1 && i != 3)
        {
            coordinates[x + i][y + 1] = new environment();
            coordinates[x + i][y + 1].image.src = "images/column.png";
        }
        else if (i % 2 === 1)
        {
            coordinates[x + i][y + 1] = new environment();
            coordinates[x + i][y + 1].image.src = "images/brokenColumn.png";
        }
    }
    
    for (var i = 0; i < 10; i++)
    {
        if (i % 2 === 0 && i !== 8)
        {
            coordinates[x + i][y + 3] = new environment();
            coordinates[x + i][y + 3].image.src = "images/column.png";
        }
        else if (i % 2 === 0)
        {
            coordinates[x + i][y + 3] = new environment();
            coordinates[x + i][y + 3].image.src = "images/brokenColumn.png";
        }
    }
    
    for (var i = 0; i < 10; i++)
    {
        if (i % 2 === 0 && i !== 4)
        {
            coordinates[x + i][y + 7] = new environment();
            coordinates[x + i][y + 7].image.src = "images/column.png";
        }
        else if (i % 2 === 0)
        {
            coordinates[x + i][y + 7] = new environment();
            coordinates[x + i][y + 7].image.src = "images/brokenColumn.png";
        }
    }
    
    for (var i = 0; i < 10; i++)
    {
        if (i % 2 === 1 && i !== 7)
        {
            coordinates[x + i][y + 9] = new environment();
            coordinates[x + i][y + 9].image.src = "images/column.png";
        }
        else if (i % 2 === 1)
        {
            coordinates[x + i][y + 9] = new environment();
            coordinates[x + i][y + 9].image.src = "images/brokenColumn.png";
        }
    }
    
    coordinates[x + 1][y + 5] = new environment();
    coordinates[x + 1][y + 5].image.src = "images/stocks.png";
    
    coordinates[x + 4][y + 5] = new environment();
    coordinates[x + 4][y + 5].image.src = "images/candelabra.png";
    
    coordinates[x + 7][y + 5] = new environment();
    coordinates[x + 7][y + 5].image.src = "images/stocks.png";
    
}

//console.log(monsterData[rollDice(10)]);

function quadrantThreeLoader()
{
    //dungeon quadrant three
    var x = 10;
    var y = 10;
    for (var i = 1; i <= 6; i++)
    {
        coordinates[x + i][y + 1] = new environment();
        coordinates[x + i][y + 1].image.src = "images/rockWall.png"; 
    }
    
    for (var i = 1; i <= 9; i++)
    {
        if (i != 4)
        {
            coordinates[x + 6][y + i] = new environment();
            coordinates[x + 6][y + i].image.src = "images/rockWall.png";
        }
        else
        {
            coordinates[x + 6][y + 4] = new environment();
            coordinates[x + 6][y + 4].image.src = "images/vaultDoor.png";
        }
    }
    
    for (var i = 2; i <= 9; i++)
    {
        coordinates[x + i][y + 6] = new environment();
        coordinates[x + i][y + 6].image.src = "images/rockWall.png";
    }
    
    for (var i = 2; i <= 6; i++)
    {
        coordinates[x + 1][y + i] = new environment();
        coordinates[x + 1][y + i].image.src = "images/rockWall.png";
    }
    
    
    for (var i = 6; i <= 9; i++)
    {
        if (i != 8)
        {
            coordinates[x + i][y + 6] = new environment();
            coordinates[x + i][y + 6].image.src = "images/rockWall.png";
        }
        else
        {
            coordinates[x + i][y + 6] = new environment();
            coordinates[x + i][y + 6].image.src = "images/vaultDoor.png";
        }
    }
    
    
    for (var i = 6; i <= 9; i++)
    {
        coordinates[x + i][y + 9] = new environment();
        coordinates[x + i][y + 9].image.src = "images/rockWall.png";
    }
    
    for (var i = 6; i <= 9; i++)
    {
        coordinates[x + 9][y + i] = new environment();
        coordinates[x + 9][y + i].image.src = "images/rockWall.png";
    }
    
    coordinates[x + 7][y + 3] = new environment();
    coordinates[x + 7][y + 3].image.src = "images/weaponRack.png";
    
    coordinates[x + 7][y + 5] = new environment();
    coordinates[x + 7][y + 5].image.src = "images/weaponRack.png";
    
    coordinates[x + 8][y + 8] = new environment();
    coordinates[x + 8][y + 8].image.src = "images/closedChest.png";
}

function quadrantFourLoader()
{
    //dungeon quadrant four
    var x = 10;
    var y = 0;
    for (var i = 1; i <= 8; i++)
    {
        if (i !== 4 && i !== 5)
        {
            coordinates[x + 3][y + i] = new environment();
            coordinates[x + 3][y + i].image.src = "images/candelabra.png";
        }
    }
    for (var i = 1; i <= 8; i++)
    {
        if (i !== 4 && i !== 5)
        {
            coordinates[x + 6][y + i] = new environment();
            coordinates[x + 6][y + i].image.src = "images/candelabra.png";
        }
    }
    for (var i = 1; i <= 8; i++)
    {
        if (i !== 4 && i !== 5)
        {
            coordinates[x + i][y + 6] = new environment();
            coordinates[x + i][y + 6].image.src = "images/candelabra.png";
        }
    }
    for (var i = 1; i <= 8; i++)
    {
        if (i !== 4 && i !== 5)
        {
            coordinates[x + i][y + 3] = new environment();
            coordinates[x + i][y + 3].image.src = "images/candelabra.png";
        }
    }   
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
    quadrantOneLoader();
    quadrantTwoLoader();
    quadrantThreeLoader();
    quadrantFourLoader();
    randomBarrier();
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
        cons.innerHTML += (i+1) + "..." + hero.inventory[i] + "<br/>";
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
    //randomInventory(enemy);
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
    //enemyList.push(enemy);
    //console.log("Here:");
    //console.log(enemyList);
    //console.log(enemy);
    enemyIncrementer++;
}

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
    var weaponIndex = RNG(weaponTable.length);
    possessor.inventory.push(weaponTable[weaponIndex]);
    possessor.damage = damageTable[weaponTable[weaponIndex]];

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
     * is in the array, if it is we check to see if its empy, and if it isn't then we attack it.
     * This structure avoids all weird undefined runtime errors.
     * */
    // S activates throwArrow(); 
    //TODO: Only move monsters if the keypressed is a movement command
    if(hero.currentHP > 0 && equipMenu == false)
    {
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
                
            case 115:
                saveData();
                console.log("saving data...");
                break;
        }
        if (keyPressed === 99 
         || keyPressed === 101 
         || keyPressed === 105
         || keyPressed === 115) 
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
        
        if (timePassed % 50 == 0)
        {
            enemyLoader();
        }
        
        redrawCoordinates();
    }
    else if (equipMenu == true  
            &&(keyPressed == 48
            || keyPressed == 49
            || keyPressed == 50
            || keyPressed == 51
            || keyPressed == 52
            || keyPressed == 53
            || keyPressed == 54
            || keyPressed == 55
            || keyPressed == 56
            || keyPressed == 57
            || keyPressed == 58
            || keyPressed == 59))
    {
        displayInventory();
        switch(keyPressed)
        {
            case 48:
                cons.innerHTML += "You equip item in slot ten";
                break;
            case 49:
                cons.innerHTML += "You equip item in slot one";
                break;
            case 50:
                cons.innerHTML += "You equip item in slot two";
                break;
            case 51:
                cons.innerHTML += "You equip item in slot three";
                break;
            case 52:
                cons.innerHTML += "You equip item in slot four";
                break;
            case 53:
                cons.innerHTML += "You equip item in slot five";
                break;
            case 54:
                cons.innerHTML += "You equip item in slot six";
                break;
            case 55:
                cons.innerHTML += "You equip item in slot seven";
                break;
            case 56:
                cons.innerHTML += "You equip item in slot eight";
                break;
            case 57:
                cons.innerHTML += "You equip item in slot nine";
                break;
            case 58:
                cons.innerHTML += "You equip item in slot ten";
                break;
        }
        
        equipMenu = false;
        for(var i = 0; i < enemyList.length; i++)
        {
            enemyBehavior(enemyList[i]);
        }
        redrawCoordinates();
    }
    else
        cons.innerHTML = "You have died...";
    
    
    
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


//Do a new dungeon here



//Possible future code, now deprecated. Needs to change. 
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
/*
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
*/