const asignaturas = [
  // --- AÑO 1 ---
  {
    semestre: 1,
    nombre: "Estados Financieros E IFRS",
    sigla: "COA1118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 12
  },
  {
    semestre: 1,
    nombre: "Procesos Administrativos De Negocios",
    sigla: "ADA1118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 6
  },
  {
    semestre: 1,
    nombre: "Herramientas Tecnológicas Para La Gestión Contable",
    sigla: "TEA1119",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 1,
    nombre: "Procedimientos Laborales Y Contratación",
    sigla: "RHA1118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 1,
    nombre: "Nivelación Matemática",
    sigla: "MAT1110",
    tipo: "empleabilidad",
    prerequisitos: [],
    creditos: 12
  },
  {
    semestre: 1,
    nombre: "Habilidades Básicas De Comunicación",
    sigla: "PLC1101",
    tipo: "empleabilidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 1,
    nombre: "Proceso De Portafolio I",
    sigla: "APA1238",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 0
  },
  {
    semestre: 2,
    nombre: "Análisis Contable",
    sigla: "COA2118",
    tipo: "especialidad",
    prerequisitos: ["Estados Financieros E IFRS"],
    creditos: 10
  },
  {
    semestre: 2,
    nombre: "Código Tributario",
    sigla: "TRA2118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 2,
    nombre: "Remuneraciones",
    sigla: "RHA2118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 2,
    nombre: "Algebra",
    sigla: "MAT2110",
    tipo: "empleabilidad",
    prerequisitos: ["Nivelación Matemática"],
    creditos: 10
  },
  {
    semestre: 2,
    nombre: "Habilidades De Comunicación Efectiva",
    sigla: "PLC2101",
    tipo: "empleabilidad",
    prerequisitos: ["Habilidades Básicas De Comunicación"],
    creditos: 8
  },
  {
    semestre: 2,
    nombre: "Fundamentos De Antropología",
    sigla: "FCE1100",
    tipo: "valorica",
    prerequisitos: [],
    creditos: 4
  },
  {
    semestre: 2,
    nombre: "Proceso De Portafolio II",
    sigla: "APA2123",
    tipo: "especialidad",
    prerequisitos: ["Proceso De Portafolio I"],
    creditos: 0
  },

  // --- AÑO 2 ---
  {
    semestre: 3,
    nombre: "Contabilidades Especiales",
    sigla: "COA3120",
    tipo: "especialidad",
    prerequisitos: ["Análisis Contable"],
    creditos: 8
  },
  {
    semestre: 3,
    nombre: "Análisis Económico Para La Administración",
    sigla: "ADA3118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 6
  },
  {
    semestre: 3,
    nombre: "Impuesto A La Renta",
    sigla: "TRA3118",
    tipo: "especialidad",
    prerequisitos: ["Código Tributario"],
    creditos: 10
  },
  {
    semestre: 3,
    nombre: "Impuestos A Las Ventas Y Servicios",
    sigla: "TRA3128",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 3,
    nombre: "Herramientas Financieras",
    sigla: "FZA3115",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 6
  },
  {
    semestre: 3,
    nombre: "Mentalidad Emprendedora",
    sigla: "EMP1101",
    tipo: "empleabilidad",
    prerequisitos: [],
    creditos: 6
  },
  {
    semestre: 3,
    nombre: "Ingles Básico I",
    sigla: "INU1101",
    tipo: "empleabilidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 3,
    nombre: "Doctrina Social De La Iglesia",
    sigla: "PFC040",
    tipo: "valorica",
    prerequisitos: [],
    creditos: 4
  },
  {
    semestre: 3,
    nombre: "Proceso De Portafolio III",
    sigla: "APA3123",
    tipo: "especialidad",
    prerequisitos: ["Proceso De Portafolio II"],
    creditos: 0
  },

  {
    semestre: 4,
    nombre: "Contabilidad De Inversiones Y Consolidación",
    sigla: "COA4119",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 4,
    nombre: "Herramientas Tecnológicas ERP",
    sigla: "TEA4118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 4,
    nombre: "Taller De Renta",
    sigla: "TRA4118",
    tipo: "especialidad",
    prerequisitos: ["Impuesto A La Renta"],
    creditos: 10
  },
  {
    semestre: 4,
    nombre: "Costos, Presupuestos Y Control Presupuestario",
    sigla: "FZA4118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 10
  },
  {
    semestre: 4,
    nombre: "Ingles Básico II",
    sigla: "INU2101",
    tipo: "empleabilidad",
    prerequisitos: ["Ingles Básico I"],
    creditos: 8
  },
  {
    semestre: 4,
    nombre: "Ética Para El Trabajo",
    sigla: "EAA1390",
    tipo: "valorica",
    prerequisitos: [],
    creditos: 4
  },
  {
    semestre: 4,
    nombre: "Legislación Previsional Y Seguridad Social",
    sigla: "LPA0201",
    tipo: "complementaria",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 4,
    nombre: "Proceso De Portafolio IV",
    sigla: "APA4123",
    tipo: "especialidad",
    prerequisitos: ["Proceso De Portafolio III"],
    creditos: 0
  },

  // --- AÑO 3 ---
  {
    semestre: 5,
    nombre: "Auditoria Y Control Interno",
    sigla: "AUA5118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 5,
    nombre: "Taller Tributario Contable",
    sigla: "TRA5110",
    tipo: "especialidad",
    prerequisitos: ["Taller De Renta"],
    creditos: 10
  },
  {
    semestre: 5,
    nombre: "Practica Laboral",
    sigla: "PLA1123",
    tipo: "especialidad",
    prerequisitos: ["Todas Las Asignaturas Semestres 1 A 4"],
    creditos: 10
  },
  {
    semestre: 5,
    nombre: "Estadística Descriptiva",
    sigla: "MAT4110",
    tipo: "empleabilidad",
    prerequisitos: ["Algebra"],
    creditos: 8
  },
  {
    semestre: 5,
    nombre: "Innovación En Procesos",
    sigla: "EMP2104",
    tipo: "empleabilidad",
    prerequisitos: ["Mentalidad Emprendedora"],
    creditos: 6
  },
  {
    semestre: 5,
    nombre: "Ingles Elemental",
    sigla: "INI3111",
    tipo: "empleabilidad",
    prerequisitos: ["Ingles Básico II"],
    creditos: 16
  },
  {
    semestre: 5,
    nombre: "Proceso De Portafolio V",
    sigla: "APA5123",
    tipo: "especialidad",
    prerequisitos: ["Proceso De Portafolio IV"],
    creditos: 0
  },

  {
    semestre: 6,
    nombre: "Auditoria De Estados Financieros",
    sigla: "AUA6118",
    tipo: "especialidad",
    prerequisitos: ["Auditoria Y Control Interno"],
    creditos: 8
  },
  {
    semestre: 6,
    nombre: "Auditoria Tributaria",
    sigla: "AUA6128",
    tipo: "especialidad",
    prerequisitos: ["Auditoria Y Control Interno",
      "Taller De Renta",
      "Impuestos A Las Ventas Y Servicios"],
    creditos: 10
  },
  {
    semestre: 6,
    nombre: "Gobierno Corporativo Y Compliance",
    sigla: "AUA6138",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 6
  },
  {
    semestre: 6,
    nombre: "Finanzas Para La Toma De Decisiones",
    sigla: "FZA6118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 10
  },
  {
    semestre: 6,
    nombre: "Ingles Intermedio",
    sigla: "INI5111",
    tipo: "especialidad",
    prerequisitos: ["Ingles Elemental"],
    creditos: 16
  },
  {
    semestre: 6,
    nombre: "Ética Profesional",
    sigla: "EAA1235",
    tipo: "valorica",
    prerequisitos: ["Ética Para El Trabajo"],
    creditos: 4
  },
  {
    semestre: 6,
    nombre: "Taller De Impuesto A La Renta",
    sigla: "TIR0010",
    tipo: "complementaria",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 6,
    nombre: "Proceso De Portafolio VI",
    sigla: "APA6123",
    tipo: "especialidad",
    prerequisitos: ["Proceso De Portafolio V"],
    creditos: 0
  },

  // --- AÑO 4 ---
  {
    semestre: 7,
    nombre: "Gestión De Impuestos",
    sigla: "TRA7118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 7,
    nombre: "Gestión De Riesgos",
    sigla: "AUA7118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 7,
    nombre: "Costos Para La Toma De Decisiones",
    sigla: "COA7118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 7,
    nombre: "Planificación Estratégica Y Control De Gestión",
    sigla: "ADA7118",
    tipo: "especialidad",
    prerequisitos: [],
    creditos: 8
  },
  {
    semestre: 7,
    nombre: "Evaluación De Proyectos",
    sigla: "FZA7118",
    tipo: "especialidad",
    prerequisitos: ["Finanzas Para La Toma De Decisiones"],
    creditos: 8
  },
  {
    semestre: 7,
    nombre: "ESP Contable",
    sigla: "ESP1319",
    tipo: "empleabilidad",
    prerequisitos: ["Ingles Elemental"],
    creditos: 8
  },
  {
    semestre: 7,
    nombre: "OPTATIVO",
    sigla: "XXX0000",
    tipo: "complementaria",
    prerequisitos: [],
    creditos: 2
  },
  {
    semestre: 7,
    nombre: "Proceso De Portafolio Final",
    sigla: "PA71123",
    tipo: "especialidad",
    prerequisitos: ["Proceso De Portafolio VI"],
    creditos: 6
  },

  {
    semestre: 8,
    nombre: "Portafolio De Titulo",
    sigla: "PTA1123",
    tipo: "especialidad",
    prerequisitos: ["Todas Las Asignaturas Semestres 1 A 7"],
    creditos: 20
  },
  {
    semestre: 8,
    nombre: "Practica Profesional",
    sigla: "PPA1123",
    tipo: "especialidad",
    prerequisitos: ["Todas Las Asignaturas Semestres 1 A 7"],
    creditos: 20
  }
];
