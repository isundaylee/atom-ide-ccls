const {AutoLanguageClient} = require('atom-languageclient')
const cp = require('child_process')
const OS = require('os');
const path = require('path');

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
    return cp.spawn("ccls", [], {
      cwd: projectPath
    });
  }
}

module.exports = new CCLSLanguageClient();
