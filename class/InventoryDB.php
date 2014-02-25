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
    
    public function clearInventory($userID)
    {
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('delete from Inventory where userID = :userIDValue');
            $stmt->bindParam(':userIDValue', $userID, PDO::PARAM_STR);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                return true;
            }
        } 
        return false;
    }
    
    public function saveInventory($userID, $itemID, $equipped)
    {
        intval($userID);
        intval($itemID);
        intval($equipped);
        
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('insert into Inventory set userID = :userIDValue, itemID = :itemIDValue, equipped = :equippedValue;');
            $stmt->bindParam(':userIDValue', $userID, PDO::PARAM_INT);
            $stmt->bindParam(':itemIDValue', $itemID, PDO::PARAM_INT);
            $stmt->bindParam(':equippedValue', $equipped, PDO::PARAM_INT);
            
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
        
        $userID = $heroDBClass->getUserID(); // get the user ID from the users table
        
        $dbh = $this->getDB();
        if ( null != $dbh ) {
                    
            $stmt = $dbh->prepare("insert into Inventory set userID = :userIDValue, itemID = 5, equipped = 1; insert into Inventory set userID = :userIDValue, itemID = 6, equipped = 1;");
            $stmt->bindParam(':userIDValue', $userID, PDO::PARAM_INT);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                return true;
            }
        }
        return false;
    }
    
    
    
    
}
