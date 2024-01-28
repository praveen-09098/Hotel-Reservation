var globalUrl = "http://10.0.0.75/Asset/";
function loginUser() {
    if ($("#usernameId").val() == "" || $("#pwdId").val() == "") {
        alert("Please fill Required Data");

    } else {
		var login = {
			"userName" : $("#usernameId").val(),
			"Password" : $("#pwdId").val()
		}
		$.ajax({
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: globalUrl + "login.php",
            data: JSON.stringify(login),
            success: function (response) {
				if(response == ""){
					alert("Wrong username or password");
				}else{
				localStorage.setItem("userDetails", JSON.stringify(response));
				window.location.href = "assetManagment.html";
				}
                
            }, error: function (error) {
				alert("Wrong username or password");
				               
            }
        });
        
    }
}

