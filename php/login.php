<?php
// Configuración de la conexión a la base de datos
include_once "config.php";
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Crear conexión
    $conn = new mysqli($bd_host, $bd_user, $bd_pass, $bd_name);

    // Verificar la conexión
    if ($conn->connect_error) {
        die(json_encode(['success' => false, 'mensaje' => 'Error de conexión']));
    }

    // Obtener los datos del formulario enviados desde JavaScript
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $password = $data['password'];

    // Consultar la base de datos para autenticar al usuario
    $query = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $user = $resultado->fetch_assoc();

    if ($user) {
        // Verificar la contraseña ingresada con la contraseña encriptada almacenada
        $passwordEncriptada = $user['password'];
        echo $passwordEncriptada;
        if (password_verify($password, $passwordEncriptada)) {
            // Autenticación exitosa
            $_SESSION['id'] = $user['id'];
            $_SESSION['usuario'] = $user['username'];
            $success = true;
            $message = "Inicio de sesión exitoso";
        } else {
            // Contraseña incorrecta
            $success = false;
            $message = "Entrada Inválida";
        }
    } else {
        // Autenticación fallida
        // Usuario no encontrado
        $success = false;
        $message = "Usuario o contraseña incorrectos";
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
    $noticias = "No hay noticias disponibles";
    // Cerrar la conexión
    $conn->close();

    // Devolver la respuesta como JSON
    $response = array(
        'success' => $success,
        'message' => $message,
        'news' => $noticias
    );

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>