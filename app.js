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

	// Obtener la escena de A-Frame
	const scene = document.querySelector("a-scene");

	// Esperar a que la escena esté cargada
	scene.addEventListener("loaded", () => {
		// Obtener el sistema MindAR
		const mindarSystem = scene.systems["mindar-image-system"];

		// Esperar a que MindAR esté listo
		scene.addEventListener("mindar-target-found", (event) => {
			const targetIndex = event.detail.targetIndex;
			activeTarget = targetIndex;
			triviaButton.style.display = "block";
			console.log("Target encontrado:", targetIndex);
		});

		scene.addEventListener("mindar-target-lost", (event) => {
			const targetIndex = event.detail.targetIndex;
			if (activeTarget === targetIndex) {
				activeTarget = null;
				triviaButton.style.display = "none";
			}
			console.log("Target perdido:", targetIndex);
		});
	});

	// Mostrar trivia al hacer clic
	triviaButton.addEventListener("click", () => {
		if (activeTarget !== null) {
			const preguntas = trivias[activeTarget];
			const randomIndex = Math.floor(Math.random() * preguntas.length);
			triviaText.textContent = preguntas[randomIndex];
			triviaModal.style.display = "block";
			console.log("Mostrando trivia para target:", activeTarget);
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
