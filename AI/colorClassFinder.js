import brain from './Brain.js';

var net = new brain.NeuralNetwork();

// Normalize the input data
const normalize = (value) => value / 255;

net.train([
    {
        input: {
            r: normalize(0.255),
            g: normalize(0.255),
            b: normalize(0.255)
        },
        output: {
            white: 1
        }
    },
    {
        input: {
            r: normalize(0.240),
            g: normalize(0.240),
            b: normalize(0.240)
        },
        output: {
            white: 1
        }
    }
]);

function findColorClass(color) {
    let r = normalize(color[0]);
    let g = normalize(color[1]);
    let b = normalize(color[2]);

    let result = net.run({
        r: r,
        g: g,
        b: b
    });

    console.log(result);

    for (let i of Object.keys(result)) {
        if (result[i] === Math.max(...Object.values(result))) {
            alert(i);
            return i;
        }
    }
}

export { findColorClass };