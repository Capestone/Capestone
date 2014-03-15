//TODO:
/*
 * NEED: Collision detection on load AND monster population
 * NEED: Stairs -- looking good
 * NEED: Final Level 
 */



function updateHTMLStats()
{
    var currentHP = parseInt(hero.currentHP);
    var maxHP = parseInt(hero.maxHP) + parseInt(hero.equippedHealth);
    var armorClass = parseInt(hero.armorClass) + parseInt(hero.equippedArmorClass); 
    var attackBonus = parseInt(hero.attackBonus) + parseInt(hero.equippedAttackBonus);
    var damage = parseInt(hero.damage) + parseInt(hero.equippedDamage);
    
    
    descriptionID.innerHTML = hero.desc;
    currentHPID.innerHTML = currentHP;
    maxHPID.innerHTML = maxHP;
    armorClassID.innerHTML = armorClass;
    attackBonusID.innerHTML = attackBonus;
    damageID.innerHTML = damage;
    dungeonLevelID.innerHTML = dungeonLevel; 
}

////Event handlers
window.onload = autoLoader;
////Canvas and console variables
var canvas = document.getElementById("idCanvas");
var context = canvas.getContext("2d");
var cons = document.getElementById("idConsole");
var dungeonCode = new Array();
var enemyIncrementer = 0;
//enemyList['enemy' + enemyIncrementer] = new being();

//Hero statistic variables, for the user to see
var descriptionID = document.getElementById("description");
var currentHPID = document.getElementById("currentHP");
var maxHPID = document.getElementById("maxHP");
var armorClassID = document.getElementById("armorClass");
var attackBonusID = document.getElementById("attackBonus");
var damageID = document.getElementById("damage");
var dungeonLevelID = document.getElementById("dungeonLvl"); 

////Global variables
var xSize = 16;
var ySize = 24;
var mapWidth = 20;
var mapHeight = 20;
var widthPixels = 320;
var heightPixels = 480;
var enemyList = new Array();
var dungeonLevel = heroData.dungeonLevel; 
var monstersOnThisLevel = new Array();
var chest = false;
var timePassed = 0;
var xLocation, yLocation;
var itemOnGround = new interactive();
var equipMenu = new interactive();
var chestCheck = new interactive();
var doorCheck = new interactive();
var quaffPotionCheck = new interactive();
var chestItemCheck = new interactive();
var dropItemCheck = new interactive();
var stairsUp = new environment();
var stairsDown = new environment();
var stairsCheck = new interactive();
var itemLocationX = 0;
var itemLocationY = 0;
var finalLevel;
var endgame = false;
var capestone = false;

////Object instantiation
var hero = "";
var enemy = new being("images/octopod.png", mapWidth-1, mapHeight-1); //----dont need this----
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

var actorCoordinates = new Array(mapWidth);
for (var i = 0; i <mapWidth; i++) {
    actorCoordinates[i] = new Array(mapHeight);          
}

//sets array to 0 which is not an object
for (var i=0; i<mapWidth; i++) {
    for (var j=0; j<mapHeight; j++) {
        actorCoordinates[i][j] = 0;
    }
}

function interactive()
{
    this.action = false;
    this.booleanValue = false;
    this.x = 0;
    this.y = 0;
}

////Functions (alphabetical)
function startGame()
{
    displayControls();
    cons.innerHTML += "Welcome to Capestone.<br/>";
    cons.innerHTML += "Press enter to start.";
}


function placeStairs()
{
    //console.log(dungeonLevel);
    if (dungeonLevel != 0 && capestone == false)
    {
        stairsUp.image.src = "images/stairsUp.png";
        stairsUp.desc = "ascending stairs";
        stairsUp.x = RNG(20);
        stairsUp.y = RNG(20);
        coordinates[stairsUp.x][stairsUp.y] = stairsUp;
    }
    else
    {
        stairsUp.image.src = "images/stairsUp.png";
        stairsUp.desc = "ascending stairs";
        stairsUp.x = RNG(20);
        stairsUp.y = RNG(20);
        coordinates[stairsUp.x][stairsUp.y] = stairsUp;
    }
    
    if (dungeonLevel != 6)
    {
        stairsDown.image.src = "images/stairsDown.png";
        stairsDown.desc = "descending stairs";
        stairsDown.x = RNG(20);
        stairsDown.y = RNG(20);
        coordinates[stairsDown.x][stairsDown.y] = stairsDown;
    }
    
}


function environment()
{
    this.image = new Image();
    this.armorClass = 0;
    this.booleanValue = false;
    this.currentHP = 0;
    this.desc = "";
    this.inventory = new Array();
    this.open = false;
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
    this.itemID = "";
    this.itemName = "";
    this.itemType = "";
    this.type = "";
    this.equipped = 0; // ----this was causing that undifined because picked up items never get the equipped value unless we equip them----
}

