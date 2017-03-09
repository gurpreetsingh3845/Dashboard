var express = require('express');
var app = express();
var sql = require("mssql");

// config for your database
var config = {
    user: 'sa',
    password: 'root',
    server: 'localhost',
    database: 'Dashboard_db',
    pool: {
        max: 1000,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

/**
api for count total no of call
*/
app.get('/totalCall', function(req, res) {
    // connect to your database
    var connection3 = new sql.Connection(config, function(err) {
        
        if (err) console.log(err);
        console.log("connected");
        var request = new sql.Request(connection3);
        request.query("SELECT count(DISPOSITION) as numOfCall FROM Sheet0$ where DISPOSITION  IS NOT NULL And DISPOSITION !='-' And DISPOSITION !=''", function(err, recordset) {
            debugger;   
            if (err) console.log(err)
            // send data as a response
        console.log(recordset);
            var record = JSON.stringify(recordset);
            res.send(record);

        });
    });
});
/**
api for count total no of call
*/
app.get('/totalCallRecd', function(req, res) {
    // connect to your database
    var connection3 = new sql.Connection(config, function(err) {

        if (err) console.log(err);
        console.log("connected");
        var request = new sql.Request(connection3);
        request.query("SELECT distinct [CALL TYPE ] as call_type, count([CALL TYPE ]) as numOfCall FROM Sheet0$ where [CALL TYPE ] !='NULL' And[CALL TYPE ] !=''  group by [CALL TYPE ]", function(err, recordset) {

            if (err) console.log(err)
            // send data as a response
        console.log(recordset);
            var record = JSON.stringify(recordset);
            res.send(record);

        });
    });
});



/*
 sale by region and state  according to argument
*/

app.get('/saleByReg', function(req, res) {

    var connection3 = new sql.Connection(config, function(err) {

        if (err) console.log(err);
        console.log("connected");
        // create Request object
        var request = new sql.Request(connection3);
        if(req.query.Byregion == "Region") {
            request.query("SELECT distinct Region , count(Region) as num FROM [Dashboard_db].[dbo].['Exported records$'] where Region !=''  group by Region", function(err, recordset) {
                if (err) console.log(err)
                var record = JSON.stringify(recordset);
                res.send(record);
            });
        }
        else{
            request.query("SELECT distinct State as Region, count(State) as num FROM [Dashboard_db].[dbo].['Exported records$'] where State !=''  group by State", function(err, recordset) {
                if (err) console.log(err)
                var record = JSON.stringify(recordset);
                res.send(record);
            });


        }
        
    });
});

/*
 sale on single call 
*/
//SELECT  [AGENT NAME ] as AGENT_NAME,[DISPOSITION ] as cont FROM [Dashboard_db].[dbo].[Sheet0$] where [DISPOSITION ] Like '%sold%'
app.get('/salePerCall', function(req, res) {
    var connection3 = new sql.Connection(config, function(err) {
        if (err) console.log(err);
        var request = new sql.Request(connection3);
        if(req.query.ByArg == "Agent") {
            request.query("SELECT  [AGENT NAME] as AGENT_NAME,[DISPOSITION] as cont FROM [Dashboard_db].[dbo].[Sheet0$] where [AGENT NAME ] !='' And [AGENT NAME ] !='NULL' And [AGENT NAME ] !='-'", function(err, recordset) {
                if (err) console.log(err)
                var record = JSON.stringify(recordset);
                res.send(record);
            });
        }else{
             request.query("SELECT  [CAMPAIGN ] as AGENT_NAME,[DISPOSITION] as cont FROM [Dashboard_db].[dbo].[Sheet0$] where [CAMPAIGN ] !='' And [CAMPAIGN ] !='NULL' And [CAMPAIGN ] !='-'", function(err, recordset) {
                if (err) console.log(err)
                var record = JSON.stringify(recordset);
                res.send(record);
            });

        }
    });
});


/*
 Total conversion count sold and zsold only
*/

app.get('/totalconversionCount', function(req, res) {
    var connection2 = new sql.Connection(config, function(err) {
        if (err) console.log(err);
        var request = new sql.Request(connection2);
            request.query("SELECT  count([DISPOSITION]) as cnt FROM [Dashboard_db].[dbo].[Sheet0$] where  [DISPOSITION] Like '%sold%'", function(err, recordset) {
                    if (err) console.log(err)
                    res.send(recordset);
                });
    });
});
/*
 Total conversion Sort by channel and agent name
*/

app.get('/totalconversion', function(req, res) {
    var connection2 = new sql.Connection(config, function(err) {

        if (err) console.log(err);
        var request = new sql.Request(connection2);
        if(req.query.region == "By Channel") {  
                request
                    .query("SELECT distinct [CAMPAIGN ] as DISPOSITION , count([DISPOSITION ]) as cnt FROM [Dashboard_db].[dbo].[Sheet0$] where [DISPOSITION ] Like '%sold%' group by [CAMPAIGN ]", function(err, recordset) {
                       if (err) console.log(err)
                       console.log(recordset);

                        res.send(recordset);
                    });
        }else  {  
                request
                    .query("SELECT distinct [AGENT NAME ] as DISPOSITION, count([DISPOSITION ]) as cnt FROM [Dashboard_db].[dbo].[Sheet0$] where [DISPOSITION ] Like '%sold%' group by [AGENT NAME ]", function(err, recordset) {
               if (err) console.log(err)
            // send data as a response
               console.log(recordset);
              // var record = JSON.stringify(recordset);
            res.send(recordset);
            });
        }        
    });
});




// abhinave code 
app.get('/callCount', function(req, res) {
         
    // connect to your database
    sql.connect(config, function(err) {

        if (err) console.log(err);
        console.log("connected");
        // create Request object
        var request = new sql.Request();

        // query to the database and get the data
        request.query(' SELECT count([CALL TYPE ]) as num FROM [Dashboard_db].[dbo].[Sheet0$]', function(err, recordset) {
            
            if (err) console.log(err)

            // send data as a response
            var record = JSON.stringify(recordset); 
            res.send(record);
         
        });
    });
});

/*app.get('/api/:version/:cap', function(req, res) {
    console.log(req.params.cap);
    res.send(req.params.version);
*/


/*});*/
app.get('/activationData', function(req, res) {

    // connect to your database

    var connection3 = new sql.Connection(config, function(err) {

        if (err) console.log(err);
        console.log("connected");
        // create Request object
        var request = new sql.Request(connection3);
            
        // query to the database and get the data
        request.query("SELECT count([DISPOSITION]) as number,[AGENT NAME ] FROM [Dashboard_db].[dbo].[Sheet0$] where [DISPOSITION] like '%sold%' GROUP BY [AGENT NAME ]", function(err, recordset) {
             debugger;  

            if (err) console.log(err);

     
            res.send(recordset)
        });
    });
});

app.get('/channelData',function(req, res){

   var conn  = new sql.Connection(config,function(err){

            if(err)console.log(err);

            var request = new sql.Request(conn);

            request.query("SELECT count([DISPOSITION]) as number,[CAMPAIGN ] FROM [Dashboard_db].[dbo].[Sheet0$] where [DISPOSITION] like '%sold%' GROUP BY [CAMPAIGN ]",function(err, recordset){

                if(err)console.log(err);

                res.send(recordset)
            });
   });
});


app.get('/activationDataByStates', function(req,res){

    var connec = new sql.Connection(config,function(err){
        if(err)console.log(err);

        var request = new sql.Request(connec);

        request.query("SELECT count([Work Order Type]) as number,[State] FROM [Dashboard_db].[dbo].['Exported records$'] where [Work Order Type] like 'INSTALL' GROUP BY [State]",function(err, recordset){

            if(err)console.log(err);
            res.send(recordset)
        });
    });
});

app.get('/cancelledData',function(req,res){

      var cont = new sql.Connection(config,function(err){
        if (err)console.log(err);
            var request = new sql.Request(cont);

            request.query("SELECT count([Work Order Type]) as number,[State] FROM [Dashboard_db].[dbo].['Exported records$'] where [Work Order Type] like 'DISCO' GROUP BY [State]",function(err ,recordset){
                 if(err)console.log(err);
            res.send(recordset);
            });
        });
});





app.use('/', express.static(__dirname + '/'));

var server = app.listen(4000, function() {
    console.log('Server is running.. 	on Port 4000');
});
// app.get('/secret/rest', function (req, res, next) {
//   console.log('rest call  ...')
//   next() // pass control to the next handler
// })


// app.all('/secret', function (req, res, next) {
//   console.log('Accessing the secret section ...')
//   next() // pass control to the next handler
// })



//select distinct pd.dnv_region,cnt.Country,cnt.latitude,cnt.longitude,count(*) cnt from  country_long_lat cnt inner join ProspectData pd  on cnt.Country =pd.country group by pd.dnv_region,cnt.Country,cnt.latitude,cnt.longitude


//select distinct pd.dnv_region,cnt.Country,cnt.latitude,cnt.longitude,count(*) cnt from  country_long_lat cnt inner join ProspectData pd  on cnt.Country =pd.country   where  pd.dnv_region='CEMED'  group by pd.dnv_region,cnt.Country,cnt.latitude,cnt.longitude



// select distinct pd.dnv_region,cnt.Country,cnt.latitude,cnt.longitude,
// count(*) cnt from  country_long_lat cnt
//  inner join ProspectData pd  on cnt.Country =pd.country  
//  where  pd.dnv_region='CEMED'  
//  group by pd.dnv_region,cnt.Country,cnt.latitude,cnt.longitude

//pragim technologies

// app.get('/api/:version/:cap', function(req, res) {
//     console.log(req.params.cap);
//     res.send(req.params.version);



// });
// app.get('/ProspectData', function(req, res) {

//     // connect to your database

//     var connection3 = new sql.Connection(config, function(err) {

//         if (err) console.log(err);
//         console.log("connected");
//         // create Request object
//         var request = new sql.Request(connection3);

//         // query to the database and get the data
//         request.query('SELECT distinct(dnv_region),COUNT(dnv_region) as NumberOfOccurence from ProspectData group by dnv_region', function(err, recordset) {
                  
//             if (err) console.log(err);

     
//             res.send(recordset)
//         });
//     });
// });

// app.get('/totalsaleConversion', function(req, res) {

//     var connection3 = new sql.Connection(config, function(err) {

//         if (err) console.log(err);
//         console.log("connected");
//         // create Request object
//         var request = new sql.Request(connection3);

//         request.query("SELECT  [DISPOSITION ] FROM [Dashboard_db].[dbo].[Sheet0$] where  [DISPOSITION ] Like '%sold%'", function(err, recordset) {
 
//             if (err) console.log(err)

//             var record = JSON.stringify(recordset);
//             res.send(record);

//         });
//     });
// });

// var fs=  require("fs");
// app.get('/video', function(req, res) {
//        res.writeHead(200,{'Content-Type':'video/mp4'});
//        var rs = fs.createReadStream("cat.mp4");
//        rs.pipe(res); 
        
// });

