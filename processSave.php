<?php include 'dependency.php'; ?>

<?php


if (isset($_POST["heroData"]) && !empty($_POST["heroData"]))
{
    $heroData = $_POST["heroData"];

    //echo json_decode($heroData);
    echo $heroData;
    
    
    // this is where everything is going to be saved into database
    if ( count($_POST) )
    {
        echo " post was populated on ProcessAction ";
        $_SESSION["heroData"] = $heroData;
        
        /*
        
        $userID =
        $armorClass =
        $attackBonus =
        $currentHP =
        $damage =
        $description =
        $imagePath =
        $maxHP =
        $pass =
        $userName =
        $x =
        $y =
        
        $heroDBClass = new HeroDB();
        
        $heroDBClass->saveHero($userID, $armorClass, $attackBonus, $currentHP, $damage, $description, $imagePath, $maxHP, $pass, $userName, $x, $y);
        
        */
          
    }
    
    
}



?>