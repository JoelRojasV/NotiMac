<?php
include_once "config.php";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) 
{
    die("Conexión fallida: " . $conn->connect_error);
}

// Datos del nuevo usuario
if ($_SERVER['REQUEST_METHOD'] == 'POST') 
{
    $user = $_POST['registerUser'];
    $pass = $_POST['registerPass'];
    $pass = password_hash($pass, PASSWORD_DEFAULT);

    // Insertar usuario
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $user, $pass);

    if ($stmt->execute()) {
        echo "<h2>Usuario registrado correctamente!</h2>";
        header("refresh:2; url=../html/index.html");
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}else{

}


?>

