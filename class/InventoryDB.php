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
    
    
    
    
    
}
