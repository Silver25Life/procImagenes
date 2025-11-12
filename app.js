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
		if (!currentCountry) {
			alert("Escanea una bandera primero 🇲🇽🇺🇸");
			return;
		}

		// Selecciona el video según el país detectado
		if (currentCountry === "mexico") {
			videoElement.src = "mexico.mp4";
		} else if (currentCountry === "usa") {
			videoElement.src = "usa.mp4";
		} else {
			alert("No hay video disponible para este país.");
			return;
		}

		videoElement.style.display = "block";
		videoElement.play();
	});

	// Oculta el video cuando termine
	videoElement.addEventListener("ended", () => {
		videoElement.style.display = "none";
	});
	// cerrar video manualmente
	videoElement.addEventListener("click", () => {
		videoElement.pause();
		videoElement.style.display = "none";
	});


	// --- ANIMACIONES ---
	let modeloGirando = false;
	let banderaOndeando = false;

	animButton.addEventListener("click", () => {
		if (!currentCountry) {
			alert("Escanea una bandera primero 🇲🇽🇺🇸");
			return;
		}

		const banderaId = currentCountry === "mexico" ? "#banderaMexico" : "#banderaUSA";
		const modeloId = currentCountry === "mexico" ? "#modeloMexico" : "#modeloUSA";
		const bandera = document.querySelector(banderaId);
		const modelo = document.querySelector(modeloId);

		if (!bandera || !modelo) {
			console.warn("⚠️ No se encontraron los elementos para animar");
			return;
		}

		// Alternar entre animaciones
		if (!banderaOndeando && !modeloGirando) {
			// Activar ondeo de bandera
			bandera.setAttribute("flag-wave", {
				amplitude: 0.03,
				speed: 3,
				frequency: 8
			});

			// Activar rotación del modelo
			modelo.setAttribute("animation", {
				property: "rotation",
				to: "0 360 0",
				loop: true,
				dur: 4000,
				easing: "linear"
			});

			console.log("🎌 Bandera ondeando y modelo girando");
			banderaOndeando = true;
			modeloGirando = true;
			animButton.textContent = "Detener Animaciones";

		} else {
			// Detener todas las animaciones
			bandera.removeAttribute("flag-wave");
			modelo.removeAttribute("animation");

			console.log("🛑 Animaciones detenidas");
			banderaOndeando = false;
			modeloGirando = false;
			animButton.textContent = "Animar Modelo";
		}
	});

	// Activar ondeo automáticamente cuando se detecta el marcador
	["mexicoTarget", "usaTarget"].forEach(id => {
		const target = document.getElementById(id);
		const bandera = target.querySelector("a-plane");

		target.addEventListener("targetFound", () => {
			console.log(`🎌 ${id} detectado — activando ondeo automático`);
			bandera.setAttribute("flag-wave", {
				amplitude: 0.02,
				speed: 2,
				frequency: 6
			});
		});

		target.addEventListener("targetLost", () => {
			console.log(`🏁 ${id} perdido — deteniendo ondeo`);
			bandera.removeAttribute("flag-wave");
			// También detener rotación del modelo si estaba activa
			const modelo = target.querySelector("[gltf-model]");
			if (modelo) {
				modelo.removeAttribute("animation");
			}
			// Resetear estados
			banderaOndeando = false;
			modeloGirando = false;
			animButton.textContent = "Animar Modelo";
		});
	});
});
