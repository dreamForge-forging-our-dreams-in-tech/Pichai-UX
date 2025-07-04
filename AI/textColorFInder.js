/**
 * Trains a neural network to determine the optimal text color (black or white)
 * for a given background color using RGB values normalized between 0 and 1.
 * 
 * @module textColorFinder
 * @requires ./Brain.js
 * @requires ./utils.js
 */

import './Brain.js';
import { trainAI } from './utils.js';

var net = new brain.NeuralNetwork();

let trainingData = [{
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
    r: 0.24,
    g: 0.44,
    b: 0.55
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 1.00,
    g: 1.00,
    b: 1.00
  },
  output: {
    black: 1
  }
},
{
  input: {
    r: 1.00,
    g: 1.00,
    b: 0.00
  },
  output: {
    black: 1
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
},
{
  input: {
    r: 0.0,
    g: 0.0,
    b: 0.56
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 0.8,
    g: 0.5,
    b: 0.3
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 0.93,
    g: 0.8,
    b: 0.73
  },
  output: {
    black: 1
  }
},
{
  input: {
    r: 0.8,
    g: 0.7,
    b: 0.9
  },
  output: {
    black: 1
  }
},
{
  input: {
    r: 0.94,
    g: 0.84,
    b: 0.75
  },
  output: {
    black: 1
  }
},
{
  input: {
    r: 1.0,
    g: 0.61,
    b: 0.0
  },
  output: {
    black: 1
  }
},
{
  input: {
    r: 0.75,
    g: 0.76,
    b: 0.94
  },
  output: {
    black: 1
  }
},
{
  input: {
    r: 0.94,
    g: 0.76,
    b: 0.76
  },
  output: {
    black: 1
  }
},
{
  input: {
    r: 0.64,
    g: 0.42,
    b: 0.21
  },
  output: {
    black: 1
  }
},
{
  input: {
    r: 0.93,
    g: 0.62,
    b: 0.96
  },
  output: {
    black: 1
  }
},
{
  input: {
    r: 0.78,
    g: 0.28,
    b: 0.29
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 0.39,
    g: 0.36,
    b: 0.38
  },
  output: {
    white: 1
  }
},{
  input: {
    r: 0.27,
    g: 0.24,
    b: 0.33
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 0.4,
    g: 0.11,
    b: 0.08
  },
  output: {
    white: 1
  }
},
{
  input: {
    r: 0.86,
    g: 0.81,
    b: 0.72
  },
  output: {
    black: 1
  }
},
]

trainAI(net, trainingData, 'textColorTrainingData');

/**
 * Returns the recommended text color ('black' or 'white') for a given background color.
 *
 * @function
 * @name getTextColor
 * @param {number[]} color - An array of three numbers representing the RGB values of the background color (each between 0 and 255).
 * @returns {string|undefined} The recommended text color ('black' or 'white'), or undefined if an error occurs.
 */

function getTextColor(color) {
  try {
    let r = color[0];
    let g = color[1];
    let b = color[2];

    let i;

    let result = net.run({
      r: (r / 255).toFixed(2),
      g: (g / 255).toFixed(2),
      b: (b / 255).toFixed(2)
    });

    for (i of Object.keys(result)) {
      if (result[i] == Math.max(...Object.values(result))) {
        return i;
      }
    }
  } catch (e) { }
}

export { getTextColor };