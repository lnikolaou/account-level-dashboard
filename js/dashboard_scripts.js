


        var default_colors = ['#e1e1ea', '#ccffcc', '#ccffff', '#ffccff', ' #ccccff', '#ffe0cc', '#ccfff5', '#ffd9b3', '#ffff80', '#f0b3ff', '#316395', '#ff6666', '#5353c6', '#ff794d', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']
    // SECURITY JAVASCRIPTS 

    // Javascript graph for threat type -->
        let myChart = document.getElementById('threatChart').getContext('2d');
        let myChart_Custom = document.getElementById('threatChart_custom').getContext('2d');
        //let myChart = document.getElementById('threatChart').getContext('2d');

        let threatsGraph = new Chart(threatChart, {
            type: 'bar',
            data: {
                labels: ['Suspected Bots', 'Bad Bots', 'XSS', 'SQLi', 'illegal Resource', 'RFi', 'Backdoor'],
                datasets: [{
                    label: 'threats events',
                    data: [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    //backgroundColor:'green',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                }]
            },
            options: {

                plugins: {
                    datalabels: {
                        display: true,
                        anchor: 'end',
                        align: 'top',
                        formatter: Math.round,
                        font: {
                            weight: 'bold',
                            size: '16'
                        }
                    }
                },


                title: {
                    display: false,
                    text: 'Threat Events for selected period',
                    fontSize: 14
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                legend: {
                    display: false,
                    position: 'right',
                    labels: {
                        fontColor: '#000'
                    }
                },
                tooltips: {
                    enabled: true
                },
                scales: {
                    xAxes: [{

                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },

                        display: true,
                        ticks: {
                            beginAtZero: true   // minimum value will be 0.
                        }
                    }],

                    yAxes: [{

                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: false
                        },

                        display: true,
                        ticks: {
                            beginAtZero: true   // minimum value will be 0.
                        }
                    }]
                }
            }
        });


        let threatsGraph_custom = new Chart(threatChart_custom, {
            type: 'bar',
            data: {
                labels: ['Incaprules', 'Blacklisted URL', 'Blacklisted Country', 'Blacklisted IP', 'DDoS'],
                datasets: [{
                    label: 'threats events',
                    data: [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    //backgroundColor:'green',
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                }]
            },
            options: {

                plugins: {
                    datalabels: {
                        display: true,
                        anchor: 'end',
                        align: 'top',
                        formatter: Math.round,
                        font: {
                            weight: 'bold',
                            size: '16'
                        }
                    }
                },


                title: {
                    display: false,
                    text: 'Threat Events for selected period',
                    fontSize: 14
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                legend: {
                    display: false,
                    position: 'right',
                    labels: {
                        fontColor: '#000'
                    }
                },
                tooltips: {
                    enabled: true
                },
                scales: {
                    xAxes: [{

                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },

                        display: true,
                        ticks: {
                            beginAtZero: true   // minimum value will be 0.
                        }
                    }],

                    yAxes: [{

                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: false
                        },

                        display: true,
                        ticks: {
                            beginAtZero: true   // minimum value will be 0.
                        }
                    }]
                }
            }
        });


        $(document).ready(function () {
            $.ajax({
                url: 'export_account_stats.json',
                datatype: 'json',
                type: 'get',
                cache: false,
                success: function (result) {
                    if (typeof result.incap_rules === 'undefined') {
                        threatsGraph_custom.data.datasets[0].data[0] = 0;
                    } else {
                        threatsGraph_custom.data.datasets[0].data[0] = result.incap_rules[0].incidents;
                    }


                    threatsGraph.data.datasets[0].data[2] = result.threats[0].incidents;
                    threatsGraph_custom.data.datasets[0].data[1] = result.threats[1].incidents;
                    threatsGraph_custom.data.datasets[0].data[2] = result.threats[2].incidents;
                    threatsGraph.data.datasets[0].data[3] = result.threats[3].incidents;
                    threatsGraph_custom.data.datasets[0].data[3] = result.threats[4].incidents;
                    threatsGraph.data.datasets[0].data[4] = result.threats[5].incidents;
                    threatsGraph.data.datasets[0].data[0] = result.threats[6].incidents;
                    threatsGraph.data.datasets[0].data[6] = result.threats[7].incidents;
                    threatsGraph_custom.data.datasets[0].data[4] = result.threats[8].incidents;
                    threatsGraph.data.datasets[0].data[5] = result.threats[9].incidents;
                    threatsGraph.data.datasets[0].data[1] = result.threats[10].incidents;
                    threatsGraph.update();
                    threatsGraph_custom.update();

                }
            });
        });






    // Graph for Human / Bot visits -->

        $(document).ready(function () {
            $.ajax({
                url: 'export_account_stats.json',
                datatype: 'json',
                type: 'get',
                cache: false,
                success: function (result) {
                    var totHumans = 0;
                    var totBots = 0;
                    $(result.visits_timeseries[0].data).each(function (index, value) {
                        totHumans = totHumans + value[1];
                    });
                    $(result.visits_timeseries[1].data).each(function (index, value) {
                        totBots = totBots + value[1];
                    });

                    document.getElementById("human_visits").textContent = Math.round((totHumans / (totHumans + totBots)) * 100) + "%";
                    document.getElementById("bot_visits").textContent = Math.round((totBots / (totHumans + totBots)) * 100) + "%";
                    document.getElementById("human_visits").style.fontSize = Math.max(Math.round((totHumans / (totHumans + totBots)) * 100), 20) + "px";
                    document.getElementById("bot_visits").style.fontSize = Math.max(Math.round((totBots / (totHumans + totBots)) * 100), 20) + "px";

                }
            });
        });


    // GRAPH PIE for Visiting Bots Statistics -->

        var dataBots = {
            datasets: [{
                data: [
                    3,
                    14
                ],
                backgroundColor: default_colors,
                label: 'My dataset' // for legend
            }],
            labels: [
                "Google",
                "Yahoo"
            ]
        };

        var BotsChart2 = document.getElementById("BotsGraph").getContext('2d');
        var varBotsChart = new Chart(BotsChart2, {
            type: 'doughnut',
            data: dataBots,
            options: {

                plugins: {
                    datalabels: {
                        display: false
                    }
                },

                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#000',
                        fontSize: 14,
                        padding: 0
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltips: {
                    enabled: true
                }
            }
        });


        $(document).ready(function () {
            $.ajax({
                url: 'export_account_stats.json',
                datatype: 'json',
                type: 'get',
                cache: false,
                success: function (result) {
                    var BotsRequestsData = 0;
                    var BotsRequestsLabels = 0;
                    var totalBotsRequests = 0;
                    var othersBots = 0;
                    $(result.visits_dist_summary[1].data).each(function (index, value) {
                        totalBotsRequests = totalBotsRequests + value[1];
                    });

                    var i2;
                    var j2 = 1;
                    for (i2 = 0; i2 < result.visits_dist_summary[1].data.length; i2++) {
                        if (result.visits_dist_summary[1].data[i2][1] / totalBotsRequests > 0.04) {
                            varBotsChart.data.datasets[0].data[j2] = Math.round(result.visits_dist_summary[1].data[i2][1] / totalBotsRequests * 100);
                            varBotsChart.data.labels[j2] = result.visits_dist_summary[1].data[i2][0];
                            j2 = j2 + 1;
                        } else {
                            othersBots = othersBots + result.visits_dist_summary[1].data[i2][1];
                        }
                    }
                    varBotsChart.data.datasets[0].data[0] = Math.round(othersBots / totalBotsRequests * 100);
                    varBotsChart.data.labels[0] = "others";
                    varBotsChart.update();
                }
            });
        });

    // END Pie for Bots statistics -->

    // list of sites / domains -->

    // print table site list and settings -->
        $(document).ready(function () {

            var list_sites = '';
            $.ajax({
                url: 'export_sites.json',
                datatype: 'json',
                type: 'get',
                cache: false,
                success: function (data) {
                    $(data).each(function (index, value) {
                        list_sites += '<tr>';
                        list_sites += '<td>' + value.site_id + '</td>';
                        list_sites += '<td>' + value.domain + '</td>';
                        list_sites += '<td>' + value.status + '</td>';

                    });
                    $('#api_list_sites').append(list_sites);
                }
            });
        });

    // end list of sites -->




        $(document).ready(function () {
            $.ajax({
                url: 'export_account_stats.json',
                datatype: 'json',
                type: 'get',
                cache: false,
                success: function (result) {
                    var count_incaprules = 0;
                    //        var varThroughputData = [];
                    $(result.incap_rules_timeseries).each(function (index, value) {
                        if (value.name != "Deleted Rule") {
                            count_incaprules++;
                        }
                    });
                    document.getElementById("nb_incaprules").textContent = count_incaprules;
                }
            });
        });



    // graph for Cached Bandwidth per account-->
        let bwGraph2 = document.getElementById('bwGraph').getContext('2d');

        var dataCached = {
            datasets: [{
                backgroundColor: '#26dad2',
                borderColor: '#28a745',
                data: [1, 6, 3],
                label: 'Cached Bw (Gbytes)',
                fill: true
            },
            {
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                data: [2, 7, 8],
                label: 'Total Bw (Gbytes)',
                fill: true
            }],
            labels: ["01", "02", "03"]
        };

        var optionsBw = {
            maintainAspectRatio: false,
            //   spanGaps: false,
            display: true,
            elements: {
                line: {
                    tension: 0.4
                }
            },
            plugins: {



                datalabels: {
                    display: false
                },

                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0
                    }
                }]
            }
        };

        let varbwGraph = new Chart(bwGraph, {
            type: 'line',
            data: dataCached,
            options: optionsBw
        });


        $(document).ready(function () {
            $.ajax({
                url: 'export_account_stats.json',
                datatype: 'json',
                type: 'get',
                cache: false,
                success: function (result) {
                    var BwArray_cached = [];
                    $(result.caching_timeseries[1].data).each(function (index, value) {
                        BwArray_cached.push([value[0], value[1], 0]);
                    });
                    $(result.caching_timeseries[5].data).each(function (index, value) {
                        BwArray_cached[index][2] = value[1];
                    });


                    BwArray_cached.sort(function (a, b) {
                        return a[0] - b[0]
                    });

                    for (var i = 0; i < BwArray_cached.length; i++) {
                        varbwGraph.data.labels[i] = moment(BwArray_cached[i][0]).format('DD MMM');

                        if (i === 0) {
                            varbwGraph.data.datasets[0].data[0] = Math.round(BwArray_cached[0][1] / 1000000000);
                            varbwGraph.data.datasets[1].data[0] = Math.round(BwArray_cached[0][2] / 1000000000);
                        } else {
                            varbwGraph.data.datasets[0].data[i] = Math.round((BwArray_cached[i][1] + BwArray_cached[i - 1][1]) / 1000000);
                            varbwGraph.data.datasets[1].data[i] = Math.round((BwArray_cached[i][2] + BwArray_cached[i - 1][2]) / 1000000);
                            BwArray_cached[i][1] = BwArray_cached[i][1] + BwArray_cached[i - 1][1]
                            BwArray_cached[i][2] = BwArray_cached[i][2] + BwArray_cached[i - 1][2]
                        }
                    }

                    varbwGraph.update();
                }
            });
        });
    // END graph for Cached Bandwidth per account-->


    //  GRAPH 95 PERC -->
        var graphPerc95 = document.getElementById('95perc');
        graphPerc95.height = 200;
        var dataPerc95 = {
            labels: ["Earlier Billing Cycle", "Previous Billing Cycle", "Current Billing Cycle"],
            type: 'line',
            datasets: [{
                backgroundColor: 'rgba(0,103,255,.15)',
                borderColor: 'rgba(0,103,255,0.5)',
                data: [0.1, 0.2, 0.3],
                borderWidth: 3.5,
                pointStyle: 'circle',
                label: '95 percentile Utilization (Mbps)',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(0,103,255,0.5)'
            }],
        };



        var optionsPerc95 = {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                cornerRadius: 3,
                intersect: false,
            },
            maintainAspectRatio: true,
            display: true,
            elements: {
                line: { tension: 0.4 }
            },
            plugins: {
                datalabels: {
                    display: false
                },

                filler: {
                    propagate: false
                }
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Mbps'
                        }
                    }]
                }
            }
        };

        let varGraphPerc95 = new Chart(graphPerc95, {
            type: 'line',
            data: dataPerc95,
            options: optionsPerc95
        });


        $(document).ready(function () {
            $.ajax({
                url: 'export_account_subscriptions.json',
                datatype: 'json',
                type: 'get',
                cache: false,
                success: function (result) {
                    var perc95_array = [];
                    $(result.bandwidthHistory).each(function (index, value) {
                        perc95_array.unshift([value.billingCycle, parseFloat(value.alwaysOnBandwidth)]);
                    });

                    varGraphPerc95.data.datasets[0].data = [perc95_array[0][1], perc95_array[1][1], perc95_array[2][1]];

                    /* for (var i=0; i<BwArray_cached.length;i++){
                        varGraphPerc95.data.labels[i]=moment(BwArray_cached[i][0]).format('DD MMM');
                    
                            if (i===0){
                        varGraphPerc95.data.datasets[0].data[0] = Math.round(BwArray_cached[0][1]/1000000);
                        graphPerc95.data.datasets[1].data[0] = Math.round(BwArray_cached[0][2]/1000000);
                            }else{    
                            varGraphPerc95.data.datasets[0].data[i] = Math.round((BwArray_cached[i][1]+BwArray_cached[i-1][1])/1000000);
                            gvarGraphPerc95.data.datasets[1].data[i] = Math.round((BwArray_cached[i][2]+BwArray_cached[i-1][2])/1000000);  
                            BwArray_cached[i][1] = BwArray_cached[i][1] + BwArray_cached[i-1][1]
                            BwArray_cached[i][2] = BwArray_cached[i][2] + BwArray_cached[i-1][2]
                                }
                        }
                    */

                    varGraphPerc95.update();
                }
            });
        });
    // END GRAPH 95 PERC -->




    // GRAPH PIE for Serving POPs -->

        var dataPOP = {
            datasets: [{
                data: [
                    3,
                    14
                ],
                backgroundColor: default_colors,
                label: 'My dataset' // for legend
            }],
            labels: [
                "New York",
                "Paris"
            ]
        };

        var POPCountry2 = document.getElementById("POPCountry").getContext('2d');
        var varPOPChart = new Chart(POPCountry2, {
            type: 'doughnut',
            data: dataPOP,
            options: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#000'
                    }
                },

                plugins: {
                    datalabels: {
                        display: false
                    }
                },

                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltips: {
                    enabled: true
                }
            }
        });


        $(document).ready(function () {
            $.ajax({
                url: 'export_account_stats.json',
                datatype: 'json',
                type: 'get',
                cache: false,
                success: function (result) {
                    var POPRequestsData = 0;
                    var POPRequestsLabels = 0;
                    var totalPOPRequests = 0;
                    var others = 0;
                    $(result.requests_geo_dist_summary.data).each(function (index, value) {
                        totalPOPRequests = totalPOPRequests + value[1];
                    });

                    var i;
                    var j = 1;
                    for (i = 0; i < result.requests_geo_dist_summary.data.length; i++) {
                        if (result.requests_geo_dist_summary.data[i][1] / totalPOPRequests > 0.01) {
                            varPOPChart.data.datasets[0].data[j] = Math.round(result.requests_geo_dist_summary.data[i][1] / totalPOPRequests * 100);
                            varPOPChart.data.labels[j] = result.requests_geo_dist_summary.data[i][0];
                            j = j + 1;
                        } else {
                            others = others + result.requests_geo_dist_summary.data[i][1];
                        }
                    }
                    varPOPChart.data.datasets[0].data[0] = Math.round(others / totalPOPRequests * 100);
                    varPOPChart.data.labels[0] = "others";
                    varPOPChart.update();
                }
            });
        });


    // END GRAPH PIE for Serving POPs -->


    // GRAPH PIE for Visitors Country -->

        var dataPOP = {
            datasets: [{
                data: [
                    3,
                    14
                ],
                backgroundColor: default_colors,
                label: 'My dataset' // for legend
            }],
            labels: [
                "New York",
                "Paris"
            ]
        };

        var VisitorsCountry2 = document.getElementById("visitorsCountry").getContext('2d');
        var varVisitorsCountryChart = new Chart(VisitorsCountry2, {
            type: 'doughnut',
            data: dataPOP,
            options: {
                plugins: {
                    datalabels: {
                        display: false
                    }
                },

                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#000'
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltips: {
                    enabled: true
                }
            }
        });


        $(document).ready(function () {
            $.ajax({
                url: 'export_account_stats.json',
                datatype: 'json',
                type: 'get',
                cache: false,
                success: function (result) {
                    var CountryRequestsData = 0;
                    var CountryRequestsLabels = 0;
                    var totalCountryRequests = 0;
                    var othersCountry = 0;
                    $(result.visits_dist_summary[0].data).each(function (index, value) {
                        totalCountryRequests = totalCountryRequests + value[1];
                    });

                    var i2;
                    var j2 = 1;
                    for (i2 = 0; i2 < result.visits_dist_summary[0].data.length; i2++) {
                        if (result.visits_dist_summary[0].data[i2][1] / totalCountryRequests > 0.02) {
                            varVisitorsCountryChart.data.datasets[0].data[j2] = Math.round(result.visits_dist_summary[0].data[i2][1] / totalCountryRequests * 100);
                            varVisitorsCountryChart.data.labels[j2] = result.visits_dist_summary[0].data[i2][0];
                            j2 = j2 + 1;
                        } else {
                            othersCountry = othersCountry + result.visits_dist_summary[0].data[i2][1];
                        }
                    }
                    varVisitorsCountryChart.data.datasets[0].data[0] = Math.round(othersCountry / totalCountryRequests * 100);
                    varVisitorsCountryChart.data.labels[0] = "others";
                    varVisitorsCountryChart.update();
                }
            });
        });





