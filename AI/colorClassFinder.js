import './Brain.js';

var net = new brain.NeuralNetwork();

net.train([{
    input: {
      r: 255/255,
      g: 255/255,
      b: 255/255
    },
    output: {
      white: 1
    }
  },
  {
    input: {
      r: 240/255,
      g: 240/255,
      b: 240/255
    },
    output: {
      white: 1
    }
  },
  {
    input: {
      r: 0/255,
      g: 1/255,
      b: 252/255
    },
    output: {
      blue: 1
    }
  },
  {
    input: {
      r: 56/255,
      g: 195/255,
      b: 228/255
    },
    output: {
      lightblue: 1
    }
  },
  {
    input: {
      r: 46/255,
      g: 211/255,
      b: 197/255
    },
    output: {
      turquose: 1
    }
  },
  {
    input: {
      r: 52/255,
      g: 168/255,
      b: 83/255
    },
    output: {
      green: 1
    }
  },
  {
    input: {
      r: 250/255,
      g: 187/255,
      b: 8/255
    },
    output: {
      yellow: 1
    }
  },
  {
    input: {
      r: 255/255,
      g: 0/255,
      b: 0/255
    },
    output: {
      red: 1
    }
  },
]);

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