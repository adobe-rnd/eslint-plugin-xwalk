const { makeComponentModelsRule } = require("../base-rule");
const {findLocationOfField} = require('../ast');

// Leverage the same restrictions that cq:Page uses for node names
const VALID_CHARACTERS = /^[a-zA-Z][a-zA-Z0-9_\-,]*$/;

function validate(name) {
  // if name is null or empty it is invalid, if name starts with a digit it is invalid
  if (name === null || name === '') {
    return {
      valid: false,
      messageId: 'emptyName',
    };
  }

  // test to see if the name has more than 1 underscore in it
  if (name.split('_').length > 2) {
    return {
      valid: false,
      messageId: 'invalidGrouping',
    };
  }

  if (!VALID_CHARACTERS.test(name)) {
    return {
      valid: false,
      messageId: 'invalidFieldCharacter',
    }
  }

  return { valid: true };
}

const create = makeComponentModelsRule(({ ruleContext, obj: models, getAst, getFieldNames }) => {
  for (let model of models) {
    const id = model.id;
    const fieldNames = getFieldNames(model);
    fieldNames.forEach((name) => {
      const result = validate(name);
      if (!result.valid) {
        ruleContext.report({
          ruleId: "invalid-field-name",
          messageId: result.messageId,
          data: { },
          loc: findLocationOfField(getAst(), id, name)
        });
      }
    });
  }
});

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Do not use invalid characters used in field names.",
      category: "Best Practices",
      recommended: true
    },
    schema: [],
    messages: {
      invalidFieldCharacter: "Avoid using invalid characters in field names.",
      emptyName: 'Field name cannot be empty.',
      invalidGrouping: 'Avoid using more than one underscore in field names.'
    }
  },
  create
}
