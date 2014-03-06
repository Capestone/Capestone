<?php include 'dependency.php'; ?>

<?php


if (isset($_POST["heroData"]) && !empty($_POST["heroData"]))
{
    $heroData = json_decode($_POST["heroData"], true);

    
    // this is where everything is going to be saved into database
    if ( count($_POST) )
    {
        //$_SESSION["heroData"] = $heroData;
        print_r($_SESSION);
        $userID = $_SESSION["userID"];
        $armorClass = $heroData['armorClass'];
        $attackBonus = $heroData['attackBonus'];
        $currentHP = $heroData['currentHP'];
        $damage = $heroData['damage'];
        $description = $heroData['desc'];
        $maxHP = $heroData['maxHP'];
        $x = $heroData['x'];
        $y = $heroData['y'];
        $dungeonLevel = $heroData['dungeonLevel'];
        
        //print_r($_SESSION["heroData"]);
        $heroDBClass = new HeroDB();
        
        $heroDBClass->saveHero($userID, $armorClass, $attackBonus, $currentHP, $damage, $description, $maxHP, $x, $y, $dungeonLevel);
        
        $inventoryDBClass = new InventoryDB();
        
        $itemIDs = $heroData['itemIDs'];
        $equipped = $heroData['equipped'];
        /*
        echo'item ID are: ';
        print_r($itemIDs);
        echo'equipped values are: ';
        print_r($equipped);
        */
        $totalInventory = count($itemIDs);
        
        $inventoryDBClass->clearInventory($userID);
        
        for( $i=0; $i<$totalInventory; $i++ )
        {
            $NewitemID = $itemIDs[$i];
            $Newequipped = $equipped[$i];
            $inventoryDBClass->saveInventory($userID, $NewitemID, $Newequipped);
        }
        
        //echo "it worked"; 
        //print_r($_SESSION);
    }
    
    
}



?>