// print Account Plan -->

    $(document).ready(function () {
        var main_account_name = "";
        var main_account_id = "";
        $.ajax({
            url: 'export_account_plan.json',
            datatype: 'json',
            type: 'get',
            cache: false,
            success: function (data) {
                console.log("JSON of account plan");
                console.log(data);
                document.getElementById("account_name").textContent = data.account_name;
                document.getElementById("accountName2").textContent = data.account_id + "   " + data.account_name +" ";
                document.getElementById("account_id").textContent = data.account_id;
                document.getElementById("plan_name").textContent = data.plan_name;
                document.getElementById("trial_end").textContent = data.account.trial_end_date;
                document.getElementById("nb_users").textContent = data.logins.length + " configured users";
                document.getElementById("support_level").textContent = data.account.support_level;
                main_account_name = data.account_name;
                main_account_id = data.account_id;
            }
        });


        var count_block = 0;
        var count_alert = 0;
        var count_ddos = 0;
        var count_configured = 0;
        var count_not_configured = 0;
        var count_advCaching = 0;
        $.ajax({
            url: 'export_sites.json',
            datatype: 'json',
            type: 'get',
            cache: false,
            success: function (data_site_settings) {
                console.log("JSON of sites and settings");
                console.log(data_site_settings);
                document.getElementById("accountnbsites").textContent = "- " + data_site_settings.filter(x => x.account_id === main_account_id).length + " sites";
                if (data_site_settings == "null") {
                    toastr.warning('some API calls failed');
                    toastr.error('Check in API Expolorer that you can run /api/prov/v1/sites/list API call', 'API Permissions Error');
                } else if (data_site_settings[0].res_message == "OK") {
                    toastr.success('Data successfully loaded', 'Success');
                } else {
                    toastr.warning('Error when running running API /api/prov/v1/sites/list  ' + data_site_settings[0].res_message, 'Warning');
                }
                $(data_site_settings).each(function (index, value_site_settings) {
                    if (value_site_settings.security.waf.rules[0].action_text === 'Alert Only' | value_site_settings.security.waf.rules[0].action_text === 'Ignore') {
                        count_alert++;
                    } else {
                        count_block++;
                    }
                    if (value_site_settings.security.waf.rules[1].action_text === 'Alert Only' | value_site_settings.security.waf.rules[1].action_text === 'Ignore') {
                        count_alert++;
                    } else {
                        count_block++;
                    }
                    if (value_site_settings.security.waf.rules[2].action_text === 'Alert Only' | value_site_settings.security.waf.rules[2].action_text === 'Ignore') {
                        count_alert++;
                    } else {
                        count_block++;
                    }
                    if (value_site_settings.security.waf.rules[6].action_text === 'Alert Only' | value_site_settings.security.waf.rules[6].action_text === 'Ignore') {
                        count_alert++;
                    } else {
                        count_block++;
                    }
                    if (value_site_settings.security.waf.rules[4].ddos_traffic_threshold === 1000) {
                        count_ddos++;
                    }
                    if (value_site_settings.status === 'fully-configured') {
                        count_configured++;
                    } else {
                        count_not_configured++;
                    }
                    if (value_site_settings.acceleration_level === 'advanced') {
                        count_advCaching++;
                    }
                });

                document.getElementById("block right").innerHTML = Math.round(count_block / (count_alert + count_block) * 100) + "%";
                document.getElementById("block progress").style.width = count_block / (count_alert + count_block) * 100 + "%";
                document.getElementById("configured right").innerHTML = Math.round(count_configured / (count_configured + count_not_configured) * 100) + "%";
                document.getElementById("configured").style.width = count_configured / (count_configured + count_not_configured) * 100 + "%";
                document.getElementById("cachingSettings").textContent = count_advCaching + "/" + (count_configured + count_not_configured);
                document.getElementById("nb_configured").textContent = count_configured + "/" + (count_configured + count_not_configured);
                document.getElementById("nb_security").textContent = count_block + "/" + (count_block + count_alert);
                document.getElementById("nb_ddos").textContent = (count_configured + count_not_configured - count_ddos) + "/" + (count_configured + count_not_configured);



                // SCRIPT TO CREATE THE ACCOUNT STRUCTURE
                var structure_table = "";
                $.ajax({
                    url: 'export_subaccounts.json',
                    datatype: 'json',
                    type: 'get',
                    cache: false,
                    success: function (data_subaccounts) {
                        console.log("JSON of SUBACCOUNTS");
                        console.log(data_subaccounts);
                        if (data_subaccounts.res_message != "OK") {
                         //   toastr.warning(data_subaccounts.res_message, 'permission error in /accounts/listSubbacounts', 'Warning')

                        } else if (data_subaccounts.resultList.length == 0) {
                            var node = document.createElement("LI");
                            var textnode = document.createTextNode("no subaccounts");
                            node.appendChild(textnode);
                            document.getElementById("account_structure").appendChild(node);
                        } else {
                            var subaccount_list = [{ id: main_account_id, name: main_account_name }];

                            $(data_subaccounts.resultList).each(function (index, value_sub) {
                                var node = document.createElement("LI");
                                var textnode = document.createTextNode(value_sub.sub_account_id + "   " + value_sub.sub_account_name + " - " +data_site_settings.filter(x => x.account_id === value_sub.sub_account_id).length + " sites");
                                node.appendChild(textnode);
                                document.getElementById("account_structure").appendChild(node);
                                subaccount_list.push({ id: value_sub.sub_account_id, name: value_sub.sub_account_name });
                            //    document.getElementById("accountnbsites") = data_site_settings.filter(x => x.account_id === value_sub.sub_account_id).length;

                            });
                            // sub = JSON.parse(subaccount_list);
                            console.log("SUBACCOUNTS ARRAY");
                            sessionStorage.setItem("subaccount_list", JSON.stringify(subaccount_list));
                            console.log(subaccount_list);
                        }
                    }
                });


            },
            error: function (data) {
                toastr.warning('error seems related to setup, or to wrong API keys', 'Warning')
                toastr.error('error can be in Xampp, write permissions in folder or wrong API key match. Check Readme.md for troubleshooting', 'API calls could not be generated')
            }
        });
    });





