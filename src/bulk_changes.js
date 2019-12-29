const fs = require('fs')
const axios = require('axios')
const querystring = require('querystring');

const bulk_changes = ({ api_id, api_key, account_id, period } = {}, callback) => {
}

const bulk_changes_acl = ({ api_id, api_key, account_id, period } = {}, callback) => {
}

const post_data = {
    api_id: api_id,
    api_key: api_key,
    account_id: account_id
    //       'page_size': 100
}



module.exports = {
    bulk_changes,
    bulk_changes_acl
}