import './Brain.js';

var net = new brain.NeuralNetwork();

net.train([{
    input: {
      r: 0.255,
      g: 0.255,
      b: 0.255
    },
    output: {
      white: 1
    }
  },
  {
    input: {
      r: 0.240,
      g: 0.240,
      b: 0.240
    },
    output: {
      white: 1
    }
  }
]);

function findColorClass (color) {
    let i;
    let r = color[0];
    let g = color[1];
    let b = color[2];

    let result = net.run({
        r: r,
        g: g,
        b: b
      });

      for(i of Object.keys(result)) {
        if(result[i] == Math.max(... Object.values(result))) {
            alert(i)
            return i;
            break;
        }
      }
}

export { findColorClass };