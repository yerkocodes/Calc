let app = angular.module("miApp", []);

app.controller("MiControlador", function ($scope) {
  // Iniciacion de variables
  $scope.proporcionDefecto = 500;
  $scope.pesoTotal = 0;

  $scope.infoFinal = null;

  // Datos que vienen del formulario
  $scope.formulario = {
    proporcion: $scope.proporcionDefecto,
    hora: 0,
    minutos: 0,
    kilos: 0,
    gramos: 0,
  };

  $scope.prueba = (value) => {
    //console.log(typeof value);
    if (value > 24) {
      //console.log("si es mayor a 24")
      $scope.formulario.hora = 24;
    }

    if (value < 0) {
      $scope.formulario.hora = 0;
    }
    return value;
  };

  // ******************************* LOGICA *******************************
  /* LOGICA CORRECTA RESPALDO
  let calcPorcentaje = () => {
    return (800 * 100) / (1000 + 800) / 100;
  };

  let calcConsumoTotal = (minutos, kilos) => {
    let hrs = minutos / 60;
    return 0.8 * kilos * hrs;
  };

  let calcGrsMaltodextrinaYFructosa = (total) => {
    let fructosa = total * calcPorcentaje();
    let maltodextrina = total - fructosa;

    return {
      maltodextrina: maltodextrina.toFixed(2) + " grs.",
      fructosa: fructosa.toFixed(2) + " grs.",
      totalAConsumir: total.toFixed(2) + " grs.",
    };
  };*/

  let calcPorcentaje = (porcion = 800) => {
    return (porcion * 100) / (1000 + porcion) / 100;
  }; // OK

  let calcConsumoTotal = (minutos, kilos) => {
    let hrs = minutos / 60;
    return (0.8 * kilos) * hrs;
  }; // OK

  let calcGrsMaltodextrinaYFructosa = (totalConsumoCarbohidratos) => {
    let fructosa = totalConsumoCarbohidratos * calcPorcentaje($scope.formulario.proporcion);
    let maltodextrina = totalConsumoCarbohidratos - fructosa;

    return {
      maltodextrina: maltodextrina.toFixed(2) + " grs.",
      fructosa: fructosa.toFixed(2) + " grs.",
      totalAConsumir: totalConsumoCarbohidratos.toFixed(2) + " grs.",
    };
  };

  //console.log(calcGrsMaltodextrinaYFructosa(1800));
  //console.log(calcGrsMaltodextrinaYFructosa(calcConsumoTotal(70, 76)));
  // ******************************* LOGICA FIN *******************************

  // ************* ENVIO FORMULARIO *************
  $scope.enviarFormulario = () => {
    console.log("$scope.formulario", $scope.formulario);
    console.log(" ");
    
    let minutosTotales = ($scope.formulario.hora * 60) + $scope.formulario.minutos;
    console.log("minutosTotales", minutosTotales);

    console.log(calcGrsMaltodextrinaYFructosa(calcConsumoTotal(minutosTotales, 76)));
    console.log(calcGrsMaltodextrinaYFructosa(calcConsumoTotal(70, 76)));
    console.log(" ")
    console.log(calcGrsMaltodextrinaYFructosa(calcConsumoTotal(1776, 76)));
    console.log(calcGrsMaltodextrinaYFructosa(1800));
  };
  // ************* ENVIO FORMULARIO FIN *************
});
