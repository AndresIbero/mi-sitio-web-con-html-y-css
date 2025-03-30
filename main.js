let whatsappButton = document.getElementById("whatsapp-button");

whatsappButton.addEventListener("mouseover", () => {
  whatsappButton.classList.add("animate__animated", "animate__shakeX");

  setTimeout(() => {
    whatsappButton.classList.remove("animate__animated", "animate__shakeX");
  }, 1000);
});
