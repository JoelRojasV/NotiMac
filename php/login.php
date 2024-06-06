<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bd_notimac";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    $response = array(
        'success' => false,
        'message' => 'Error de conexión: ' . $conn->connect_error
    );
    echo json_encode($response);
    exit;
}

// Manejar la solicitud POST del formulario de inicio de sesión
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $username = $data['username'];
    $password = $data['password'];

    // Consulta SQL para autenticar al usuario
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Autenticación exitosa
        $row = $result->fetch_assoc();

        // Consulta SQL para obtener las noticias
        $sql_noticias = "SELECT * FROM noticias";
        $result_noticias = $conn->query($sql_noticias);

        $noticias = '';
        if ($result_noticias->num_rows > 0) {
            while ($row_noticia = $result_noticias->fetch_assoc()) {
                $noticias .=  $row_noticia['titulo'] ;
                $noticias .=  $row_noticia['contenido'] ;
            }
        }

        $response = array(
            'success' => true,
            'news' => $noticias
        );
    } else {
        // Autenticación fallida
        $response = array(
            'success' => false,
            'message' => 'Nombre de usuario o contraseña incorrectos'
        );
    }

    echo json_encode($response);
    exit;
}

$conn->close();
?>