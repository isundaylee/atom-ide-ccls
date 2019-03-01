module.exports = {
  cclsPath: {
    type: "string",
    title: "`ccls` executable path",
    description: "Path to the `ccls` executable",
    default: "ccls",
    order: 0,
  },
  cclsInit: {
    title: "CCLS init options",
    description: "Various settings to be set on ccls process start",
    type: "object",
    order: 1000,
    properties: {
      compilationDatabaseCommand: {
        type: "string",
        title: "Compilation database command",
        description: " If specified, this option overrides compile_commands.json and this external command will be executed with an option |projectRoot|.",
        default: "",
        order: 0,
      },
      compilationDatabaseDirectory: {
        type: "string",
        title: "Compilation database directory",
        description: "Directory containing compile_commands.json.",
        default: "",
        order: 10,
      },
      "cache": {
        type: "object",
        title: "Cache settings",
        order: 20,
        properties: {
          directory: {
            type: "string",
            title: "Directory",
            description: "Cache directory for indexed files",
            default: ".ccls-cache",
            order: 0
          },
          retainInMemory: {
            type: "integer",
            title: "Retain in memory",
            description: "Number of loads before store copy of file index in memory",
            default: 1,
            order: 1
          },
          format: {
              type: "string",
              title: "Serialization format",
              description: "Cache serialization format",
              default: "binary",
              enum: ["binary", "json"],
              order: 2
          },
          hierarchicalPath: {
            type: "boolean",
            title: "Hierarchical path",
            description: "Collapse cache file paths",
            default: false,
            order: 3
          },
        }
      },
      "clang": {
        type: "object",
        title: "Clang settings",
        order: 30,
        properties: {
          excludeArgs: {
            type: "array",
            title: "Exclude args",
            order: 0,
            description: "Arguments that should be excluded, e.g. [-fopenmp, -Wall]",
            items: {
              type: "string",
            },
            default: []
          },
          extraArgs: {
            type: "array",
            title: "Extra args",
            order: 1,
            description: "Additional arguments to pass to clang.",
            items: {
              type: "string",
            },
            default: []
          },
          pathMappings: {
            type: "array",
            title: "Path mappings",
            order: 2,
            description: "This is a list of colon-separated strings, e.g. [\"/container:/host\"].",
            items: {
              type: "string",
            },
            default: []
          },
          resourceDir: {
            type: "string",
            title: "Resource dir",
            order: 3,
            description: "Value to use for clang -resource-dir if not specified.",
            default: ""
          }
        }
      },
      "client": {
        type: "object",
        title: "LanguageProtocol client capabilities",
        order: 40,
        properties: {
          hierarchicalDocumentSymbolSupport: {
            type: "boolean",
            title: "Hierarchical DocumentSymbol support",
            order: 0,
            description: "TextDocumentClientCapabilities.documentSymbol.hierarchicalDocumentSymbolSupport",
            default: true
          },
          linkSupport: {
            type: "boolean",
            title: "Link support",
            order: 1,
            description: "TextDocumentClientCapabilities.definition.linkSupport",
            default: true
          },
          snippetSupport: {
            type: "boolean",
            title: "Snippet support",
            order: 2,
            description: "TextDocumentClientCapabilities.completion.completionItem.snippetSupport",
            default: true
          },
          diagnosticsRelatedInformation: {
            type: "boolean",
            title: "Diagnostics RelatedInformation",
            order: 3,
            description: "TextDocumentClientCapabilities.publishDiagnostics.relatedInformation",
            default: true
          }
        }
      },
      "codeLens": {
        type: "object",
        title: "Code Lens settings",
        order: 50,
        properties: {
          localVariables: {
            type: "boolean",
            title: "Local variables",
            order: 0,
            description: "Enables code lens on parameter and function variables.",
            default: true
          }
        }
      },
      "completion": {
        type: "object",
        title: "AutoCompletition settings",
        order: 60,
        properties: {
          caseSensitivity: {
            type: "integer",
            title: "Case sensitivity",
            order: 1,
            description: "",
            enum: [
              {value: 0, description: "case-insensitive"},
              {value: 1, description: "case-folded"},
              {value: 2, description: "case-sensitive"},
            ],
            default: 2
          },
          maxNum: {
            type: "integer",
            title: "Maximum number of results",
            order: 2,
            description: "",
            default: 100
          },
          detailedLabel: {
            type: "boolean",
            title: "Detailed label",
            order: 3,
            description: "When this option is enabled, the completion item label shows the full signature of the candidate.",
            default: true
          },
          dropOldRequests: {
            type: "boolean",
            title: "Drop old requests",
            order: 4,
            description: "Prefer to service only newest requests.",
            default: true
          },
          duplicateOptional: {
            type: "boolean",
            title: "Duplicate optional",
            order: 5,
            description: "Functions with default arguments, generate one more item per default argument.",
            default: true
          },
          filterAndSort: {
            type: "boolean",
            title: "Filter and sort",
            order: 6,
            description: "If true, filter and sort completion response.",
            default: true
          },
          include: {
            type: "object",
            order: 7,
            properties: {
              blacklist: {
                type: "array",
                title: "Blacklist",
                order: 0,
                description: "Regex patterns to match include completion candidates against.",
                items: {
                  type: "string",
                },
                default: []
              },
              whitelist: {
                type: "array",
                title: "White list",
                order: 1,
                description: "",
                items: {
                  type: "string",
                },
                default: []
              },
              suffixWhitelist: {
                type: "array",
                title: "Suffix white list",
                order: 2,
                description: "If a file path does not end in one of these values, it will not be considered for auto-completion.",
                items: {
                  type: "string",
                },
                default: [".h", ".hpp", ".hh", ".inc"]
              },
              maxPathSize: {
                type: "integer",
                title: "Maximum path size",
                order: 3,
                description: "Maximum path length to show in completion results.",
                default: 30
              },
            }
          },
        }
      },
      "diagnostics": {
        type: "object",
        title: "Diagnostics",
        order: 70,
        properties: {
          blacklist: {
            type: "array",
            title: "Black list",
            order: 0,
            description: "Do not publish diagnostics to blacklisted files.",
            items: {
              type: "string",
            },
            default: []
          },
          whitelist: {
            type: "array",
            title: "White list",
            order: 1,
            description: "",
            items: {
              type: "string",
            },
            default: []
          },
          onChange: {
            type: "integer",
            title: "On change (ms)",
            order: 2,
            description: "Time to wait before computing diagnostics for textDocument/didChange.",
            default: 1000
          },
          onOpen: {
            type: "integer",
            title: "On open (ms)",
            order: 3,
            description: "Time to wait before computing diagnostics for textDocument/didOpen.",
            default: 0
          },
          onSave: {
            type: "integer",
            title: "On save (ms)",
            order: 4,
            description: "Time to wait before computing diagnostics for textDocument/didSave.",
            default: 0
          },
          spellChecking: {
            type: "boolean",
            title: "Spell checking",
            order: 5,
            description: "",
            default: true
          }
        }
      },
      "highlight": {
        type: "object",
        title: "Highlight",
        order: 80,
        properties: {
          blacklist: {
            type: "array",
            title: "Black list",
            order: 0,
            description: "Do not publish semantic highlighting blacklisted files.",
            items: {
              type: "string",
            },
            default: []
          },
          whitelist: {
            type: "array",
            title: "White list",
            order: 1,
            description: "Publish semantic highlighting for whitelisted files.",
            items: {
              type: "string",
            },
            default: []
          },
          largeFileSize: {
            type: "integer",
            title: "Large file size (bytes)",
            order: 2,
            description: "Disable semantic highlighting for files larger than the size.",
            default: 2097152
          },
          lsRanges: {
            type: "boolean",
            title: "Use line/character or position",
            order: 3,
            description: "true: LSP line/character, false: position",
            default: false
          }
        }
      },
      "index": {
        type: "object",
        title: "Index",
        order: 90,
        properties: {
          blacklist: {
            type: "array",
            title: "Black list",
            order: 0,
            description: "EMCAScript regex of a translation unit's absolute path to be not indexed.",
            items: {
              type: "string",
            },
            default: []
          },
          whitelist: {
            type: "array",
            title: "White list",
            order: 1,
            description: "EMCAScript regex of a translation unit's absolute path to be indexed",
            items: {
              type: "string",
            },
            default: []
          },
          initBlacklist: {
            type: "array",
            title: "Init black list",
            order: 2,
            description: "EMCAScript regex of a translation unit's absolute path to be not indexed.",
            items: {
              type: "string",
            },
            default: []
          },
          initWhitelist: {
            type: "array",
            title: "Init white list",
            order: 3,
            description: "EMCAScript regex of a translation unit's absolute path to be indexed",
            items: {
              type: "string",
            },
            default: []
          },
          multiVersionBlacklist: {
            type: "array",
            title: "MultiVersion black list",
            order: 4,
            description: "EMCAScript regex of a translation unit's absolute path to be indexed in a single version.",
            items: {
              type: "string",
            },
            default: []
          },
          multiVersionWhitelist: {
            type: "array",
            title: "MultiVersion white list",
            order: 4,
            description: "EMCAScript regex of a translation unit's absolute path to be indexed in multi versions.",
            items: {
              type: "string",
            },
            default: []
          },
          comments: {
            type: "integer",
            title: "Comments",
            order: 5,
            description: "",
            default: 2,
            enum: [
              {value: 0, description: "None"},
              {value: 1, description: "Doxygen"},
              {value: 2, description: "All"},
            ]
          },
          trackDependency: {
            type: "integer",
            title: "Track dependency",
            order: 6,
            description: "Whether to reparse a file if write times of its dependencies have changed.",
            default: 2,
            enum: [
              {value: 0, description: "No"},
              {value: 1, description: "On initial load"},
              {value: 2, description: "Yes"},
            ]
          },
          maxInitializerLines: {
            type: "integer",
            title: "Max initializer lines",
            order: 7,
            description: "Maximum lines in variable initializer/macro replacement-list to be included in the detailed_name.",
            default: 5,
          },
          multiVersion: {
            type: "integer",
            title: "Multiversion",
            order: 8,
            description: "If not 0, a file will be indexed in each tranlation unit that includes it.",
            default: 0,
          },
          onChange: {
            type: "boolean",
            title: "Index on change",
            order: 8,
            description: "Allow indexing on textDocument/didChange.",
            default: false,
          },
          threads: {
            type: "integer",
            title: "Indexing thread",
            order: 10,
            description: "Number of indexer threads. If 0, 80% of cores are used.",
            default: 0,
          },
        }
      }
    }
  },
  logFile: {
    type: "string",
    title: "Path for ccls to write its log",
    description: "Path to the write where ccls should direct its log.",
    default: "/tmp/ccls.log",
    order: 20,
  },
  logVerbosity: {
    type: "boolean",
    title: "Enable verbose log",
    description: "Whether to enable verbose log.",
    default: false,
    order: 30,
  },
  enableSemanticHighlighting: {
    type: "boolean",
    title: "Enable semantic highlighting",
    description: "Whether to enable semantic highlighting.",
    default: false,
    order: 40,
  }
};
