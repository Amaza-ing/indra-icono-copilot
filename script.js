const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");
const hourHand = document.querySelector(".clock-hour");
const minuteHand = document.querySelector(".clock-minute");
const themeToggle = document.querySelector("#theme-toggle");
const availableThemes = ["terracota", "bosque", "noche", "lavanda", "oceano"];
const themeNames = {
  terracota: "Terracota",
  bosque: "Bosque",
  noche: "Noche",
  lavanda: "Lavanda",
  oceano: "Océano",
};

year.textContent = new Date().getFullYear();

function setTheme(theme) {
  if (!availableThemes.includes(theme)) return;

  document.documentElement.dataset.theme = theme;
  const themeIndex = availableThemes.indexOf(theme);
  const nextTheme = availableThemes[(themeIndex + 1) % availableThemes.length];
  themeToggle.textContent = themeNames[theme];
  themeToggle.setAttribute(
    "aria-label",
    `Tema actual: ${themeNames[theme]}. Siguiente tema: ${themeNames[nextTheme]}.`,
  );

  const themeColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--paper")
    .trim();
  document.querySelector('meta[name="theme-color"]').content = themeColor;
}

try {
  const savedTheme = localStorage.getItem("estudio-norte-theme");
  setTheme(availableThemes.includes(savedTheme) ? savedTheme : "terracota");
} catch {
  setTheme("terracota");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const currentIndex = availableThemes.indexOf(currentTheme);
  const theme = availableThemes[(currentIndex + 1) % availableThemes.length];
  setTheme(theme);

  try {
    localStorage.setItem("estudio-norte-theme", theme);
  } catch {
    // El cambio de tema sigue funcionando aunque el almacenamiento esté bloqueado.
  }
});

/**
 * Actualiza las agujas del reloj analógico con la hora local actual.
 *
 * Calcula los ángulos de las agujas horaria y minutera, incluyendo el avance
 * gradual de los minutos y las horas, y los aplica mediante transformaciones CSS.
 * Se invoca al cargar la página y posteriormente cada segundo.
 * @returns {void}
 */
function updateClock() {
  const now = new Date();
  const minutes = now.getMinutes() + now.getSeconds() / 60;
  const hours = (now.getHours() % 12) + minutes / 60;
  const seconds = now.getSeconds();

  hourHand.style.transform = `rotate(${hours * 30}deg)`;
  minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
}

updateClock();
setInterval(updateClock, 1000);

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    siteNav.classList.remove("is-open");
  }
});
