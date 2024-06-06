document.getElementById('loginform').addEventListener('submit', async function(event){
    event.preventDefault();

    const forma = new FormData(this); 
    const response = await fetch('../php/login.php', {
        method: 'POST',
        body: forma
    });

    const data = await response.json();

    if(data.success){
        // alert("YEI");
        window.location.href = '../php/dashboard.php';
    } else{
        alert(data.mensaje);
    }
});