angular
    .module('dcs.dashboard')
    .factory('dataService',dataService);
    dataService.$inject =['$http','$q'];
     

    function dataService($http,$q  ) {
              
        return {
               totalsalecount: totalsalecount,           
               totalCall: totalCall,
               saleByRegion:saleByRegion,
               totalConversion:totalConversion,
               salePerCall:salePerCall,
               totalCallRecd:totalCallRecd,
               callCount : callCount,
            salesdataByAgent : salesdataByAgent,
            salesdataByChannel  : salesdataByChannel,
            activationDatabyState : activationDatabyState,
            cancelledDataByState  :cancelledDataByState
            
        }
         function totalConversion(){ 
                return $http.get('/totalconversionCount')
                            .then(totalConversionData)
                            .catch(getDataFaild);    
        }
        function totalCallRecd(){
            return $http.get('/totalCallRecd')
                            .then(totalCallRecdData)
                            .catch(getDataFaild); 

        }

        function salePerCall(arg){
                return $http.get('/salePerCall',{ params: { "ByArg": arg }})
                            .then(salePerCallData)
                            .catch(getDataFaild);    
        }
       
         function totalCall(){
                return $http.get('/totalCall')
                            .then(gettotalCallData)
                            .catch(getDataFaild);    
        }
        
         function saleByRegion(arg){
                         return $http.get('/saleByReg',{ params: { "Byregion": arg }})
                            .then(saleByRegionData)
                            .catch(getDataFaild);    
                 
         }
         function totalsalecount(arg){
                        
                    return $http.get('/totalconversion', { params: { "region": arg }})
                    .then(totalsaleconversionData)
                    .catch(getDataFaild);                    
        }
        function callCount(){
               return    $http.get('/callCount')
                .then(function(response){
                 return response.data
                },function(error){

                   console.log(error);
                });

        }

        function salesdataByAgent(){

                   return     $http.get('/activationData')
                            .then(function(response){
                                return response.data;
                            },function(error)
                            {
                                console.log(error);
                            });

        }

        function salesdataByChannel(){

                return        $http.get('/channelData')
                             .then(function(response){
                              return response.data;  
                             },function(error){

                             });

        }

        function activationDatabyState(){

              return      $http.get('/activationDataByStates')
                         .then(function(response){
                            return response.data;
                         },function(error){
                            console.log(error);
                         });
        }

        function cancelledDataByState(){

           return $http.get('/cancelledData')
                 .then(function(response){
                    return response.data;
                 },function(error){
                    console.log(error);
                 });
        } 




    } 
    function totalCallRecdData(response){
             return response.data;
    }

    function totalConversionData(response){
        return response.data;
          
    }
    function totalsaleconversionData (response){
            return response.data;        
    }
    function salePerCallData(response){
        

        return response.data;
          
    }   
    function gettotalCallData(response){
       
        return response.data[0];
          
    } 

    function saleByRegionData(response){
        return response.data;
    }




    function getDataFaild(err){
       // $q.reject(response.data);
                           
    }

              