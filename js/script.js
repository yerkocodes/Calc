let app = angular.module('miApp', []);
    
app.controller('MiControlador', function($scope) {
        $scope.mensaje = '¡Hola, mundo desde AngularJS!';

        let calcPorcentaje = () => {
            return ((800*100)/1800) / 100;
        };
        
        let calcConsumoTotal = (minutos, kilos) => {
            let hrs = minutos / 60;
            return (0.8 * kilos) * hrs;
        };
        
        let calcGrsMaltodextrinaYFructosa = (total) => {
            let fructosa = total * calcPorcentaje();
            let maltodextrina = total - fructosa;
        
            return {
                maltodextrina: maltodextrina.toFixed(2) + " grs.",
                fructosa: fructosa.toFixed(2) + " grs.",
                totalAConsumir: total.toFixed(2) + " grs."
            }
        };
        
        console.log(calcGrsMaltodextrinaYFructosa(calcConsumoTotal(70, 76)));
});
    
