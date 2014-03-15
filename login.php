<?php include 'dependency.php'; ?>
<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>LOGIN</title>
        <link rel="stylesheet" type="text/css" href="css/main.css" />
    </head>
    <body style="background-image: url('images/sprite_background.png')">
        <?php
        session_regenerate_id(true);
        $errors;
        
        $token = uniqid();
        
        //this is to avoid session hijaking
        if( !isset($_SESSION["token"]) )
        {
            $_SESSION["token"] = $token;
        }
        else
        {
            if( isset($_POST["token"]) && $_SESSION["token"] != $_POST["token"] )
            {
                session_destroy();
                header("Location:login.php");
                exit();
            }
        }
        
        $_SESSION["token"] = $token;
        
        $loginClass = new Login(); // this will be used to get user ID on login
        
        $username = (isset($_POST["username"]) ? $_POST["username"] : "");
        $password = (isset($_POST["password"]) ? $_POST["password"] : "");
        
        if(count($_POST))
        {
            if ( Validator::loginIsValid($username, $password) ) //check to make sure username and password match in database
            {
                $_SESSION["isLoggedin"] = true; // they are now logged in
                
                $userID = $loginClass->getUserID( $username, $password ); // get the user ID
                
                $_SESSION['userID'] = $userID; // fill session with user id to be used on capestone.php
                
                header("Location: capestone.php");
            }
            else
            {
               $errors = "Username or Password are not correct!" ;
            }
        }
        
        // if they are already logged in or if they have just successfuly logged in
        if( isset($_SESSION["isLoggedin"]) && $_SESSION["isLoggedin"] == true )
        {
            header("Location: capestone.php");
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
                    <h1>Login</h1>
                    <form name="loginform" action="login.php" method="post">
                        <?php 
                           if ( !empty($errors) )
                           {
                               echo '<p class="errorText">',$errors,'</p>'; // display errors
                           }       
                        ?>
                        Username: <input type="text" name="username" /> <br />
                        Password: <input type="password" name="password" /> <br />

                        <input type="hidden" name="token" value="<?php echo $token; ?>"/> <!-- avoid session hijacking-->

                        <input type="submit" value="Login" />
                        <p class='link'>Don't have an account? <a href ="signup.php">Sign Up</a></p>

                    </form>
                </div>
                
                <div id="announcements">
                    <h3>ANNOUNCEMENTS</h3>
                    <ul>
                        <li>RECREATE ACCOUNTS!</li>
                        <li>We have now entered into the next Beta session. New features have been added to the game and to accommodate these changes data needed to be added to the user accounts. In lieu of this all accounts have been removed. Please recreate your account to participate in the latest Beta patch.</li>
                        <li>New features include equipping items, opening doors and treasure chests, picking up items, ascending and descending stairs. </li>
                    </ul>
                        
                </div>
                
            </div> <!-- end div container -->
            
            <div id="footer">  <!--  start footer  -->
                    <p class="info"><a href="termsOfUse.php" style="color:white; text-decoration:none">Terms of Use</a> | <a href="siteMap.php" style="color:white; text-decoration:none">Site Map</a> | <a href="contact.php" style="color:white; text-decoration:none">Contact</a></p>
                    <p class="copyr">&copy; McCormick and Lougee, 2014.</p>
            </div>  <!--  end footer  -->
        
        </div><!-- end div wrapper -->
        
        
        
    </body>
</html>
