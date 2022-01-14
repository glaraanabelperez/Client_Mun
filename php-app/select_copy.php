<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control_Allow-Headers: origin, X-Requested-With,Content-Type, Accept");//le pide acceso al header
    header('Access-Control-Allow-Methods: GET, POST');

    require 'Db.class.php';

    /*Creamos la instancia del objeto. Ya estamos conectados*/
    $bd=Db::getInstance();

   /*Creamos una query sencilla*/
    $sql="SELECT * FROM productos;";

    /*Ejecutamos la query*/
    $respuesta=$bd->ejecutar($sql);

     class Result{}
     $fila = mysqli_fetch_array($respuesta);
      if($respuesta==true){
          while($fila = mysqli_fetch_array($respuesta)) {
            $array[] = array(
              "codigo_producto" => $fila['codigo_producto'],
              "categorias" => $fila['categorias'],
              "estado" => $fila['estado'],
              "titulo" => $fila['titulo'],
              "subtitulo" => $fila['subtitulo'],
              "descripcion" => $fila['descripcion'],
              "nombreImagen" => $fila['nombreImagen'],
              "fechaAlta" => $fila['fechaAlta'],
              "precio" => $fila['precio'],
              "destacada" => $fila['destacada'],
              "promocion" => $fila['promocion'],
              "codigo_usuario" => $fila['codigo_usuario'],
         ); 
        } 
      }else{
        echo mysqli_error($bd);
      }
      header('Content-Type: application/json');
      echo json_encode($array);//muestra el json , el mensaje
?>