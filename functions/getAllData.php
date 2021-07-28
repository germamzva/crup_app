<?php

include ('crud_db.php');

global $conn;

$data = array();

$selectAllData = "SELECT * FROM `list_tbl`";
$result = $conn->query($selectAllData);

if($result->num_rows > 0){

    while($row = $result->fetch_assoc()){

        $data[] = array(
            'id' => $row['list_id'],
            'title' => $row['title'],
            'assign' => $row['user_assigned_id'],
            'assign_name' => $row['user_assigned_name']
        );

    }

}

echo json_encode($data);