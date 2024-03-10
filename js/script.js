let app = angular.module("miApp", []);

app.controller("MiControlador", function ($scope) {

  // Iniciacion de variables
  $scope.proporcion = 500;
  $scope.pesoTotal = 0;

  $scope.infoFinal = null;

  // Datos que vienen del formulario
  $scope.formulario = {
    proporcion: 0,
    hora: 0,
    minutos: 0,
    kilos: 0,
    gramos: 0,
  };

  let calcPorcentajeFructosa = (porcion = 500) => {
    // Porcentaje de fructosa en relación a la maltodextrina
    // 1000 + VAR     100%
    // ----------    ------
    //    VAR           x
    let porcen = ((porcion * 100) / (1000 + porcion)) / 100; // Se divide en 100 para obtener el 0.x
    return porcen;
  };

  let calcConsumoTotal = (minutos, kilos) => {
    // lo que se deberia consumir de forma estandar es 0.8grs de carbohidratos por los kilos del deportista por la cantidad de horas en la carrera
    let hrs = minutos / 60;
    return 0.8 * kilos * hrs;
  };

  let calcGrsMaltodextrinaYFructosa = (totalDeCarbohidratosAConsumir) => {
    let proporcionFormulario = parseInt($scope.formulario.proporcion);
    let fructosa = totalDeCarbohidratosAConsumir * calcPorcentajeFructosa(proporcionFormulario);
    let maltodextrina = totalDeCarbohidratosAConsumir - fructosa;

    return {
      pesoTotal: $scope.pesoTotal,
      maltodextrina: maltodextrina.toFixed(2) + " grs.",
      fructosa: fructosa.toFixed(2) + " grs.",
      totalAConsumir: totalDeCarbohidratosAConsumir.toFixed(2) + " grs.",
    };
  };

  $scope.prueba = (value) => {
    console.log(typeof value);
    if(value > 24) {
      console.log("si es mayor a 24")
      $scope.formulario.hora = 24;
    }

    if(value < 0) {
      $scope.formulario.hora = 0;
    }
    return value;
  };

  $scope.enviarFormulario = () => {
    console.log("formulario", $scope.formulario);
    let {
      proporcion,
      hora,
      minutos,
      kilos,
      gramos
    } = $scope.formulario;

    console.log("proporcion", typeof proporcion);

    let minTotal = (hora * 60) + (minutos);
    let pesoTotal = kilos + (gramos / 100);

    let carboTotalesConsumir = calcConsumoTotal(minTotal, pesoTotal);
    console.log(carboTotalesConsumir);

    let desglose = calcGrsMaltodextrinaYFructosa(carboTotalesConsumir);
    console.log(desglose);

    $scope.infoFinal = desglose;

  };

  console.log(calcGrsMaltodextrinaYFructosa(calcConsumoTotal(70, 76)));
});
