<?php

class InventoryDB extends DB{
   
    public function getInventoryData($userID)
    {
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('select * from Inventory where userID = :userIDValue');
            $stmt->bindParam(':userIDValue', $userID, PDO::PARAM_STR);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $data;
            }
        }  
    }
    
    public function saveInventory($userID, $itemID)
    {
        intval($userID);
        intval($itemID);
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('insert into Inventory set userID = :userIDValue, itemID = :itemIDValue;');
            $stmt->bindParam(':userIDValue', $userID, PDO::PARAM_INT);
            $stmt->bindParam(':itemIDValue', $itemID, PDO::PARAM_INT);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                return true;
            }
        }
        return false; 
    }
    
    public function defaultInventory()
    {
        $heroDBClass = new HeroDB();
        
        echo "Made it to default inventory<br/>";
        
        $userID = $heroDBClass->getUserID(); // get the user ID from the users table
        
        $dbh = $this->getDB();
        if ( null != $dbh ) {
            
            echo "Made it to default inventory before prepare <br/>";
                       
            $stmt = $dbh->prepare("insert into Inventory set userID = :userIDValue, itemID = 5; insert into Inventory set userID = :userIDValue, itemID = 6;");
            $stmt->bindParam(':userIDValue', $userID, PDO::PARAM_INT);
            
            echo "Made it to default inventory after binding<br/>";
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                
                echo "Made it to default inventory after execute <br/>";
                
                return true;
            }
            
            echo "you are now after execute without the return true in default inventory<br/>";
            
        }
        return false;
    }
    
    
    
    
}
