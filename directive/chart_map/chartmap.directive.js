(function() {
    'use strict';

    angular.module("dcs.dashboard").directive('mapCharts', mapChart);
    mapChart.$inject = ['dataService', '$q'];

    function mapChart(dataService, $q) {
        var directive = {
            
            controller: ['$scope', '$element', controller]

        }
        return directive;
        function controller($scope, $element) {
             

            
             


        }

    }
})();