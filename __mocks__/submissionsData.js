export default {
  blocks: [
    {
      key: "4la3u",
      text: "Demystifying Batch Normalization vs Drop out",
      type: "header-one",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "f4s4n",
      text: "Is batch normalization really the rule of thumb? Comparing the result with dropout on the CIFAR10 dataset",
      type: "header-two",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "v70a",
      text: "Batch normalization(BN) has been known to improve model performance, mitigate internal covariate shift, and apply a small regularization effect. Such functionalities of the BN and empirical studies proving the effectiveness of BN helped to solidify people’s preference of using BN over dropout. BN quickly replaced the dropout layer in many deep learning models. Why is this the case? BN normalizes values of the units for each batch with its own mean and standard deviation. Dropout, on the other hand, randomly drops a predefined ratio of units in a neural network to prevent overfitting. Therefore, using the dropout layer and batch normalization layer — placing them next to each other to be more specific — creates disharmony between those two. Although the BN has a slight regularization effect, it’s more of a side-effect of the normalization process. Dropout, on the contrary, is a simple but strong regularizer to address the overfitting problem.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        { offset: 0, length: 19, style: "BOLD" },
        { offset: 476, length: 7, style: "HIGHLIGHT" },
        { offset: 772, length: 7, style: "STRIKETHROUGH" },
      ],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};
