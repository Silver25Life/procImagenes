document.addEventListener("DOMContentLoaded", function() {
	console.log("✅ DOM Cargado - Iniciando aplicación AR Trivia");

	// Variables globales
	let activeTarget = null;
	const triviaButton = document.getElementById("triviaButton");
	const triviaModal = document.getElementById("triviaModal");
	const triviaText = document.getElementById("triviaText");
	const closeModal = document.getElementById("closeModal");

	// Verificar que todos los elementos existan
	console.log("🔍 Verificando elementos del DOM:");
	console.log("- triviaButton:", triviaButton);
	console.log("- triviaModal:", triviaModal);
	console.log("- triviaText:", triviaText);
	console.log("- closeModal:", closeModal);

	if (!triviaButton || !triviaModal || !triviaText || !closeModal) {
		console.error("❌ Error: No se encontraron todos los elementos del DOM");
		return;
	}

	console.log("✅ Todos los elementos del DOM encontrados");

	// Base de datos de trivias
	const trivias = {
		0: [
			"¿Cuál es la capital de México? 🇲🇽\n\nRespuesta: Ciudad de México",
			"¿Cuál es el platillo típico de México? 🌮\n\nRespuesta: Tacos",
			"¿Cuál es el himno nacional de México? 🎵\n\nRespuesta: Himno Nacional Mexicano",
			"¿En qué año México ganó su independencia? 📅\n\nRespuesta: 1810",
			"¿Cuál es la moneda de México? 💰\n\nRespuesta: Peso Mexicano"
		],
		1: [
			"¿Cuál es la capital de Estados Unidos? 🇺🇸\n\nRespuesta: Washington D.C.",
			"¿Cuál es el símbolo nacional? 🦅\n\nRespuesta: Águila calva",
			"¿Cuál es el plato típico? 🍔\n\nRespuesta: Hamburguesa",
			"¿Cuántas estrellas tiene la bandera? ⭐\n\nRespuesta: 50 estrellas",
			"¿Quién fue el primer presidente? 👨‍💼\n\nRespuesta: George Washington"
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

	// ===== BOTÓN DE TRIVIA =====
	triviaButton.addEventListener("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		console.log("🔄 Botón de trivia clickeado");
		console.log("🎯 Target activo actual:", activeTarget);

		if (activeTarget !== null && activeTarget !== undefined) {
			const preguntas = trivias[activeTarget];
			if (preguntas && preguntas.length > 0) {
				const randomIndex = Math.floor(Math.random() * preguntas.length);
				const triviaSeleccionada = preguntas[randomIndex];
				triviaText.textContent = triviaSeleccionada;
				triviaModal.style.display = "block";
				console.log("✅ Modal de trivia mostrado");
				console.log("📝 Trivia:", triviaSeleccionada);
			} else {
				console.error("❌ No hay preguntas para el target:", activeTarget);
				triviaText.textContent = "Error: No hay preguntas disponibles para este país.";
				triviaModal.style.display = "block";
			}
		} else {
			console.log("❌ No hay target activo para mostrar trivia");
			triviaText.textContent = "Por favor, detecta un país primero antes de mostrar trivia.";
			triviaModal.style.display = "block";
		}
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
	console.log("✅ Aplicación AR Trivia inicializada correctamente");
	console.log("💡 Usa los botones de simulación para probar sin cámara");
	console.log("📱 O apunta la cámara a las imágenes target para AR real");
});
