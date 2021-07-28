<?php

include ('crud_db.php');

global $conn;

$data = array();

$getAllUser = "SELECT * FROM user_list";

$result = $conn->query($getAllUser);

if($result->num_rows > 0){

    while($row = $result->fetch_assoc()){

        $data[] = array(
            'id' => $row['user_id'],
            'name' => $row['user_name'],
            'position' => $row['user_position'],
        );
    }
}

echo json_encode($data);