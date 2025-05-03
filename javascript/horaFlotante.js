function actualizarHora() {
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');

    document.getElementById('hora').textContent = `${hora}:${minutos}:${segundos}`;
  }
  setInterval(actualizarHora, 1000);
  actualizarHora();