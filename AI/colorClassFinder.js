import './Brain.js';

var net = new brain.NeuralNetwork();

net.train([{
    input: {
      r: 255,
      g: 255,
      b: 255
    },
    output: {
      white: 1
    }
  },
  {
    input: {
      r: 240,
      g: 240,
      b: 240
    },
    output: {
      white: 1
    }
  },
  {
    input: {
      r: 0,
      g: 1,
      b: 252
    },
    output: {
      blue: 1
    }
  },
  {
    input: {
      r: 56,
      g: 195,
      b: 228
    },
    output: {
      lightblue: 1
    }
  },
  {
    input: {
      r: 46,
      g: 211,
      b: 197
    },
    output: {
      turquose: 1
    }
  },
  {
    input: {
      r: 52,
      g: 168,
      b: 83
    },
    output: {
      green: 1
    }
  },
  {
    input: {
      r: 250,
      g: 187,
      b: 8
    },
    output: {
      yellow: 1
    }
  },
  {
    input: {
      r: 255,
      g: 0,
      b: 0
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