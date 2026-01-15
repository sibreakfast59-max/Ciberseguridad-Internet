(function(){
  const nombre = prompt("¿Cuál es tu nombre?");
  const saludoEl = document.getElementById("saludo");
  const safeName = (nombre || "Estudiante").trim().slice(0, 40);
  saludoEl.textContent = `¡Hola, ${safeName}! Bienvenido/a`;

 setTimeout(() => {
  const url = new URL("home.html", window.location.href);
  url.searchParams.set("nombre", safeName);
  window.location.href = url.toString();
  }, 5000);
})();