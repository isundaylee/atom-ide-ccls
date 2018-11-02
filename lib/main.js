const {AutoLanguageClient} = require('atom-languageclient')
const cp = require('child_process')
const OS = require('os');
const path = require('path');

const PACKAGE_NAME = require('../package.json').name;

class CCLSLanguageClient extends AutoLanguageClient {
  getGrammarScopes () {
    return [
      'source.c',
      'source.cpp'
    ];
  }

  getLanguageName () {
    return 'C / C++';
  }

  getServerName () {
    return "ccls";
  }

  getInitializeParams(projectPath, process) {
    return super.getInitializeParams(projectPath, process);
  }

  startServerProcess (projectPath) {
    const config = atom.config.get(PACKAGE_NAME);

    var init = {};

    if (config.indexOnChange) {
      init.index = init.index || {};
      init.index.onChange = true;
    }

    const args = [
      "-init=" + JSON.stringify(init) + "",
    ];

    console.log("Launching ccls server with args: ", args);

    return cp.spawn("ccls", args, {
      cwd: projectPath
    });
  }
}

module.exports = new CCLSLanguageClient();
module.exports.config = require('./config');
