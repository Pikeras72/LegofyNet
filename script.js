let model;
async function loadModel() {
    model = await tf.loadLayersModel('modelo/model.json');
}
loadModel();

document.getElementById('upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    var fileInput = document.getElementById('image-upload');
    var file = fileInput.files[0];
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

            // Agregar una dimensión extra al principio del tensor
            imgTensor = imgTensor.expandDims(0);

            // Obtener la clase seleccionada y convertirla a one-hot encoding
            let classSelect = document.getElementById('class-select');
            let selectedClass = classSelect.options[classSelect.selectedIndex].value;
            let classes = ['Anakin Skywalker', 'Calamari', 'Darth Vader', 'Ewok', 'Han Solo', 'Humano', 'Jawa', 'Luke Skywalker', 'Mace Windu', 'Mandaloriano', 'Obi Wan Kenobi', 'Oficial Imperial', 'Piloto Resistencia', 'SnowTrooper', 'Soldado Imperial', 'Soldado Resistencia', 'StormTrooper', 'Togruta', 'Twilek', 'Wookiee', 'Yoda', 'Zabrak'];
            let labelIndex = classes.indexOf(selectedClass);
            let labelTensor = tf.oneHot(labelIndex, classes.length).reshape([1, classes.length]);

            // Pasar la imagen y la etiqueta al modelo
            let outputs = model.predict([imgTensor, labelTensor]);

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
});
