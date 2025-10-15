document.addEventListener("DOMContentLoaded", () => {
	const triviaButton = document.getElementById("triviaButton");
	const triviaModal = document.getElementById("triviaModal");
	const triviaText = document.getElementById("triviaText");
	const closeModal = document.getElementById("closeModal");

	let activeTarget = null;

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

	// Obtener referencias a los targets (A-Frame entities)
	const mexicoTarget = document.querySelector("#mexicoTarget");
	const usaTarget = document.querySelector("#usaTarget");

	// Eventos correctos de MindAR
	mexicoTarget.addEventListener("mindar-image-target-found", () => {
		activeTarget = 0;
		triviaButton.style.display = "block";
	});
	mexicoTarget.addEventListener("mindar-image-target-lost", () => {
		activeTarget = null;
		triviaButton.style.display = "none";
	});

	usaTarget.addEventListener("mindar-image-target-found", () => {
		activeTarget = 1;
		triviaButton.style.display = "block";
	});
	usaTarget.addEventListener("mindar-image-target-lost", () => {
		activeTarget = null;
		triviaButton.style.display = "none";
	});

	// Mostrar trivia al hacer clic
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

