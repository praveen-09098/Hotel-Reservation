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

//Getting all Asset Maintenance Data
$res=$con->query("SELECT * FROM assetmaintenanceview;");
$result = "[";
while ($r = $res->fetch_assoc())
   {
	  $result = $result."{ \"assetName\" : \"".$r['assetName']."\",\"cost\" : \"".$r['cost']."\",\"serviceDetails\" : \"".$r['serviceDetails']."\",\"serviceDate\" : \"".$r['serviceDate']."\"},";
   }
	 $result = rtrim($result, ", ");
   $result = $result."]";
echo $result;
?>