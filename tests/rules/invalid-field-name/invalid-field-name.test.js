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
            line: 6,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 6,
            endColumn: 27
          },
          {
            line: 11,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 11,
            endColumn: 34
          },
          {
            line: 16,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 16,
            endColumn: 34
          },
          {
            line: 21,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 21,
            endColumn: 25
          },
          {
            line: 26,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 26,
            endColumn: 27
          },
          {
            line: 31,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 31,
            endColumn: 27
          },
          {
            line: 36,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 36,
            endColumn: 28
          },
          {
            line: 41,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 41,
            endColumn: 27
          },
          {
            line: 46,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 46,
            endColumn: 27
          },
          {
            line: 51,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 51,
            endColumn: 33
          },
          {
            line: 56,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 56,
            endColumn: 26
          },
          {
            line: 61,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 61,
            endColumn: 27
          },
          {
            line: 66,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 66,
            endColumn: 34
          },
          {
            line: 71,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 71,
            endColumn: 30
          },
          {
            line: 76,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 76,
            endColumn: 30
          },
          {
            line: 81,
            column: 10,
            messageId: 'emptyName',
            endLine: 81,
            endColumn: 20
          },
          {
            line: 86,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 86,
            endColumn: 22
          },
          {
            line: 91,
            column: 10,
            messageId: 'invalidFieldCharacter',
            endLine: 91,
            endColumn: 29
          },
          {
            line: 96,
            column: 10,
            messageId: 'invalidGrouping',
            endLine: 96,
            endColumn: 37
          }
        ]
      }
    ],
  }
);
