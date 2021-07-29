<?php

include ('crud_db.php');

global $conn;

$data = array();

$id = $_POST['id'];

// update the table data where equal to user id
$conn->query("UPDATE `list_tbl` SET `user_assigned_id` = '0', `user_assigned_name` = '' WHERE user_assigned_id = '".$id."'");

// delete the user by id
$delete = "DELETE FROM `user_list` WHERE `user_id` = $id";

if($conn->query($delete) === TRUE){
    $data['res'] = true;
    $data['msg'] = "Record deleted successfully";
} else {
    $data['res'] = false;
    $data['msg'] = "Failed to delete!";
}

echo json_encode($data);