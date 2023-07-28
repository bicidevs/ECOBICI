// Datos de ejemplo para las estaciones
const estaciones = [
  'Seleccionar',
  'Parque del bajo',
  'Pacifico',
  'Constitucion',
  'Congreso',
  'Barrancas de Belgrano'
];

// Referencias a los elementos del DOM
const selectEstaciones = document.getElementById('estaciones');
const btnAceptar = document.getElementById('btnAceptar');
const btnConvertirPDF = document.getElementById('btnConvertirPDF');
const btnConvertirJPG = document.getElementById('btnConvertirJPG');
const powerBIChart = document.getElementById('powerBIChart');

// Llenar la lista desplegable con las estaciones
estaciones.forEach(estacion => {
  const option = document.createElement('option');
  option.value = estacion;
  option.textContent = estacion;
  selectEstaciones.appendChild(option);
});

// Evento click del botón Aceptar
btnAceptar.addEventListener('click', () => {
  const powerBiImageUrl = imagenesEstaciones[estacionSeleccionada] || 'img/Power bi - Datos en general.png'; // URL de la imagen predeterminada si no hay una imagen definida

  // Muestra la imagen del gráfico de Power BI en el contenedor
  const img = document.createElement('img');
  img.src = powerBiImageUrl;
  img.alt = 'Gráfico de Power BI';
  img.style.maxWidth = '100%'; // Ajusta la imagen al ancho máximo del contenedor
  powerBIChart.innerHTML = ''; // Limpia el contenedor antes de agregar la imagen
  powerBIChart.appendChild(img);

  // Actualiza la opción seleccionada
  actualizarOpcionSeleccionada(estacionSeleccionada);
});

selectEstaciones.addEventListener('change', () => {
  // Almacena la estación seleccionada en la variable
  estacionSeleccionada = selectEstaciones.value;
  // Muestra el botón "Aceptar" cuando se selecciona cualquier opción que no sea "Seleccionar"
  btnAceptar.style.display = estacionSeleccionada !== 'Seleccionar' ? 'block' : 'none';

  // Si la opción seleccionada es "Seleccionar", muestra la imagen predeterminada
  if (estacionSeleccionada === 'Seleccionar') {
    mostrarImagen('IMG/Imagen - power bi/Power bi - Datos en general.png'); // URL de la imagen predeterminada
  }
});

function actualizarOpcionSeleccionada(estacionSeleccionada) {
  const opcionSeleccionada = document.getElementById('opcionSeleccionada');
  if (estacionSeleccionada === 'Seleccionar') {
    opcionSeleccionada.textContent = '';
  } else {
    opcionSeleccionada.textContent = `Estación seleccionada: ${estacionSeleccionada}`;
  }
}

// Oculta el botón "Aceptar" inicialmente
btnAceptar.style.display = 'none';



function mostrarImagen(base64Image) {
  // Muestra la imagen del gráfico de Power BI en el contenedor
  const img = new Image();
  img.src = base64Image;
  img.alt = 'Gráfico de Power BI';
  img.style.maxWidth = '100%'; // Ajusta la imagen al ancho máximo del contenedor
  powerBIChart.innerHTML = ''; // Limpia el contenedor antes de agregar la imagen
  powerBIChart.appendChild(img);
}


function actualizarOpcionSeleccionada(estacionSeleccionada) {
  const opcionSeleccionada = document.getElementById('opcionSeleccionada');
  if (estacionSeleccionada === 'Seleccionar') {
    opcionSeleccionada.textContent = '';
    btnAceptar.style.display = 'none'; // Oculta el botón "Aceptar"
  } else {
    opcionSeleccionada.textContent = `Estación seleccionada: ${estacionSeleccionada}`;
    btnAceptar.style.display = 'block'; // Muestra el botón "Aceptar"
  }
}


// Diccionario con las URL de las imágenes de Power BI para cada estación
const imagenesEstaciones = {
  'Parque del bajo': '/IMG/Imagen - power bi/Parque del bajo.png',
  'Pacifico': '/IMG/imagen - power bi/Estacion Pacifico.png',
  'Constitucion': '/IMG/imagen - power bi/Estacion Constitucion.png',
  'Congreso': '/IMG/imagen - power bi/Estacion Congreso.png',
  'Barrancas de Belgrano': '/IMG/imagen - power bi/Estacion Barrancas de Belgrano.png'
};

function getBase64Image(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };

    img.onerror = () => {
      reject(new Error('Error al cargar la imagen.'));
    };
  });
}

btnConvertirJPG.addEventListener('click', function () {
  const estacionSeleccionada = selectEstaciones.value;

  // Obtiene la URL de la imagen del gráfico de Power BI para la estación seleccionada
  const powerBiImageUrl = imagenesEstaciones[estacionSeleccionada] || '';

  // Crea un elemento de imagen y establece el contenido base64
  const img = new Image();
  img.src = powerBiImageUrl;

  // Crea un elemento "a" para el enlace de descarga del JPG
  const link = document.createElement('a');
  link.download = `${estacionSeleccionada}_reporte.jpg`;

  img.onload = function () {
    // Crea un canvas para dibujar la imagen centrada
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    
    // Calcula las coordenadas para centrar la imagen
    const x = (canvas.width - img.width) / 2;
    const y = (canvas.height - img.height) / 2;

    // Dibuja la imagen centrada en el canvas
    ctx.drawImage(img, x, y);

    // Convierte el canvas a una URL de datos (data URL) para el JPG
    const jpgUrl = canvas.toDataURL('image/jpeg');

    // Asigna la URL de datos al enlace de descarga
    link.href = jpgUrl;

    // Simula un clic en el enlace de descarga para iniciar la descarga del JPG
    link.click();
  };
});


btnConvertirPDF.addEventListener('click', async () => {
  const estacionSeleccionada = selectEstaciones.value;

  // Obtiene la URL de la imagen del gráfico de Power BI para la estación seleccionada
  const powerBiImageUrl = imagenesEstaciones[estacionSeleccionada] || '';

  try {
    // Convierte la imagen a formato base64
    const base64Image = await getBase64Image(powerBiImageUrl);

    // Define el contenido del PDF utilizando pdfmake con la imagen en formato base64
    const docDefinition = {
        
      content: [
        { text: 'Eligió la estación:', style: 'header' },
        { text: estacionSeleccionada, style: 'estacion' },
        { image: base64Image,  width: 500, height: 300, alignment: 'center' },
        

      ],
      
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center', // Centra el texto

        },
        estacion: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 5],
          alignment: 'center', // Centra el texto

        }
      }
    };

    // Genera el PDF utilizando pdfmake
    pdfMake.createPdf(docDefinition).download(`${estacionSeleccionada}_reporte.pdf`);
  } catch (error) {
    console.error(error);
  }
});


const botonDobleEnlace = document.getElementById("dobleEnlace");

botonDobleEnlace.addEventListener("click", function() {
    // Abrir enlaces en nuevas pestañas cuando el botón es clickeado
    window.open("https://play.google.com/store/apps/details?id=com.tembici.ecobici");
    window.open("https://apps.apple.com/us/app/ba-ecobici-por-tembici/id1452339584");
});

