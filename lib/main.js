const {Range, Disposable} = require('atom');
const {AutoLanguageClient, Convert} = require('atom-languageclient')
const cp = require('child_process')
const OS = require('os');
const path = require('path');

const {SymbolKind} = require('vscode-languageserver-types');

const PACKAGE_NAME = require('../package.json').name;

const StorageClass = {
  Static : 3
};

const CustomSymbolKind = {
  TypeAlias: 252,
  Parameter: 253,
  StaticMethod: 254,
  Macro: 255
}

markerOptionsForSymbol = (symbol) => {
  var options = {
    type: "text",
    class: "ccls--disabled"
  };

  switch (symbol.kind) {
    case SymbolKind.Class:
    case SymbolKind.Struct:
    case SymbolKind.Constructor:
      options.class = 'ccls--type';
      break;
    case SymbolKind.Enum:
      options.class = 'ccls--enum';
      break;
    case CustomSymbolKind.TypeAlias:
      options.class = 'ccls--type-alias';
      break;
    case SymbolKind.TypeParameter:
      options.class = 'ccls--type-parameter';
      break;
    case SymbolKind.Function:
      options.class = 'ccls--free-function';
      break;
    case SymbolKind.Method:
      options.class = 'ccls--member-function';
      break;
    case CustomSymbolKind.StaticMethod:
      options.class = 'ccls--static-member-function';
      break;
    case SymbolKind.Variable:
      if (symbol.parentKind == SymbolKind.Function ||
          symbol.parentKind == SymbolKind.Method ||
          symbol.parentKind == SymbolKind.Constructor) {
        options.class = 'ccls--free-variable';
      } else {
        options.class = 'ccls--global-variable';
      }
      break;
    case SymbolKind.Field:
      if (symbol.storage == StorageClass.Static) {
        options.class = 'ccls--static-meber-variable';
      } else {
        options.class = 'ccls--member-variable';

      }
      break;
    case CustomSymbolKind.Parameter:
      options.class = 'ccls--parameter';
      break;
    case SymbolKind.EnumMember:
      options.class = 'ccls--enum-constant';
      break;
    case SymbolKind.Namespace:
      options.class = 'ccls--namespace';
      break;
    case CustomSymbolKind.Macro:
      options.class = 'ccls--macro';
      break;
  }

  return options;
}

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

  preInitialization(connection) {
    const config = atom.config.get(PACKAGE_NAME);

    if (config.enableSemanticHighlighting) {
      this.markers = [];
      connection.onCustom('$ccls/publishSemanticHighlight',
        this.onPublishSemanticHighlight.bind(this));
    }
  }

  getInitializeParams(projectPath, process) {
    return super.getInitializeParams(projectPath, process);
  }

  startServerProcess (projectPath) {
    this.projectPath = projectPath;

    const config = atom.config.get(PACKAGE_NAME);

    var init = {};

    if (config.indexOnChange) {
      init.index = init.index || {};
      init.index.onChange = true;
    }

    const args = [
      "-log-file=" + config.logFile,
      "-init=" + JSON.stringify(init) + "",
    ];

    if (config.logVerbosity != 0) {
      args.push("-v=1")
    }

    console.log("Launching ccls server with args: ", args);

    return cp.spawn(config.cclsPath, args, {
      cwd: projectPath
    });
  }

  filterChangeWatchedFiles(filePath) {
    const ignoreList = [
      '.git',
      '.ccls-cache',
    ];

    for (let i=0; i<ignoreList.length; i++) {
      const fullIgnorePath = path.join(this.projectPath, ignoreList[i]);

      if (!path.relative(fullIgnorePath, filePath).startsWith('..')) {
        return false;
      }
    }

    return true;
  }

  consumeBusySignal(busySignalService) {
    this._busySignalService = busySignalService;
    this._disposable.add(busySignalService);

    return new Disposable(() => {
      this._busySignalService = null;
      this._disposable.remove(busySignalService);
    });
  }

  onPublishSemanticHighlight(data) {
    const uri = data.uri;
    const symbols = data.symbols;

    const editor = atom.workspace.getTextEditors().filter((editor) => {
      return (editor.getPath() == Convert.uriToPath(uri));
    })[0];

    if (editor == null) {
      console.log("Received semantic highlight for unknown file: ", uri);
      return;
    }

    const buffer = editor.getBuffer();

    // Remove previous markers
    this.markers.forEach((marker) => {
      marker.destroy();
    });
    this.markers = [];

    symbols.forEach((symbol) => {
      const ranges = symbol.ranges.map((range) => {
        return new Range(
          buffer.positionForCharacterIndex(range.L),
          buffer.positionForCharacterIndex(range.R),
        );
      });

      const options = markerOptionsForSymbol(symbol);

      ranges.forEach((range) => {
        let marker = editor.markBufferRange(range, {invalidate: 'touch'});
        let decoration = editor.decorateMarker(marker, options);

        this.markers.push(marker);
      });
    });
  }
}

module.exports = new CCLSLanguageClient();
module.exports.config = require('./config');
