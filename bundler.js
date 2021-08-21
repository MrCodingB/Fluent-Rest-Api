module.exports = class TypescriptDeclarationBundler {
  name = 'TypeScriptDeclarationBundler';

  directiveImportRegExp = /(\/{3} ?<reference types=")([A-Za-z0-9-]+)(" ?\/>)/;
  moduleImportRegExp = /import ({.+}|\*) as ([A-Za-z0-1-]+) from ('|")([A-Za-z0-1-]+)('|");/;

  options = {
    output: 'index.d.ts',
    exclude: undefined
  };

  constructor(options) {
    this.options = { ...this.options, ...options };
  }

  mergeDeclarations(declarationFiles) {
    let mergedFileText = '';

    for (const asset of declarationFiles) {
      const file = asset.source().split('\n');

      for (const line of file) {
        if (!line.startsWith('import') && !line.startsWith('/// ') && !/export +\{\};?/.test(line)) {
          mergedFileText += line + '\n';
        }
      }
    }

    return mergedFileText;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.name, (compilation, callback) => {
      const declarationFiles = [];

      for (const name in compilation.assets) {
        if (name.endsWith('.d.ts') && !this.options.exclude?.test(name)) {
          declarationFiles.push(compilation.assets[name]);
          delete compilation.assets[name];
        }
      }

      if (declarationFiles.length > 0) {
        const mergedDeclarationFile = this.mergeDeclarations(declarationFiles);

        compilation.assets[this.options.output] = {
          source: () => mergedDeclarationFile,
          size: () => mergedDeclarationFile.length
        };
      } else {
        this.log('No TypeScript declarations have been found!');
        this.log('Make sure declarations are activated in tsconfig.json!');
      }

      callback();
    });
  }

  log(m) {
    console.log(`[${this.name}] ${m}`);
  }
};
