<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Access-Control-Max-Age: 1728000');
header('Content-Length: 0');
header('Content-Type: text/plain');
$con = mysqli_connect("127.0.0.1","root","","dbanswEar") OR die("Server Error!");
// $con = mysqli_connect("dbanswearprod.cojbqojv7v1c.us-east-2.rds.amazonaws.com","admin","S46MpuI5Rm643sav5lhd","dbanswear") OR die("Server Error!");

