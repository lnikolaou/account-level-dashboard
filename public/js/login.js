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


    // REPLACE IT BY FETCH

    $.ajax({
        url: "http://localhost:3000/dashboard_scripts",
        type: "post",
        dataType: 'json',
        data: post_data,
        success: function (data) {
            console.log("NODEJS SCRIPT SUCCESS CHANGE SCRIPT");
            console.log(data);
            if (data.error.res_message != "OK") {
                swal({
                    title: data.error.title,
                    text: data.error.message,
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
    response.json().then((data_local) => {
        fetch('https://raw.githubusercontent.com/imperva/account-level-dashboard/master/public/js/version.json')
            .then((response_remote) => {
                return response_remote.json()
                    .then(function (data_remote) {
                        document.getElementById("versionNb").innerHTML = data_local.version;
                        if (data_local.version != data_remote.version) {
                            toastr.warning("<a href=\"https://github.com/imperva/account-level-dashboard\">a newer version is available in Github; click to download</a>", { closeButton: true });
                        } else {
                            toastr.success('version is up to date', { closeButton: true });
                        }
                        //    })
                    })
            })
    })
})
