async function main() {
    const model = await tf.loadLayersModel('../model/model.json');
    console.log("Model Loaded");
    document.getElementById('model-loading-message').style.display = 'none';
    document.getElementById('file-label').style.display = 'block';
    document.getElementById('drop-text').style.display = 'block';

    const urlParams = new URLSearchParams(window.location.search);
    const selectedClass = urlParams.get('class');

    // Drop area event listeners
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

                // Create a canvas for the output image
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                canvas.width = 64;
                canvas.height = 128;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // Transform the image into a tensor and normalize it
                let imgTensor = tf.browser.fromPixels(canvas).div(255);
                console.log('Image obtained');

                imgTensor = imgTensor.expandDims(0);
                document.getElementById('output-text').style.display = 'block';
                let classes = ['Anakin Skywalker', 'Calamari', 'Darth Vader', 'Ewok', 'Han Solo', 'Human', 'Jawa', 'Luke Skywalker', 'Mace Windu', 'Mandalorian', 'Obi Wan Kenobi', 'Imperial Officer', 'Resistance Pilot', 'SnowTrooper', 'Imperial Soldier', 'Resistance Soldier', 'StormTrooper', 'Togruta', 'Twilek', 'Wookiee', 'Yoda', 'Zabrak'];
                let labelIndex = classes.indexOf(selectedClass);
                let labelTensor = tf.oneHot(labelIndex, classes.length).reshape([1, classes.length]);
                console.log('Label obtained');

                let outputs = await model.predict([imgTensor, labelTensor]);
                console.log('Predict obtained');

                // Select the exact output to show
                let output = outputs[2];
    
                // Adjust the image values between [0, 1]
                output = output.clipByValue(0, 1);
    
                // Show the image in the output canvas
                let outputCanvas = document.getElementById('output-canvas');
                outputCanvas.style.display = 'block';
                document.getElementById('output-canvas-container').style.display = 'block';
                await tf.browser.toPixels(output.squeeze(), outputCanvas);
            };
        };
        reader.readAsDataURL(file);
    }

    const downloadButton = document.getElementById('download-button');
    downloadButton.addEventListener('click', function() {
        const canvas = document.getElementById('output-canvas');
        const link = document.createElement('a');
        link.download = selectedClass+' AI Image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
main();