<?php

class Signup extends DB {
    
    protected $errors = array();
    
    public function entryIsValid(){
        $this->emailEntryIsValid();
        $this->usernameEntryIsValid();
        $this->passwordEntryIsValid();
        
        return ( count($this->errors) ? false : true );
    }
    
    public function usernameIsTaken( $username ) {        
        $db = $this->getDB();
        if ( null != $db ) {
            $stmt = $db->prepare('select userName from Users where userName = :usernameValue limit 1');
            $stmt->bindParam(':usernameValue', $username, PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);            
            if ( is_array($result) && count($result) ) {
                return true;
            }
        }
        return false;        
    }
    
    // this will check to see if the email that the user entered is valid
    public function emailEntryIsValid() {
        if (array_key_exists("email", $_POST) )
        {
            if ( !Validator::emailIsValid($_POST["email"]) )
            {
                $this->errors["email"] = "Email is not valid!"; // if the email is not valid then the error will be filled with this message
            }
        }
        else
        {
            $this->errors["email"] = "Email is required!"; // if the email is not entered then the error will be filled with this message
        }
        
        return ( empty($this->errors["email"]) ? true : false ); // if there are no errors then this will return true, if the error messege is filled with something it will return false
    }
    
    // this will check to see if the username that the user entered is valid
    public function usernameEntryIsValid() {
        if (array_key_exists("username", $_POST) )
        {
            if ( !Validator::usernameIsValid($_POST["username"]) )
            {
                $this->errors["username"] = "Username is not valid!";// if the username is not valid then the error will be filled with this message
            }
            if( $this->usernameIsTaken($_POST["username"]) == true ) 
            {
                $this->errors["username"] = "That Username has been taken!"; // if the website that the user entered is already in the database
            }
        }
        else
        {
            $this->errors["username"] = "Username is required!"; // requires a Username to be entered
        }
        
        return ( empty($this->errors["username"]) ? true : false );
    }
    
    public function passwordEntryIsValid() {
        if (array_key_exists("password", $_POST) ) // if the user entered a password
        {
            if ( !Validator::passwordIsValid($_POST["password"]) ) // if the password is NOT valid
            {
                $this->errors["password"] = "Password is not valid!"; // fill error message
            }
        }
        else
        {
            $this->errors["password"] = "Password is required!"; // if there is no password entered fill error message
        }
        
        return ( empty($this->errors["password"]) ? true : false );
    }
    
    public function saveEntry() {
        if ( !$this->entryIsValid() ) return false; // make sure everything is valid one more time
        
        $db = $this->getDB();
        $password = sha1($_POST["password"]); // sha1 to encript the password
        try
        {
            
            if ( null != $db ) {
                $stmt = $db->prepare('insert into Users set userName = :usernameValue, email = :emailValue, password = :passwordValue');
                $stmt->bindParam(':usernameValue', $_POST["username"], PDO::PARAM_STR);
                $stmt->bindParam(':emailValue', $_POST["email"], PDO::PARAM_STR);
                $stmt->bindParam(':passwordValue', $password, PDO::PARAM_STR); 
                
                echo "Made it to save Entry after binding<br/>";
                
                if ( $stmt->execute() ) // if everything was excecuted corectly
                {
                    
                    echo "Made it to save Entry before close db<br/>";
                    
                    $db = $this->closeDB();
                    
                    echo "Made it to save Entry after execute<br/>";
                    
                    $heroDBClass = new HeroDB(); // creats new instence of the heroDB class file

                    if($heroDBClass->defaultEntry())// will call and fill hero database with default info..... hopefully
                    {
                        $db = $this->closeDB();
                        $inventoryDBClass = new InventoryDB();
                        echo "Made it to save Entry after default entry call<br/>";
                        if($inventoryDBClass->defaultInventory())
                        {
                            echo "Made it into inventory default entry<br/>";
                            return true;
                        }
                    }
                }
            }
        
        }
        catch ( Exception $ex )
        {
            echo $ex->getMessage();
        }
        
        
        
        //return false; 
    }
    
    public function getErrors() {
        return $this->errors;
    }
    
    
    
    
    
    
}
?>
