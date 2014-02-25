<?php include 'dependency.php'; ?>

<?php


if (isset($_POST["heroData"]) && !empty($_POST["heroData"]))
{
    $heroData = json_decode($_POST["heroData"], true);

    
    // this is where everything is going to be saved into database
    if ( count($_POST) )
    {
        $_SESSION["heroData"] = $heroData;
        
        $userID = $_SESSION["userID"];
        $armorClass = $heroData['armorClass'];
        $attackBonus = $heroData['attackBonus'];
        $currentHP = $heroData['currentHP'];
        $damage = $heroData['damage'];
        $description = $heroData['desc'];
        $maxHP = $heroData['maxHP'];
        $x = $heroData['x'];
        $y = $heroData['y'];
        
        //print_r($_SESSION["heroData"]);
        $heroDBClass = new HeroDB();
        
        $heroDBClass->saveHero($userID, $armorClass, $attackBonus, $currentHP, $damage, $description, $maxHP, $x, $y);
        
        $inventoryDBClass = new InventoryDB();
        
        $inventory = $heroData['inventory'];
        
        //print_r($inventory);
        
        $totalInventory = count($inventory);
        
        $inventoryDBClass->clearInventory($userID);
        
        for( $i=0; $i<$totalInventory; $i++ )
        {
            $itemID = $inventory[$i]['itemID'];
            $equipped = $inventory[$i]['equipped'];
            $inventoryDBClass->saveInventory($userID, $itemID, $equipped);
        }
        
         
    }
    
    
}



?>