function updateItemData()
{
    for (var i = 0; i < itemData.length; i++)
    {
        var cache = new item();
        cache.action = itemData[i]['action'];
        cache.armorClass = itemData[i]['armorClass'];
        cache.attackBonus = itemData[i]['attackBonus'];
        cache.damage = itemData[i]['damage'];
        cache.description = itemData[i]['description'];
        cache.health = itemData[i]['health'];
        cache.itemID = itemData[i]['itemID'];
        cache.itemName = itemData[i]['itemName'];
        cache.itemType = itemData[i]['itemType'];
        cache.type = itemData[i]['type'];
        cache.probability = itemData[i]['probability'];
        itemData[i] = cache;
    }
}


/*
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
*/

function getRandomDungeon()
{
    if (hero.dungeonLevel == 6)
    {
        finalLevel();
    }
    else if (hero.dungeonLevel == -1)
    {
        cons.innerHTML = "YOU ARE WINNER";
    }
    else
    {
        var quadrantOne = RNG(dungeonCode.length);
        var quadrantTwo = RNG(dungeonCode.length);
        var quadrantThree = RNG(dungeonCode.length);
        var quadrantFour = RNG(dungeonCode.length);

        while (quadrantOne == quadrantTwo)
        {
            quadrantTwo = RNG(dungeonCode.length);
        }

        while (quadrantOne == quadrantThree || quadrantTwo == quadrantThree)
        {
            quadrantThree = RNG(dungeonCode.length);
        }

        while (quadrantOne == quadrantFour || quadrantTwo == quadrantFour || quadrantThree == quadrantFour)
        {
            quadrantFour = RNG(dungeonCode.length);
        }

        dungeonCode[quadrantOne](0,0);
        dungeonCode[quadrantTwo](10, 0);
        dungeonCode[quadrantThree](0, 10);
        dungeonCode[quadrantFour](10, 10);
    }
}

//Attack function
function attack(assailant, defender)
{
    cons.innerHTML += assailant.desc + " attacks " + defender.desc + "!<br/>";
    attackDie = rollDice(20);
    cons.innerHTML += "They rolled " + attackDie + ".";
    if (attackDie === 1) //Critical miss
    {
        cons.innerHTML += "<br/>What a poor excuse for an attack! They widely miss and stagger!!";
    } 

    else if (attackDie === 20) //Critical Threat
    {
        cons.innerHTML += "<br/>A critical threat!";
        attackDie = rollDice(20) + (assailant.attackBonus + assailant.equippedAttackBonus);
        if (attackDie >= defender.armorClass + defender.equippedArmorClass)
        {
            cons.innerHTML += "<br/>Oho! They scored an excellent hit!!";
            damageDie = rollDice(parseInt(assailant.damage) + parseInt(assailant.equippedDamage)) * 2;
            cons.innerHTML += "<br/>They did " + damageDie + " damage!!";
            defender.currentHP -= damageDie;
        } 
        else 
        {
            cons.innerHTML += "<br/>But it did not confirm.";
            damageDie = rollDice(parseInt(assailant.damage) + parseInt(assailant.equippedDamage));
            cons.innerHTML += "<br/>They hit for " + damageDie + " damage.";
            defender.currentHP -= damageDie;
        }	  
    } 
    else if ((attackDie + assailant.attackBonus + assailant.equippedAttackBonus) >= (defender.armorClass + defender.equippedArmorClass))
    {
        cons.innerHTML += "<br/>They scored a hit!";
        damageDie = rollDice(parseInt(assailant.damage) + parseInt(assailant.equippedDamage));
        cons.innerHTML += "<br />They did " + damageDie + " damage.";
        defender.currentHP -= damageDie;
    }
    else 
    {
        cons.innerHTML += "<br />They missed!!";
    }
    cons.innerHTML += "<br/>";
    checkDeath(assailant, defender);
    
}


//Autoloader function
function autoLoader()
{
    heroLoader();
    console.log(hero.dungeonLevel);
    if (hero.dungeonLevel == 6)
    {
        endgame = true;
    }
    
    if (endgame)
    {
        canvasBackground();
        //heroLoader();
        updateHTMLStats();
        dungeonLoader();
        finalLevel();
        redrawCoordinates();
    }
    else
    {
        updateItemData();
        canvasBackground();
        dungeonLoader();
        getRandomDungeon();
        updateMonsterArray();
        enemyLoader();
        //heroLoader();
        updateHTMLStats();
        placeStairs();
        startGame();
    }
}


