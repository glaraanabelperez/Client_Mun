<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Comprueba el peso
// if ($_FILES["fileToUpload"]["size"] > 500000) {
//     echo "Perdon pero el archivo es muy pesado";
//     $uploadOk = 0;
// // }
    if(isset($_FILES['file'])){
		$imagen_nombre = $_FILES['file']['name'];
		$directorio_final = "./assets/".$imagen_nombre;
		 
		if (file_exists($directorio_final)) {
			$data = array(
				'status' => 'error',
				// 'msj' => 'Ya existe la imagen'
			);
			$format = (object) $data;
			$json = json_encode($format); 
			echo $json; 
		} else {
				$data = array(
					'status' => 'success',
					// 'msj' => 'La imagen no existe'
				);
				$format = (object) $data;
				$json = json_encode($format); 
				echo $json; 
			}
			
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