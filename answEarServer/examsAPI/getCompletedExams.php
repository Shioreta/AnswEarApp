<?php
include "../config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$today = date("Y/m/d");

$username = $_GET['username'];
$subjDesc = $_GET['subjDesc'];

$q = mysqli_query($con, "SELECT 
DISTINCT e.eid,
e.examName,
e.subjDesc,
e.startDate,
e.endDate,
e.username,
e.examtype,
e.status
FROM tblexams e
JOIN tblexammembers em
ON e.eid = em.eid
WHERE em.username='$username' AND e.startDate < '$today' AND e.username='$username' AND e.subjDesc='$subjDesc'
AND em.eid NOT IN(SELECT eid FROM tblattempts WHERE username<>'$username')");


if(mysqli_num_rows($q)>0){
    while($row = mysqli_fetch_object($q)){
        $data[] = $row;
    }
    echo json_encode($data);
}else {
    $message['status'] = "No Completed Exams!";
    echo json_encode($message);
}

// echo json_encode($data);
echo mysqli_error($con);
