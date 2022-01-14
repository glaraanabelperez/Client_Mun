<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control_Allow-Headers: origin, X-Requested-With,Content-Type, Accept");//le pide acceso al header
    header('Access-Control-Allow-Methods: GET, POST');
    
    $json=file_get_contents('php://input');//recibe el jason de afuera
    $params=json_decode($json);//decodifica el json y guarda en params

    require 'Db.class.php';
    /*Instancia del objeto, conexion*/
    $bd=Db::getInstance();
    
    $sql="INSERT INTO productos( codigo_producto, categorias, estado, titulo, subtitulo, 
    descripcion,  nombreImagen, fechaAlta, precio, destacada, promocion, codigo_usuario) VALUES( '$params->codigo_producto', '$params->categorias', '$params->estado', 
    '$params->titulo','$params->subtitulo', '$params->descripcion', 
    '$params->nombreImagen','$params->fechaAlta', '$params->precio', '$params->destacada', '$params->promocion', '$params->codigo_usuario')";
    $respuesta=$bd->ejecutar($sql);

    class Result{}
    $response=new Result();
    if($respuesta==true){
        $response->resultado='OK';
        $response->mensaje='SE AGRAGO EXITOSAMENTE LA PROPIEDAD';
      }else{
        echo mysqli_error($bd);
      }

    header('Content-Type: application/json');
    echo json_encode($response);//muestra el json , el mensaje
?>