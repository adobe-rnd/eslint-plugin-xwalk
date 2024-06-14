const path = require("path");
const fs = require("fs");
const { parse } = require("./ast");

function getFieldNames(model, fieldNames = []) {
  for (const { name, component, ...rest } of model.fields) {
    // ignore tabs
    if (component === 'tab') continue;

    // flatten container
    if (component === 'container') {
      getFieldNames(rest, fieldNames);
      continue;
    }
    fieldNames.push(name);
  }
  return fieldNames;
}

function makeComponentModelsRule(exec) {
  return makeRule('component-models.json', exec);
}

function makeComponentDefinitionRule(exec) {
  return makeRule('component-definition.json', exec);
}

function makeRule(file, exec) {
  return (ruleContext) => {
    const fileName = ruleContext.getFilename();
    const dirname = path.dirname(fileName);
    const baseName = path.basename(fileName);
    if (baseName !== file) return {};

    const fileContent = fs.readFileSync(fileName, 'utf8');
    let ast = null;

    function readFile(file) {
      const absPath = path.join(dirname, file);
      if (fs.existsSync(absPath)) {
        return fs.readFileSync(absPath, 'utf8');
      }
      return null;
    }

    function getAst() {
      if (!ast) ast = parse(fileContent);
      return ast;
    }

    return {
      Program() {
        const obj = JSON.parse(fileContent);
        exec({
          ruleContext,
          obj,
          readFile,
          getAst,
          getFieldNames
        });
      }
    }
  }
}

module.exports = {
  makeComponentModelsRule,
  makeComponentDefinitionRule
}
