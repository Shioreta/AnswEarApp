<?php
include "../config.php";

$message = array();
$qid = $data['qid'];
$eid = $data['eid'];

$q = mysqli_query($con, "DELETE FROM tblqna WHERE QID=$qid AND EID=$eid");

if($q){
    http_response_code(201);
    $message['status'] = "Quesstion Successfully Deleted!";
}else{
    http_response_code(422);
    $message['status'] = "Error";
}

echo json_encode($message);
echo mysqli_error($con);

?>