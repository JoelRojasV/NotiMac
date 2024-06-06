// Obtener elementos del DOM
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const modal = document.getElementById('login-modal');
const closeModal = document.getElementsByClassName('close')[0];
const loginForm = document.getElementById('login-form');
const newsFeed = document.getElementById('news-feed');

// Abrir modal de inicio de sesión
loginBtn.onclick = function() {
    modal.style.display = 'block';
}

// Cerrar modal de inicio de sesión
closeModal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('login-form').addEventListener('submit', async function(event){
    event.preventDefault();

    const forma = new FormData(this); 
    const response = await fetch('../js/login.php', {
        method: 'POST',
        body: forma
    });

    const data = await response.json();

    if(data.success){
        // Autenticación exitosa
        logoutBtn.style.display = 'inline';
        loginBtn.style.display = 'none';
        modal.style.display = 'none';
        // Cargar noticias desde el servidor PHP
        newsFeed.innerHTML = data.news;
    } else{
        alert(data.mensaje);
    }
});


// Manejar cierre de sesión
logoutBtn.onclick = function() {
    // Aquí debes enviar una solicitud AJAX/Fetch al servidor PHP para cerrar la sesión del usuario
    // Después de cerrar la sesión, muestra el botón de inicio de sesión y oculta el de cierre de sesión
    // También puedes limpiar el contenido de las noticias

    // Ejemplo de cierre de sesión
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'inline';
    newsFeed.innerHTML = '';
}