// print Account Subscriptions -->
    $(document).ready(function () {
        $.ajax({
            url: 'export_account_subscriptions.json',
            datatype: 'json',
            type: 'get',
            cache: false,
            success: function (data) {
                console.log("JSON of Account Subscription");
                console.log(data);
                // Load Balancing add on
                if (data.planStatus.websiteProtection.planSectionRows.find(x => x.name === 'Load Balancing').purchased != 0) {
                    document.getElementById("add_on_lb").checked = true;
                }
                if (data.planStatus.additionalServices.planSectionRows.find(x => x.name === 'SIEM Integration').purchased != 0) {
                    document.getElementById("add_on_siem").checked = true;
                }
                if (data.planStatus.additionalServices.planSectionRows.find(x => x.name === 'Web Attack Analytics').purchased != 0) {
                    document.getElementById("add_on_aa").checked = true;
                }
                if (data.planStatus.additionalServices.planSectionRows.find(x => x.name === 'DDoS Protection').purchased != "None") {
                    document.getElementById("add_on_ddos").checked = true;
                }
                document.getElementById("used_bandwidth").textContent = data.planStatus.additionalServices.planSectionRows[0].used.slice(0, data.planStatus.additionalServices.planSectionRows[0].used.search("-"));
                document.getElementById("purchased_bandwidth").textContent = data.planStatus.additionalServices.planSectionRows[0].purchased + " purchased";

                document.getElementById("nb_websites").textContent = data.planStatus.websiteProtection.planSectionRows.find(x => x.name === 'Additional Sites').used + " Used / " + data.planStatus.websiteProtection.planSectionRows.find(x => x.name === 'Additional Sites').purchased + " Purchased";

                //           document.getElementById("configured_sites").style.width = count_block/(count_alert+count_block)*100 + "%";

                if ((data.planStatus.websiteProtection.planSectionRows.find(x => x.name === 'Additional Sites').purchased) == "Unlimited") {
                    document.getElementById("configured sites").textContent = "100%";
                    document.getElementById("configured_sites").style.width = "100%";
                } else {
                    document.getElementById("configured sites").textContent = Math.round(100 * parseFloat(data.planStatus.websiteProtection.planSectionRows.find(x => x.name === 'Additional Sites').used) / parseFloat(data.planStatus.websiteProtection.planSectionRows.find(x => x.name === 'Additional Sites').purchased)) + "%";
                    document.getElementById("configured_sites").style.width = Math.round(100 * parseFloat(data.planStatus.websiteProtection.planSectionRows.find(x => x.name === 'Additional Sites').used) / parseFloat(data.planStatus.websiteProtection.planSectionRows.find(x => x.name === 'Additional Sites').purchased)) + "%";

                }
                //    data.planStatus.websiteProtection.planSectionRows.find(x => x.name === 'Additional Sites').used +  data.planStatus.websiteProtection.planSectionRows.find(x => x.name === 'Additional Sites').purchased ;

            }
        });
    });







