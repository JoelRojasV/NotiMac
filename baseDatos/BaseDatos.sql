CREATE DATABASE bd_notimac;

USE bd_notimac;

CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    imagen VARCHAR(255)
);
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    );


-- Insertar una noticia sin imagen
INSERT INTO noticias (titulo, contenido, imagen) 
VALUES ('Noticia de prueba 1', 'Este es el contenido de la noticia de prueba 1.', NULL);

-- Insertar una noticia con imagen
INSERT INTO noticias (titulo, contenido, imagen) 
VALUES ('Noticia de prueba 2', 'Este es el contenido de la noticia de prueba 2.', 'imagen1.jpg');

-- Insertar una noticia con contenido más largo y una imagen
INSERT INTO noticias (titulo, contenido, imagen) 
VALUES ('Noticia de prueba 3', 'Esta es una noticia de prueba con un contenido más detallado. Aquí puedes agregar una descripción más extensa y detalles relevantes sobre el tema de la noticia. Esta noticia también incluye una imagen.', 'imagen2.png');

-- Insertar una noticia con caracteres especiales en el título y contenido
INSERT INTO noticias (titulo, contenido, imagen) 
VALUES ('¡Noticia de prueba 4!', 'Este es el contenido de la "noticia de prueba 4". Contiene algunos caracteres especiales como: ñ, á, é, í, ó, ú.', 'imagen3.gif');