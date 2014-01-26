<?php

session_start();

if (isset($_POST["heroData"]) && !empty($_POST["heroData"]))
{
    $heroData = $_POST["heroData"];

    //echo json_decode($heroData);
    echo $heroData;
    
    
    
    if ( count($_POST) )
    {
        echo " post was populated on ProcessAction ";
        $_SESSION["heroData"] = $heroData;
    }
}



?>