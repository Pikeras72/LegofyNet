[![Netlify Status](https://api.netlify.com/api/v1/badges/1e2c56ef-5136-4b17-af53-6c53023dc125/deploy-status)](https://app.netlify.com/sites/legofynet/deploys)

<a name="top"></a>
# LegofyNet - Generate Lego images with AI
**Pix2Pix multiclass** structure for generating Lego figures from real images. 

**Access the website here:** https://legofynet.netlify.app

## Table of contents
* [Description](#description)
* [Visuals](#visuals)
* [Versioning](#versioning)
* [Technologies](#technologies)
* [Bibliography](#bibliography)
 
<a name="description"></a>
### 1. Description
This project stems from inspiration found in the `Generative Methods` subject at the Polytechnic University of Madrid in 2023, where we initially developed the first version using a standard Pix2Pix implementation. This repository represents the continuation of the project, implementing a new `Pix2Pix multiclass structure` allowing users to select their desired class for generation. I have been experimenting with this new Pix2Pix approach for some time, and it yields `more accuarate and realistic` images compared to a standard Pix2Pix implementation for generating Lego figures from real-world images (focused on the `Star Wars Universe`). This is the first project I have encountered with this type of structure.

The dataset was created through web scraping and subsequently modified and cleaned. All training images were *128x64*px and in `.png` format.

The images were categorized into different classes based on their type. The training set comprised `2328 images`.

---
 
[Go up⬆️](#top)

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

---
 
[Go up⬆️](#top)


 
<a name="versioning"></a>
### 3. Versioning
 #### Update [25/03/2024]

**Version 0.1** is out! This version includes the following:

-  Model trained with *`128x64`px* images.
-  Very simple interface just to try the functionality of the model.
-  Deployment of the web page on Netlify: https://legofynet.netlify.app
-  Allows users to upload an image, select a class and generate their image.

Weak points:

- The interface is very poor as it is only a prototype.
- Users should not have to choose the class every time if they want to generate multiple images from the same category.
- The image shown on the web page is very small, making it hard to appreciate.
  
Future Improvements:

-  Improve interface (nav bar, favicon.ico, multiple HTMLs for each class, credits, help section, etc.).
-  Upload a new and better model that generates images with higher quality.
-  Increase the size of the image shown on the web page.

#### Update [26/03/2024]

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

-   Correct the 'model.predict' error.
-   Add the version of the project in the webpage.
-   Improve interface (animations, images, interactive elements, etc.).
-   Upload a new and better model that generates images with higher quality.
-   Increase the size of the image shown on the web page.
-   Make the web responsive.

---
  
[Go up⬆️](#top)
 
<a name="technologies"></a>
### 4. Technologies

`TensorFlow`, `TensorFlow.Keras` and `TensorFlow.js` for the model training, the model structure and implementing the model in the web page.

`HTML`, `CSS` and `JavaScript` for the web page design and functionality.

`Netlify` for hosting the web page for free.

`Microsoft Copilot` for the initial structure (HTML, CSS and JS) of the web page and the implementation of the model on the web page via TensorFlow.js.

---
 
[Go up⬆️](#top)

<a name="bibliography"></a>
### 5. Bibliography



 ---
 
[Go up⬆️](#top)

## License

[MIT](LICENSE)

## Made by

- [Pikeras72](https://github.com/Pikeras72)
  
## Special Thanks

