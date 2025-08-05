function crearMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";
const aprobadas = JSON.parse(localStorage.getItem("mallaAprobadas") || "[]");
const optativasGuardadas = JSON.parse(localStorage.getItem("optativasPersonalizadas") || "[]");

optativasGuardadas.forEach(o => {
  // Marcar como aprobada si lo estaba antes
  if (aprobadas.includes(o.nombre)) {
    o._aprobada = true;
  }
  asignaturas.push(o);
});
  
  const maxSemestre = Math.max(...asignaturas.map(a => a.semestre));

  for (let i = 1; i <= maxSemestre; i++) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    columna.innerHTML = `<h3>Semestre ${i}</h3>`;

    const materias = asignaturas.filter(a => a.semestre === i);
    materias.forEach(m => {
      const div = document.createElement("div");
      div.className = `asignatura ${m.tipo}${m.tipo === "complementaria" && m.prerequisitos.length === 0 ? " optativa-personalizada" : ""}`;
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
}

div.addEventListener("mouseleave", () => {
  document.querySelectorAll(".resaltada").forEach(el => el.classList.remove("resaltada"));
});
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
  const aprobadas = [...document.querySelectorAll(".asignatura.aprobada")].map(d => d.dataset.nombre);

  const creditosComplementarios = contarCreditosComplementarios(aprobadas);

  document.querySelectorAll(".asignatura").forEach(div => {
    const nombre = div.dataset.nombre;
    const data = asignaturas.find(a => a.nombre === nombre);

    let bloqueada = false;

    if (data.nombre === "Práctica Laboral") {
      bloqueada = !(estanAprobadosTodosHasta(4, aprobadas) && creditosComplementarios >= 6);
    } else if (
      data.nombre === "Práctica Profesional" ||
      data.nombre === "Portafolio de Título"
    ) {
      bloqueada = !(estanAprobadosTodosHasta(7, aprobadas) && creditosComplementarios >= 18);
    } else if (data.prerequisitos.includes("Todas Las Asignaturas Semestres 1 A 4")) {
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
        // Establecer mensaje explicativo si está bloqueada
    if (bloqueada) {
      if (data.nombre === "Práctica Laboral") {
        div.title = "❌ Requiere aprobar todos los ramos del semestre 1 al 4 y al menos 6 créditos optativos.";
      } else if (data.nombre === "Práctica Profesional" || data.nombre === "Portafolio de Título") {
        div.title = "❌ Requiere aprobar todos los ramos del semestre 1 al 7 y al menos 18 créditos optativos.";
      } else if (data.prerequisitos.includes("Todas Las Asignaturas Semestres 1 A 4")) {
        div.title = "❌ Requiere aprobar todos los ramos del semestre 1 al 4.";
      } else if (data.prerequisitos.includes("Todas Las Asignaturas Semestres 1 A 7")) {
        div.title = "❌ Requiere aprobar todos los ramos del semestre 1 al 7.";
      } else if (data.prerequisitos.length > 0) {
        div.title = "❌ Requiere aprobar: " + data.prerequisitos.join(", ");
      } else {
        div.title = "";
      }
    } else {
      div.removeAttribute("title");
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
  // Contar créditos complementarios aprobados
function contarCreditosComplementarios(aprobadas) {
  return asignaturas
    .filter(a => a.tipo === "complementaria" && aprobadas.includes(a.nombre))
    .reduce((sum, a) => sum + (a.creditos || 0), 0);
}

function estanAprobadosTodosHasta(semestreLimite, aprobadas) {
  // 1. Asignaturas obligatorias (excluye las optativas personalizadas)
  const obligatorias = asignaturas
    .filter(a => a.semestre <= semestreLimite && !a.personalizada)
    .map(a => a.nombre);

  const obligatoriasCompletas = obligatorias.every(n => aprobadas.includes(n));

  // 2. Al menos una optativa (complementaria) aprobada hasta ese semestre
  const optativaAprobada = asignaturas.some(a =>
    a.semestre <= semestreLimite &&
    a.tipo === "complementaria" &&
    aprobadas.includes(a.nombre)
  );

  return obligatoriasCompletas && optativaAprobada;
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

// Mostrar/ocultar formulario
const btnAbrir = document.getElementById("agregarOptativaBtn");
const formulario = document.getElementById("formularioOptativa");
const btnGuardar = document.getElementById("guardarOptativaBtn");
const btnCancelar = document.getElementById("cancelarOptativaBtn");

btnAbrir.addEventListener("click", () => {
  formulario.classList.remove("oculto");
});

btnCancelar.addEventListener("click", () => {
  formulario.classList.add("oculto");
  formulario.reset?.(); // por si quieres limpiar
});

// Guardar asignatura optativa personalizada
btnGuardar.addEventListener("click", () => {
  const nombre = document.getElementById("nombreOptativa").value.trim();
  const sigla = document.getElementById("siglaOptativa").value.trim();
  const creditos = parseInt(document.getElementById("creditosOptativa").value);
  const semestre = parseInt(document.getElementById("semestreOptativa").value);

if (!nombre || !sigla || isNaN(creditos) || isNaN(semestre) || semestre < 1 || semestre > 8) {
  alert("Por favor completa todos los campos correctamente (semestre entre 1 y 8).");
  return;
}
  
const nueva = {
  nombre,
  sigla,
  creditos,
  semestre,
  tipo: "complementaria",
  prerequisitos: [],
  personalizada: true // ← esto es importante
};
  
  // Agregar a lista principal
  asignaturas.push(nueva);
  guardarEstado(); // por si quieres forzar guardar

  // Crear visualmente
  const div = document.createElement("div");
  div.className = "asignatura complementaria optativa-personalizada";
  div.innerHTML = `
    <div class="nombre-asignatura">${nueva.nombre}</div>
    <div class="sigla-asignatura">${nueva.sigla}</div>
    <span class="creditos">${nueva.creditos} cr</span>
  `;
  div.dataset.nombre = nueva.nombre;
  div.dataset.semestre = nueva.semestre;

div.addEventListener("click", () => {
  if (div.classList.contains("bloqueada")) return;
  div.classList.toggle("aprobada");
  guardarEstado();
  actualizarCreditos();
  actualizarBloqueos();
});

  let contenedor = document.querySelector(`#semestre-${nueva.semestre}`);
if (!contenedor) {
  contenedor = document.createElement("div");
  contenedor.className = "semestre";
  contenedor.id = `semestre-${nueva.semestre}`;
  contenedor.innerHTML = `<h3>Semestre ${nueva.semestre}</h3>`;
  document.getElementById("malla").appendChild(contenedor);
}
contenedor.appendChild(div);

  // Guardar en localStorage lista personalizada
  const guardadas = JSON.parse(localStorage.getItem("optativasPersonalizadas") || "[]");
  guardadas.push(nueva);
  localStorage.setItem("optativasPersonalizadas", JSON.stringify(guardadas));

  formulario.classList.add("oculto");
  formulario.reset?.();
});

const menu = document.getElementById("menuContextual");
let optativaSeleccionada = null;

// Mostrar menú contextual
document.addEventListener("contextmenu", e => {
  if (e.target.closest(".optativa-personalizada")) {
    e.preventDefault();
    optativaSeleccionada = e.target.closest(".optativa-personalizada");
    menu.style.top = `${e.pageY}px`;
    menu.style.left = `${e.pageX}px`;
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});

// Ocultar menú al hacer clic en otro lugar
document.addEventListener("click", () => {
  menu.style.display = "none";
});

// Editar optativa
document.getElementById("editarOpt").addEventListener("click", () => {
  if (!optativaSeleccionada) return;

  const nombre = optativaSeleccionada.dataset.nombre;
  const asignatura = JSON.parse(localStorage.getItem("optativasPersonalizadas") || "[]").find(a => a.nombre === nombre);
  if (!asignatura) return;

  // Rellenar formulario
  document.getElementById("nombreOptativa").value = asignatura.nombre;
  document.getElementById("siglaOptativa").value = asignatura.sigla;
  document.getElementById("creditosOptativa").value = asignatura.creditos;
  document.getElementById("semestreOptativa").value = asignatura.semestre;

  // Eliminar anterior
  optativaSeleccionada.remove();
  let nuevas = JSON.parse(localStorage.getItem("optativasPersonalizadas") || "[]");
  nuevas = nuevas.filter(a => a.nombre !== nombre);
  localStorage.setItem("optativasPersonalizadas", JSON.stringify(nuevas));

  // Mostrar formulario
  document.getElementById("formularioOptativa").classList.remove("oculto");
  menu.style.display = "none";
});

// Eliminar optativa
document.getElementById("eliminarOpt").addEventListener("click", () => {
  if (!optativaSeleccionada) return;

  const nombre = optativaSeleccionada.dataset.nombre;
  optativaSeleccionada.remove();
  let nuevas = JSON.parse(localStorage.getItem("optativasPersonalizadas") || "[]");
  nuevas = nuevas.filter(a => a.nombre !== nombre);
  localStorage.setItem("optativasPersonalizadas", JSON.stringify(nuevas));

  // También eliminar de `asignaturas` principal
  const index = asignaturas.findIndex(a => a.nombre === nombre);
  if (index !== -1) asignaturas.splice(index, 1);

  guardarEstado();
  actualizarCreditos();
  actualizarBloqueos();
  menu.style.display = "none";
});
