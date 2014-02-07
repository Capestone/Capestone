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
        
        // variables to change in database information changes
        $maxNumDungeons = 6;
        $maxNumMonsters = 10; //10
        $maxNumItems = 19; //19
        $maxNumWeapon = 5; //5
        $maxNumArmor = 6; //6
        
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
        
        $monsterData = array(); 
        for ($i=0; $i <=$maxNumMonsters ; $i++) // this will get all monsters from the database and fill an array
        {
            if( $i!=0 )
            {
                $monsterData[$i] = $monsterDBClass->getMonsterData($i);
            }
            else
            {
                $monsterData[0] = "";
            }
            
        }
        
        //print_r($monsterData);
        
        
        // get item data from database
        $itemDBClass = new ItemDB();
        /* ---- commented out geting all item data for now until we find that we need it again--------
        $itemData = array(); 
        for ($i=0; $i<=$maxNumItems; $i++) // get all the items from the database and fill a multi dimentional array
        {
            if( $i!=0 )
            {
                $itemData[$i] = $itemDBClass->getItemData($i);
            }
            else
            {
                $itemData[0] = "";
            }
        }
        */ 
        
        $weaponItemData = ""; 
        $weaponItemData = $itemDBClass->getWeaponItemData();  // this will get all the item data of just the weapons
        
        $armorItemData = "";
        $armorItemData = $itemDBClass->getArmorItemData(); // this will get all the item data of just the armor
        
        //print_r($weaponItemData);
        //print_r($armorItemData);
        //print_r($itemData);

        //get inventory data from database
        $inventoryDBClass = new InventoryDB();
        
        $inventoryData = $inventoryDBClass->getInventoryData($userID);
        
        
        // get dungeon data from database
        $dungeonDBClass = new DungeonDB(); // instence of dungeon class
        $dungeonData = array(); // array to hold 4 dungeon quadrents
        for ($i=0; $i<4; $i++) 
        {
            $randomDungeonID = rand(1, $maxNumDungeons); // get a random number from 1 to max number of dungeons
            $dungeonData[$i] = $dungeonDBClass->getDungeonData($randomDungeonID); // get that data from database and fill it into one of the array indexes
        }
        
        //print_r($dungeonData);
        
        
        
        
        
        //testing for save function
        
        //this is where i am testing the save ability of the game
        if ( count($_POST) )
        {
            echo "post was populated on capestone.php <br />";
            $_SESSION = $_POST;
            print_r($_POST);
        } 
        print_r($_SESSION);
        echo '<br />';

        

        
        
        
        ?>
        
        <div id="wrapper">
            <div id="header" style="background-image: url('images/banner.png')">
                <h1>Capstone Project</h1>
                
                <a href ="capestone.php?logout=1" style="color:white; float:right;">Logout</a>
                
                <span style="color:white; float:right;">Welcome <?php  // this will display the username at the top in the header
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
                    <a class="btn" href="#"><b>Link</b></a>	
                    <a class="btn" href="#"><b>Link</b></a>
                    <a class="btn" href="#"><b>Link</b></a>
                    <a class="btn" href="login.php"><b>GAME</b></a>
                </div>  
            </div>  <!--  end nav  -->    
           
            <div id="container">
                                
                <canvas id="idCanvas" width="320" height ="480" class="simpleBorder"></canvas>
                <div id="idConsole" class="console"></div>
                
            </div> <!-- end div container -->
            
            <div id="footer">  <!--  start footer  -->
                    <p class="info">Terms of use | site map | contact</p>
                    <p class="copyr">&copy; McCormick and Lougee, 2014.</p>
            </div>  <!--  end footer  -->
        
        </div><!-- end div wrapper -->
        <script type="text/javascript" src="js/jquery-1.11.0.js"></script>
        <script>
            var heroData = <?php echo json_encode($heroData);?>;
            var monsterData = <?php echo json_encode($monsterData);?>;
            /*var itemData = <?php echo json_encode($itemData);?>;*/
            var weaponData = <?php echo json_encode($weaponItemData);?>;
            var armorData = <?php echo json_encode($armorItemData);?>;
            var dungeonData = <?php echo json_encode($dungeonData);?>;
        </script>
        <script type="text/javascript" src="js/game.js"></script>
        
    </body>
</html>
