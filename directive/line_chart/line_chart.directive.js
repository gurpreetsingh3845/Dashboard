angular
	  .module('dcs.dashboard')
	  .directive('lineChart',lineChart);

	lineChart.$inject = ['dataService'];
	

 function lineChart(dataService){

 	var directive = {

 		link : link,
 		template : '<div id="lineChart"></div>',
 		restrict : 'EA',
 		scope: {
                        options: '='
                    },
 		controller : ['$scope','$element',controller]

 	};

 	return directive;

 	function link(scope,element,attrs){
       /* setTimeout(function(){Highcharts.chart(element[0], scope.chartOptions);},1500)*/
 		/* Highcharts.chart(element[0], scope.chartOptions);*/
 	}

 	function controller($scope,$element){
          /*$scope.chartOptions;*/
      /* var a = dataService.longAndLatData();*/

      $scope.Name=[];
      $scope.anumber =[];
      $scope.text1 = [];
      $scope.text2 = [];
    
        $scope.$watch('options',function(){
             if($scope.options){
              if($scope.Name!=""){
                $scope.Name =[];
                $scope.anumber =[];
                 $scope.text1 = [];
                 $scope.text2 = [];
              }

            for(var i=0 ; i<$scope.options.length;i++){
             $scope.Name.push($scope.options[i]['name'])
             $scope.anumber.push($scope.options[i]['number'])
              
             if(i ==0){
               $scope.text1.push($scope.options[i]['aa']);
               $scope.text2.push($scope.options[i]['bb']);

             }
            }


              $scope.chartOptions = {
                    title: {
                        text: ''
                    },
                    xAxis: {
                      title: {
                              text: $scope.text1/*'Agents'*/
                          },
                        categories: $scope.Name
                    },
                     yAxis: {
                          title: {
                              text: $scope.text2/*'Activated Sales'*/
                          },
                          categories: ['5', '10', '15', '20', '25', '30', 
                            '35', '40']
                       
                   },
                    chart: {
                              width: 400,
                              height: 400
                          },

                    series: [{
                      showInLegend: false,
                      name :'Sales',
                      data: $scope.anumber
                    }
                    /*{
                        data: [19.9, 41.5, 126.4, 179.2, 114.0, 76.0, 145.6, 118.5, 266.4, 154.1, 45.6, 94.4]
                    }*/]
                 
             }
              Highcharts.chart($element[0], $scope.chartOptions);
            }
        });
        
      
      
         
        
 	

 }
 }	  	