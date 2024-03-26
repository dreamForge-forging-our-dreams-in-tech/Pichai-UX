import './Brain.js';

// Sample dataset
const trainingData = [
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  { input: { r: 0.8, g: 0.2, b: 0.2 }, output: { red: 1 } },
  { input: { r: 0.2, g: 0.6, b: 0.3 }, output: { green: 1 } },
  { input: { r: 0.2, g: 0.5, b: 0.9 }, output: { blue: 1 } },
  { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } }, // Adding white
  { input: { r: 0.9, g: 0.7, b: 0 }, output: { yellow: 1 } }, // Adding yellow
  // Add more data as needed
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
  return recognizeColor(r / 255,g / 255,b / 255);
}

export { findColorClass };