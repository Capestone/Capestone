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
    <body>
        
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
        
        $monsterID = "1"; // this is where the moneter ID that will be populated into the level is set
        
        $monsterData = $monsterDBClass->getMonsterData($monsterID);

        // get item data from database
        $itemDBClass = new ItemDB();
        
        $itemID = "1"; // this is there the item ID will be populated
        
        $itemData = $itemDBClass->getItemData($itemID);
        
        //get inventory data from database
        $inventoryDBClass = new InventoryDB();
        
        $inventoryData = $inventoryDBClass->getInventoryData($userID);
        
        
        
        //testing for save function
        
        echo "post was not populated yet on capestone.php <br />";
        
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
            <div id="header">
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
                    <a class="btn" href="#"><b>Link</b></a>
                    <a class="btn" href="#"><b>Link</b></a>	
                    <a class="btn" href="#"><b>Link</b></a>
                    <a class="btn" href="#"><b>Link</b></a>
                    <a class="btn" href="login.php"><b>GAME</b></a>
                </div>  
            </div>  <!--  end nav  -->    
           
            <div id="container">
                                
                <canvas id="idCanvas" width="336" height ="504" class="simpleBorder"></canvas>
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
            var itemData = <?php echo json_encode($itemData);?>;
        </script>
        <script type="text/javascript" src="js/game.js"></script>
        
    </body>
</html>
