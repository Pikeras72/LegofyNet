async function main() {
    const model = await tf.loadLayersModel('../modelo/model.json');
    console.log("Modelo cargado");
    document.getElementById('model-loading-message').style.display = 'none';
    document.getElementById('file-label').style.display = 'block';
    document.getElementById('drop-text').style.display = 'block';

    // Drag and Drop event listeners
    let dropArea = document.getElementById('drop-area');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropArea.classList.add('hover');
    }

    function unhighlight() {
        dropArea.classList.remove('hover');
    }

    dropArea.addEventListener('drop', handleDrop, false);

    async function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;
    
        if (files.length > 0) {
            document.getElementById('output-canvas-container').style.display = 'none';
            let file = files[0];
            document.getElementById('generate-button').style.display = 'block';
            document.getElementById('drop-text').style.display = 'none';
            document.getElementById('file-info').style.display = 'block';
            document.getElementById('file-name').textContent = file.name;
    
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('file-preview').src = e.target.result;
            };
            reader.readAsDataURL(file);

            document.getElementById('generate-button').addEventListener('click', async function() {
                await handleFile(file);
            });
        }
    }

    document.getElementById('file-input').addEventListener('change', async function(event) {
        document.getElementById('output-canvas-container').style.display = 'none';
        var file = event.target.files[0];
        document.getElementById('generate-button').style.display = 'block';
        document.getElementById('drop-text').style.display = 'none';
        document.getElementById('file-info').style.display = 'block';
        document.getElementById('file-name').textContent = file.name;

        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('file-preview').src = e.target.result;
        };
        reader.readAsDataURL(file);

        document.getElementById('generate-button').addEventListener('click', async function() {
            await handleFile(file);
        });
    });

    async function handleFile(file) {
        var reader = new FileReader();
        reader.onload = async function(e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = async function() {
                // Crear un canvas para redimensionar la imagen
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = 64;
                canvas.height = 128;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // Convertir la imagen a un tensor y normalizarla
                let imgTensor = tf.browser.fromPixels(canvas).div(255);
                console.log('Imagen conseguida');
                // Agregar una dimensión extra al principio del tensor
                imgTensor = imgTensor.expandDims(0);
                document.getElementById('output-text').style.display = 'block';
                // Obtener la clase seleccionada y convertirla a one-hot encoding
                const urlParams = new URLSearchParams(window.location.search);
                const selectedClass = urlParams.get('class');
                let classes = ['Anakin Skywalker', 'Calamari', 'Darth Vader', 'Ewok', 'Han Solo', 'Humano', 'Jawa', 'Luke Skywalker', 'Mace Windu', 'Mandaloriano', 'Obi Wan Kenobi', 'Oficial Imperial', 'Piloto Resistencia', 'SnowTrooper', 'Soldado Imperial', 'Soldado Resistencia', 'StormTrooper', 'Togruta', 'Twilek', 'Wookiee', 'Yoda', 'Zabrak'];
                let labelIndex = classes.indexOf(selectedClass);
                let labelTensor = tf.oneHot(labelIndex, classes.length).reshape([1, classes.length]);
                console.log('Etiqueta conseguida');
                // Pasar la imagen y la etiqueta al modelo
                let outputs = await model.predict([imgTensor, labelTensor]);
                console.log('Predict conseguido');
                // Seleccionar la salida que quieres mostrar
                let output = outputs[2];
    
                // Ajustar los valores de la imagen al rango [0, 1]
                output = output.clipByValue(0, 1);
    
                // Mostrar la imagen generada en el canvas de salida
                let outputCanvas = document.getElementById('output-canvas');
                outputCanvas.style.display = 'block';
                
                document.getElementById('output-canvas-container').style.display = 'block';
                await tf.browser.toPixels(output.squeeze(), outputCanvas);
            };
        };
        reader.readAsDataURL(file);
    }    
}
main();