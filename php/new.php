<?php
// Configuración de la conexión a la base de datos
include_once "config.php";
session_start();

// Crear conexión
$conn = new mysqli($bd_host, $bd_user, $bd_pass, $bd_name);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'mensaje' => 'Error de conexión']));
}


// Obtener las noticias de la base de datos
$sql_noticias = "SELECT * FROM noticias";
$result_noticias = $conn->query($sql_noticias);
$noticias = "";
if ($result_noticias->num_rows > 0) {
    $noticias.= "<h2>Noticias</h2>";
    while ($row = $result_noticias->fetch_assoc()) {
        $noticias.= "<p>". $row["titulo"]. "</p>";
        $noticias.= "<p>". $row["contenido"]. "</p>";
    }
} else {
    $noticias = "No hay noticias disponibles";
}
// Cerrar la conexión
$conn->close();

?>