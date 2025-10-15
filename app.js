document.addEventListener("DOMContentLoaded", () => {
	const triviaButton = document.getElementById("triviaButton");
	const triviaModal = document.getElementById("triviaModal");
	const triviaText = document.getElementById("triviaText");
	const closeModal = document.getElementById("closeModal");

	let activeTarget = null;

	// Trivias por país
	const trivias = {
		0: [
			"¿Cuál es la capital de México? Respuesta: Ciudad de México",
			"¿Cuál es el platillo típico de México? Respuesta: Tacos",
			"¿Cuál es el himno nacional de México? Respuesta: Himno Nacional Mexicano"
		],
		1: [
			"¿Cuál es la capital de Estados Unidos? Respuesta: Washington D.C.",
			"¿Cuál es el símbolo nacional? Respuesta: Águila calva",
			"¿Cuál es el plato típico? Respuesta: Hamburguesa"
		]
	};

	// Obtener referencias a los targets
	const mexicoTarget = document.querySelector("#mexicoTarget");
	const usaTarget = document.querySelector("#usaTarget");

	// Función para activar botón
	function showButton(index) {
		activeTarget = index;
		triviaButton.style.display = "block";
	}

	// Función para ocultar botón
	function hideButton() {
		activeTarget = null;
		triviaButton.style.display = "none";
	}

	// Eventos MindAR
	mexicoTarget.addEventListener("targetFound", () => showButton(0));
	mexicoTarget.addEventListener("targetLost", hideButton);

	usaTarget.addEventListener("targetFound", () => showButton(1));
	usaTarget.addEventListener("targetLost", hideButton);

	// Mostrar trivia
	triviaButton.addEventListener("click", () => {
		if (activeTarget !== null) {
			const preguntas = trivias[activeTarget];
			const randomIndex = Math.floor(Math.random() * preguntas.length);
			triviaText.textContent = preguntas[randomIndex];
			triviaModal.style.display = "block";
		}
	});

	// Cerrar modal
	closeModal.addEventListener("click", () => {
		triviaModal.style.display = "none";
	});

	// Cerrar modal si se hace clic fuera
	window.addEventListener("click", (e) => {
		if (e.target === triviaModal) {
			triviaModal.style.display = "none";
		}
	});
});

