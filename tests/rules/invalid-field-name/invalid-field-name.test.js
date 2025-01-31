const path = require('path');
const { RuleTester } = require('eslint');
const subject = require('../../../lib/rules/invalid-field-name.js');
const ruleTester = new RuleTester();

ruleTester.run(
  'invalid-field-name',
  subject,
  {
    valid: [
      {
        code: '',
        name: 'with valid field',
        filename: path.resolve(__dirname, 'valid', 'component-models.json')
      }
    ],
    invalid: [
      {
        code: '',
        name: 'with invalid field',
        filename: path.resolve(__dirname, 'invalid', 'component-models.json'),
        errors: [
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "my node"',
            line: 6,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 6,
            endColumn: 27
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "  leadingSpace"',
            line: 11,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 11,
            endColumn: 34
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "trailingSpace "',
            line: 16,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 16,
            endColumn: 34
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "1node"',
            line: 21,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 21,
            endColumn: 25
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "my/node"',
            line: 26,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 26,
            endColumn: 27
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "my[node]"',
            line: 31,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 31,
            endColumn: 28
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "my|node"',
            line: 36,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 36,
            endColumn: 27
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "my*node"',
            line: 41,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 41,
            endColumn: 27
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "my\\backslash"',
            line: 46,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 46,
            endColumn: 33
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name ".onedot"',
            line: 51,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 51,
            endColumn: 27
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "node\x00name"',
            line: 56,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 56,
            endColumn: 34
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "node\tname"',
            line: 61,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 61,
            endColumn: 30
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "node\nname"',
            line: 66,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 66,
            endColumn: 30
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Fields may not have a empty name',
            line: 71,
            column: 10,
            nodeType: null,
            messageId: 'emptyName',
            endLine: 71,
            endColumn: 20
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "🎉"',
            line: 76,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 76,
            endColumn: 22
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using invalid characters in field name "_grouping"',
            line: 81,
            column: 10,
            nodeType: null,
            messageId: 'invalidFieldCharacter',
            endLine: 81,
            endColumn: 29
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using more than one _ characters in field "abc_group1_group2"',
            line: 86,
            column: 10,
            nodeType: null,
            messageId: 'multipleCharUsed',
            endLine: 86,
            endColumn: 37
          },
          {
            ruleId: 'invalid-field-name',
            severity: 1,
            message: 'Avoid using more than one : characters in field "my:node:name"',
            line: 91,
            column: 10,
            nodeType: null,
            messageId: 'multipleCharUsed',
            endLine: 91,
            endColumn: 32
          }
        ].map((error) => {
          // allows for quick cut and paste from the console output into the
          // errors array, as to baseline the errors is a pain
          /* eslint-disable no-unused-vars */
          const {
            ruleId,
            severity,
            nodeType,
            message,
            ...rest
          } = error;
          return rest;
        })
      }
    ],
  }
);
