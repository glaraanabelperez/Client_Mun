<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control_Allow-Headers: origin, X-Requested-With,Content-Type, Accept");//le pide acceso al header

    // $json = file_get_contents('php://input');
    // $obj = json_decode($json);
	$img=$_POST["img"];
	$c = $_POST["carpeta"];
    $nombre_fichero=dirname(__FILE__)."\\assets\\".$c."/".$obj;
   
      if(isset($nombre_fichero)){
        $rtsa=unlink($nombre_fichero);
		$json = json_encode($rtsa); 
		echo $json;
		 
	}else{
		$data = array(
			'status' => 'error',
			'msj' => 'No se recibio ninguna imagen'
		);
		$format = (object) $data;
		$json = json_encode($format); 
		echo $json; 
	}
?>