// complete the Caching Ratio-->

    $(document).ready(function () {
        var varCached_Bw = 0;
        var varTotal_Bw = 0;
        $.ajax({
            url: 'export_account_stats.json',
            datatype: 'json',
            type: 'get',
            cache: false,
            success: function (data) {
                console.log("JSON of Account Statistics");
                console.log(data);
                varCached_Bw = data.caching.saved_bytes;
                varTotal_Bw = data.caching.total_bytes;
                document.getElementById("cachingRatio").textContent = Math.round(varCached_Bw / (varTotal_Bw) * 100) + "%";
                document.getElementById("trafficVolume").textContent = Math.round(varTotal_Bw / 100000000) / 10;
                document.getElementById("cached_total").textContent = Math.round(varCached_Bw / 100000000) / 10;
            }
        });
    });







// Graph of # sites added in last 6 months -->
    let site_addition3 = document.getElementById('site_addition').getContext('2d');

    var dataSiteAddition = {
        datasets: [{
            backgroundColor: '#62d1f3',
            borderColor: 'rgba(54, 162, 235, 0.6)',
            data: [1, 6, 3, 2, 3, 6],
        }],
        labels: ["Month 1", "Month 2", "Month 3", "Month 4", "last Month", "this Month",]
    };

    var optionsSiteAddition = {
        legend: {
            display: false,
            labels: {
                usePointStyle: true,
                fontFamily: 'Montserrat',
            },
        },

        maintainAspectRatio: false,
        spanGaps: false,
        elements: {
            line: {
                tension: 0.4
            }
        },
        plugins: {
            datalabels: {
                display: true,
                anchor: 'center',
                formatter: Math.round,
                font: {
                    weight: 'bold',
                    size: '16'
                }
            },

            filler: {
                propagate: false
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                    drawBorder: false
                }, ticks: {
                    autoSkip: false,
                    maxRotation: 0
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    beginAtZero: true   // minimum value will be 0.
                }
            }]
        }
    };

    let varsiteAddGraph = new Chart(site_addition, {
        type: 'bar',
        data: dataSiteAddition,
        options: optionsSiteAddition
    });

    $(document).ready(function () {
        $.ajax({
            url: 'export_sites.json',
            datatype: 'json',
            type: 'get',
            cache: false,
            success: function (data) {
                var count_sites_month = [0, 0, 0, 0, 0, 0];
                var months_unix = [];

                for (i = 0; i < 6; i++) {
                    months_unix.push(moment().add(i - 5, 'months').unix());
                }

                $(data).each(function (index, value) {
                    for (j = 0; j < 6; j++) {
                        if (value.site_creation_date / 1000 < months_unix[j]) {
                            count_sites_month[j]++;

                        }
                    }
                });
                varsiteAddGraph.data.datasets[0].data = count_sites_month;
                varsiteAddGraph.update();
            }
        });
    });


    function printPage() {
        alert("IMPORTANT: enable the option Background graphics in printer option");
        window.print();
    }
