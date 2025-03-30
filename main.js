document.getElementById("menu-btn").addEventListener("click", function () {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

let whatsappButton = document.getElementById("whatsapp-button");

whatsappButton.addEventListener("mouseover", () => {
  whatsappButton.classList.add("animate__animated", "animate__shakeX");

  setTimeout(() => {
    whatsappButton.classList.remove("animate__animated", "animate__shakeX");
  }, 1000);
});
