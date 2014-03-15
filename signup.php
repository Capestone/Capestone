<?php include 'dependency.php'; ?>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>SIGNUP</title>
        <link rel="stylesheet" type="text/css" href="css/main.css" />
    </head>
    <body style="background-image: url('images/sprite_background.png')">
        <?php
        $enteryErrors = array();
        
        if(count($_POST))
        {

            $_POST = array_map('strip_tags', $_POST); // this is a start for preventing tags in any entry field for signing up
            
            $signupClass = new Signup(); // creats new instence of the Signup class file
            
            if($signupClass->entryIsValid()) // will call all the checking to make sure it is a valid signup form
            {
                if( $signupClass->saveEntry() ) // if everything was good the entrys will save
                {
                    header("Location: login.php"); // send them to login.php if they signed up correctly
                }
                else
                {
                    echo "something went wrong";
                }
            } 
            else
            {
                $enteryErrors = $signupClass->getErrors(); // if something is wrong this will get the errors and display them 
            }
        }
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
                
                <div id="forms">
                    <h1>Sign Up</h1>
                    <form name="signupform" action="signup.php" method="post">

                        Username: <input type="text" name="username" /> <br />
                            <?php 
                                if ( !empty($enteryErrors["username"]) )
                                {
                                    echo '<p class="errorText">',$enteryErrors["username"],'</p>'; // display errors
                                }       
                            ?>
                        Email: <input type="text" name="email" /> <br />
                            <?php 
                                if ( !empty($enteryErrors["email"]) )
                                {
                                    echo '<p class="errorText">',$enteryErrors["email"],'</p>'; // display errors
                                }       
                            ?>
                        Password: <input type="password" name="password" /> <br />
                            <?php 
                                if ( !empty($enteryErrors["password"]) )
                                {
                                    echo '<p class="errorText">',$enteryErrors["password"],'</p>'; // display errors
                                }       
                            ?>
                        <input type="submit" value="Sign Up" />
                        <p class='link'>Already have an account? <a href ="login.php">Login</a></p>
                    </form>
                </div>
                
            </div> <!-- end div container -->
            
            <div id="footer">  <!--  start footer  -->
                    <p class="info"><a href="termsOfUse.php" style="color:white; text-decoration:none">Terms of Use</a> | <a href="siteMap.php" style="color:white; text-decoration:none">Site Map</a> | <a href="contact.php" style="color:white; text-decoration:none">Contact</a></p>
                    <p class="copyr">&copy; McCormick and Lougee, 2014.</p>
            </div>  <!--  end footer  -->
        
        </div><!-- end div wrapper -->
        
    </body>
</html>
