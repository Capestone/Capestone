<?php include 'dependency.php'; ?>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>SITE MAP</title>
        <link rel="stylesheet" type="text/css" href="css/main.css" />
    </head>
    <body style="background-image: url('images/sprite_background.png')">
        <?php
        // put your code here
        ?>
        
        <div id="wrapper">
            <div id="header" style="background-image: url('images/banner.png')">
                <h1>Capstone Project</h1>
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
                <a href="index.php">HOME</a> <br />
                <a href="proposal.php">PROPOSAL</a> <br />
                <a href="prototype.php">PROTOTYPE</a> <br />
                <a href="techDoc.php">TECH DOC</a> <br />
                <a href="erd.php">ENTITY-RELATIONSHIP DIAGRAM</a> <br />	
                <a href="screenShots.php">SCREEN SHOTS</a> <br />
                <a href="powerPoint.php">POWER POINT</a> <br />
                <p class="playerInfo">GAME</p> <br />
                <a href="signup.php" style="margin-left:3em">SIGN UP</a> <br />
                <a href="login.php" style="margin-left:3em">LOGIN</a> <br />
                <a href="capestone.php" style="margin-left:3em">GAME PAGE</a> <br />
                <a href="termsOfUse.php">TERMS OF USE</a> <br />
                <a href="siteMap.php">SITE MAP</a> <br />
                <a href="contact.php">CONTACT</a> <br />
                
            </div> <!-- end div container -->
            
            <div id="footer">  <!--  start footer  -->
                <p class="info"><a href="termsOfUse.php" style="color:white; text-decoration:none">Terms of Use</a> | <a href="siteMap.php" style="color:white; text-decoration:none">Site Map</a> | <a href="contact.php" style="color:white; text-decoration:none">Contact</a></p>
                    <p class="copyr">&copy; McCormick and Lougee, 2014.</p>
            </div>  <!--  end footer  -->
        
        </div><!-- end div wrapper -->
        
    </body>
</html>
 