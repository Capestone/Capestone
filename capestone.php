<?php include 'dependency.php'; ?>
<!DOCTYPE html>
<!-- hey -->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Capestone</title>
        <link rel="stylesheet" type="text/css" href="css/main.css" />
        <link rel="stylesheet" type="text/css" href="css/game.css" />
    </head>
    <body style="background-image: url('images/sprite_background.png')">
        
        <?php
        
        //make sure user is logged in or is trying to log out
        if( !isset($_SESSION["isLoggedin"]) && $_SESSION["isLoggedin"] != true ) // this will make sure the user is logged in
        {
            header("Location:login.php");
        }
        
        if ( isset( $_GET["logout"]) && $_GET["logout"] == 1) // if the user clicks logout they will go back to login page
        {
            session_destroy();
            header("Location:login.php");
        }
        
        
        //get hero data from database
        $heroDBClass = new HeroDB(); // class for heroDB
        
        $userID = $_SESSION['userID']; // gets userID from session
        
        $heroData = $heroDBClass->getHeroData($userID); // get all data for user from hero table
        
        // get monster data from database
        $monsterDBClass = new MonsterDB();

        $monsterData = $monsterDBClass->getMonsterData();        
        
        // get item data from database
        $itemDBClass = new ItemDB();

        $itemData = $itemDBClass->getItemData();

        //get inventory data from database
        $inventoryDBClass = new InventoryDB();
        
        $inventoryData = $inventoryDBClass->getInventoryData($userID);
        
        $inventoryItems = array();
        
        for( $i = 0; !empty($inventoryData[$i]); $i++ )
        {
            
            foreach($inventoryData[$i] as $key => $value)
            {
                if($key == "itemID")
                {                    
                    $inventoryItems[$i] = $itemDBClass->getInventoryItemData($value);     
                }
                
                if($key == "equipped" && $value == "1")
                {                    
                    $inventoryItems[$i]["equipped"] = 1;
                }
                else
                {
                     $inventoryItems[$i]["equipped"] = 0;
                }
            }
        }
        
        
        
        //print_r($_SESSION);
        ?>
        
        <div id="wrapper">
            <div id="header" style="background-image: url('images/banner.png')">
                <h1>Capstone Project</h1>
                
                <a href ="capestone.php?logout=1" style="color:white; float:right; background-color:#212121">Logout</a>
                
                <span style="color:#ffd700; float:right; font-size:18px; background-color:#212121">Welcome <?php  // this will display the username at the top in the header
                                    echo $heroData['userName'];
                                    echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                    ?>
                </span>
            </div>   <!-- end div header -->
            
            <div id="nav">  <!--  start nav  -->
                <div id="buttons">
                    <a class="btn" href="index.php"><b>HOME</b></a>
                    <a class="btn" href="proposal.php"><b>PROPOSAL</b></a>
                    <a class="btn" href="prototype.php"><b>PROTOTYPE</b></a>
                    <a class="btn" href="techDoc.php"><b>TECH DOC</b></a>
                    <a class="btn" href="erd.php"><b>ERD</b></a>	
                    <a class="btn" href="screenShots.php"><b>SCREENS</b></a>
                    <a class="btn" href="powerPoint.php"><b>PP</b></a>
                    <a class="btn" href="login.php"><b>GAME</b></a>
                </div>  
            </div>  <!--  end nav  -->    
           
            <div id="container">
                                
                <canvas id="idCanvas" width="320" height ="480" class="simpleBorder"></canvas>
                <div id="idConsole" class="console"></div>
                
                <!-- player info section -->
                <div id="infoSection">
                    <p id="description" class="playerInfo">description</p>
                    <br />
                    <p class="playerInfo">HP: </p><p id="currentHP" class="playerInfo">20</p><p class="playerInfo">/</p><p id="maxHP" class="playerInfo">20</p>
                    <br />
                    <p class="playerInfo">Armor Class: </p><p id="armorClass" class="playerInfo">20</p>
                    <br />
                    <p class="playerInfo">Attack Bonus: </p><p id="attackBonus" class="playerInfo">20</p>
                    <br />
                    <p class="playerInfo">Damage: </p><p id="damage" class="playerInfo">20</p>
                    <br />
                    <p class="playerInfo">Dungeon lvl: </p><p id="dungeonLvl" class="playerInfo">20</p>
                </div>
                
                <div id="legend">
                    <img src="images/vaultDoor.png">&nbsp <p class ="playerInfo">Door</p><br/>
                    <img src="images/stairsUp.png">&nbsp <p class ="playerInfo">Ascending Stairs</p><br/>
                    <img src="images/stairsDown.png">&nbsp <p class ="playerInfo">Descending Stairs</p><br/>
                    <img src="images/closedChest.png">&nbsp <p class ="playerInfo">Treasure Chest</p><br/>
                </div>
                
                <div id="controlSection">
                    <img src="images/game controls.png" alt="game controls" height="240" width="635">
                </div>
                
            </div> <!-- end div container -->
            
            <div id="footer">
                    <p class="info"><a href="termsOfUse.php" style="color:white; text-decoration:none">Terms of Use</a> | <a href="siteMap.php" style="color:white; text-decoration:none">Site Map</a> | <a href="contact.php" style="color:white; text-decoration:none">Contact</a></p>
                    <p class="copyr">&copy; McCormick and Lougee, 2014.</p>
            </div>    
        
        </div><!-- end div wrapper -->
        <script type="text/javascript" src="js/jquery-1.11.0.js"></script>
        <script>
            var heroData = <?php echo json_encode($heroData);?>;
            var monsterData = <?php echo json_encode($monsterData);?>;
            var itemData = <?php echo json_encode($itemData);?>;
            var inventoryItems = <?php echo json_encode($inventoryItems);?>;
        </script>
        <script type="text/javascript" src="js/dungeons.js"></script>
        <script type="text/javascript" src="js/game.js"></script>
        
    </body>
</html>
