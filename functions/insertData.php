<?php

include ('crud_db.php');

global $conn;

if(isset($_POST['title'])){

    $title = $_POST['title'];

    $insert = "INSERT INTO list_tbl (`title`) VALUES ('".$title."')";

    if($conn->query($insert) === TRUE) {
        echo 'Sucess';
    } else {
        echo 'Failed';
    }

}