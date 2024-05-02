[![GitHub Pages Status](https://img.shields.io/website?label=Website%20Status&url=https%3A%2F%2Fpikeras72.github.io%2FLegofyNet%2F)](https://pikeras72.github.io/LegofyNet/)
![Static Badge](https://img.shields.io/badge/Version-0.5-blue)
[![License](https://img.shields.io/github/license/Pikeras72/LegofyNet?label=License)](https://github.com/Pikeras72/LegofyNet/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Pikeras72/LegofyNet?label=Issues)](https://github.com/Pikeras72/LegofyNet/issues)
[![GitHub repo size](https://img.shields.io/github/repo-size/Pikeras72/LegofyNet?label=Repo%20Size)](https://github.com/Pikeras72/LegofyNet)



<a name="top"></a>
# LegofyNet - Generate Lego images with AI (Multiclass Pix2Pix)
**Pix2Pix multiclass** structure for generating Lego figures from real images. 

**Access the website here:** https://pikeras72.github.io/LegofyNet/

## Table of contents
* [Description](#description)
* [Visuals](#visuals)
* [Versioning](#versioning)
* [Technologies](#technologies)
* [Bibliography](#bibliography)
 
<a name="description"></a>
### 1. Description
This project stems from inspiration found in the `Generative Methods` subject at the Polytechnic University of Madrid in 2023, where we initially developed the first version using a standard **Pix2Pix implementation**. This repository represents the continuation of the project, implementing a new **`Pix2Pix multiclass structure`** allowing users to select their desired class for generation. I have been experimenting with this new Pix2Pix approach for some time, and it yields **more accuarate and realistic** images compared to a standard Pix2Pix implementation for generating Lego figures from real-world images (focused on the `Star Wars Universe`). This is the first project I have encountered with this type of structure.

The dataset was created through web scraping and subsequently modified and cleaned. All training images were *128x64*px and in `.png` format.

The images were categorized into different classes based on their type. The training set comprised `2328 images`.
 
[Go up⬆️](#top)

---

<a name="visuals"></a>
### 2. Visuals

For example, given this image and selecting the class `Calamari`:

|**Selected Image:**|**Generated Image:**|
|-------------------|--------------------|
|<img src="https://github.com/Pikeras72/LegofyNet/assets/90858639/588ecaea-0792-4393-9413-23804ff5a772" width="300" height="400">| <img src="https://github.com/Pikeras72/LegofyNet/assets/90858639/ff27e42f-2cf3-4ee5-bd56-0daed0188b46" width="200" height="400">|

Another example, given this image and selecting the class `Yoda`:

|**Selected Image:**|**Generated Image:**|
|-------------------|--------------------|
|<img src="https://github.com/Pikeras72/LegofyNet/assets/90858639/aa7c357a-36d7-4609-ab52-e6e8852582c0" width="200" height="425">| <img src="https://github.com/Pikeras72/LegofyNet/assets/90858639/b7a285a1-94da-4125-8d4a-1e931d2e1d67" width="200" height="400">|
 
[Go up⬆️](#top)

---

<a name="versioning"></a>
### 3. Versioning
 #### <Update [25/03/2024]>

**Version 0.1** is out! This version includes the following:

-  Model trained with *`128x64`px* images.
-  Very simple interface just to try the functionality of the model.
-  Deployment of the web page on Netlify.
-  Allows users to upload an image, select a class and generate their image.

Weak points:

- The interface is very poor as it is only a prototype.
- Users should not have to choose the class every time if they want to generate multiple images from the same category.
- The image shown on the web page is very small, making it hard to appreciate.
  
Future Improvements:

-  Improve interface (nav bar, favicon.ico, multiple HTMLs for each class, credits, help section, etc.). ([#11](https://github.com/Pikeras72/LegofyNet/issues/11))
-  Upload a new and better model that generates images with higher quality. ([#9](https://github.com/Pikeras72/LegofyNet/issues/9))
-  Increase the size of the image shown on the web page. ([#4](https://github.com/Pikeras72/LegofyNet/issues/4))

#### <Update [26/03/2024]>

**Version 0.2** now available! New changes added:

-  New HTMLs pages for each class.
-  LegofyNet logo and favicon.ico added to the web page.
-  Nav bar included.
-  If you want to generate an image you just have to click on the corresponding class name and you will be redirected to a page where you can generate images of the selected class.

 Weak points:

-  The nav bar is empty, no options are available.
-  The interface is better but still very poor. Needs more animations and eye-catching elements.
-  There are some js problems in production when trying to generate the first image, related to the model 'predict' method. (Not always occurs).
  
Future Improvements:

-   Correct the 'model.predict' error. ([#1](https://github.com/Pikeras72/LegofyNet/issues/1))
-   Add the version of the project in the webpage. ([#13](https://github.com/Pikeras72/LegofyNet/issues/13))
-   Make the web responsive. ([#12](https://github.com/Pikeras72/LegofyNet/issues/12))

#### <Update [25/04/2024]>

**Version 0.3** is here! New changes added:

-   Dark and Light mode available.
-   Version number added to the webpage.
-   'model.predict' error detected.   

 Weak points:

-  The 'model.predict' error is due to the loadModel() function if the user try to generate an image too quick. 
-  The webpage initialize in Dark mode, but the button shows as it was Light mode.
-  The model is loaded in all of the webpages of the different classes, making the user experience slower.

Future Improvements:

-   Since I'm a student, I'm still learning new things and I recently learned the importance of creating new branches for each feature and not always deploying to the main branch. (How had I not realized this before...) (×﹏×) 
-   Complete the fix for the 'model.predict' error. ([#1](https://github.com/Pikeras72/LegofyNet/issues/1))
-   Initialize the Dark/Light mode button to Dark. ([#7](https://github.com/Pikeras72/LegofyNet/issues/7))
-   Pass the version number to a global variable. ([#8](https://github.com/Pikeras72/LegofyNet/issues/8))
-   Generate the images with and appropriate decoration and surroundings. ([#5](https://github.com/Pikeras72/LegofyNet/issues/5))
-   Add details to the squares of each class at the initial page to better identify the class. ([#6](https://github.com/Pikeras72/LegofyNet/issues/6))
-   Complete the Nav Bar sections (About, Credits, The Model, etc.). ([#10](https://github.com/Pikeras72/LegofyNet/issues/10))

#### <Update [29/04/2024]>

**Version 0.4** just landed! New changes added:

-   Improved Dark/Light button and themes.
-   Model loading errors fixed.
-   The generated images are a bit bigger.
-   Version number now is much easier to change.
-   Drag&Drop system for uploading files.

 Weak points:

-   When Draging a file to the Drag&Drop section, it automatically start generating the Lego image, instead, it might be good to show the name of the selected file and a small image of it so the user knows what file they have selected.
-   After having uploaded a file, a 'Generate Image' button should appear in order to generate a new image.
-   Sometimes the user faces the situation where the model is not completely loaded yet. Until it's loaded, they can not select a file, buit they do not know that it is due to the model still loading. There should be a loading bar or a notification for them to know what is happening.
-   The code have some variables or comments is Spanish that should be changed to English.
-   The Dark/Light mode selection should be saved at the LocalSession so we could maintain the selected option through all the pages.
-   There should be a text that indicates the name of the class you are generating in each page.
  
Future Improvements:

-   Show the name of the file and it's image once uploaded. ([#18](https://github.com/Pikeras72/LegofyNet/issues/18))
-   Show a 'Generate button' after having uploaded an image. ([#19](https://github.com/Pikeras72/LegofyNet/issues/19))
-   Notify the user that the model is still loading until it's completely loaded. ([#20](https://github.com/Pikeras72/LegofyNet/issues/20))
-   Translate the whole project to English. ([#21](https://github.com/Pikeras72/LegofyNet/issues/21))
-   Improve the black/light mode. ([#22](https://github.com/Pikeras72/LegofyNet/issues/22))
-   Indicate with a text the class that corresponds to each page. ([#23](https://github.com/Pikeras72/LegofyNet/issues/23))

#### <Update [02/05/2024]>

**Version 0.5** has arrived! New changes added:

-   Preview of the name and image of the file uploaded by the user.
-   The button to generate an image from the uploaded file is now available.
-   Each web page displays the class that the user has selected.
-   The generated images now have decorations around them.
-   Until the model is not completely loaded, the user is not allowed to upload a file.

 Weak points:

-   It could be easier for the users if they could download the generated image by clicking on a button.
  
Future Improvements:

-   Add a 'Download' button in case the user wants to save the generated image. ([#31](https://github.com/Pikeras72/LegofyNet/issues/31))
  
[Go up⬆️](#top)

---
 
<a name="technologies"></a>
### 4. Technologies

`TensorFlow`, `TensorFlow.Keras` and `TensorFlow.js` for the model training, the model structure and implementing the model in the web page.

`HTML`, `CSS` and `JavaScript` for the web page design and functionality.

`Github Pages` for hosting the web page.

`ChatGPT-3.5` for the initial structure (HTML, CSS and JS) of the web page, the implementation of the model via `TensorFlow.js` in the web page and questions during the development of the project.

[Go up⬆️](#top)

---

<a name="bibliography"></a>
### 5. Bibliography

Isola, P., Zhu, J. Y., Zhou, T., & Efros, A. A. (2016). [Image-to-Image Translation with Conditional Adversarial Networks](https://arxiv.org/abs/1611.07004). arXiv.

pix2pix: Image-to-image translation with a conditional GAN. (n.d.). [TensorFlow](https://www.tensorflow.org/tutorials/generative/pix2pix).

Brownlee, J. (2021, April 29). [How to Implement Pix2Pix GAN Models From Scratch With Keras](https://machinelearningmastery.com/how-to-implement-pix2pix-gan-models-from-scratch-with-keras/). MachineLearningMastery.com.

[Go up⬆️](#top)

---

## License

[MIT](LICENSE)

## Made by

- [Pikeras72](https://github.com/Pikeras72)
  
## Special Thanks

