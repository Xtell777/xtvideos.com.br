// Após o login bem-sucedido
fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
})
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token); // Salva o token no localStorage
      alert("Login bem-sucedido");
      window.location.href = "homepage.html"; // Redireciona para a página principal
    } else {
      alert("Erro no login");
    }
  });
