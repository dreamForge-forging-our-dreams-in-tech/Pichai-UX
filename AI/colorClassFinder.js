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
  },
  {
    input: {
      r: 0.0,
      g: 0.1,
      b: 0.252
    },
    output: {
      blue: 1
    }
  },
  {
    input: {
      r: 0.46,
      g: 0.211,
      b: 0.197
    },
    output: {
      turquose: 1
    }
  },
  {
    input: {
      r: 0.52,
      g: 0.168,
      b: 0.83
    },
    output: {
      green: 1
    }
  },
  {
    input: {
      r: 0.250,
      g: 0.187,
      b: 0.8
    },
    output: {
      yellow: 1
    }
  },
  {
    input: {
      r: 0.255,
      g: 0.0,
      b: 0.0
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

      for(i of Object.keys(result)) {
        if(result[i] == Math.max(... Object.values(result))) {
            return i;
            break;
        }
      }
}

export { findColorClass };