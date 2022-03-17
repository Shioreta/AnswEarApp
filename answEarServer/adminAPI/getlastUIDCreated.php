<?php
include "../config.php";
$input = file_get_contents('php://input');

$data = array();
$q = mysqli_query($con, "SELECT * FROM tblusers ORDER BY uid DESC LIMIT 0,1");

while($row = mysqli_fetch_object($q)){
    $data[] = $row;
}

echo json_encode($data);
echo mysqli_error($con);
