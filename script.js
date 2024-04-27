async function main() {
    // Llamada a la función para cargar el modelo
    const model = await tf.loadLayersModel('../modelo/model.json');
    console.log("Modelo cargado");

    document.getElementById('upload-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        var fileInput = document.getElementById('image-upload');
        var file = fileInput.files[0];

        // Comprobar si el usuario ha seleccionado un archivo
        if (file) {
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
                    await tf.browser.toPixels(output.squeeze(), outputCanvas);
                };
            };
            reader.readAsDataURL(file);
        } else {
            console.log('No se ha seleccionado ningún archivo');
        }
    });
}
main();