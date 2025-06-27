export function trainAI(net, trainingData) {
  if (window.localStorage.getItem('colorClassTrainingData')) {
    net.fromJSON(JSON.parse(window.localStorage.getItem('colorClassTrainingData')));
  } else {
    // If no training data is found, train the network with the sample dataset
    net.train(trainingData);
  }
  window.localStorage.setItem('colorClassTrainingData', JSON.stringify(net.toJSON()));
}