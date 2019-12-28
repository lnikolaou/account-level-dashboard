const fs = require('fs')
const axios = require('axios')
const querystring = require('querystring');


const sites_list = ({ api_id, api_key, account_id, period } = {}, callback) => {
    console.log("received JSON")
    console.log({ api_id, api_key, account_id, period })


    const post_data = {
        api_id: api_id,
        api_key: api_key,
        account_id: account_id
        //       'page_size': 100
    }

    const post_stats = {
        api_id: api_id,
        api_key: api_key,
        account_id: account_id,
        stats: 'visits_timeseries, hits_timeseries, bandwidth_timeseries, requests_geo_dist_summary, visits_dist_summary, caching, caching, caching_timeseries, threats, incap_rules, incap_rules_timeseries',
        time_range: period
    }


    // SITE LIST JSON



    // PROMISE FOR ALL CALLS
    axios.all([
        axios.post('https://my.imperva.com/api/prov/v1/accounts/listSubAccounts', querystring.stringify(post_data)),
        axios.post('https://my.imperva.com/api/stats/v1', querystring.stringify(post_stats)),
        axios.post('https://my.imperva.com/api/prov/v1/accounts/subscription', querystring.stringify(post_data)),
        axios.post('https://my.imperva.com/api/prov/v1/sites/list', querystring.stringify(post_data))
    ])

        .then(axios.spread((r_subaccounts, r_stats, r_sub, r_sites) => {

            console.log("POST SUBACCOUNT OK")
            //console.log(r_sub.data)
            fs.writeFileSync('public/export_subaccounts.json', JSON.stringify(r_subaccounts.data))

            console.log("POST STATS OK")
            //console.log(r_stats.data)
            fs.writeFileSync('public/export_account_stats.json', JSON.stringify(r_stats.data))

            console.log("POST SUBSCRIPTION OK")
            //console.log(r_sub.data)
            fs.writeFileSync('public/export_account_subscriptions.json', JSON.stringify(r_sub.data))

            console.log("POST LIST SITES")
            if (r_sites.data.res_message != "OK") {
                callback({ res_message: "NOK", title: "Error", message: "Make sure you are using Admin Keys\n Test on API explorer: /api/prov/v1/sites/list\n error code: " + r_sites.data.res_message })
                //ADD ERROR IN CASE OF API AUTH ERROR
                //                    text: ("Make sure you are using Admin Keys\n Test on API explorer: /api/prov/v1/sites/list\n error code: " + data.res_message),

            } else {
                console.log(r_sites.data)
                var sites_array = r_sites.data.sites
                console.log("export ARRAY")
                console.log(sites_array)
                console.log(sites_array.length)
                callback({ res_message: "OK" })
                fs.writeFileSync('public/export_sites.json', JSON.stringify(sites_array))

            }
        }))
        .catch((err) => {
            console.log('FAIL', err)
            callback({ res_message: "NOK", title: "error when running the API", message: "Connectivity error or NodeJS parser error.\n Try the command: node --http-parser=legacy src/app.js " })
        })




    // POST SUBACCOUNTS



    // callback({ res_message: "OK" })
}


module.exports = {
    sites_list
}





/*
    // FUNCTION TO FETCH MORE PAGES IF MORE THAN 100 SITES
    function requestExtra(pageNb) {
        console.log("SOMEONE IS REQUESTING EXTRA")
        const post_extra = {
            method: 'POST',
            url: 'https://my.imperva.com/api/prov/v1/sites/list',
            formData: {
                api_id: api_id,
                api_key: api_key,
                account_id: account_id,
                'page_size': 100,
                'page_num': pageNb
            },
            headers: {
                'cache-control': 'no-cache'
            }
        }
        request(post_extra, (err, res) => {
            if (err) {
                console.log("error " + err)
                // NEED TO ADD SMTHG heRE TO HANDLE WHEN UNDEFINED
            } else {

                var sites_array_b = JSON.parse(response.body)
                var sites_array = sites_array_b.sites
                console.log("PAGE 2 sites_array")
                console.log(sites_array)
                callback(JSON.stringify(sites_array))
                //        const response_a = JSON.parse(response.body)
                //        if (response_a.res_message != "OK") {
                //       fs.writeFileSync('public/export_sites.json', response.body)
                //        } else {
                //           const sites_array_a = JSON.parse(response.body)
                //           const sites_array = sites_array_a.sites
                //           console.log("export ARRAY EXTRA")
                //           console.log(sites_array)
                //           callback(undefined, JSON.stringify(sites_array))
                //       }
                //   return(JSON.stringify([hoplala]))
            }
        })
    }

*/
/*
                // TO CREATE THE LOOP IF MORE THAN 100 SITES

                /*
                if (sites_array.length == 5) {
                    var number_sites = 5;
                    var page_count = 1;
                    while (number_sites == 5) {
                        console.log("I GOT IN THE WHILE")
                         json_extra = requestExtra(page_count)
                         console.log("json_extra")
                         console.log(JSON.parse(json_extra))

                    //    json_extra_object_2 = JSON.parse(json_extra)
                    //    const sites_array = sites_array.concat(json_extra_object_2.sites)
                        console.log("this should have 6 sites")
                    //    console.log(sites_array)

                    //    number_sites = json_extra_object_2.length()
                   //     page_count = page_count + 1
                   number_sites = 1
                    }
                }
                */

/*
fs.writeFileSync('public/export_sites.json', JSON.stringify(sites_array))
}
}
})
*/