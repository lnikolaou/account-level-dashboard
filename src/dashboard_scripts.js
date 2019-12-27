const request = require('request')
const fs = require('fs')

/*
const sites_list =
request.post(
    'http://www.yoursite.com/formpage',
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);*/


const sites_list = ({ api_id, api_key, account_id } = {}, callback) => {
    console.log("received JSON")
    console.log({ api_id, api_key, account_id })


    const post_data = {
        api_id: api_id,
        api_key: api_key,
        account_id: account_id,
     //   page_size: 100,
     //   page_num: 0
    }


    const post_data_stats = {
        api_id: api_id,
        api_key: api_key,
        account_id: account_id,
        stats: 'visits_timeseries, hits_timeseries, bandwidth_timeseries, requests_geo_dist_summary, visits_dist_summary, caching, caching, caching_timeseries, threats, incap_rules, incap_rules_timeseries',
        time_range: 'last_30_days',
        page_size: 100,
        page_num: 0
    }

    const post_list = {
        method: 'POST',
        url: 'https://my.imperva.com/api/prov/v1/sites/list',
        post_data,
        headers: {
            'cache-control': 'no-cache'
        }
    }
/*
    request(post_list, (error, response) => {
        if (error) {
            console.log("error " + error)
            callback(error)
            // NEED TO ADD SMTHG heRE TO HANDLE WHEN UNDEFINED
            // WON't WORK IF TOO MANY CALLS IN A ROW
        } else {

            let sites_list_array = []
            console.log(sites_list_array)
            sites_list_array.push(response.body)
            console.log(sites_list_array)
            fs.writeFileSync('public/export_sites.json', sites_list_array)
            callback(undefined, response.body)
        }
    })  */

    const post_subs = {
        method: 'POST',
        url: 'https://my.imperva.com/api/prov/v1/accounts/subscription',
        formData: post_data
    }


    request(post_subs, (error, response) => {
        if (error) {
            console.log("error " + error)
            callback(error)
            // NEED TO ADD SMTHG heRE TO HANDLE WHEN UNDEFINED
            // WON't WORK IF TOO MANY CALLS IN A ROW
        } else {
            console.log("post data")
            console.log(post_subs)
            console.log("subscription call")
            console.log(response.body)
            fs.writeFileSync('public/export_account_subscriptions.json', response.body)
            callback(undefined, response.body)
        }
    })
}


module.exports = {
    sites_list
}


/*  curl to get account stats
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/stats/v1");
curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_stats));   // post data
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($ch);
file_put_contents("../export_account_stats.json", $json);
curl_close($ch);
*/



/* curl to get the list of sub accounts 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://my.incapsula.com/api/prov/v1/accounts/listSubAccounts");
curl_setopt($ch, CURLOPT_POST, 1);// set post data to true
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));   // post data
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($ch);
file_put_contents("../export_subaccounts.json", $json);
curl_close($ch);
*/
