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
