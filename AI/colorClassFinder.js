import './Brain.js';

// Sample dataset
const trainingData = [
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.7, g: 0.0, b: 0.0 }, output: { red: 1 } },
  { input: { r: 0.9, g: 0.3, b: 0.3 }, output: { lightred: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0, g: 0.2, b: 0 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 0, g: 0.5, b: 0.5 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } },
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } },
  { input: { r: 1, g: 1, b: 0 }, output: { yellow: 1 } },
  { input: { r: 0.7, g: 0.5, b: 0 }, output: { yellow: 1 } },
  { input: { r: 1, g: 0.9, b: 0.4 }, output: { yellow: 1 } },
  { input: { r: 1, g: 0.6, b: 0 }, output: { orange: 1 } },
  { input: { r: 1, g: 0.8, b: 0.8 }, output: { pink: 1 } },
  { input: { r: 0.6, g: 0, b: 0.5 }, output: { purple: 1 } },
  { input: { r: 1, g: 0.5, b: 1 }, output: { violet: 1 } },
  { input: { r: 0, g: 0.9, b: 0.8 }, output: { lightblue: 1 } },
  { input: { r: 0, g: 1.0, b: 1.0 }, output: { aqua: 1 } },
  { input: { r: 0, g: 0.8, b: 0 }, output: { gold: 1 } },
  { input: { r: 0, g: 1, b: 0 }, output: { lime: 1 } },
  { input: { r: 0.1, g: 0.1, b: 0.1 }, output: { aqua: 1 } },
  { input: { r: 0, g: 0, b: 0.5 }, output: { navy: 1 } },
  { input: { r: 1, g: 0.5, b: 0.3 }, output: { coral: 1 } },
  { input: { r: 0, g: 0.5, b: 0.5 }, output: { teal: 1 } },
  { input: { r: 0.8, g: 0.1, b: 0.1 }, output: { brown: 1 } },
  { input: { r: 0, g: 0, b: 0 }, output: { black: 1 } },
  { input: { r: (132/255), g: (160/255), b: (160/255) }, output: { white: 1 } },
  { input: { r: (1/255), g: (19/255), b: (34/255) }, output: { black: 1 } },
];

// Create and configure the neural network
const net = new brain.NeuralNetwork();
net.train(trainingData);
console.log(JSON.stringify(net.toJSON())

// Function to recognize color based on RGB values
function recognizeColor(r, g, b) {

  const output = net.run({ r, g, b });
  let colorName = '';
  let maxProbability = 0;
  for (const key in output) {
    if (output[key] > maxProbability) {
      maxProbability = output[key];
      colorName = key;
    }
  }
  return colorName;
}

function findColorClass (r,g,b) {
  return recognizeColor(r / 255,g / 255,b / 255);
}

export { findColorClass };