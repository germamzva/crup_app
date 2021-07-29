<?php

include ('crud_db.php');

global $conn;

$data = array();

$user_id = $_POST['user_id'];

$getAssignTask = "SELECT * FROM `list_tbl` WHERE user_assigned_id = $user_id";

$result = $conn->query($getAssignTask);

if($result->num_rows > 0){

    while($row = $result->fetch_assoc()){

        $data[] = array(
            'list_id' => $row['list_id'],
            'title' => $row['title'],
        );
    }
}

echo json_encode($data);