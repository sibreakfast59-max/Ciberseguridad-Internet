/***********************
 * DRAG & DROP
 ***********************/
const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");
const dragResult = document.getElementById("drag-result");
const itemsContainer = document.querySelector(".items");

/* Asignar datos correctos */
draggables.forEach((item, index) => {
  item.dataset.id = index;

  const text = item.textContent.toLowerCase();
  item.dataset.type =
    text.includes("vpn") || text.includes("contraseña")
      ? "seguridad"
      : "amenaza";

  item.addEventListener("dragstart", e => {
    item.classList.add("dragging");
    e.dataTransfer.setData("id", item.dataset.id);
    e.dataTransfer.setData("type", item.dataset.type);
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

dropzones.forEach(zone => {
  zone.addEventListener("dragover", e => e.preventDefault());

  zone.addEventListener("drop", e => {
    e.preventDefault();

    const id = e.dataTransfer.getData("id");
    const type = e.dataTransfer.getData("type");
    const dragged = document.querySelector(`[data-id="${id}"]`);

    if (!dragged) return;

    zone.appendChild(dragged);

    const isCorrect = type === zone.dataset.category;
    dragResult.textContent = isCorrect
      ? "✅ Correcto"
      : "❌ Ups, revisa tu clasificación.";

    dragResult.className = isCorrect ? "correct" : "wrong";
  });
});

function resetDragDrop() {
  draggables.forEach(item => itemsContainer.appendChild(item));
  dragResult.textContent = "";
  dragResult.className = "";
}

/***********************
 * AHORCADO
 ***********************/
const words = ["FIREWALL", "ANTIVIRUS", "PHISHING", "VPN"];
const hangmanEl = document.querySelector(".hangman");
const wordEl = document.getElementById("word");
const usedEl = document.getElementById("used");
const statusEl = document.getElementById("hangman-status");

let chosen = "";
let display = "";
let used = [];
let attempts = 6;
let gameOver = false;

function initHangman() {
  chosen = words[Math.floor(Math.random() * words.length)];
  display = "_".repeat(chosen.length);
  used = [];
  attempts = 6;
  gameOver = false;

  wordEl.textContent = display.split("").join(" ");
  usedEl.textContent = "";
  statusEl.textContent = "Intentos restantes: 6";

  document.querySelectorAll(".man div").forEach(p => p.style.display = "none");
}

function guessLetter() {
  if (gameOver) return;

  const input = document.getElementById("guess");
  const letter = input.value.toUpperCase();
  input.value = "";

  if (!/^[A-Z]$/.test(letter) || used.includes(letter)) return;

  used.push(letter);
  usedEl.textContent = used.join(", ");

  if (chosen.includes(letter)) {
    display = [...chosen]
      .map((l, i) => (l === letter ? letter : display[i]))
      .join("");

    wordEl.textContent = display.split("").join(" ");

    if (!display.includes("_")) {
      statusEl.textContent = "🎉 ¡Ganaste!";
      gameOver = true;
    }
  } else {
    attempts--;
    statusEl.textContent = `Intentos restantes: ${attempts}`;
    drawHangman();

    if (attempts === 0) {
      statusEl.textContent = `😢 Perdiste. La palabra era ${chosen}`;
      gameOver = true;
    }
  }
}

function drawHangman() {
  const parts = document.querySelectorAll(".man div");
  const index = 6 - attempts - 1;
  if (parts[index]) parts[index].style.display = "block";
}

function resetHangman() {
  initHangman();
}

initHangman();

/***********************
 * ESCAPE ROOM
 ***********************/
const scenarios = [
  {
    text: "Tu cuenta fue atacada, ¿qué haces primero?",
    options: ["Cambiar contraseña", "Ignorar", "Compartir datos"],
    correct: "Cambiar contraseña"
  },
  {
    text: "Recibes un correo sospechoso, ¿qué haces?",
    options: ["Abrir enlace", "Eliminar", "Responder"],
    correct: "Eliminar"
  }
];

let current = 0;
const scenarioEl = document.getElementById("scenario");
const optionsEl = document.getElementById("options");
const escapeResult = document.getElementById("escape-result");

function loadScenario() {
  const sc = scenarios[current];
  scenarioEl.textContent = sc.text;
  optionsEl.innerHTML = "";
  escapeResult.textContent = "";

  sc.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => handleEscapeChoice(opt, sc.correct);
    optionsEl.appendChild(btn);
  });
}

function handleEscapeChoice(choice, correct) {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);

  if (choice === correct) {
    escapeResult.textContent = "✅ ¡Correcto!";
    current++;

    setTimeout(() => {
      if (current < scenarios.length) {
        loadScenario();
      } else {
        scenarioEl.textContent = "";
        optionsEl.innerHTML = "";
        escapeResult.textContent = "🎉 ¡Has completado el Escape Room!";
      }
    }, 900);
  } else {
    escapeResult.textContent = "❌ Incorrecto, intenta de nuevo.";
    setTimeout(() => {
      buttons.forEach(b => b.disabled = false);
    }, 800);
  }
}

function resetEscape() {
  current = 0;
  loadScenario();
}

loadScenario();

/***********************
 * ROMPECÓDIGOS
 ***********************/
function checkPassword() {
  const pwd = document.getElementById("pwd").value;
  const result = document.getElementById("pwd-strength");

  let strength = 0;
  if (pwd.length >= 8) strength++;
  if (/[A-Z]/.test(pwd)) strength++;
  if (/\d/.test(pwd)) strength++;
  if (/[^A-Za-z0-9]/.test(pwd)) strength++;

  if (strength <= 2) {
    result.textContent = "❌ Contraseña débil";
    result.style.color = "red";
  } else if (strength === 3) {
    result.textContent = "⚠️ Contraseña media";
    result.style.color = "orange";
  } else {
    result.textContent = "✅ Contraseña fuerte";
    result.style.color = "green";
  }
}