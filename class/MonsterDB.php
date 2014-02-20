<?php

class MonsterDB extends DB{
   
    public function getMonsterData() //$monsterID
    {
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('select * from Monster'); // where monsterID = :monsterIDValue
            //$stmt->bindParam(':monsterIDValue', $monsterID, PDO::PARAM_STR);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $data;
            }
        }  
    }
    
}
