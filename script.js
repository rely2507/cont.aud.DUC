function crearMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  const maxSemestre = Math.max(...asignaturas.map(a => a.semestre));

  for (let i = 1; i <= maxSemestre; i++) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    columna.innerHTML = `<h3>Semestre ${i}</h3>`;

    const materias = asignaturas.filter(a => a.semestre === i);
    materias.forEach(m => {
      const div = document.createElement("div");
      div.className = `asignatura ${m.tipo}`;
      div.innerText = m.nombre;
      div.dataset.nombre = m.nombre;
      div.dataset.semestre = m.semestre;

      // Marcar como aprobada si estaba en localStorage
      if (m._aprobada) {
        div.classList.add("aprobada");
      }

      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueada")) return;

        div.classList.toggle("aprobada");
        guardarEstado();
        actualizarBloqueos();
      });

      columna.appendChild(div);
    });

    container.appendChild(columna);
  }

  actualizarBloqueos();
}

function actualizarBloqueos() {
  const aprobadas = [...document.querySelectorAll(".aprobada")].map(d => d.dataset.nombre);

  document.querySelectorAll(".asignatura").forEach(div => {
    const nombre = div.dataset.nombre;
    const data = asignaturas.find(a => a.nombre === nombre);

    let bloqueada = false;

    if (data.prerequisitos.includes("Todas Las Asignaturas Semestres 1 A 4")) {
      bloqueada = !estanAprobadosTodosHasta(4, aprobadas);
    } else if (data.prerequisitos.includes("Todas Las Asignaturas Semestres 1 A 7")) {
      bloqueada = !estanAprobadosTodosHasta(7, aprobadas);
    } else {
      for (const req of data.prerequisitos) {
        if (!aprobadas.includes(req)) {
          bloqueada = true;
          break;
        }
      }
    }

    // Aplica o quita bloqueo visual
    div.classList.toggle("bloqueada", bloqueada);

    // Si está bloqueada pero marcada como aprobada, se destacha
    if (bloqueada && div.classList.contains("aprobada")) {
      div.classList.remove("aprobada");
    }
  });

  guardarEstado();
}

function estanAprobadosTodosHasta(semestreLimite, aprobadas) {
  const obligatorias = asignaturas
    .filter(a => a.semestre <= semestreLimite)
    .map(a => a.nombre);
  return obligatorias.every(n => aprobadas.includes(n));
}

function guardarEstado() {
  const aprobadas = [...document.querySelectorAll(".aprobada")].map(d => d.dataset.nombre);
  localStorage.setItem("mallaAprobadas", JSON.stringify(aprobadas));
}

function cargarEstado() {
  const data = localStorage.getItem("mallaAprobadas");
  if (!data) return;
  const aprobadas = JSON.parse(data);

  asignaturas.forEach(a => {
    if (aprobadas.includes(a.nombre)) {
      a._aprobada = true;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarEstado();
  crearMalla();
});
