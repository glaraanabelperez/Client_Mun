<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control_Allow-Headers: origin, X-Requested-With,Content-Type, Accept");//le pide acceso al header
    header('Access-Control-Allow-Methods: GET, POST');
    $json=file_get_contents('php://input');//recibe el jason de afuera
    $params=json_decode($json);//decodifica el json y guarda en params
    require 'Db.class.php';
    /*Instancia del objeto, conexion*/
    $bd=Db::getInstance();

    $id=$params->codigo_producto;
    $sql="DELETE FROM `productos` WHERE `id`='$id'";
    $respuesta=$bd->ejecutar($sql);

    class Result{}
    $response=new Result();
     if($respuesta==true){
        $response->resultado='OK';
        $response->mensaje='SE ELIMINO EXITOSAMENTE';
     }else{
      echo mysqli_error($bd);
      // $response->resultado='Error';
    }
    //genera los datos de respuesta
    header('Content-Type: application/json');
    echo json_encode($response);//muestra el json , el mensaje
?>