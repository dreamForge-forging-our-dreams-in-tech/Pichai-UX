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

function findColorClass (colr,g,bor) {
    let i;
    
    let result = net.run({
        r: r,
        g: g,
        b: b
      });

      console.log(result)

      for(i of Object.keys(result)) {
        if(result[i] == Math.max(... Object.values(result))) {
            return i;
            break;
        }
      }
}

export { findColorClass };