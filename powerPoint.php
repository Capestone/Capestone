<?php include 'dependency.php'; ?>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Power Point</title>
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
                <span>Download this PDF here: <a href="download.php"> finalPP.pdf</a></span>
                <div id="pdf" style="opacity:'1'">
                <object data="pdf/finalPP.pdf" type="application/pdf" width="100%" height="100%"></object>
                </div>
            </div> <!-- end div container -->
            
            <div id="footer">  <!--  start footer  -->
                    <p class="info"><a href="termsOfUse.php" style="color:white; text-decoration:none">Terms of Use</a> | <a href="siteMap.php" style="color:white; text-decoration:none">Site Map</a> | <a href="contact.php" style="color:white; text-decoration:none">Contact</a></p>
                    <p class="copyr">&copy; McCormick and Lougee, 2014.</p>
            </div>  <!--  end footer  -->
        
        </div><!-- end div wrapper -->
        
    </body>
</html>
 