
angular
    .module('dcs.dashboard')
    .config(config);

function config($routeProvider) {

    $routeProvider
      
        .when("/", {
            templateUrl: 'modules/pc_metrics/pc_metrics.view.html',
            controller:'pc_controller'


        })
        .when("/transfer", {
          templateUrl: 'modules/transfer_metrics/transfer_metrics.view.html',
          controller:'transfer_controller'
        })
        .when("/financial", {
            templateUrl: 'modules/financial_metrics/financial_metrics.view.html',
            controller:'financial_controller'
        })
        .when("/partner", {
            templateUrl: 'modules/partner_metrics/partner_metrics.view.html',
            controller:'partner_controller'
        });             

}
