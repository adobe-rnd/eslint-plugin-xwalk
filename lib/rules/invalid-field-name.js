const { makeComponentModelsRule } = require("../base-rule");
const {findLocationOfField} = require('../ast');

const VALID_CHARACTERS = /^[a-zA-Z][a-zA-Z0-9_\-:]*$/;

function validate(name) {
  // if name is null or empty it is invalid, if name starts with a digit it is invalid
  if (name === null || name === '') {
    return {
      valid: false,
      messageId: 'emptyName',
    };
  }

  // test to see if the name has more than 1 underscore or colon in it
  const invalidChar = ['_', ':'].find(char => name.split(char).length > 2);
  if (invalidChar) {
    return {
      valid: false,
      messageId: 'multipleCharUsed',
      char: invalidChar,
      fieldName: name,
    };
  }

  if (!VALID_CHARACTERS.test(name)) {
    return {
      valid: false,
      messageId: 'invalidFieldCharacter',
      fieldName: name
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
        /* eslint-disable no-unused-vars */
        const { valid, messageId, ...data } = result;
        ruleContext.report({
          ruleId: "invalid-field-name",
          messageId: result.messageId,
          data,
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
      description: "Restrict characters used in field names.",
      category: "Best Practices",
      recommended: true
    },
    schema: [],
    messages: {
      invalidFieldCharacter: 'Avoid using invalid characters in field name "{{ fieldName }}"',
      emptyName: 'Fields may not have a empty name',
      multipleCharUsed: 'Avoid using more than one {{ char }} characters in field "{{ fieldName }}"',
    }
  },
  create
}
