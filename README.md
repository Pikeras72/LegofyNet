[![Netlify Status](https://api.netlify.com/api/v1/badges/1e2c56ef-5136-4b17-af53-6c53023dc125/deploy-status)](https://app.netlify.com/sites/legofynet/deploys)

<a name="top"></a>
# LegofyNet - Generate Lego images with AI
**Pix2Pix multiclass** structure for generating Lego figures from real images. 

## Table of contents
* [Description](#description)
* [Visuals](#visuals)
* [Versioning](#versioning)
* [Technologies](#technologies)
* [Bibliography](#bibliography)
 
<a name="description"></a>
### 1. Description
This project comes from an inspiration from the `Generative Methods` subject at the Polytechnic University of Madrid in 2023 where we developed the first version of this project via a normal Pix2Pix implementation. This reposityory contains the continuity of the project implementing a new `Pix2Pix multiclass structure` where you can select your desired class to generete. I have been trying this new Pix2Pix approach for some time and it provides `more accuarate and realistic` images than a normal Pix2Pix implementation for generating Lego figures from real world images (oriented to the `Star Wars Universe`). This is the first project I have seen with this type of structure.

The dataset was created via webscrapping and it was modified and cleaned afterwards. All the images used for training were *128x64*px and `.png` format.

The images were separated into different categories according to the type they corresponded to. The trainingset was composed of `2328 images`.

---
 
[Go up⬆️](#top)

<a name="visuals"></a>
### 2. Visuals

For example, given this image and selecting the class `Calamari`:

![ArdoBarodai](https://github.com/Pikeras72/LegofyNet/assets/90858639/588ecaea-0792-4393-9413-23804ff5a772)

The model predicted this:

![image](https://github.com/Pikeras72/LegofyNet/assets/90858639/ff27e42f-2cf3-4ee5-bd56-0daed0188b46)


Another example, given this image and selecting the class `Yoda`:

![51WsWJ76ibL _AC_UY1000_](https://github.com/Pikeras72/LegofyNet/assets/90858639/aa7c357a-36d7-4609-ab52-e6e8852582c0)


The model predicted this:

![image](https://github.com/Pikeras72/LegofyNet/assets/90858639/b7a285a1-94da-4125-8d4a-1e931d2e1d67)


---
 
[Go up⬆️](#top)
 
<a name="versioning"></a>
### 3. Versioning
 #### Update [25/03/2024]

**Version 0.1.1** is out! This version includes the following:

-  Model trained with *`128x64`px* images.
-  Very simple interface just to try the functionality of the model.
-  Deployment of the web page in netlify: https://legofynet.netlify.app
-  Allows users to upload an image, select a class and generate their image.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Made by

- [Pikeras72](https://github.com/Pikeras72)
  
## Special Thanks

