<?php
		// include ('./carpeta.php');
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: X-Requested-With');
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
	$c = $_POST["carpeta"];

	if(isset($_FILES['file'])){
// debugger;
		$imagen_nombre = $_FILES['file']['name'];
		$directorio_final = "./assets/$c/".$imagen_nombre; 
			if(move_uploaded_file($_FILES['file']['tmp_name'], $directorio_final)){
				$data = array(
					'status' => 'success',
					'code' => 200,
					'msj' => 'Imagen subida'
				);
				$format = (object) $data;
				$json = json_encode($format); 
				echo $json; 
			}else{
				$data = array(
					'status' => 'error',
					'code' => 400,
					'msj' => 'Error al mover imagen al servidor'
				);
				$format = (object) $data;
				$json = json_encode($format); 
				echo $json;  

			}

	}else{

			$data = array(
				'status' => 'error',
				'code' => 400,
				'msj' => 'No se recibio ninguna imagen'
			);
			$format = (object) $data;
			$json = json_encode($format); 
			echo $json; 
	
	}

?>