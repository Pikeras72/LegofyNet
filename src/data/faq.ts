import type { FaqItem } from '../types';

// Ported and updated from the original site's faq.html.
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How does LegofyNet work?',
    answer:
      'LegofyNet runs a multiclass Pix2Pix model (a conditional GAN with a PatchGAN discriminator) directly in your browser with TensorFlow.js. You upload an image, pick one of the 22 supported classes, and the generator network synthesizes a 64×128 block-figure version of your image conditioned on that class.',
  },
  {
    question: 'Is my image uploaded anywhere?',
    answer:
      'No. Everything happens locally on your device. The neural network weights are downloaded to your browser once, and inference runs client-side — your photos never leave your machine.',
  },
  {
    question: 'Why does the generator download ~125 MB?',
    answer:
      'That is the trained model itself (32 weight shards plus the network topology). It only downloads when you open the generator, and your browser caches it for subsequent visits.',
  },
  {
    question: 'What kind of images work best?',
    answer:
      'Frontal, well-lit portraits or full-body shots with a clean background. The model resizes every input to 64×128 pixels, so simple compositions survive the transformation best.',
  },
  {
    question: 'Can I download the generated images?',
    answer:
      'Yes. After generation you can download the result as a PNG at 4× or 8× the native model resolution, in crisp (pixel-perfect) or smooth scaling.',
  },
  {
    question: 'What happens if I encounter an error?',
    answer:
      'Try refreshing the page first. In-browser inference needs WebGL; very old devices or browsers with GPU acceleration disabled may not be able to run the model. If the issue persists, open an issue on the GitHub repository.',
  },
  {
    question: 'Who is behind LegofyNet?',
    answer:
      'LegofyNet was developed by Diego Ruiz Piqueras, with contributions from Emil Stelian Pintilie and Manuel Doblado Bueno, all students at Universidad Politécnica de Madrid. It began as a university collaboration and evolved into a personal project.',
  },
  {
    question: 'Can I contribute to the project?',
    answer:
      'Absolutely — the project is open source under the MIT license. Visit the GitHub repository to report issues, suggest features or submit pull requests.',
  },
];