//Being object
function being(image, xValue, yValue, options) 
{
    this.image = new Image();
    this.armorClass = 0;
    this.attackBonus = 0;
    this.currentHP = 0;
    this.damage = 0;
    this.equippedArmorClass = 0;
    this.equippedAttackBonus = 0;
    this.equippedDamage = 0;
    this.equippedHealth = 0;
    this.desc = "";
    this.image.src = image;
    this.inventory = new Array();
    this.maxHP = 0;
    this.pass = false;
    this.type = "";
    this.x = xValue;
    this.y = yValue;

    //Pass it where you WANT to move
    this.move = function(x, y)
    {

        //To check if environment is populated...
        if ((coordinates[x][y] == 0 || coordinates[x][y].pass == true) && actorCoordinates[x][y] == 0) /*)*/
        {
            
            actorCoordinates[this.x][this.y] = 0;
            this.x = x;
            this.y = y;
            actorCoordinates[this.x][this.y] = this;
        }
        //To check if monster or player is there
        else if ((actorCoordinates[x][y].currentHP + actorCoordinates[x][y].equippedHealth) > 0)
        {
            attack(this, actorCoordinates[x][y]);
        }
        //to check if it's a door
        else if (coordinates[x][y].type == 'door')
        {
            if (this.type == "hero")
            {
                cons.innerHTML += "There is a door here. Do you wish to open it? Y/N";
                doorCheck.booleanValue = true;
                doorCheck.x = x;
                doorCheck.y = y;
            }
            else
            {
                cons.innerHTML += "The " + this.desc + " opens the door...";
                coordinates[x][y].image.src = "images/openVaultDoor.png";
                coordinates[x][y].pass = true;
            }
        }
        else if (coordinates[x][y].itemName == 'treasure chest')
        {
            if (this.type == "hero" && coordinates[x][y].open == false)
            {
                cons.innerHTML += "There is a treasure chest here. <br/>Do you wish to open it? Y/N"
                chestCheck.booleanValue = true;
                chestCheck.x = x;
                chestCheck.y = y;
                coordinates[x][y].open = true;
            }
            else if (this.type == "hero" && coordinates[x][y].open && chestItemCheck.booleanValue == false && coordinates[x][y].inventory[0])
            {
                cons.innerHTML += "There is a " + coordinates[x][y].inventory[0].itemName + " inside the chest.<br/>";
                cons.innerHTML += "Do you want to pick it up? Y/N";
                chestItemCheck.booleanValue = true;
            }
        }
        // == 'Weapon' || coordinates[x][y].itemType == 'Armor' || coordinates[x][y].itemType == 'Potion'
        else if (anItemIsAt(x, y))
        {
            itemOnGround.booleanValue = true;
            itemOnGround.x = x;
            itemOnGround.y = y;
        }
        else if (coordinates[x][y].desc == "ascending stairs" && this.type == "hero")
        {
            stairsCheck.action = "ascending";
            stairsCheck.booleanValue = true;
            stairsCheck.x = x;
            stairsCheck.y = y;
            cons.innerHTML += "There are " + coordinates[x][y].desc + " here. <br/>Do you wish to use them? Y/N";
        }
        else if (coordinates[x][y].desc == "descending stairs" && this.type == "hero")
        {
            stairsCheck.action = "descending";
            stairsCheck.booleanValue = true;
            stairsCheck.x = x;
            stairsCheck.y = y;
            cons.innerHTML += "There are " + coordinates[x][y].desc + " here. <br/>Do you wish to use them? Y/N";
        }
        //Otherwise...
        else
        {
            if (this.type == "hero")
            {
                cons.innerHTML += "Something blocks your way.";
            }
        }
        
        //also we could add an else if for items or whatever
    }
}



function canvasBackground()
{
    context.fillStyle = "#212121";
    context.fillRect(0, 0, widthPixels, heightPixels);

    //context.globalCompositeOperation = "source-over";
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
    if (defender.type == 'hero' && (defender.currentHP) <= 0)
    {
        defender.image.src = "";
        cons.innerHTML += "The hero has been struck down by " + assailant.desc + ". All hope is lost." ;
        redrawCoordinates();
    }
    else if ((defender.currentHP) <= 0) {
        actorCoordinates[defender.x][defender.y] = 0;
        enemyList[defender.index].image.src = "";
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
        cons.innerHTML += (i+1) + "..." + hero.inventory[i].itemName;
        if (hero.inventory[i].equipped)
        {
            cons.innerHTML += " (equipped)";
        }
        cons.innerHTML += "<br/>";
    }
}

