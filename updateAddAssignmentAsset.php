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

// Getting values from the Form
$postData = json_decode(file_get_contents("php://input"), true);
$assignmentId = $postData["assignmentId"];
$isCheckIn = $postData["isCheckIn"];

// Updating the details
$sql = "UPDATE assetsassignment set isCheckIn = '$isCheckIn' where assignmentId = '$assignmentId';";

if (!$con->query($sql) === TRUE) {
    echo "Failed";
} else {
    
	echo "Success";	
}
$con->close();
?>
