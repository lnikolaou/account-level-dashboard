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


// PROMISE FOR ALL CALLS
axios.all([

    // SITE LIST JSON
    axios.post('https://my.imperva.com/api/prov/v1/sites/list', querystring.stringify(post_data)),
    /*
    .then((response) => {
        console.log("RETRIEVE THE FIRST SITE LIST")
        console.log(response.data)
        if (response.data.res_message != "OK") {
            fs.writeFileSync('public/export_sites.json', response.data)
        } else {
            //  var sites_array_a = JSON.parse(response.body)
            var sites_array = response.data.sites
            console.log("export ARRAY")
            console.log(sites_array)
            console.log(sites_array.length)
            fs.writeFileSync('public/export_sites.json', JSON.stringify(sites_array))
        }
    }, (error) => {
        console.log(error);
    }),
*/
    // POST SUBACCOUNTS
    axios.post('https://my.imperva.com/api/prov/v1/accounts/subscription', querystring.stringify(post_data)),
/*        .then((response) => {
            console.log("POST SUBSCRIPTION")
            console.log(response.data)
            if (response.data.res_message != "OK") {
                fs.writeFileSync('public/export_account_subscriptions.json', JSON.stringify(response.data))

            } else {
                console.log("WEEENNTT OKKK")
                fs.writeFileSync('public/export_account_subscriptions.json', JSON.stringify(response.data))
            }
        }, (error) => {
            console.log(error);
        }),
*/
    // POST SUBACCOUNTS
    axios.post('https://my.imperva.com/api/prov/v1/accounts/listSubAccounts', querystring.stringify(post_data)),
    /*    .then((response) => {
            console.log("POST SUBACCOUNT")
            console.log(response.data)
            fs.writeFileSync('public/export_subaccounts.json', JSON.stringify(response.data))
        }, (error) => {
            console.log(error);
        }),
*/


    // POST STATS
    axios.post('https://my.imperva.com/api/stats/v1', querystring.stringify(post_stats))
     /*   .then((response) => {
            console.log("POST STATS")
            console.log(response.data)
            fs.writeFileSync('public/export_account_stats.json', JSON.stringify(response.data))
        }, (error) => {
            console.log(error);
        })   
    */
    ])
.then(axios.spread((response_sites, response_sub1, r3, r4) => {

    console.log("PROMISE #1")
    console.log(r4)

   // fs.writeFileSync('public/export_sites.json', JSON.stringify(r4.data))

  //this will be executed only when all requests are complete
  callback({ res_message: "OK" })

}))  
.catch((error) => {
    console.log("THIS IS AN AXIOS ERROR")
    console.log(error);
   });


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