//Enemy Behavior function
function enemyBehavior(creature)
{
    if ((Math.abs(creature.x - hero.x)) < 10 && ((Math.abs(creature.y - hero.y)) < 10 && creature.currentHP > 0))
    {   
        //Compare the x and y values of hero and enemy and if hero x value is less than enemy x value, move left etc.
        //Move right towards the hero
        if (hero.x > creature.x)
        {
            creature.move(creature.x+1, creature.y);
        }
        //Move left towards the hero
        if (hero.x < creature.x)
        {
            creature.move(creature.x-1, creature.y);
        }
        //Move down towards the hero
        if (hero.y > creature.y)
        {
            creature.move(creature.x, creature.y+1);
        }
        //Move up towards the hero
        if (hero.y < creature.y)
        {
            creature.move(creature.x, creature.y-1);
        }
    }
    //Otherwise, wander around until you find something of interest to attack
    else if (creature.currentHP > 0)
    {
        //TODO: Get enemy to move in random directions until it finds something 
    }
    //coordinates[creatureList.x][creatureList.y] = creatureList;
}

function updateMonsterArray()
{
    //console.log("inside update monster array " + monsterData);
    for (var i = 0; i < monsterData.length; i++)
    {
        if (monsterData[i]['dungeonLevel'] == dungeonLevel)
        {
            monstersOnThisLevel.push(monsterData[i]);
        }
    }
}

function enemyLoader()
{
    //Enemy attributes
    //console.log("inside enemyLoader monsterOnThisLevel: " + monstersOnThisLevel[0]);
    var randomMonster = monstersOnThisLevel[RNG(monstersOnThisLevel.length)];
    enemyList[enemyIncrementer] = new being(randomMonster.imagePath);
    enemyList[enemyIncrementer].armorClass = parseInt(randomMonster.armorClass);
    enemyList[enemyIncrementer].equippedArmorClass = 0;
    enemyList[enemyIncrementer].attackBonus = parseInt(randomMonster.attackBonus);
    enemyList[enemyIncrementer].equippedAttackBonus = 0;
    enemyList[enemyIncrementer].currentHP = parseInt(randomMonster.currentHP);
    enemyList[enemyIncrementer].damage = parseInt(randomMonster.damage);
    enemyList[enemyIncrementer].desc = randomMonster.monsterName;
    //enemyList[enemyIncrementer].image.src = randomMonster.imagePath;
    enemyList[enemyIncrementer].maxHP = parseInt(randomMonster.maxHP);
    enemyList[enemyIncrementer].pass = randomMonster.pass;
    enemyList[enemyIncrementer].index = enemyIncrementer;
    
    //Going to need to change this so the monster doesn't get added on top of a tile
    //Just need to check the matrix first
    randomX = RNG(20);
    randomY = RNG(20);
    
    while (coordinates[randomX][randomY] != 0 || actorCoordinates[randomX][randomY] != 0)
    {
        console.log("Finding new position for enemy...");
        randomX = RNG(20);
        randomY = RNG(20);
    }
    
    enemyList[enemyIncrementer].x = randomX;
    enemyList[enemyIncrementer].y = randomY;

    actorCoordinates[enemyList[enemyIncrementer].x][enemyList[enemyIncrementer].y] = enemyList[enemyIncrementer];
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

// --------remove this --------------
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
    //randomInventory(hero);
    
    hero.armorClass = parseInt(heroData.armorClass);
    hero.attackBonus = parseInt(heroData.attackBonus);
    hero.currentHP = parseInt(heroData.currentHP);
    hero.desc = heroData.description;
    hero.damage = 1;
    var addArmorClass = 0, addAttackBonus = 0, addDamage = 0, addHealth = 0;
    for (var i = 0; i < inventoryItems.length; i++)
    {
        if (inventoryItems[i].equipped == 1)
        {
            addArmorClass += parseInt(inventoryItems[i].armorClass);
            addAttackBonus += parseInt(inventoryItems[i].attackBonus);
            addDamage += parseInt(inventoryItems[i].damage);
            addHealth += parseInt(inventoryItems[i].health);
        }
        
        //This just makes it display correctly, instead of an Object it's now an item
        var currentItem = new item();
        currentItem = inventoryItems[i];
        hero.inventory.push(currentItem);
    }
    hero.dungeonLevel = dungeonLevel;
    hero.equippedAttackBonus = addAttackBonus;
    hero.equippedArmorClass = addArmorClass;
    hero.equippedDamage = addDamage;
    hero.equippedHealth = addHealth;
    
    
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
    hero.type = "hero";
    hero.x = parseInt(heroData.x);
    hero.y = parseInt(heroData.y);
    
    checkCollision(hero);
    
    
    actorCoordinates[hero.x][hero.y] = hero;
    
}

