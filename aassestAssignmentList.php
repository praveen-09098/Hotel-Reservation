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

//Getting all Asset Assigned details
$res=$con->query("SELECT * FROM assetsassigned;");
$result = "[";
while ($r = $res->fetch_assoc())
   {
	  $result = $result."{ \"employeeName\" : \"".$r['employeeName']."\",\"assetName\" : \"".$r['assetName']."\",\"returnDate\" : \"".$r['returnDate']."\",\"assignmentId\" : \"".$r['assignmentId']."\",\"isCheckIn\" : \"".$r['isCheckIn']."\"},";
   }
	 $result = rtrim($result, ", ");
   $result = $result."]";
echo $result;
?>