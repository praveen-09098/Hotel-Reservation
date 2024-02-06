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
// Selecting DB
mysqli_select_db($con,$dbname);

//Getting all Asset details

$res=$con->query("SELECT * FROM assets;");
$result = "[";
while ($r = $res->fetch_assoc())
   {
	  $result = $result."{ \"assetName\" : \"".$r['assetName']."\",\"assetType\" : \"".$r['assetType']."\",\"serialno\" : \"".$r['serialno']."\",\"initialCondition\" : \"".$r['initialCondition']."\",\"purchaseDateId\" : \"".$r['purchaseDateId']."\"},";
   }
	 $result = rtrim($result, ", ");
   $result = $result."]";
echo $result;
?>
