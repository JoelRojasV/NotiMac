<?php
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: ../html/index.html");
    exit();
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido</title>
</head>
<body>
    <h2>Bienvenido, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
    <a href="logout.php">Cerrar sesión</a>
</body>
</html>