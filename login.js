document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Envia as credenciais ao backend para validação
    fetch('https://netyoustream.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redireciona para a página inicial ou dashboard
            window.location.href = 'home.html';
        } else {
            alert("Credenciais inválidas");
        }
    })
    .catch(error => console.error('Erro:', error));
});
