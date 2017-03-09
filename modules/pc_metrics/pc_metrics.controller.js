(function() {
    angular
        .module('dcs.dashboard.pages')
        .controller("pc_controller", function($scope, dataService) {
            
            $scope.TotalConverTitle = "By Channel";
            $scope.unitShowBy ="Agent";
            $scope.UnitTopic ="Agent";   
            $scope.Topic= "Region";
            
            $scope.totalCount = 0;
            $scope.activationCount = 0;
            $scope.cancellationCount = 0;
            $scope.dataForDira = [];
            $scope.dataForDirc = [];
            $scope.dataToSend;
            $scope.activeDatabyState = [];
            $scope.databyStateActivation;
            $scope.activeDatabyStateAct = [];
            $scope.databyStateCancellation;
            $scope.activeDatabyStateCan = [];


            dataService.callCount().then(function(data) {

                $scope.sdata = data;

            });

            dataService.salesdataByAgent().then(function(data) {

                $scope.agentData = data;

                for (var i = 0; i < $scope.agentData.length; i++) {
                    $scope.totalCount += parseInt($scope.agentData[i].number);
                    $scope.dataForDira.push({
                        name: $scope.agentData[i]['AGENT NAME '],
                        number: $scope.agentData[i].number,
                        aa: "Agents",
                        bb: "Sales Conversion"
                    })
                }
                $scope.agentCount();
            });


            dataService.salesdataByChannel().then(function(data) {
                $scope.channelData = data;

                for (var i = 0; i < $scope.channelData.length; i++) {
                    $scope.dataForDirc.push({
                        name: $scope.channelData[i]['CAMPAIGN '],
                        number: $scope.channelData[i].number,
                        aa: "Channel",
                        bb: "Sales Conversion"
                    })

                }
                // $scope.dataForDirc.push({aa:"Agents"});
                //console.log( $scope.dataForDirc);
            });


            dataService.activationDatabyState().then(function(data) {
                $scope.activationData = data;
                for (var i = 0; i < $scope.activationData.length; i++) {
                    $scope.activeDatabyStateCan.push({
                        name: $scope.activationData[i]['State'],
                        number: $scope.activationData[i].number,
                        aa: "State",
                        bb: "Activated Sales"
                    })
                    $scope.activationCount += parseInt($scope.activationData[i].number);
                }
                $scope.databyStateActivation = $scope.activeDatabyStateCan;
            });

            dataService.cancelledDataByState().then(function(data) {
                $scope.cancelledData = data;
                for (var i = 0; i < $scope.cancelledData.length; i++) {
                    $scope.activeDatabyStateAct.push({
                        name: $scope.cancelledData[i]['State'],
                        number: $scope.cancelledData[i].number,
                        aa: "State",
                        bb: "Cancelled Sales"
                    })
                    $scope.cancellationCount += parseInt($scope.cancelledData[i].number);
                }
                $scope.databyStateCancellation = $scope.activeDatabyStateAct;
            });

            $scope.agentCount = function(agentName) {

                $scope.agentname = agentName;
                $scope.dataToSend = $scope.dataForDira;
            }


            $scope.channelCount = function() {
                $scope.dataToSend = $scope.dataForDirc;

            }



            dataService.salePerCall("Agent").then(function(data) {
                showUnitSaleChart1(data);
              });

            $scope.unitClick = function(arg){
                 $scope.UnitTopic =arg;
            	dataService.salePerCall(arg).then(function(data) {
                showUnitSaleChart1(data);
                $scope.unitShowBy =arg;
              })

            }

            dataService.totalCall().then(function(data) {
                $scope.totalCall = data.numOfCall;
            })

            dataService.totalCallRecd().then(function(rec) {
                var recod = [];
                for (var i in rec) {
                    recod.push({
                        "values": [rec[i].numOfCall],
                        "text": rec[i].call_type
                    });

                }
                $scope.totalcalRecd = {
                    "type": "ring",
                    "legend": {
                        "x": "5%",
                        "y": "5%",
                        "border-width": 1,
                        "border-color": "gray",
                        "border-radius": "5px",
                        "header": {
                            "text": "Legend",
                            "font-family": "Georgia",
                            "font-size": 12,
                            "font-color": "#3333cc",
                            "font-weight": "normal"
                        },
                        "marker": {
                            "type": "circle"
                        },
                        "toggle-action": "remove",
                        "minimize": true,
                        "icon": {
                            "line-color": "#9999ff"
                        },
                        "max-items": 8,
                        "overflow": "scroll"
                    },

                    "title": {
                        "text": "Call Type"
                    },
                    "series": recod
                }

            })


            dataService.totalConversion().then(function(data) {
                $scope.totalcoversion = data[0].cnt;

            })

            dataService.saleByRegion('Region').then(function(data) {
                $scope.SaleByRegionAndCountry(data);
            });

            $scope.SaleByRegionAndCountry = function(data) {

                var val_arr = [];
                var labe_arr = [];
                for (var i = 0; i < data.length; i++) {
                    labe_arr.push(data[i].Region);
                    val_arr.push(data[i].num);
                }

                $scope.mainJson = {
                    "type": "bar",
                    "legend": {
                        "x": "5%",
                        "y": "5%",
                        "border-width": 1,
                        "border-color": "gray",
                        "border-radius": "5px",
                        "header": {
                            "text": "Legend",
                            "font-family": "Georgia",
                            "font-size": 12,
                            "font-color": "#3333cc",
                            "font-weight": "normal"
                        },
                        "marker": {
                            "type": "circle"
                        },
                        "toggle-action": "remove",
                        "minimize": true,
                        "icon": {
                            "line-color": "#9999ff"
                        },
                        "max-items": 8,
                        "overflow": "scroll"
                    },
                    "plotarea": {
                        "adjust-layout": true
                    },
                    "scale-y": {
                        "label": { /* Scale Title */
                            "text": "Count"
                        }
                    },

                    "scale-x": {
                        "label": { /* Scale Title */
                            "text": "Region",
                        },
                        "labels": labe_arr
                    },
                    "series": [{
                        "values": val_arr,
                        "background-color": "#6666FF #FF0066"
                    }]
                }
                $scope.l1 = labe_arr.slice(0,15);
                $scope.l2 = val_arr.slice(0,15);
                


            }



            $scope.Agent_sale = [];
            dataService.totalsalecount("By Channel").then(function(data) {

                $scope.showTotalConversionChart(data)

            })
            
            function showUnitSaleChart1(data){

                var Agent_sale = [];
                var Agent_total_call = [];
                var labe_arr = [];
                var val_arr = [];
                var val_arr2 = [];
                $scope.salePerCall = data;
                $scope.salePerCall.map(function(a) {
                    b = a.AGENT_NAME;
                    c = a.cont;
                    if (b in Agent_sale) {
                        Agent_total_call[b]++;
                        Agent_sale[b] = calfun(c, Agent_sale[b]);
                    } else {
                        Agent_sale[b] = 0;
                        Agent_sale[b] = calfun(c, Agent_sale[b]);
                        Agent_total_call[b] = 1;
                    }
                });

                for (var i in Agent_sale) {
                    labe_arr.push(i);
                    val_arr2.push(Agent_sale[i]);
                    val_arr.push(Agent_total_call[i]);
                }

                $scope.Agent_sale1 = {
                    "type": "line",
                    "legend": {
                        "x": "5%",
                        "y": "5%",
                        "border-width": 1,
                        "border-color": "gray",
                        "border-radius": "5px",
                        "header": {
                            "text": "Legend",
                            "font-family": "Georgia",
                            "font-size": 12,
                            "font-color": "#3333cc",
                            "font-weight": "normal"
                        },
                        "marker": {
                            "type": "circle"
                        },
                        "toggle-action": "remove",
                        "minimize": true,
                        "icon": {
                            "line-color": "#9999ff"
                        },
                        "max-items": 8,
                        "overflow": "scroll"
                    },
                    "scale-x": {
                        "label": {
                            "text": "Region"
                        },
                        "guide": {
                            "line-width": 0,
                            "items": [{
                                    "background-color": "#ebebeb"

                                },
                                {
                                    "background-color": "#fbfbfb"
                                }
                            ]
                        },


                        "item": {
                            "angle": -90,
                            "font-size": 10
                        },

                        "items-overlap": true,
                        "labels": labe_arr,

                    },
                    "series": [{
                        "values": val_arr,
                        "text": "calls",

                        "background-color": "#6666FF #FF0066"
                    }, {

                        "values": val_arr2,
                        "text": "sale",
                        "background-color": "#DD1111 #44DD11"
                    }]
                }



                 $scope.l3 = labe_arr.slice(0,15);
                $scope.l4 = val_arr2.slice(0,15);
                

            }
   	
            
           
           
            
            function calfun(c, arr) {
                if (c.indexOf("Sold") !== -1) {
                    if (c.indexOf("Triple") !== -1) {
                        return arr + 3;
                    } else if (c.indexOf("Single") !== -1) {
                        return arr + 1;
                    } else if (c.indexOf("Double") !== -1) {
                        return arr + 2;
                    } else {
                        return arr + 1;
                    }
                } else {
                    return arr;
                }
            }



            $scope.RegionClick = function(arg) {
            	$scope.Topic = arg;
                dataService.saleByRegion(arg).then(function(data) {
                    $scope.SaleByRegionAndCountry(data);
                });

            }

            
            $scope.channelClick = function(arg) {
                
                console.log(arg);
                $scope.TotalConverTitle = arg;
                dataService.totalsalecount(arg).then(function(data) {

                    $scope.showTotalConversionChart(data)
                })
            }
            
            $scope.showTotalConversionChart = function(data) {
                var val_arr = [];
                var labe_arr = [];
                for (var i = 0; i < data.length; i++) {
                    labe_arr.push(data[i].DISPOSITION);
                    val_arr.push(data[i].cnt);

                }
                $scope.totalConJson = {
                    "type": "hbar",
                    "plotarea": {
                        "adjust-layout": true
                    },
                    "scale-y": {
                        "label": {
                            "text": "Count"
                        }
                    },
                    "scale-x": {
                        "label": { /* Scale Title */
                            "text": $scope.TotalConverTitle,
                        },
                        "labels": labe_arr
                    },
                    "series": [{
                            "values": val_arr,
                            "background-color": "#0066FF #66F00F"
                        }

                    ]
                }
            }
        });
})();