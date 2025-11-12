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

	// Base de datos de trivias con opciones múltiples
	// --- TRIVIAS ---
	const trivias = {
		mexico: [
			{ pregunta: "¿Qué significa el color verde de la bandera mexicana?", opciones: ["Esperanza", "Independencia", "Naturaleza"], correcta: 1 },
			{ pregunta: "¿Qué animal aparece en el escudo?", opciones: ["Águila", "Jaguar", "Serpiente"], correcta: 1 },
			{ pregunta: "¿En qué año se adoptó la bandera actual?", opciones: ["1821", "1917", "1968"], correcta: 3 },
			{ pregunta: "¿Qué sostiene el águila?", opciones: ["Una serpiente", "Una rama", "Un cactus"], correcta: 1 },
			{ pregunta: "¿Cuántos colores tiene la bandera?", opciones: ["3", "4", "5"], correcta: 1 }
		],
		usa: [
			{ pregunta: "¿Cuántas estrellas tiene la bandera de EE.UU.?", opciones: ["50", "51", "52"], correcta: 1 },
			{ pregunta: "¿Qué representan las franjas rojas y blancas?", opciones: ["Los estados", "Las colonias originales", "Las guerras"], correcta: 2 },
			{ pregunta: "¿Cuál es el apodo de la bandera?", opciones: ["Old Glory", "Star Power", "Freedom Flag"], correcta: 1 },
			{ pregunta: "¿De qué color es la franja superior?", opciones: ["Blanca", "Roja", "Azul"], correcta: 2 },
			{ pregunta: "¿Cuándo se adoptó la bandera actual?", opciones: ["1777", "1812", "1960"], correcta: 3 }
		]
	};

	let currentCountry = null;

	// --- ELEMENTOS UI ---
	const triviaBtn = document.getElementById("triviaButton");
	const modal = document.getElementById("triviaModal");
	const closeModal = document.getElementById("closeModal");
	const resultadoDiv = document.getElementById("resultado");
	const videoElement = document.getElementById("countryVideo");
	const filterButton = document.getElementById("filterButton");
	const animButton = document.getElementById("animButton");
	const videoButton = document.getElementById("videoButton");

	// --- ESCUCHAR TARGETS ---
	document.querySelector("#mexicoTarget").addEventListener("targetFound", () => {
		currentCountry = "mexico";
		triviaBtn.style.display = "block";
	});
	document.querySelector("#usaTarget").addEventListener("targetFound", () => {
		currentCountry = "usa";
		triviaBtn.style.display = "block";
	});
	document.querySelector("#mexicoTarget").addEventListener("targetLost", () => triviaBtn.style.display = "none");
	document.querySelector("#usaTarget").addEventListener("targetLost", () => triviaBtn.style.display = "none");

	// --- MOSTRAR TRIVIA ---
	triviaBtn.addEventListener("click", () => {
		if (!currentCountry) return;
		const paisTrivias = trivias[currentCountry];
		const trivia = paisTrivias[Math.floor(Math.random() * paisTrivias.length)];
		mostrarTrivia(trivia);
	});

	function mostrarTrivia(t) {
		modal.style.display = "block";
		document.getElementById("preguntaText").innerText = t.pregunta;
		document.getElementById("opcion1").innerText = t.opciones[0];
		document.getElementById("opcion2").innerText = t.opciones[1];
		document.getElementById("opcion3").innerText = t.opciones[2];
		resultadoDiv.innerText = "";

		document.querySelectorAll(".opcion-btn").forEach(btn => {
			btn.classList.remove("correcta", "incorrecta");
			btn.onclick = () => {
				const seleccion = parseInt(btn.dataset.opcion);
				if (seleccion === t.correcta) {
					btn.classList.add("correcta");
					resultadoDiv.textContent = "✅ ¡Correcto!";
					resultadoDiv.className = "resultado correcto";
				} else {
					btn.classList.add("incorrecta");
					resultadoDiv.textContent = "❌ Incorrecto";
					resultadoDiv.className = "resultado incorrecto";
				}
			};
		});
	}
	closeModal.onclick = () => (modal.style.display = "none");

	// --- FILTROS DE CÁMARA ---
	const filters = ["none", "grayscale(100%)", "sepia(80%)", "invert(100%)"];
	let currentFilter = 0;
	filterButton.addEventListener("click", () => {
		currentFilter = (currentFilter + 1) % filters.length;
		document.querySelector("a-scene").style.filter = filters[currentFilter];
	});

	// --- VIDEO NORMAL ---
	videoButton.addEventListener("click", () => {
		videoElement.src = currentCountry === "mexico" ? "mexico.mp4" : "usa.mp4";
		videoElement.style.display = "block";
		videoElement.play();
	});
	videoElement.addEventListener("ended", () => (videoElement.style.display = "none"));

	// --- ANIMAR MODELO 3D ---
	animButton.addEventListener("click", () => {
		const modelId = currentCountry === "mexico" ? "#modeloMexico" : "#modeloUSA";
		const model = document.querySelector(modelId);
		model.setAttribute("animation", {
			property: "rotation",
			to: "0 360 0",
			loop: false,
			dur: 2000,
			easing: "easeInOutQuad"
		});
	});

});
