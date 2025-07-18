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
      div.innerHTML = `
  <div class="nombre-asignatura">${m.nombre}</div>
  <div class="sigla-asignatura">${m.sigla}</div>
`;
  if (m.prerequisitos && m.prerequisitos.length > 0) {
  div.addEventListener("mouseenter", () => {
    m.prerequisitos.forEach(nombre => {
      const prereq = document.querySelector(`.asignatura[data-nombre="${nombre}"]`);
      if (prereq) prereq.classList.add("resaltada");
    });
  });

  div.addEventListener("mouseleave", () => {
    m.prerequisitos.forEach(nombre => {
      const prereq = document.querySelector(`.asignatura[data-nombre="${nombre}"]`);
      if (prereq) prereq.classList.remove("resaltada");
    });
  });
}
  div.dataset.nombre = m.nombre;
      
      const creditos = document.createElement("span");
      creditos.classList.add("creditos");
      creditos.textContent = `${m.creditos} cr`;
      div.appendChild(creditos);
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
        actualizarCreditos();
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

  actualizarCreditos();
}

document.addEventListener("DOMContentLoaded", () => {
  cargarEstado();
  crearMalla();
  actualizarCreditos();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  document.querySelectorAll(".asignatura").forEach(div => {
    div.classList.remove("aprobada");
  });

  localStorage.removeItem("aprobadas");
  actualizarBloqueos(); // ← vuelve a aplicar los prerequisitos
});

function actualizarCreditos() {
  const asignaturasAprobadas = document.querySelectorAll(".asignatura.aprobada");
  
  let regulares = 0;
  let complementarios = 0;
  let valoricos = 0;

  asignaturasAprobadas.forEach(div => {
    const nombre = div.dataset.nombre;
    const tipo = [...div.classList].find(c => ["especialidad", "complementaria", "valorica", "empleabilidad"].includes(c));
    const asignatura = asignaturas.find(a => a.nombre === nombre);
    if (!asignatura) return;

    if (asignatura.nombre.trim().toLowerCase() === "doctrina social de la iglesia") {
      valoricos += asignatura.creditos || 0;
    } else if (tipo === "complementaria") {
      complementarios += asignatura.creditos || 0;
    } else {
      regulares += asignatura.creditos || 0;
    }
  });

const r = document.getElementById("creditosRegulares");
const c = document.getElementById("creditosComplementarios");
const v = document.getElementById("creditosValoricos");

r.textContent = regulares + (regulares >= 408 ? " ✅" : "");
c.textContent = complementarios + (complementarios >= 18 ? " ✅" : "");
v.textContent = valoricos + (valoricos >= 4 ? " ✅" : "");

r.style.color = regulares >= 408 ? "green" : "#222";
c.style.color = complementarios >= 18 ? "green" : "#222";
v.style.color = valoricos >= 4 ? "green" : "#222";
} 
