<?php
include "../config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$today = date("Y/m/d");

$username = $_GET['username'];
$subjDesc = $_GET['subjDesc'];

$q = mysqli_query($con, "SELECT * FROM tblexams e 
WHERE e.eid NOT IN(SELECT 
DISTINCT e.eid as eid
FROM tblexams e
JOIN tblexammembers em
ON e.eid = em.eid
WHERE em.username='$username' AND e.subjDesc = '$subjDesc'
AND em.eid IN(SELECT eid FROM tblattempts WHERE username='$username'))
AND e.endDate < '$today' AND e.subjDesc='$subjDesc'");

if(mysqli_num_rows($q)>0){
    while($row = mysqli_fetch_object($q)){
        $data[] = $row;
    }
    echo json_encode($data);
}else {
    $message['status'] = "No Completed Exams!";
    echo json_encode($message);
}

echo mysqli_error($con);
