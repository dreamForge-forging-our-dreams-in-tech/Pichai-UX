export function trainAI(net, trainingData, saveKey) {// saves the training data under the given ey and trains the ai
  if (window.localStorage.getItem(saveKey)) {
    net.fromJSON(JSON.parse(window.localStorage.getItem(saveKey)));
  } else {
    // If no training data is found, train the network with the sample dataset
    net.train(trainingData);
  }
  window.localStorage.setItem(saveKey, JSON.stringify(net.toJSON()));
}