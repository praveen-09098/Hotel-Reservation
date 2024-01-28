var app = angular.module('myApp', []);
var globalUrl = "http://10.0.0.75/Asset/";
app.controller('myCtrl', function ($scope) {
    $scope.onload = function () {
        $scope.loginUserDetails = localStorage.getItem("userDetails");
        $scope.loginUserDetails = JSON.parse($scope.loginUserDetails);
        $scope.viewAssignmentAssetData = [];
        $scope.assignmentData = {};
        $scope.iteamDataModel = {};
        $scope.maintenanceData = {};
        $scope.viewIteamData = [];
        $scope.counter = Array;
        $scope.iteamCount = 0;
        $scope.viewSellData = [];
        $("#checkInOutDivId").hide();
        $("#addIteamDivId").hide();
        if ($scope.loginUserDetails.userType == "ADMIN") {
            $("#addIteamDivId").show();
            $scope.getIteamTableData();
        } else {
            $scope.getAssetAssignment();
            $("#checkInOutDivId").show();
        }
        $("#addAssignmentDivId").hide();
        $("#maintenanceDivId").hide();

    }
    //ASSIGNMENT
    $scope.getAssetAssignment = function (isAssignmentTab) {
        $scope.viewAssignmentAssetData = [];
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: globalUrl + "aassestAssignmentList.php",
            success: function (response) {


                if ($scope.loginUserDetails.userType == "ADMIN") {

                    $scope.viewAssignmentAssetData = response;
                } else {
                    $scope.viewAssignmentAssetData = response.filter(function (obj) {
                        return obj.employeeName === $scope.loginUserDetails.userName;
                    })
                }
                if (isAssignmentTab) {
                    $scope.getIteamTableData(true);
                }
                $scope.$apply();
            }, error: function (error) {
                alert("Something Went Wrong");
            }
        });
    }
    $scope.addAssetAssignment = function () {
        if ($scope.assignmentData.hasOwnProperty("$$hashKey")) {
            delete $scope.assignmentData.$$hashKey;

        }
        if (isNull($scope.assignmentData.employeeName) || isNull($scope.assignmentData.assetName)
            || isNull($("#returnDate").val())) {
            alert("Please Fill All Mandatory Details");
            return false;
        }


        $scope.assignmentData["returnDate"] = $("#returnDate").val();
        $scope.assignmentData["isCheckIn"] = true;
        $.ajax({
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: globalUrl + "EmployeeAssignment.php",
            data: JSON.stringify($scope.assignmentData),
            success: function (response) {
                $scope.getAssetAssignment(true);
                alert("Data Submitted Sucessfully!!!");
            }, error: function (error) {
                $scope.getAssetAssignment(true);
                alert("Data Submitted Sucessfully!!!");
            }
        });
    }
    // ASSEST
    $scope.getIteamTableData = function (isAssignmentTab) {
        $scope.viewIteamData = [];
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: globalUrl + "getAssetData.php",
            success: function (response) {

                if (isAssignmentTab) {
                    let assetNamesList = [];

                    $scope.viewAssignmentAssetData.forEach(element => {
                        if (element.isCheckIn) {
                            assetNamesList.push(element.assetName)
                        }

                    });
                    $scope.viewIteamData = response.filter(function (obj) {
                        return !assetNamesList.includes(obj.assetName);
                    })
                } else {
                    $scope.viewIteamData = response;
                }

                $scope.$apply();
            }, error: function (error) {
                alert("Something Went Wrong");
            }
        });
    }
    $scope.addIteams = function () {
        let isValidData = true;
        if ($scope.iteamDataModel.hasOwnProperty("$$hashKey")) {
            delete $scope.iteamDataModel.$$hashKey;

        }
        if (isNull($scope.iteamDataModel.assetName) || isNull($scope.iteamDataModel.assetType)
            || isNull($scope.iteamDataModel.serialno) || isNull($scope.iteamDataModel.initialCondition)
            || isNull($("#purchaseDateId").val())) {
            isValidData = false;
            alert("Please Fill All Mandatory Details");
        }
        if (isValidData) {
            $scope.iteamDataModel["purchaseDateId"] = $("#purchaseDateId").val();
            $.ajax({
                type: 'post',
                contentType: "application/json",
                dataType: 'json',
                cache: false,
                url: globalUrl + "addAssignmentAsset.php",
                data: JSON.stringify($scope.iteamDataModel),
                success: function (response) {
                    $scope.getIteamTableData();
                    alert("Data Submitted Sucessfully!!!");
                }, error: function (error) {
                    $scope.getIteamTableData();
                    alert("Data Submitted Sucessfully!!!");
                }
            });
        }
    }
    // MAINTENANCE
    $scope.getMaintenance = function () {
        $scope.viewMaintenanceData = [];
        $scope.viewMaintenanceData = [{ "assetName": "abc", "cost": 5, "serviceDetails": "asdfghjk", "serviceDate": "2023-11-30" },
        { "assetName": "abc", "cost": 5, "serviceDetails": "asdfghjk", "serviceDate": "2023-11-30" }];
        $("#maintenanceTbodyId").empty();
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: globalUrl + "maintenanceList.php",
            success: function (response) {
                $("#maintenanceTbodyId").empty();
                $scope.viewMaintenanceData = response;
                $scope.viewMaintenanceData.forEach((element, index) => {
                    $("#maintenanceTbodyId").append(
                        '<tr>' +
                        '<td>' + element.assetName + '</td>' +
                        '<td>' + element.serviceDate + '</td>' +
                        '<td>' + element.cost + '</td>' +
                        '<td>' + element.serviceDetails + '</td>' +
                        '</tr>'
                    )
                });
                $scope.$apply();
            }, error: function (error) {
                alert("Something Went Wrong");
            }
        });
    }
    $scope.addMaintenance = function () {
        if ($scope.maintenanceData.hasOwnProperty("$$hashKey")) {
            delete $scope.assignmentData.$$hashKey;

        }

        if (isNull($scope.maintenanceData.assetName) || isNull($scope.maintenanceData.cost)
            || isNull($scope.maintenanceData.serviceDetails) || isNull($("#serviceDate").val())) {
            alert("Please Fill All Mandatory Details");
            return false;
        }

        $scope.maintenanceData["serviceDate"] = $("#serviceDate").val();
        $.ajax({
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: globalUrl + "addMaintenance.php",
            data: JSON.stringify($scope.maintenanceData),
            success: function (response) {
                $scope.getAssetAssignment();
                alert("Data Submitted Sucessfully!!!");
            }, error: function (error) {
                $scope.getAssetAssignment();
                alert("Data Submitted Sucessfully!!!");
            }
        });
    }
    $scope.checkInOutAsset = function (event, details) {
        let requestBody = {};
        requestBody["isCheckIn"] = event.target.checked;
        requestBody["assignmentId"] = details.assignmentId;
        $.ajax({
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: globalUrl + "updateAddAssignmentAsset.php",
            data: JSON.stringify(requestBody),
            success: function (response) {
                $scope.getAssetAssignment();
                alert("Data Updated Sucessfully!!!");
            }, error: function (error) {
                $scope.getAssetAssignment();
                alert("Data Updated Sucessfully!!!");
            }
        });
    }
    $scope.downloadPdf = function (id, fileName) {
        let divId = '#' + id;
        var doc = new jsPDF();
        var specialElementHandlers = {
            divId: function (element, renderer) {
                return true;
            }
        };
        var doc = new jsPDF();
        doc.fromHTML(
            $(divId).html(), 15, 15,
            { 'width': 170, 'elementHandlers': specialElementHandlers },
            function () { doc.save(fileName + '.pdf'); }
        );
    }
    $scope.logout = function () {
        window.location.href = "assestLogin.html";
        localStorage.clear();
    }
    $scope.switchMenu = function (type, id) {
        $(".menuCls").removeClass("active");
        $('#' + id).addClass("active");
        $("#addAssignmentDivId").hide();
        $("#addIteamDivId").hide();
        $("#maintenanceDivId").hide();
        $("#checkInOutDivId").hide();
        if (type == "ADD_ASSIGNMENT") {
            $scope.assignmentData = {};
            $("#addAssignmentDivId").show();
            $scope.getAssetAssignment(true);

        } else if (type == "ADD_ITEMS") {
            $scope.iteamDataModel = {};
            $scope.getIteamTableData();
            $("#addIteamDivId").show();

        } else if (type == "MAINTENANCE") {
            $("#maintenanceDivId").show();
            $scope.getIteamTableData();
            $scope.getMaintenance();

        } else if (type = "CHECK-IN-OUT") {
            $("#checkInOutDivId").show();
            $scope.getAssetAssignment(false);
        }
    }
    function isNull(value) {
        return value == "" || value == undefined || value == null;
    }
});
