/**
 * Trains a neural network and saves its state to localStorage.
 *
 * If a saved network state exists under the given key, it loads the network from localStorage.
 * Otherwise, it trains the network with the provided training data.
 * After training or loading, it saves the network state to localStorage.
 *
 * @param {Object} net - The neural network instance with `train`, `toJSON`, and `fromJSON` methods.
 * @param {Array|Object} trainingData - The data used to train the neural network.
 * @param {string} saveKey - The key under which to save the network state in localStorage.
 */

export function trainAI(net, trainingData, saveKey) {// saves the training data under the given key and trains the ai
  if (window.localStorage.getItem(saveKey)) {
    net.fromJSON(JSON.parse(window.localStorage.getItem(saveKey)));
  } else {
    // If no training data is found, train the network with the sample dataset
    net.train(trainingData);
  }
  window.localStorage.setItem(saveKey, JSON.stringify(net.toJSON()));
}