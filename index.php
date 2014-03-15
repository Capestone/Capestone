<?php include 'dependency.php'; ?>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>HOME</title>
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
                <h3>STEPHEN MCCORMICK</h3>
                <p class="creatorInfo"> The primary duty for Stephen McCormick was web development. Stephen was tasked with creating and maintaining the website content and appeal. 
                    Style and keeping game details up to date were also a part of this. He was also in charge of PHP and other server side code for signing up, 
                    logging in, and retrieving data from the database to be used in the game. Stephen also, on more than one occasion, assisted Erik Lougee in JavaScript development and troubleshooting. 
                    He also took part in level design and implementation. There was a joint effort between Stephen and Erik when integrating PHP and JavaScript with AJAX. </p>
                <h3>ERIK LOUGEE</h3>
                <p class="creatorInfo"> I worked mainly on the Javascript game engine, game / level design, and rules of the game. Stephen and I both collaborated on aspects such as 
                    database design and problem solving. There were many issues we came across that, with some diligence, were able to overcome. It was a pleasure working with Stephen 
                    and I hope that our technical careers intertwine in the future. One thing we cannot agree upon, however, is whether or not writing in third or first person is better. </p>
                
            </div> <!-- end div container -->
            
            <div id="footer">  <!--  start footer  -->
                <p class="info"><a href="termsOfUse.php" style="color:white; text-decoration:none">Terms of Use</a> | <a href="siteMap.php" style="color:white; text-decoration:none">Site Map</a> | <a href="contact.php" style="color:white; text-decoration:none">Contact</a></p>
                    <p class="copyr">&copy; McCormick and Lougee, 2014.</p>
            </div>  <!--  end footer  -->
        
        </div><!-- end div wrapper -->
        
    </body>
</html>
 
