<?php

include ('crud_db.php');

global $conn;

$data = array();

$task_id = $_POST['task_id'];
$user_id = $_POST['user_id'];
$user_name = $_POST['user_name'];

$assignTask = "UPDATE `list_tbl` SET `user_assigned_id` = '".$user_id."', `user_assigned_name` = '".$user_name."' WHERE list_id = $task_id";

if($conn->query($assignTask)){
    $data['stat'] = true;
    $data['msg'] = 'Task Assign to '.$user_name;
} else {
    $data['stat'] = false;
    $data['msg'] = 'Failed to assign the task';
}

echo json_encode($data);