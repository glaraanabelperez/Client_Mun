<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control_Allow-Headers: origin, X-Requested-With,Content-Type, Accept");//le pide acceso al header
    header('Access-Control-Allow-Methods: GET, POST');

    require 'Db.class.php';
    /*Instancia del objeto, conexion*/
    $bd=Db::getInstance();
    $r=$_GET['usuario'];

    $sql="SELECT * FROM categorias WHERE `id_usuario`= $r;";
    $respuesta=$bd->ejecutar($sql);

      if($respuesta==true){
        $records = mysqli_fetch_all($respuesta, MYSQLI_ASSOC);
      }else{
        echo mysqli_error($bd);
      }

      header('Content-Type: application/json');
      echo json_encode($records);//muestra el json , el mensaje
?>