<?php

class DungeonDB extends DB{
    
    public function getDungeonData($dungeonID){
        
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('select code from Dungeon where dungeonID = :dungeonIDValue');
            $stmt->bindParam(':dungeonIDValue', $dungeonID, PDO::PARAM_STR);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
                return $data;
            }
        }  
    }
    
    
    
    
    
}
