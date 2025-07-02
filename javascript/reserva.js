const turnos = {
  mañana: [
    "7:00 a 8:00",
    "8:00 a 9:00",
    "9:00 a 10:00",
    "10:00 a 11:00",
    "11:00 a 12:00",
  ],
  tarde: [
    "12:00 a 13:00",
    "13:00 a 14:00",
    "14:00 a 15:00",
    "15:00 a 16:00",
    "16:00 a 17:00",
  ],
  noche: [
    "17:00 a 18:00",
    "18:00 a 19:00",
    "19:00 a 20:00",
    "20:00 a 21:00",
    "21:00 a 22:00",
  ],
};
let turnoActual = "mañana";
const canchas = [
  { id: 1, superficie: "Arcilla" },
  { id: 2, superficie: "Arcilla" },
  { id: 3, superficie: "Arcilla" },
  { id: 4, superficie: "Arcilla" },
  { id: 5, superficie: "Arcilla" },
  { id: 6, superficie: "Arcilla" },];
const tabla = document.getElementById("tablaReservas");
const listaReserva = document.getElementById("listaReserva");
const totalPrecio = document.getElementById("totalPrecio");
const reservaFecha = document.getElementById("reservaFecha");
const PRECIO = 30;
let reservas = [];

function cambiarTurno(turno) {
  turnoActual = turno;
  reservas = [];
  actualizarResumen();
  generarTabla();
}

function generarTabla() {
  tabla.innerHTML = "";

  const horarios = turnos[turnoActual];
  document.getElementById("horario1").textContent = horarios[0];
  document.getElementById("horario2").textContent = horarios[1];
  document.getElementById("horario3").textContent = horarios[2];
  document.getElementById("horario4").textContent = horarios[3];
  document.getElementById("horario5").textContent = horarios[4];

  canchas.forEach((cancha) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
          <td>${cancha.id}</td>
          <td>${cancha.superficie}</td>
        `;

    horarios.forEach((horario) => {
      const celda = document.createElement("td");
      celda.className = "cell";
      celda.dataset.cancha = cancha.id;
      celda.dataset.superficie = cancha.superficie;
      celda.dataset.horario = horario;

      celda.onclick = () => seleccionar(celda);
      fila.appendChild(celda);
    });

    tabla.appendChild(fila);
  });
}

function seleccionar(celda) {
  const index = reservas.findIndex(
    (r) =>
      r.cancha == celda.dataset.cancha && r.horario == celda.dataset.horario
  );

  celda.classList.remove("seleccionado");

  if (index > -1) {
    reservas.splice(index, 1);
  } else {
    reservas.push({
      cancha: celda.dataset.cancha,
      superficie: celda.dataset.superficie,
      horario: celda.dataset.horario,
    });
    celda.classList.add("seleccionado");
  }

  actualizarResumen();
}

function actualizarResumen() {
  listaReserva.innerHTML = "";
  const fecha = document.getElementById("fecha").value;
  reservaFecha.textContent = fecha;
  const precioUnitario = turnoActual === "noche" ? 35 : 30;
  totalPrecio.textContent = reservas.length * precioUnitario;

  if (reservas.length > 0) {
    document.getElementById("resumenCancha").textContent = reservas[0].cancha;
    document.getElementById("resumenSuperficie").textContent =
      reservas[0].superficie;
    document.getElementById("resumenHorario").textContent = reservas[0].horario;
  } else {
    document.getElementById("resumenCancha").textContent = "";
    document.getElementById("resumenSuperficie").textContent = "";
    document.getElementById("resumenHorario").textContent = "";
  }
}

function limpiarDatos() {
  reservas = [];
  document
    .querySelectorAll(".cell")
    .forEach((c) => c.classList.remove("seleccionado"));
  actualizarResumen();
}

function confirmarReserva() {
  if (reservas.length === 0)
    return Swal.fire("Atención", "No has seleccionado horarios", "warning");

  const fecha = document.getElementById("fecha").value;
  const precioUnitario = turnoActual === "noche" ? 35 : 30;
  const total = reservas.length * precioUnitario;
  const detalles = reservas
    .map((r) => `Cancha ${r.cancha} - ${r.superficie} - ${r.horario}`)
    .join("\n");

  Swal.fire({
    title: "Reserva lista",
    html: `
      <p><strong>Fecha:</strong> ${fecha}</p>
      <p><strong>Turno:</strong> ${turnoActual}</p>
      <p><strong>Total:</strong> S/ ${total}</p>
      <pre>${detalles}</pre>
    `,
    icon: "success",
    confirmButtonText: "Pagar por WhatsApp",
  }).then((result) => {
    if (result.isConfirmed) {
      const mensaje = encodeURIComponent(
        `Hola, quiero reservar:\nFecha: ${fecha}\nTurno: ${turnoActual}\nTotal: S/ ${total}\n${detalles}`
      );
      window.open(`https://wa.me/51959783000?text=${mensaje}`, "_blank");
    }
  });

  limpiarDatos();
}

function configurarFecha() {
  const fechaInput = document.getElementById("fecha");
  const hoy = new Date();
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);

  const format = (d) => d.toISOString().split("T")[0];

  fechaInput.min = format(hoy);
  fechaInput.max = format(mañana);
  fechaInput.value = format(hoy);
}

window.onload = () => {
  configurarFecha();
  generarTabla();
  document.getElementById("fecha").addEventListener("change", limpiarDatos);
};
