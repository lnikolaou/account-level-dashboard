document.getElementById("submit_button").addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById("submit_button").disabled = true;
    document.getElementById("submit_button").innerHTML = '<i class="fa fa-spinner fa-spin"></i> Loading APIs and Dashboard';
    sessionStorage.setItem("var_api_id", document.getElementById("api_id").value);
    sessionStorage.setItem("var_api_key", document.getElementById("api_key").value);
    sessionStorage.setItem("var_account_id", document.getElementById("account_id").value);

    const post_data = {
        "account_id": document.getElementById("account_id").value,
        "api_key": document.getElementById("api_key").value,
        "api_id": document.getElementById("api_id").value,
        "period": document.getElementById("period").value
    };

    console.log("POST_DATA");
    console.log(post_data);

    $.ajax({
        url: "http://localhost:3000/dashboard_scripts",
        type: "post",
        dataType: 'json',
        data: post_data,
        success: function (data) {
            console.log("ajax logged input")
            console.log(post_data)
            console.log("NODEJS SCRIPT SUCCESS CHANGE SCRIPT");
            console.log(data);
            if (data.res_message != "OK") {
                swal({
                    title: "API Authentication Error",
                    text: ("Make sure you are using Admin Keys\n Test on API explorer: /api/prov/v1/sites/list\n error code: " + data.res_message),
                    type: "error"
                });
                document.getElementById("submit_button").disabled = false;
                document.getElementById("submit_button").innerHTML = ' Submit';
                document.getElementById("submit_button").class = "btn btn-info";
            } else {
                window.location.href = "dashboard";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("POST REQUEST FAILED");
            console.log(jqXHR, textStatus, errorThrown);
            window.location.href = "dashboard";
        }
    });   

})

// CHECK VERSION
fetch('js/version.json').then((response) => {
    response.json().then((data) => {
        fetch('https://raw.githubusercontent.com/imperva/account-level-dashboard/master/js/version.json').then((response_remote) => {
            response_remote.json().then((data_remote) => {
                document.getElementById("versionNb").innerHTML = data.version;
                if (response.version != response_remote.version) {
                    toastr.warning("<a href=\"https://github.com/imperva/account-level-dashboard\">a newer version is available in Github; click to download</a>", { closeButton: true });
                } else {
                    toastr.success('version is up to date', { closeButton: true });
                }
                })
    })
})
})
