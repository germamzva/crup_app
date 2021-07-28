<?php

include ('crud_db.php');

global $conn;

$data = array();

if(isset($_POST['name'])){

    $name = $_POST['name'];
    $position = $_POST['position'];

    $insert = "INSERT INTO user_list (`user_name`, `user_position`) VALUES ('".$name."', '".$position."')";

    if($conn->query($insert) === TRUE) {
        $data['stat'] = true;
        $data['msg'] = 'Sucessfully Save';
    } else {
        $data['stat'] = false;
        $data['msg'] = 'Failed to Save';
    }
}

echo json_encode($data);