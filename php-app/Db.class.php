<?php
 header('Access-Control-Allow-Origin: *');
 header("Access-Control_Allow-Headers: origin, X-Requested-With,Content-Type, Accept");//le pide acceso al header
 header('Access-Control-Allow-Methods: GET, POST');
/* Clase encargada de gestionar las conexiones a la base de datos */
Class Db{

   
   private $link;
   
   static $_instance;

  //  private $co;
   /*La función construct es privada para evitar que el objeto pueda ser creado mediante new*/
   private function __construct(){
      $this->conectar();
   }

   /*Evitamos el clonaje del objeto. Patrón Singleton*/
   private function __clone(){ }
    
   public static function getInstance(){
      if (!(self::$_instance instanceof self)){
         self::$_instance=new self();
      }
      return self::$_instance;
   }

   private function conectar(){
      // $this->link=mysql_connect($this->servidor, $this->usuario, $this->password);
      $this->link = mysqli_connect('localhost','root', '', 'matizo_menu');
      if (mysqli_connect_errno($this->link)) {
        die("Failed to connect:" . mysqli_connect_error());
      }
      mysqli_set_charset($this->link, "utf8");
   }
 
   public function ejecutar($sql){
    $res = $this ->link->query($sql);
    return $res;
   }
   /*Método para obtener una fila de resultados de la sentencia sql*/
  //  public function obtener_fila($stmt,$fila){
  //     if ($fila==0){
  //        $this->array=mysql_fetch_array($stmt);
  //     }else{
  //        mysql_data_seek($stmt,$fila);
  //        $this->array=mysql_fetch_array($stmt);
  //     }
  //     return $this->array;
  //  }
}
?>

