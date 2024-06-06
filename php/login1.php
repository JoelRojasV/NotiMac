<?php
    include_once "../config.php";

    session_start();
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $usuario = $_POST['usuario'];
        $pass = $_POST['pass'];

        $conn = new mysqli($bd_host, $bd_user, $bd_pass, $bd_name);

        // Verificar conexion
        if($conn->connect_error){
            die(json_encode(['success' => false, 'mensaje' => 'Error de conexión']));
            exit();
        }

        $query = "SELECT * FROM users WHERE username = ? AND password = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('ss', $usuario, $pass);
        $stmt->execute();
        $resultado = $stmt->get_result();
        $user = $resultado->fetch_assoc();

        if($user){
            $_SESSION['id'] = $user['id'];
            $_SESSION['usuario'] = $user['usuario'];
            echo json_encode(['success' => true]);
        } else{
            echo json_encode(['success' => false, 'mensaje' => 'Entrada Invalida']);
        }
    }
?>