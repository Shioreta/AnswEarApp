<?php
include "../config.php";
$input = file_get_contents('php://input');
//$usertype = $_GET['usertype'];

$data = array();
$q = mysqli_query($con, "SELECT * FROM tblusers WHERE `usertype` = 'teacher' OR `usertype` = 'student'");

while($row = mysqli_fetch_object($q)){
    $data[] = $row;
}

echo json_encode($data);
echo mysqli_error($con);
