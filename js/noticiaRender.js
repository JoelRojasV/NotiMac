// Función para renderizar noticias
function renderNoticias(noticias) {
    const noticiaElements = noticias.map(noticia => {
        const noticiaElement = document.createElement('div');
        noticiaElement.className = 'noticia';

        const tituloElement = document.createElement('h2');
        tituloElement.textContent = noticia.titulo;
        tituloElement.className = 'noticia-titulo'; // Agregar clase CSS

        const contenidoElement = document.createElement('p');
        contenidoElement.textContent = noticia.contenido;
        contenidoElement.className = 'noticia-contenido'; // Agregar clase CSS

        const imagenElement = document.createElement('img');
        imagenElement.src = noticia.imagen;
        imagenElement.className = 'noticia-imagen'; // Agregar clase CSS

        noticiaElement.appendChild(tituloElement);
        noticiaElement.appendChild(contenidoElement);
        noticiaElement.appendChild(imagenElement);

        return noticiaElement;
    });

    return noticiaElements;
}