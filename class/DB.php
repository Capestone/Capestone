<?php


class DB {
    
    protected $db = null;

    public function getDB() {        
        try {
            $this->db = new PDO(Config::DB_DNS, Config::DB_USER, Config::DB_PASSWORD);
        } catch (Exception $ex) {
           $this->db = null; //this will close the database just in case
        }
        return $this->db;        
    }
    
    // this will be used to close the conection to the database
     public function closeDB() {        
        $this->db = null;        
    }
    
    
}