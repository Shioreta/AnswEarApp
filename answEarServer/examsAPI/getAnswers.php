<?php
include "../config.php";
$input = file_get_contents('php://input');
$eid = $_GET['eid'];
$username = $_GET['username'];

$data = array();
$q = mysqli_query($con, "SELECT 
e.eid,
e.examName,
e.subjDesc,
SUM(CASE WHEN ans.rightanswer = ans.studanswer THEN '1' ELSE '0' END) AS score,
NOW() as 'dateToday'
FROM `tblanswers` ans
JOIN `tblexams` e
ON ans.eid = e.eid
WHERE ans.`eid`='$eid' AND ans.`username`='$username'");

while($row = mysqli_fetch_object($q)){
    $data[] = $row;
}

echo json_encode($data);
echo mysqli_error($con);
