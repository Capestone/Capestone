<?php

// this will automaticly include classes as i need them
spl_autoload_register(function($class) {
    include 'class/'.$class . '.php';
});
// session
session_start();
session_regenerate_id(true);
        
        
?>