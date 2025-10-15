document.addEventListener("DOMContentLoaded", function() {
	console.log("✅ DOM Cargado - Iniciando aplicación AR Trivia");

	// Variables globales
	let activeTarget = null;
	let preguntaActual = null;
	const triviaButton = document.getElementById("triviaButton");
	const triviaModal = document.getElementById("triviaModal");
	const preguntaText = document.getElementById("preguntaText");
	const opcion1 = document.getElementById("opcion1");
	const opcion2 = document.getElementById("opcion2");
	const opcion3 = document.getElementById("opcion3");
	const closeModal = document.getElementById("closeModal");
	const resultadoDiv = document.getElementById("resultado");

	// Base de datos de trivias con opciones múltiples
	const trivias = {
		0: [ // México
			{
				pregunta: "¿Cuál es la capital de México?",
				opciones: [
					"Guadalajara",
					"Ciudad de México",
					"Monterrey"
				],
				correcta: 1
			},
			{
				pregunta: "¿Cuál es el platillo típico de México?",
				opciones: [
					"Pizza",
					"Sushi",
					"Tacos"
				],
				correcta: 2
			},
			{
				pregunta: "¿En qué año México ganó su independencia?",
				opciones: [
					"1776",
					"1810",
					"1848"
				],
				correcta: 1
			},
			{
				pregunta: "¿Cuál es la moneda de México?",
				opciones: [
					"Dólar",
					"Euro",
					"Peso Mexicano"
				],
				correcta: 2
			},
			{
				pregunta: "¿Qué celebra México el 16 de septiembre?",
				opciones: [
					"Día de la Revolución",
					"Día de la Independencia",
					"Día de la Bandera"
				],
				correcta: 1
			}
		],
		1: [ // USA
			{
				pregunta: "¿Cuál es la capital de Estados Unidos?",
				opciones: [
					"Nueva York",
					"Washington D.C.",
					"Los Ángeles"
				],
				correcta: 1
			},
			{
				pregunta: "¿Cuál es el símbolo nacional de USA?",
				opciones: [
					"El oso pardo",
					"El águila calva",
					"El búho"
				],
				correcta: 1
			},
			{
				pregunta: "¿Cuántas estrellas tiene la bandera de USA?",
				opciones: [
					"48",
					"50",
					"52"
				],
				correcta: 1
			},
			{
				pregunta: "¿Quién fue el primer presidente de USA?",
				opciones: [
					"Thomas Jefferson",
					"Abraham Lincoln",
					"George Washington"
				],
				correcta: 2
			},
			{
				pregunta: "¿En qué continente se encuentra USA?",
				opciones: [
					"Europa",
					"América del Norte",
					"Asia"
				],
				correcta: 1
			}
		]
	};

	// ===== CONFIGURACIÓN DE BOTONES DE SIMULACIÓN =====
	const simularMexico = document.getElementById("simularMexico");
	const simularUSA = document.getElementById("simularUSA");
	const ocultarTarget = document.getElementById("ocultarTarget");

	function mostrarBotonTrivia() {
		triviaButton.style.display = "block";
		console.log("🟢 Botón de trivia mostrado");
	}

	function ocultarBotonTrivia() {
		triviaButton.style.display = "none";
		console.log("🔴 Botón de trivia ocultado");
	}

	// Event listeners para botones de simulación
	simularMexico.addEventListener("click", function() {
		console.log("🇲🇽 Simulando detección de México");
		activeTarget = 0;
		mostrarBotonTrivia();
	});

	simularUSA.addEventListener("click", function() {
		console.log("🇺🇸 Simulando detección de USA");
		activeTarget = 1;
		mostrarBotonTrivia();
	});

	ocultarTarget.addEventListener("click", function() {
		console.log("👻 Ocultando target simulado");
		activeTarget = null;
		ocultarBotonTrivia();
	});

	// ===== FUNCIONES DE TRIVIA CON OPCIONES =====
	function mostrarTrivia() {
		if (activeTarget === null || activeTarget === undefined) {
			console.log("❌ No hay target activo");
			return;
		}

		const preguntas = trivias[activeTarget];
		if (!preguntas || preguntas.length === 0) {
			console.error("❌ No hay preguntas para este target");
			return;
		}

		// Seleccionar pregunta aleatoria
		const randomIndex = Math.floor(Math.random() * preguntas.length);
		preguntaActual = preguntas[randomIndex];

		// Mostrar pregunta y opciones
		preguntaText.textContent = preguntaActual.pregunta;
		opcion1.textContent = preguntaActual.opciones[0];
		opcion2.textContent = preguntaActual.opciones[1];
		opcion3.textContent = preguntaActual.opciones[2];

		// Resetear estilos
		resultadoDiv.textContent = "";
		resultadoDiv.className = "resultado";

		const botonesOpcion = document.querySelectorAll('.opcion-btn');
		botonesOpcion.forEach(btn => {
			btn.className = 'opcion-btn';
			btn.disabled = false;
		});

		// Mostrar modal
		triviaModal.style.display = "block";
		console.log("✅ Trivia mostrada:", preguntaActual.pregunta);
	}

	function verificarRespuesta(opcionSeleccionada) {
		if (!preguntaActual) return;

		const botonesOpcion = document.querySelectorAll('.opcion-btn');
		const opcionCorrecta = preguntaActual.correcta;

		// Deshabilitar todos los botones
		botonesOpcion.forEach(btn => {
			btn.disabled = true;
		});

		// Mostrar resultado
		if (opcionSeleccionada === opcionCorrecta) {
			resultadoDiv.textContent = "✅ ¡Correcto!";
			resultadoDiv.className = "resultado correcto";
			botonesOpcion[opcionSeleccionada].classList.add('correcta');
			console.log("🎉 Respuesta correcta");
		} else {
			resultadoDiv.textContent = "❌ Incorrecto";
			resultadoDiv.className = "resultado incorrecto";
			botonesOpcion[opcionSeleccionada].classList.add('incorrecta');
			botonesOpcion[opcionCorrecta].classList.add('correcta');
			console.log("💀 Respuesta incorrecta");
		}
	}

	// ===== EVENT LISTENERS PARA OPCIONES =====
	document.querySelectorAll('.opcion-btn').forEach(btn => {
		btn.addEventListener('click', function() {
			const opcion = parseInt(this.getAttribute('data-opcion')) - 1;
			console.log(`📝 Opción seleccionada: ${opcion + 1}`);
			verificarRespuesta(opcion);
		});
	});

	// ===== BOTÓN DE TRIVIA =====
	triviaButton.addEventListener("click", function(e) {
		e.preventDefault();
		e.stopPropagation();
		console.log("🔄 Botón de trivia clickeado");
		console.log("🎯 Target activo:", activeTarget);
		mostrarTrivia();
	});

	// ===== CERRAR MODAL =====
	closeModal.addEventListener("click", function() {
		triviaModal.style.display = "none";
		console.log("🔒 Modal cerrado");
	});

	// Cerrar modal al hacer clic fuera del contenido
	window.addEventListener("click", function(e) {
		if (e.target === triviaModal) {
			triviaModal.style.display = "none";
			console.log("🔒 Modal cerrado (clic fuera)");
		}
	});

	// ===== MINDAR EVENTS =====
	const scene = document.querySelector("a-scene");

	if (scene) {
		scene.addEventListener("loaded", function() {
			console.log("🚀 Escena A-Frame cargada correctamente");

			// Evento cuando se encuentra un target
			scene.addEventListener("mindar-target-found", function(event) {
				const targetIndex = event.detail.targetIndex;
				activeTarget = targetIndex;
				mostrarBotonTrivia();
				console.log("🎯 Target REAL encontrado:", targetIndex);
			});

			// Evento cuando se pierde un target
			scene.addEventListener("mindar-target-lost", function(event) {
				const targetIndex = event.detail.targetIndex;
				if (activeTarget === targetIndex) {
					activeTarget = null;
					ocultarBotonTrivia();
					console.log("🎯 Target REAL perdido:", targetIndex);
				}
			});
		});

		scene.addEventListener("error", function(event) {
			console.error("❌ Error en la escena A-Frame:", event.detail);
		});
	} else {
		console.error("❌ No se encontró la escena A-Frame");
	}

	// ===== INICIALIZACIÓN COMPLETADA =====
	console.log("✅ Aplicación AR Trivia con opciones múltiples inicializada");
	console.log("💡 Usa los botones de simulación para probar sin cámara");
});
