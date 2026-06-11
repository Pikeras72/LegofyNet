[![GitHub Pages Status](https://img.shields.io/website?label=Website%20Status&url=https%3A%2F%2Fpikeras72.github.io%2FLegofyNet%2F)](https://pikeras72.github.io/LegofyNet/)
![Static Badge](https://img.shields.io/badge/Version-2.0-blue)
[![License](https://img.shields.io/github/license/Pikeras72/LegofyNet?label=License)](https://github.com/Pikeras72/LegofyNet/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Pikeras72/LegofyNet?label=Issues)](https://github.com/Pikeras72/LegofyNet/issues)
[![GitHub repo size](https://img.shields.io/github/repo-size/Pikeras72/LegofyNet?label=Repo%20Size)](https://github.com/Pikeras72/LegofyNet)



<a name="top"></a>
# LegofyNet - Generate images similar to Lego® Star Wars with AI (Multiclass Pix2Pix)
**Pix2Pix multiclass** structure for generating Lego® figures from real images. 

**Access the website here:** https://pikeras72.github.io/LegofyNet/

## Table of contents
* [Description](#description)
* [Visuals](#visuals)
* [Versioning](#versioning)
* [Technologies](#technologies)
* [Getting Started](#getting-started)
* [Deployment on GitHub Pages](#deployment)
* [The Model & Inference Modes](#model-inference)
* [Project Structure](#project-structure)
* [Bibliography](#bibliography)
 
<a name="description"></a>
### 1. Description
This project stems from inspiration found in the `Generative Methods` subject at the Polytechnic University of Madrid in 2023, where we initially developed the first version using a standard **Pix2Pix implementation**. This repository represents the continuation of the project, implementing a new **`PatchGAN multiclass structure`** allowing users to select their desired class for generation. I have been experimenting with this new approach for some time, and it yields **more accuarate and realistic** images compared to a standard PatchGAN implementation for generating images similar to Lego® figures from real-world pictures (focused on the `Star Wars Universe`). This is the first project I have encountered with this type of structure.

The dataset was created through web scraping and subsequently modified and cleaned. All training images were *128x64*px and in `.png` format.

The images were categorized into different classes based on their type. The training set comprised `2328 images`.

Since **Version 2.0**, the website is no longer a plain HTML/CSS/JS page: it has been rebuilt from scratch as a modern **single-page application** (Vite + React + TypeScript + Tailwind CSS) with a full redesign, while keeping the exact same model running **100% in the browser** — your images never leave your device.
 
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

-   When Draging a file to the Drag&Drop section, it automatically start generating the image, instead, it might be good to show the name of the selected file and a small image of it so the user knows what file they have selected.
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

#### <Update [29/08/2024]>

**Version 0.6** is out! New changes added:

-   Now the entire project (including the code) is in English, yay!
-   A button to download the generated image was added correctly.
-   The navigation bar options are complete with useful and interesting information. Check it out!
-   Issue [#22](https://github.com/Pikeras72/LegofyNet/issues/22) has been abandoned because I cannot resolve the related issue. Instead, this issue has been replaced for now by [#35](https://github.com/Pikeras72/LegofyNet/issues/35).
  
 Weak points:

-   I think the website logo could be considerably improved to something simpler.
-   There should be a gallery section in the navigation bar so people can see some examples of generated and original images.
-   Add a 'FAQ' section in the navigation bar in case anyone has questions about how the model works, who made it, how it works, etc.
-   Add a 'Terms of Service and Privacy Policy' section in the navigation bar explaining in detail the objectives, operation and scope of this project.
-   Allow only .pdf or .jpg elements to be dragged or selected to generate model images to avoid problems or errors when generating images.
-   Check which image the model takes as input to generate the image, sometimes if you put an image to generate and then change it, sometimes it shows you the generation of the previous image.
  
Future Improvements:

-   Improve the Logo of the webpage. ([#37](https://github.com/Pikeras72/LegofyNet/issues/37))
-   Add a 'Gallery' section in the nav bar. ([#38](https://github.com/Pikeras72/LegofyNet/issues/38))
-   Add a 'FAQ' section in the nav bar. ([#39](https://github.com/Pikeras72/LegofyNet/issues/39))
-   Add a 'Terms of Service & Privacy Policy' section in the nav bar. ([#40](https://github.com/Pikeras72/LegofyNet/issues/40))
-   Allow only pdf or jpg elements to be dragged or selected to generate model images. ([#41](https://github.com/Pikeras72/LegofyNet/issues/41))
-   Check which image the model takes as input. ([#42](https://github.com/Pikeras72/LegofyNet/issues/42))

#### <Update [07/09/2024]>

**Version 0.7** is now available! New changes added:

-   The website logo has changed, new look!
-   New images and animations added to the main page on each button.
-   Now only .png and .jpg files are allowed as input to the model.
-   The issue where the canvas was storing the other previously generated images has been fixed and now only saves the last generated image.
-   A bug was detected that generates an error when not selecting an input file, but it was corrected in this issue: ([#47](https://github.com/Pikeras72/LegofyNet/issues/47)).
  
 Weak points:

-   The fonts and decorations of the website are very default, they could be improved considerably.
  
Future Improvements:

-   Improve fonts and decoration of texts. ([#49](https://github.com/Pikeras72/LegofyNet/issues/49))

#### <Update [07/10/2024]>

**Version 1.0** is finally here! 🎉 New changes added:

-   Gallery section added to the web page.
-   FAQ section added to the web page.
-   Terms of Service & Privacy Policy section added to the web page.
-   The web page is now responsive. 
-   The texts and decorations of the website have been considerably improved.
-   A loading circle animation is added to help with user waiting.
-   The name of the project needed to be changed, so it was corrected in this issue: ([#56](https://github.com/Pikeras72/LegofyNet/issues/56)).

#### <Update [12/06/2026]>

**Version 2.0** is here! 🚀 The web app has been completely rebuilt from scratch:

-   Migrated from plain HTML/CSS/JS to **Vite + React 19 + TypeScript (strict) + Tailwind CSS v4**, with a brand-new dark sci-fi "AI lab" design (glassmorphism, neon glow, particle field, animated grid backgrounds) and a new original LegofyNet logo + SVG favicon.
-   New SPA routes via hash routing (GitHub Pages friendly, survives hard refresh): `#/generator`, `#/classes`, `#/classes/:id`, `#/gallery`, `#/about`, `#/terms` and a custom 404 page.
-   The 23 per-class HTML pages were replaced by a single **Generator** with a searchable class selector (grouped by category), so switching classes no longer reloads the model.
-   Real in-browser inference now lives behind a clean **`InferenceEngine` abstraction** with two implementations: the real TensorFlow.js engine and a mock engine for UI development (`VITE_INFERENCE_ENGINE=mock`). A future remote-API engine can be plugged in without touching the UI.
-   The model (~125 MB) is **lazy-loaded only on the generator page**, with a real download progress bar, GPU shader warm-up, and an automatic WebGL→CPU fallback with a visible warning banner.
-   New generator UX: drag&drop with file-type and 10 MB size validation, upload preview, block-assembly loading animation, **before/after comparison slider** (keyboard accessible), crisp/smooth rendering toggle, and PNG download at 4×/8×.
-   Class detail pages show category, description and the literal **one-hot vector** each class feeds the model. The exact training class order is preserved in `src/data/classes.ts` and guarded by a dev-time assertion.
-   Gallery rebuilt with lightbox; About page merges the old About/Credits/The Model/FAQ pages (architecture diagrams included); Terms ported to its own route.
-   Accessibility pass: keyboard navigation, visible focus states, aria-live status messages, `prefers-reduced-motion` support.
-   Deployment automated with a **GitHub Actions workflow** (`.github/workflows/deploy.yml`); assets renamed and migrated to `public/`; verified end-to-end with a real browser (routes, model download, real generation, downloads, error states).

 Weak points:

-   The ~125 MB model download makes the first generator visit heavy on slow connections (it is cached by the browser afterwards).
-   The output resolution is fixed at 64×128 (the training resolution); the input is stretched without preserving aspect ratio, mirroring the training pipeline.
-   WebGL is effectively required for fast generations; the CPU fallback works but is slower, and low-memory mobile GPUs may fail to allocate the weights.
  
Future Improvements:

-   Optional aspect-preserving crop mode for the input image.
-   Lighter/quantized model weights to reduce the first-load download.
-   Optional remote inference API engine as an alternative to the in-browser model.

[Go up⬆️](#top)

---
 
<a name="technologies"></a>
### 4. Technologies

`TensorFlow`, `TensorFlow.Keras` and `TensorFlow.js` for the model training, the model structure and implementing the model in the web page.

`Vite`, `React` and `TypeScript` for the web app architecture, build tooling and type-safe codebase (since v2.0).

`Tailwind CSS`, `Framer Motion` and `lucide-react` for the design system, animations and iconography (since v2.0).

`React Router` (HashRouter) for client-side routing compatible with GitHub Pages (since v2.0).

`HTML`, `CSS` and `JavaScript` for the original web page design and functionality (v0.1–v1.0).

`Github Pages` for hosting the web page, now deployed automatically through `GitHub Actions`.

`ChatGPT-3.5` for the initial structure (HTML, CSS and JS) of the web page, the implementation of the model via `TensorFlow.js` in the web page and questions during the development of the project.

`Claude Code` for the complete v2.0 rebuild of the web app.

`Image Creator` on Bing for 'Star Wars' related AI images used on the website and the original logo creation.

`Rive` for the animation of the model explanation (used in v0.6–v1.0).

[Go up⬆️](#top)

---

<a name="getting-started"></a>
### 5. Getting Started

Requires `Node.js >= 20.9`.

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173
npm run typecheck  # TypeScript check only
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
```

By default the generator uses the real model. For UI development without downloading the ~125 MB weights, copy [`.env.example`](.env.example) to `.env.local` and set:

```bash
VITE_INFERENCE_ENGINE=mock
```

The UI shows a "Demo mode" banner whenever the mock engine is active.

[Go up⬆️](#top)

---

<a name="deployment"></a>
### 6. Deployment on GitHub Pages

The repository ships a workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that builds and deploys automatically on every push to `main`.

**One-time setup:** in the repository settings, set **Settings → Pages → Build and deployment → Source = "GitHub Actions"**.

Because the app uses a relative base (`base: './'` in [`vite.config.ts`](vite.config.ts)) together with hash routing, the same build works at `https://<user>.github.io/<any-repo-name>/` with no configuration changes.

[Go up⬆️](#top)

---

<a name="model-inference"></a>
### 7. The Model & Inference Modes

**Model I/O:** input image `[1, 128, 64, 3]` (normalized to [0,1]) + one-hot class vector `[1, 22]` → 3 outputs, where **output index 2** is the generated `[128, 64, 3]` image. The weights live in `public/model/` (`model.json` + 32 binary shards, ~125 MB) and are downloaded by the browser only when the generator page is opened.

⚠️ The class order in [`src/data/classes.ts`](src/data/classes.ts) (`CLASS_LABEL_ORDER`) **is the training order** — positions 11–16 are intentionally non-alphabetical. Never sort or reorder it; a dev-time assertion guards against drift.

The UI talks to an `InferenceEngine` interface ([`src/services/inference/types.ts`](src/services/inference/types.ts)) and never touches tensors directly:

-   **`tfjs`** (default) — [`src/services/inference/tfjsEngine.ts`](src/services/inference/tfjsEngine.ts): real in-browser inference. Lazily imports TensorFlow.js, reports download progress, warms up the GPU shaders, and runs predictions inside `tf.tidy` (no tensor leaks).
-   **`mock`** — [`src/services/inference/mockEngine.ts`](src/services/inference/mockEngine.ts): clearly-labeled fake engine for UI development.
-   **Remote API (future)** — implement `InferenceEngine` in a new `apiEngine.ts` and select it in [`src/services/inference/index.ts`](src/services/inference/index.ts). No UI changes needed.

#### Adding or editing classes

Class metadata lives in [`src/data/classes.ts`](src/data/classes.ts):

```ts
{
  id: 'yoda',                        // slug used in routes and ?class= params
  name: 'Yoda',                      // exact training label
  modelIndex: 20,                    // one-hot index — must match training order
  category: 'jedi',                  // jedi | sith | imperial | resistance | warrior | species
  image: 'images/classes/yoda.jpg',  // preview under public/
  description: '…',
}
```

Supporting a *new* class requires retraining/exporting the model with the extra label, adding its preview image under `public/images/classes/`, and appending it to both `CLASS_LABEL_ORDER` and `CHARACTER_CLASSES` (keeping indices aligned).

#### Replacing the model

1.  Export your Keras model with [tfjs-converter](https://www.tensorflow.org/js/guide/conversion) (layers format).
2.  Replace the contents of `public/model/`.
3.  If the input geometry changes, update `MODEL_INPUT_WIDTH` / `MODEL_INPUT_HEIGHT` in [`src/services/inference/imageUtils.ts`](src/services/inference/imageUtils.ts).
4.  If the output head changes, adjust the output index in [`src/services/inference/tfjsEngine.ts`](src/services/inference/tfjsEngine.ts) (currently `outputs[2]`).

[Go up⬆️](#top)

---

<a name="project-structure"></a>
### 8. Project Structure

```
public/
  model/              # TF.js weights (model.json + 32 shards, ~125 MB)
  images/             # class previews, gallery, diagrams, team
src/
  data/               # classes (training order!), faq, gallery, team
  services/inference/ # engine interface + tfjs/mock implementations
  hooks/              # useGenerator state machine, utilities
  components/         # ui primitives, layout, per-page components
  pages/              # one component per route
  layouts/            # RootLayout (navbar + footer)
.github/workflows/    # GitHub Pages deploy workflow
```

[Go up⬆️](#top)

---

<a name="bibliography"></a>
### 9. Bibliography

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

- [emil-pintilie](https://github.com/emil-pintilie)
- [ManuelDobladoBueno](https://github.com/ManuelDobladoBueno)
