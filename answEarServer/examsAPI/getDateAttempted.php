<?php
include "../config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$username = $_GET['username'];
$eid = $_GET['eid'];


$q = mysqli_query($con, "SELECT
dateAttempted
FROM tblattempts
WHERE username = '$username' AND eid = '$eid'");
 
if(mysqli_num_rows($q)>0){
    while($row = mysqli_fetch_object($q)){
        $data[] = $row;
    }
    echo json_encode($data);
}else {
    $message['status'] = "No attempts Yet!";
    echo json_encode($message);
}

// echo json_encode($data);
echo mysqli_error($con);
