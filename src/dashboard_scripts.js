const request = require('request')
const fs = require('fs')


const sites_list = ({ api_id, api_key, account_id } = {}, callback) => {
    console.log("received JSON")
    console.log({ api_id, api_key, account_id })



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
                callback(error)
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



    const post_data = {
        api_id: api_id,
        api_key: api_key,
        account_id: account_id,
        'page_size': 100
    }
    const post_list = {
        method: 'POST',
        url: 'https://my.imperva.com/api/prov/v1/sites/list',
        formData: post_data,
        headers: {
            'cache-control': 'no-cache'
        }
    }
    request(post_list, (error, response) => {
        if (error) {
            console.log("error " + error)
            callback(error)
            // NEED TO ADD SMTHG heRE TO HANDLE WHEN UNDEFINED
        } else {
            const response_a = JSON.parse(response.body)
            if (response_a.res_message != "OK") {
                fs.writeFileSync('public/export_sites.json', response.body)

            } else {
                var sites_array_a = JSON.parse(response.body)
                var sites_array = sites_array_a.sites
                console.log("export ARRAY")
                console.log(sites_array)
                console.log(sites_array.length)

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
                fs.writeFileSync('public/export_sites.json', JSON.stringify(sites_array))

            }
        }
    })



    // POST SUBSCRIPTION
    const post_subs = {
        method: 'POST',
        url: 'https://my.imperva.com/api/prov/v1/accounts/subscription',
        formData: post_data
    }
    request(post_subs, (error, response) => {
        if (error) {
            console.log("error " + error)
        } else {
            console.log("post data")
            console.log(post_subs)
            console.log("subscription call")
            console.log(response.body)
            fs.writeFileSync('public/export_account_subscriptions.json', response.body)
            //       callback(undefined, response.body)
        }
    })

    // POST SUBACCOUNTS
    const post_subaccount = {
        method: 'POST',
        url: 'https://my.imperva.com/api/prov/v1/accounts/listSubAccounts',
        formData: post_data
    }
    request(post_subaccount, (error, response) => {
        if (error) {
            console.log("error " + error)
            callback(error)
        } else {
            console.log("post data")
            console.log(post_subaccount)
            console.log("subaccounts call")
            console.log(response.body)
            fs.writeFileSync('public/export_subaccounts.json', response.body)
            //       callback(undefined, response.body)
        }
    })

    // POST STATS
    const post_data_stats = {
        method: 'POST',
        url: 'https://my.imperva.com/api/stats/v1',
        formData: {
            api_id: api_id,
            api_key: api_key,
            account_id: account_id,
            stats: 'visits_timeseries, hits_timeseries, bandwidth_timeseries, requests_geo_dist_summary, visits_dist_summary, caching, caching, caching_timeseries, threats, incap_rules, incap_rules_timeseries',
            time_range: 'last_30_days',
            page_size: 100,
            page_num: 0
        }
    }
    request(post_data_stats, (error, response) => {
        if (error) {
            console.log("error " + error)
            callback(error)
        } else {
            console.log("post data_stats")
            console.log(post_subaccount)
            console.log("data_stats call")
            console.log(response.body)
            fs.writeFileSync('public/export_account_stats.json', response.body)
            //       callback(undefined, response.body)
        }
    })

    callback(undefined, { response: "all good" })

}


module.exports = {
    sites_list
}



