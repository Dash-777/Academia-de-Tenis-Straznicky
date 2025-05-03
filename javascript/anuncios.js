    // Cierra el popup cuando se hace clic en el botón
    document.getElementById('close-btn').addEventListener('click', function() {
        document.getElementById('popup-overlay').style.display = 'none';
      });



    //para que no vuelva a aparecer, un localstorage

    /* ... 

    // Verificar si el popup ya fue cerrado antes
  const hasClosedPopup = localStorage.getItem('popupClosed');

  if (!hasClosedPopup) {
    // Mostrar el popup si no ha sido cerrado antes
    document.getElementById('popup-overlay').style.display = 'flex';
  } else {
    // Ocultar el popup si ya fue cerrado
    document.getElementById('popup-overlay').style.display = 'none';
  }

  // Evento al hacer clic en el botón de cerrar
  document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('popup-overlay').style.display = 'none';
    localStorage.setItem('popupClosed', 'true'); // Guardar en localStorage
  });  **/