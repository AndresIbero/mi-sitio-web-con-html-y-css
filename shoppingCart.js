/* Cargar carrito */
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-items");
  const emptyMsg = document.getElementById("empty-cart-msg");
  const cartButtons = document.getElementById("cart-buttons");

  cartList.innerHTML = "";

  if (cart.length === 0) {
    emptyMsg.classList.remove("hidden");
    cartButtons.classList.add("hidden");
    return;
  }

  emptyMsg.classList.add("hidden");
  cartButtons.classList.remove("hidden");

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "flex items-center bg-white p-2 rounded-lg shadow gap-4";
    li.innerHTML = `
                <img src="./assets/products/product${item.id}.jpg" alt="${
      item.name
    }" class="w-16 h-16 rounded-lg shadow">
                <div class="flex-1">
                    <span class="font-semibold">${item.name}</span>
                    <p class="text-gray-700 text-sm">Cantidad: ${
                      item.quantity
                    }</p>
                    <p class="text-gray-700 text-sm">Precio unitario: ${item.price.toLocaleString()}</p>
                </div>
            `;
    cartList.appendChild(li);
  });
}

document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  loadCart();
});

/* Añadir productos al carrito */
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  const cartButton = document.getElementById("shopping-cart-button");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeSidebar = document.getElementById("close-sidebar");
  const overlay = document.getElementById("overlay");

  cartButton.addEventListener("click", () => {
    cartSidebar.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
    loadCart();
  });

  closeSidebar.addEventListener("click", () => {
    cartSidebar.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  });

  overlay.addEventListener("click", () => {
    cartSidebar.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  });

  const buttons = document.querySelectorAll(".buy-product");

  /* Comprar */
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const productName = button.getAttribute("data-name");
      const productPrice = button.getAttribute("data-price");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Buscar si el producto ya está en el carrito
      let existingProduct = cart.find((item) => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      Swal.fire({
        title: "Excelente!",
        text: `🛒 ${productName} agregado al carrito`,
        icon: "success",
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        progressbar: true,
      });
    });
  });

  /* Pedir por whatsapp */
  document.getElementById("order-whatsapp").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) return;

    let message =
      "🛍 ¡Hola! Quisiera hacer un pedido de los siguientes productos:%0A%0A";
    cart.forEach((item) => {
      message += `📌 ${item.name} - Cantidad: ${item.quantity} - Precio: ${item.price}%0A`;
    });
    message += "%0A📦 ¿Cómo podemos coordinar la entrega y precios?";

    let whatsappNumber = "573134323042";
    let whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappURL, "_blank");
  });
});
