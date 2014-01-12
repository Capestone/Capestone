<?php

class HeroDB extends DB{
    
    public function getHeroData($userID){
        
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('select * from hero where userID = :userIDValue');
            $stmt->bindParam(':userIDValue', $userID, PDO::PARAM_STR);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
                return $data;
            }
        }  
    }
    
    // i had done these 2 functions indevidualy because i know in the future i am just going to want username and not user ID
    public function getUsername( $userID ){
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('select userID, username from users where userID = :userIDValue');
            $stmt->bindParam(':userIDValue', $userID, PDO::PARAM_STR);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
                $return = $data['username'];
                return $return;
            }
        }
        //return false;
    }
    
    public function getUserID(){
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('select userID, email from users where email = :emailValue');
            $stmt->bindParam(':emailValue', $_POST["email"], PDO::PARAM_STR);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
                $return = $data['userID'];
                return $return;
            }
        }
        //return false;
    }
    
    public function defaultEntry() {
        
        $userID = $this->getUserID(); // get the user ID from the users table
        $username = $this->getUsername( $userID ); //gets the username based on user ID
        
        $db = $this->getDB();
        if ( null != $db ) {
            
            $stmt = $db->prepare('insert into hero '
                    . 'set userID = :userIDValue, username = :usernameValue, x = 0, y = 0 ');
            $stmt->bindParam(':userIDValue', $userID, PDO::PARAM_INT);
            $stmt->bindParam(':usernameValue', $username, PDO::PARAM_INT);
            
            if ( $stmt->execute() ) // if everything was excecuted corectly
            {
                return true;
            }
        }
        return false; 
    }
    
    
    
    
}
