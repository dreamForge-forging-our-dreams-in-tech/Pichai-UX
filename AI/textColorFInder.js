import './Brain.js';

var net = new brain.NeuralNetwork();

net.train([
{
  input: {
    r: 61/255,
    g: 111/255,
    b: 141/255
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 61/255,
    g: 111/255,
    b: 141/255
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 253/255,
    g: 253/255,
    b: 253/255
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
  let result = net.run({
    r: r/255,
    g: g/255,
    b: b/255
  });

  for (i of Object.keys(result)) {
    if (result[i] == Math.max(...Object.values(result))) {
      return i;
      break;
    }
  }
}

export { getTextColor };