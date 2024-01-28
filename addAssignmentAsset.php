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
$assetName = $postData["assetName"];
$assetType = $postData["assetType"];
$initialCondition = $postData["initialCondition"];
$purchaseDateId = $postData["purchaseDateId"];
$serialno = $postData["serialno"];

// Adding a new Asset
$sql = "INSERT INTO assets (assetName, assetType, initialCondition , purchaseDateId, serialno) 
		VALUES ('$assetName', '$assetType', '$initialCondition', '$purchaseDateId', '$serialno');";

if (!$con->query($sql) === TRUE) {
    echo "Failed: " . $con->error;
} else {
    
	echo "Success";	
}
$con->close();
?>