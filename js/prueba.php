<?php
$response = array(
    'success' => true,
    'message' => 'Prueba exitosa'
);

header('Content-Type: application/json');
echo json_encode($response);
?>