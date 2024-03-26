import './Brain.js';

var net = new brain.NeuralNetwork();

const trainingData = [
  { input: [1, 0.5, 0], output: { red: 1 } }, // Red
  { input: [0, 1, 0], output: { green: 1 } }, // Green
  { input: [0, 0, 1], output: { blue: 1 } }, // Blue
  // Add more training examples for other colors
];
net.train(trainingData);

function findColorClass (r,g,b) {
    let i;

    let result = net.run({
        r: r,
        g: g,
        b: b
      });

      let maxOutput = Math.max(...Object.values(result));
      for (let label in result) {
          if (result[label] === maxOutput) {
              return label;
          }
      }
}

export { findColorClass };