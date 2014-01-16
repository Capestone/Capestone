<?php

class ItemDB extends DB{
   
    public function getItemData($itemID)
    {
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('select * from item where itemID = :itemIDValue');
            $stmt->bindParam(':itemIDValue', $itemID, PDO::PARAM_STR);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
                return $data;
            }
        }  
    }
    
    
}
