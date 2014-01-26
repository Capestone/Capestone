<?php

class InventoryDB extends DB{
   
    public function getInventoryData($userID)
    {
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('select * from Inventory where userID = :userIDValue');
            $stmt->bindParam(':itemIDValue', $userID, PDO::PARAM_STR);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $data;
            }
        }  
    }
    
    
    
    
}
