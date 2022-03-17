<?php
include "../config.php";

$message = array();

$q = mysqli_query($con, "DELETE FROM tblExams WHERE examName='' AND subjDesc='' 
AND startDate='0000-00-00' AND endDate='0000-00-00'AND username='' AND examtype=''");

if($q){
    http_response_code(201);
    $message['status'] = "User Successfully Deleted";
}else{
    http_response_code(422);
    $message['status'] = "Error";
}

echo mysqli_error($con);
