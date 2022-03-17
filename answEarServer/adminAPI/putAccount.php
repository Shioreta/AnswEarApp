<?php
include "../config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$fname = $data['fname'];
$mname = $data['mname'];
$lname = $data['lname'];
$usertype = $data['usertype'];
$gender = $data['gender'];
$bday = $data['bday'];
$username = $data['username'];
$pass = $data['pass'];
$school = $data['school'];


$q = mysqli_query($con, "INSERT INTO `tblusers`(`fname`,`mname`,`lname`,`usertype`,`gender`,`bday`,`username`,`pass`,`school`) VALUES('$fname','$mname','$lname','$usertype','$gender','$bday','$username','$pass','$school')");

if($q){
    http_response_code(201);
    $message['status'] = "Account Successfully added!";
}else{
    http_response_code(422);
    $message['status'] = "Error";
}

echo json_encode($message);
echo mysqli_error($con);