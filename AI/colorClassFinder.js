import './Brain.js';

// Sample dataset
const trainingData = [
  { input: { r: 1, g: 0, b: 0 }, output: { red: 1 } },
  { input: { r: 0, g: 1, b: 0 }, output: { green: 1 } },
  { input: { r: 0, g: 0, b: 1 }, output: { blue: 1 } },
  // Add more data as needed
];

// Create and configure the neural network
const net = new brain.NeuralNetwork();
net.train(trainingData);

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
  return recognizeColor(r,g,b);
}

export { findColorClass };