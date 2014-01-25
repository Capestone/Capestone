<?php
if (isset($_POST["heroData"]) && !empty($_POST["heroData"]))
{
    $heroData = $_POST["heroData"];

    echo json_decode($heroData);
    //echo $heroData;
}

?>