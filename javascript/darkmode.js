

//evento para cambiar el modo
const input = document.getElementById('input');
input.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', input.checked);
});

  //mantiene el estado
  // cargar el estado del modo
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    input.checked = true;
  }
  // cambiar el modo al hacer clic
  input.addEventListener('change', () => {
    const isDark = input.checked;
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
  });



