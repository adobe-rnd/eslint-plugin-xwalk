const { findLocationOfField } = require('../ast');
const { makeComponentModelsRule } = require('../base-rule');

function getFieldNames(model, fieldNames = []) {
  for (const { name, component, ...rest } of model.fields) {
    // flatten container
    if (component === 'container') {
      getFieldNames(rest, fieldNames);
    }
    fieldNames.push(name);
  }
  return fieldNames;
}

const create = makeComponentModelsRule(({ ruleContext, obj: models, getAst }) => {
  for (const model of models) {
    const id = model.id;
    const fieldNames = getFieldNames(model);
    const duplicates = fieldNames.filter((item, index) => fieldNames.indexOf(item) !== index);
    if (duplicates.length) {
      for (let duplicate of duplicates) {
        ruleContext.report({
          ruleId: "no-duplicate-names",
          messageId: 'noDuplicateNames',
          loc: findLocationOfField(getAst(), id, duplicate)
        });
      }
    }
  }
});

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Avoid duplicate field names.",
      category: "Possible Errors",
      recommended: true
    },
    schema: [],
    messages: {
      noDuplicateNames: "Do not use duplicate field names"
    }
  },
  create
}
