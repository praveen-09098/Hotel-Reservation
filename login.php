<?php
$mysql_host = 'localhost'; // Change accordingly
$mysql_user = 'adminer'; // Change accordingly
$mysql_password = 'Skm@1234'; // Change accordingly
$dbname = "deptasstmgmt"; // DB Name which is created in MySQL
//Try to connect
$con = new mysqli($mysql_host, $mysql_user, $mysql_password);
// Check connection
if ($con->connect_error) {
    die("Connection Failed: " . $con->connect_error);
}
// Selecting DB
mysqli_select_db($con,$dbname);
$postData = json_decode(file_get_contents("php://input"), true);
$userName = $postData["userName"];
$Password = $postData["Password"];
//Getting all Asset details
$res=$con->query("SELECT * FROM users where userName = '$userName' and Password = '$Password';");
$result = "";
while ($r = $res->fetch_assoc())
   {
	  $result = $result."{ \"userId\" : \"".$r['userid']."\",\"userName\" : \"".$r['username']."\",\"password\" : \"".$r['password']."\",\"userType\" : \"".$r['usertype']."\"}";
   }
	 
echo $result;
?>