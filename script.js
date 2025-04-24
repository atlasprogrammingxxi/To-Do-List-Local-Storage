document.addEventListener('DOMContentLoaded', function() {
  const inputTarea = document.getElementById('inputTarea');
  const btnAgregar = document.getElementById('btnAgregar');
  const listaTareas = document.getElementById('listaTareas');
  const mensaje = document.getElementById('mensaje');
  const btnBorrarTodo = document.getElementById('btnBorrarTodo');

  cargarTareas();

  function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => mensaje.textContent = '', 2000);
  }

  function guardarTareas() {
      const tareas = [];
      document.querySelectorAll('.tarea').forEach(tarea => {
          tareas.push({
              texto: tarea.textContent,
              completada: tarea.classList.contains('completada')
          });
      });
      localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  function cargarTareas() {
      const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
      tareasGuardadas.forEach(tarea => {
          crearElementoTarea(tarea.texto, tarea.completada);
      });
  }

  function crearElementoTarea(texto, completada = false) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = texto;
      span.className = 'tarea' + (completada ? ' completada' : '');

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.className = 'eliminar';

      btnEliminar.addEventListener('click', function(e) {
          e.stopPropagation();
          li.remove();
          guardarTareas(); 
      });

      span.addEventListener('click', function() {
          this.classList.toggle('completada');
          guardarTareas(); 
      });

      li.appendChild(span);
      li.appendChild(btnEliminar);
      listaTareas.appendChild(li);
  }

  function agregarTarea() {
      const texto = inputTarea.value.trim();
      if (texto === '') {
          mostrarMensaje('Debe escribir una tarea.');
          return;
      }

      crearElementoTarea(texto);
      guardarTareas(); 
      inputTarea.value = '';
      inputTarea.focus();
  }

  btnBorrarTodo.addEventListener('click', function() {
      listaTareas.innerHTML = '';
      localStorage.removeItem('tareas');
      inputTarea.focus();
  });

  btnAgregar.addEventListener('click', agregarTarea);
  inputTarea.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') agregarTarea();
  });
});
