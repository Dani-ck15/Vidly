// Script inicial da Vidly
console.log("Vidly iniciado 🚀");

document.addEventListener("DOMContentLoaded", () => {
  const videoList = document.getElementById("video-list");

  // Exemplo de vídeo de teste
  const videoCard = document.createElement("div");
  videoCard.innerHTML = `
    <video width="100%" controls>
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Seu navegador não suporta vídeos.
    </video>
    <p>Vídeo de exemplo</p>
  `;

  videoList.appendChild(videoCard);
});

// Script inicial da Vidly
document.addEventListener("DOMContentLoaded", () => {
  console.log("Vidly carregado com sucesso!");

  // Testa a conexão com o backend
  fetch("http://localhost:3000/api/status")
    .then(response => response.json())
    .then(data => {
      console.log("Resposta da API:", data);
    })
    .catch(error => {
      console.error("Erro ao conectar com a API:", error);
    });
});
