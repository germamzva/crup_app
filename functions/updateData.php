<?php

include ('crud_db.php');

global $conn;

$data = array();

$id = $_POST['id'];
$title = $_POST['title'];

$update = "UPDATE `list_tbl` SET `title` = '".$title."' WHERE `list_id` = $id";

if($conn->query($update)){
    $data["res"] = true;
    $data["msg"] = "Record updated successfully";
} else {
    $data["res"] = true;
    $data["msg"] = "Faild to Update";
}

echo json_encode($data);