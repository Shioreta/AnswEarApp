<?php
include "../config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$subjDesc = $_GET['subjDesc'];
$eid = $_GET['eid'];


$q = mysqli_query($con, " SELECT 
DISTINCT em.username,
em.eid,
u.fname,
u.lname,
e.examName,
e.subjDesc
FROM tblexammembers em 
JOIN tblusers u 
ON em.username = u.username
JOIN tblexams e 
ON em.eid = e.eid
WHERE u.usertype = 'student' AND e.subjDesc='$subjDesc' AND em.eid='$eid' AND em.username NOT IN(SELECT username FROM tblexamresults WHERE eid='$eid')");

while($row = mysqli_fetch_object($q)){
    $data[] = $row;
}

echo json_encode($data);
echo mysqli_error($con);
