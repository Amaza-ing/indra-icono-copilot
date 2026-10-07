const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");
const hourHand = document.querySelector(".clock-hour");
const minuteHand = document.querySelector(".clock-minute");

year.textContent = new Date().getFullYear();

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
