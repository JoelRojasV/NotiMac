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
        $noticias = array();
        $sql_noticias = "SELECT * FROM noticias";
        $result_noticias = $conn->query($sql_noticias);
        if ($result_noticias->num_rows > 0) {
            while ($row_noticia = $result_noticias->fetch_assoc()) {
                $noticias[] = array(
                    'titulo' => $row_noticia['titulo'],
                    'contenido' => $row_noticia['contenido'],
                    'imagen' => $row_noticia['imagen']
                );
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

// Manejar la creación de una nueva noticia
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['crear_noticia'])) {
    $titulo = $_POST['titulo'];
    $contenido = $_POST['contenido'];
    $imagen = $_FILES['imagen']['name'];
    $imagen_temporal = $_FILES['imagen']['tmp_name'];

    // Mover la imagen cargada a una carpeta específica
    $carpeta_destino = '../html/';
    $ruta_imagen = $carpeta_destino . basename($imagen);
    move_uploaded_file($imagen_temporal, $ruta_imagen);

    // Insertar la noticia en la base de datos
    $sql = "INSERT INTO noticias (titulo, contenido, imagen) VALUES ('$titulo', '$contenido', '$ruta_imagen')";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'success' => true,
            'message' => 'Noticia creada exitosamente'
        );
    } else {
        $response = array(
            'success' => false,
            'message' => 'Error al crear la noticia: ' . $conn->error
        );
    }

    echo json_encode($response);
    exit;
}

$conn->close();
?>