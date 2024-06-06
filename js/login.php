<?php

    include_once "../php/config.php";

    $conn = new mysqli($bd_host, $bd_user, $bd_pass, $bd_name);

    // Verificar conexion
    if($conn->connect_error){
        die(json_encode(['success' => false, 'mensaje' => 'Error de conexión']));
    }
    //echo "Conexión exitosa";

    session_start();

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
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
                $message = "¡Inicio de sesión exitoso! Bienvenido, " . htmlspecialchars($username) . ".";
                // Redirigir a la página principal
            } else {
                $message = "Nombre de usuario o contraseña incorrectos.";
            }
        } else {
            $message = "Nombre de usuario o contraseña incorrectos.";
        }
        $stmt->close();


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

        // Devolver la respuesta como JSON
        $response = array(
            'success' => $success,
            'message' => $message,
            'news' => $noticias
        );

        header('Content-Type: application/json');
        echo json_encode($response);

    }
    $conn->close();
?>