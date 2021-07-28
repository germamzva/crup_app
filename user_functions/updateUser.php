<?php

include ('crud_db.php');

global $conn;

$data = array();

$id = $_POST['id'];
$name = $_POST['name'];
$position = $_POST['position'];

$update = "UPDATE `user_list` SET `user_name` = '".$name."', `user_position` = '".$position."'  WHERE `user_id` = $id";

if($conn->query($update)){
    $data["res"] = true;
    $data["msg"] = "Record updated successfully";
} else {
    $data["res"] = true;
    $data["msg"] = "Faild to Update";
}

echo json_encode($data);