function checkCollision(actor)
{
    randomX = RNG(20);
    randomY = RNG(20);
    
    while (coordinates[actor.x][actor.y] != 0 || actorCoordinates[actor.x][actor.y] != 0)
    {
        console.log("Finding new position...");
        randomX = RNG(20);
        randomY = RNG(20);
        hero.x = randomX;
        hero.y = randomY;
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



/*
function randomInventory(possessor)
{
    var weaponIndex = RNG(weaponData.length);
    possessor.inventory.push(weaponData[weaponIndex]);
    possessor.damage = weaponData[weaponIndex].damage;
    var armorIndex = RNG(armorTable.length);
    possessor.inventory.push(armorTable[RNG(armorTable.length)]);
    possessor.armorClass = acTable[armorTable[armorIndex]];
}
*/

function redrawCoordinates() 
{
    canvasBackground();
    for (var i=0; i < mapWidth; i++) {
        for (var j=0; j < mapHeight; j++) {
            if (coordinates[i][j] !== 0) {
                context.drawImage(coordinates[i][j].image, i*xSize, j*ySize);
                
                context.drawImage(hero.image, hero.x*xSize, hero.y*ySize);
                for (var k = 0; k < enemyList.length; k++)
                {
                    context.drawImage(enemyList[k].image, enemyList[k].x*xSize, enemyList[k].y*ySize);
                }
                
            }
        }
    }  
    updateHTMLStats();
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
    if (stairsCheck.action == "ascending")
    {
        dungeonLevel--;
    }
    else
    {
        dungeonLevel++;
    }
    
    var itemIDs = new Array();
    var equipped = new Array();
    for (var i = 0; i < hero.inventory.length; i++)
    {
        itemIDs.push(hero.inventory[i].itemID);
        equipped.push(hero.inventory[i].equipped); // we want equipped no matter what
    }
    //console.log(itemIDs);
    //console.log(equipped);
    hero.itemIDs = itemIDs;
    hero.equipped = equipped;
    hero.dungeonLevel = dungeonLevel; //need this to save in hero table 
    
    //var imageData = new Image();
    //var move = hero.move;
    //delete hero.move;
    imageData = hero.image;
    var tempInventory = hero.inventory;
    delete hero.image;
    delete hero.inventory;
    //var stringified = JSON.stringify(hero);
    $.ajax({url:"processSave.php",
            type:"POST",
            data:"heroData=" + JSON.stringify(hero, null, " "),
            success: function(response) {console.log(response);},
            error: function(){alert("Something went wrong dude");} // keep this forever!!!!
                });
    //hero.move = move;
    hero.image = imageData;
    hero.inventory = tempInventory;
    changeLevel();
    redrawCoordinates();
    
    //window.location.reload(true);  // this is what is causing the error i think because the php isnt finished like we thought it would
}

//KEYHANDLER GET!!!
// -- AWWWWWW YEEEEAAAAAH
document.onkeypress=function(e)
{
    timePassed++;
    
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
    if(hero.currentHP && 
            !equipMenu.booleanValue && 
            !itemOnGround.booleanValue && 
            !doorCheck.booleanValue && 
            !chestCheck.booleanValue && 
            !chestItemCheck.booleanValue && 
            !stairsCheck.booleanValue &&
            !dropItemCheck.booleanValue &&
            !quaffPotionCheck.booleanValue)
    {
        //Makes a new monster every 50 turns
        if (timePassed % 50 == 0)
        {
            enemyLoader();
        }
        
        //Gives the hero regenerative health every 25 turns
        if (timePassed % 25 == 0)
        {
            if (hero.currentHP < hero.maxHP)
            {
                hero.currentHP += RNG(5);
            }
            if (hero.currentHP > hero.maxHP)
            {
                hero.currentHP = hero.maxHP;
            }
            
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
                hero.move(hero.x-1, hero.y+1);
                break;

            //Move down - Numpad 2
            case 50:
                hero.move(hero.x, hero.y+1);
                break;

            //Move down and right - Numpad 3
            case 51:
                hero.move(hero.x+1, hero.y+1);
                break;

            //Move left - Numpad 4
            case 52:
                hero.move(hero.x-1, hero.y);
                break;

            //Wait a turn - Numpad 5
            case 53:
                cons.innerHTML += "You wait in anticipation...";
                break;

            //Move right - Numpad 6
            case 54:
                hero.move(hero.x+1, hero.y);
                break;

            //Move up and left - Numpad 7
            case 55:
                hero.move(hero.x-1, hero.y-1);
                break;

            //Move up - Numpad 8
            case 56:
                hero.move(hero.x, hero.y-1);
                break;

            //Move up and right - Numpad 9
            case 57:
                hero.move(hero.x+1, hero.y-1);
                break;
            
            //Only for testing... - a
            case 97:
                //console.log(hero);
                break;
            
            //Display Controls - c
            case 99:
                displayControls();
                break;
                
            //Drop Item - d
            case 100:
                displayInventory();
                dropItemCheck.booleanValue = true;
                break;
            
            //Equip Item - e
            case 101:
                displayInventory();
                equipMenu.booleanValue = true;
                break;
            
            //Display Inventory - i
            case 105:
                displayInventory();
                break;
            
            //Quaff potion - q
            case 113:
                displayInventory();
                quaffPotionCheck.booleanValue = true;
                break;
                
            //Save Data - s
            case 115:
                //saveData(); //---------------------------commented this out for production server------------------
                //changeLevel();
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
    else if (quaffPotionCheck.booleanValue)
    {
        quaffPotion(keyPressed);
    }
    else if (dropItemCheck.booleanValue)
    {
        dropItem(keyPressed);
    }
    else if (doorCheck.booleanValue)
    {
        openDoor(keyPressed);
        redrawCoordinates();
    }
    else if (chestCheck.booleanValue)
    {
        openChest(keyPressed);
        redrawCoordinates();
    }
    else if (chestItemCheck.booleanValue)
    {
        getChestItem(keyPressed);
    }
    else if (equipMenu.booleanValue &&
            (keyPressed == 48 || keyPressed == 49 || keyPressed == 50 || keyPressed == 51 || 
             keyPressed == 52 || keyPressed == 53 || keyPressed == 54 || keyPressed == 55 || 
             keyPressed == 56 || keyPressed == 57 || keyPressed == 58 || keyPressed == 59 ))
    {
        while (equipMenu.booleanValue)
        {
            equipItem(keyPressed);
        }
    }
    else if (itemOnGround.booleanValue && (keyPressed == 89 || keyPressed == 78 || keyPressed == 121 || keyPressed == 110 ))
    {
        while (itemOnGround.booleanValue)
        {
            pickUpItem(keyPressed);
        }
    }
    else if (stairsCheck.booleanValue &&
            (keyPressed == 89 || keyPressed == 78 || keyPressed == 121 || keyPressed == 110 ))
    {
        traverseStairs(keyPressed);
    }
    
    
    else if (parseInt(hero.currentHP + hero.equippedHealth) <= 0)
        cons.innerHTML = "You have died...";
}


function dropItem(keyPressed)
{
    if(hero.inventory.length < keyPressed - 48)
    {
        cons.innerHTML += "You don't have an item in that slot!";
    }
    else
    {
        switch(keyPressed)
        {
            case 49:
                cons.innerHTML += "You drop the " + hero.inventory[0].itemName + ".";
                destroyItem(0);
                break;
            case 50:
                cons.innerHTML += "You drop the " + hero.inventory[1].itemName + ".";
                destroyItem(1);
                break;
            case 51:
                cons.innerHTML += "You drop the " + hero.inventory[2].itemName + ".";
                destroyItem(2);
                break;
            case 52:
                cons.innerHTML += "You drop the " + hero.inventory[3].itemName + ".";
                destroyItem(3);
                break;
            case 53:
                cons.innerHTML += "You drop the " + hero.inventory[4].itemName + ".";
                destroyItem(4);
                break;
            case 54:
                cons.innerHTML += "You drop the " + hero.inventory[5].itemName + ".";
                destroyItem(5);
                break;
            case 55:
                cons.innerHTML += "You drop the " + hero.inventory[6].itemName + ".";
                destroyItem(6);
                break;
            case 56:
                cons.innerHTML += "You drop the " + hero.inventory[7].itemName + ".";
                destroyItem(7);
                break;
            case 57:
                cons.innerHTML += "You drop the " + hero.inventory[8].itemName + ".";
                destroyItem(8);
                break;
            default:
                cons.innerHTML += "Never mind...";
                var nevermind = true;
                break;
        } 
        if (!nevermind)
        {
            cons.innerHTML += "<br/>It gets consumed in a burst of flame!";
        }
    }

    
     dropItemCheck.booleanValue = false;
}

function quaffPotion(keyPressed)
{
    var index = keyPressed - 49;
    //console.log("INDEX IS THIS: " + index);
    if(hero.inventory.length < index)
    {
        cons.innerHTML += "You don't have an item in that slot!";
    }
    
    if (hero.inventory[index].itemType != 'Potion')
    {
        cons.innerHTML += "That's a funny thing to quaff...";
        cons.innerHTML += "<br/>You attempt to quaff the " + hero.inventory[index].itemName + ", but you can't seem to shove it down your throat without seriously injuring yourself.";
        cons.innerHTML += "<br/>You decide to abandon the attempt.";
    }
    else
    {
        switch(keyPressed)
        {
            case 49:
                cons.innerHTML += "You quaff the " + hero.inventory[0].itemName + ".";
                //destroyItem(0);
                break;
            case 50:
                cons.innerHTML += "You quaff the " + hero.inventory[1].itemName + ".";
                //destroyItem(1);
                break;
            case 51:
                cons.innerHTML += "You quaff the " + hero.inventory[2].itemName + ".";
                //destroyItem(2);
                break;
            case 52:
                cons.innerHTML += "You quaff the " + hero.inventory[3].itemName + ".";
                //destroyItem(3);
                break;
            case 53:
                cons.innerHTML += "You quaff the " + hero.inventory[4].itemName + ".";
                //destroyItem(4);
                break;
            case 54:
                cons.innerHTML += "You quaff the " + hero.inventory[5].itemName + ".";
                //destroyItem(5);
                break;
            case 55:
                cons.innerHTML += "You quaff the " + hero.inventory[6].itemName + ".";
                //destroyItem(6);
                break;
            case 56:
                cons.innerHTML += "You quaff the " + hero.inventory[7].itemName + ".";
                //destroyItem(7);
                break;
            case 57:
                cons.innerHTML += "You quaff the " + hero.inventory[8].itemName + ".";
                //destroyItem(8);
                break;
            default:
                cons.innerHTML += "Never mind...";
                var nevermind = true;
                break;
        } 
        if (!nevermind)
        {
            hero.currentHP += parseInt(hero.inventory[index].health);

            if (hero.currentHP > hero.equippedHealth + hero.maxHP)
            {
                hero.currentHP = hero.equippedHealth + hero.maxHP;

            }
            destroyItem(index);
        }
    }
    
    
    quaffPotionCheck.booleanValue = false;
    redrawCoordinates();
}

function destroyItem(index)
{
    hero.inventory.splice(index, 1);
}

function changeLevel()
{
    for(var i = 0; i < mapWidth; i++)
    {
        for (var j = 0; j < mapHeight; j++)
        {
            coordinates[i][j] = 0;
            actorCoordinates[i][j] = 0;
        }
    }
    if (dungeonLevel != 6)
    {
        //var heroCache = hero;    

        enemyList = new Array();
        monstersOnThisLevel = new Array();
        enemyIncrementer = 0;
        dungeonLoader();
        getRandomDungeon();
        updateMonsterArray();
        enemyLoader();

        //hero = heroCache;

        updateHTMLStats();
        placeStairs(); 
    }
    else
    {
        enemyList = new Array();
        monstersOnThisLevel = new Array();
        enemyIncrementer = 0;
        dungeonLoader();
        updateHTMLStats();
        finalLevel();
    }
}

function openChest(keyPressed)
{
    //console.log(keyPressed);
    switch(keyPressed)
    {
        case 89:
        case 121:
            cons.innerHTML += "You open the chest.<br/>";
            coordinates[chestCheck.x][chestCheck.y].image.src = "images/openChest.png";

            cons.innerHTML += "Inside is a " + coordinates[chestCheck.x][chestCheck.y].inventory[0].itemName + ".<br/>";
            cons.innerHTML += "Do you want to pick it up? Y/N<br/>";
            chestItemCheck.booleanValue = true;
            redrawCoordinates();
            break;
        case 110:
        case 78:
            cons.innerHTML += "You leave it closed.";
            chestItemCheck.booleanValue = false;
            coordinates[chestCheck.x][chestCheck.y].open=false;
            break;

    }
    chestCheck.booleanValue = false;
    
}

function traverseStairs(keyPressed)
{
    switch(keyPressed)
    {
        case 89:
        case 121:
            saveData();
            break;
        case 110:
        case 78:
            cons.innerHTML += "Very well.";
            break;
    }
    stairsCheck.booleanValue = false;
    
}

function getChestItem(keyPressed)
{
    switch(keyPressed)
    {
        case 89:
        case 121:
            cons.innerHTML += "You pick up the " + coordinates[chestCheck.x][chestCheck.y].inventory[0].itemName + ".";
            hero.inventory.push(coordinates[chestCheck.x][chestCheck.y].inventory[0]);
            coordinates[chestCheck.x][chestCheck.y].inventory[0] = 0;
            
            break;
        case 110:
        case 78:
            cons.innerHTML += "You leave it in the chest.";
            break;
    }
    chestItemCheck.booleanValue = false;
    
}

function openDoor(keyPressed)
{
    switch(keyPressed)
    {
        case 89:
        case 121:
            cons.innerHTML += "You open the door.";
            coordinates[doorCheck.x][doorCheck.y].image.src = "images/openVaultDoor.png";
            coordinates[doorCheck.x][doorCheck.y].pass = true;
            redrawCoordinates();
            break;
        case 110:
        case 78:
            cons.innerHTML += "You leave it closed.";
            break;
    }

    doorCheck.booleanValue = false;
    
};

function pickUpItem(keyPressed, x, y)
{
    switch (keyPressed)
    {
        case 89:
        case 121:
            if (hero.inventory.length < 9)
            {
                cons.innerHTML = "You obtain the " + coordinates[itemOnGround.x][itemOnGround.y].itemName + ".";
                hero.inventory.push(coordinates[itemOnGround.x][itemOnGround.y]);
                coordinates[itemOnGround.x][itemOnGround.y] = 0;
                redrawCoordinates();
            }
            else
            {
                cons.innerHTML += "You're carrying too much to pick up the " + coordinates[itemOnGround.x][itemOnGround.y].itemName + "!";
            }
            break;
        case 78:
        case 110:
            cons.innerHTML += "You leave it there.";
            break;
    }
    itemOnGround.booleanValue = false;
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
    var index = keyPressed - 49;
    displayInventory();
    
    if(hero.inventory.length < keyPressed - 48)
    {
        cons.innerHTML += "You don't have an item in that slot!";
    }
    
    if (hero.inventory[index].itemType == 'Potion')
    {
        cons.innerHTML += "You can't equip a potion, you insensitive clod!";
    }
    else
    {
        switch(keyPressed)
        {
            case 49:
                cons.innerHTML += "You equip the " + hero.inventory[0].itemName + ".";
                equipCheck(0);
                updateStats(hero, 0);
                break;
            case 50:
                cons.innerHTML += "You equip the " + hero.inventory[1].itemName + ".";
                equipCheck(1);
                updateStats(hero, 1);
                break;
            case 51:
                cons.innerHTML += "You equip the " + hero.inventory[2].itemName + ".";
                equipCheck(2);
                updateStats(hero, 2);
                break;
            case 52:
                cons.innerHTML += "You equip the " + hero.inventory[3].itemName + ".";
                equipCheck(3);
                updateStats(hero, 3);
                break;
            case 53:
                cons.innerHTML += "You equip the " + hero.inventory[4].itemName + ".";
                equipCheck(4);
                updateStats(hero, 4);
                break;
            case 54:
                cons.innerHTML += "You equip the " + hero.inventory[5].itemName + ".";
                equipCheck(5);
                updateStats(hero, 5);
                break;
            case 55:
                cons.innerHTML += "You equip the " + hero.inventory[6].itemName + ".";
                equipCheck(6);
                updateStats(hero, 6);
                break;
            case 56:
                cons.innerHTML += "You equip the " + hero.inventory[7].itemName + ".";
                equipCheck(7);
                updateStats(hero, 7);
                break;
            case 57:
                cons.innerHTML += "You equip the " + hero.inventory[8].itemName + ".";
                equipCheck(8);
                updateStats(hero, 8);
                break;
            default:
                cons.innerHTML += "Never mind...";
                break;
        } 



        equipMenu.booleanValue = false;

        for(var i = 0; i < enemyList.length; i++)
        {
            enemyBehavior(enemyList[i]);
        }
        redrawCoordinates();
    }
}

function equipCheck(index)
{
    for(var i = 0; i< hero.inventory.length; i++)
    {
        if(hero.inventory[index].itemType == hero.inventory[i].itemType )
        {
            hero.inventory[i].equipped=0;
        }
    }
    hero.inventory[index].equipped = 1;
}

function updateStats(equipper, index)
{
    //I need a variable in the object that tells me if it's equipped or not for this to work
    var addArmorClass = 0, addAttackBonus = 0, addDamage = 0, addHealth = 0;
    if (equipper == hero)
    {
        //hero.inventory[index].itemType == "Weapon"
        hero.equippedArmorClass = 0;
        hero.equippedAttackBonus = 0;
        hero.equippedDamage = 0;
        hero.equippedHealth = 0;
        for (var i = 0; i < equipper.inventory.length; i++)
        {
            if (equipper.inventory[i].equipped == 1)
            {
                addArmorClass += parseInt(equipper.inventory[i].armorClass);
                addAttackBonus += parseInt(equipper.inventory[i].attackBonus);
                addDamage += parseInt(equipper.inventory[i].damage);
                addHealth += parseInt(equipper.inventory[i].health);
            }
        }
        
        equipper.equippedArmorClass = addArmorClass;
        equipper.equippedAttackBonus = addAttackBonus;
        equipper.equippedDamage = addDamage;
        equipper.equippedHealth = addHealth;
    }
    else
    {
        equipper.equippedArmorClass = equipper.inventory[i].armorClass;
        equipper.equippedAttackBonus = equipper.inventory[i].attackBonus;
        equipper.equippedDamage = equipper.inventory[i].damage;
        equipper.equippedHealth = equipper.inventory[i].health;
    }
    /*
    equipper.equippedArmorClass = equipper.inventory[index].armorClass;
    equipper.equippedAttackBonus = equipper.inventory[index].attackBonus;
    equipper.equippedDamage = equipper.inventory[index].damage;
    equipper.equippedHealth = equipper.inventory[index].health;
    */
    
}
