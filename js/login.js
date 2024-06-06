// Obtener elementos del DOM
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const modal = document.getElementById('login-modal');
const closeModal = document.getElementsByClassName('close')[0];
const loginForm = document.getElementById('login-form');
const newsFeed = document.getElementById('news-feed');

newsFeed.innerHTML = '<h2>Noticias</h2><p>Para ver las noticias, inicia sesión</p>';

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

// Manejar envío del formulario de inicio de sesión
loginForm.onsubmit = function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Crear objeto con los datos del formulario
    const formData = {
        username: username,
        password: password
    };
    
    // Realizar solicitud Fetch al servidor PHP
    fetch('../php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }
        return response.json(); // Parsear la respuesta como JSON
    })

    .then(data => {
        console.log(data);
        if (data.success) {
            // Autenticación exitosa
            logoutBtn.style.display = 'inline';
            loginBtn.style.display = 'none';
            modal.style.display = 'none';
            // Cargar noticias desde el servidor PHP
            newsFeed.innerHTML = data.news;
        } else {
            // Autenticación fallida
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`Ha ocurrido un error: ${error.message}`);
    });
}

// Manejar cierre de sesión
logoutBtn.onclick = function() {
    // Aquí debes enviar una solicitud AJAX/Fetch al servidor PHP para cerrar la sesión del usuario
    // Después de cerrar la sesión, muestra el botón de inicio de sesión y oculta el de cierre de sesión
    // También puedes limpiar el contenido de las noticias
    fetch('../php/logout.php');
    // Ejemplo de cierre de sesión
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'inline';
    newsFeed.innerHTML = '';
}