module.exports = {
  indexOnChange: {
    type: "boolean",
    title: "Index on file change",
    description: "Tell ccls to index immediately when a file changes.",
    default: false,
    order: 10,
  },
  logFile: {
    type: "string",
    title: "Path for ccls to write its log",
    description: "Path to the write where ccls should direct its log.",
    default: "/tmp/ccls.log",
    order: 20,
  },
  enableSemanticHighlighting: {
    type: "boolean",
    title: "Enable semantic highlighting",
    description: "Whether to enable semantic highlighting.",
    default: false,
    order: 30,
  }
};
