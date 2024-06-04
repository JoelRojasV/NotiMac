<?php
include_once "config.php";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Preparar y ejecutar la consulta SQL
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $username, $hashed_password);
        $stmt->fetch();

        // Verificar la contraseña
        if (password_verify($pass, $hashed_password)) {
            $_SESSION['username'] = $username;
            echo "¡Inicio de sesión exitoso! Bienvenido, " . htmlspecialchars($username) . ".";
            // Redirigir a la página principal
            header("url: welcome.php");
            exit();
        } else {
            echo "Nombre de usuario o contraseña incorrectos.";
        }
    } else {
        echo "Nombre de usuario o contraseña incorrectos.";
    }
    $stmt->close();
}

$conn->close();
?>

