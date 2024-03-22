import './Brain.js';

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
  }
]);

function getTextColor(color) {
    let i;
    let result = net.run({
        r: 1,
        g: 0.4,
        b: 0
      });

      console.log(result)
      console.log(Math.max(Object.values(result)))
      for(i of Object.keys(result)) {
        if(result[i] == Math.max(Object.values(result))) {
            alert(i)
            return i;
            break;
        }
      }
}

export { getTextColor };