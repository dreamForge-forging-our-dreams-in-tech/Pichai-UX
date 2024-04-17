import './Brain.js';

function roundTo(n, digits) {
  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  const rounded = Math.round(n) / multiplicator;
  return +rounded.toFixed(digits);
}

var net = new brain.NeuralNetwork();

net.train([{
  input: {
    r: 0.03,
    g: 0.7,
    b: 0.5
  },
  output: {
    black: 1
  }
},
{
  input: {
    r: 0.03,
    g: 0.4,
    b: 0.5
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 0.16,
    g: 0.09,
    b: 0.2
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 0.5,
    g: 0.5,
    b: 1.0
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 0.2,
    g: 0.4,
    b: 0.6
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 1.0,
    g: 1.0,
    b: 1.0
  },
  output: {
    black: 1
  }
}
]);

function getTextColor(color) {
  let r = color[0];
  let g = color[1];
  let b = color[2];

  let i;
  console.log({
    r: roundTo(r, 2),
    g: roundTo(g, 2),
    b: roundTo(b, 2)
  })

  let result = net.run({
    r: (r / 255).toFixed(2),
    g: (g / 255).toFixed(2),
    b: (b / 255).toFixed(2)
  });

  for (i of Object.keys(result)) {
    if (result[i] == Math.max(...Object.values(result))) {
      return i;
      break;
    }
  }
}

export { getTextColor };