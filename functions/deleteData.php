<?php

include ('crud_db.php');

global $conn;

$data = array();

$id = $_POST['id'];

$delete = "DELETE FROM list_tbl WHERE list_id = $id";

if($conn->query($delete) === TRUE){
    $data['res'] = true;
    $data['msg'] = "Record deleted successfully";
} else {
    $data['res'] = false;
    $data['msg'] = "Failed to delete!";
}

echo json_encode($data);