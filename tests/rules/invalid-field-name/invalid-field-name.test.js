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
            message: 'Avoid using invalid characters in field name "my node"',
            line: 6,
            column: 10,
            endLine: 6,
            endColumn: 27
          },
          {
            message: 'Avoid using invalid characters in field name "  leadingSpace"',
            line: 11,
            column: 10,
            endLine: 11,
            endColumn: 34
          },
          {
            message: 'Avoid using invalid characters in field name "trailingSpace "',
            line: 16,
            column: 10,
            endLine: 16,
            endColumn: 34
          },
          {
            message: 'Avoid using invalid characters in field name "1node"',
            line: 21,
            column: 10,
            endLine: 21,
            endColumn: 25
          },
          {
            message: 'Avoid using invalid characters in field name "my/node"',
            line: 26,
            column: 10,
            endLine: 26,
            endColumn: 27
          },
          {
            message: 'Avoid using invalid characters in field name "my[node]"',
            line: 31,
            column: 10,
            endLine: 31,
            endColumn: 28
          },
          {
            message: 'Avoid using invalid characters in field name "my|node"',
            line: 36,
            column: 10,
            endLine: 36,
            endColumn: 27
          },
          {
            message: 'Avoid using invalid characters in field name "my*node"',
            line: 41,
            column: 10,
            endLine: 41,
            endColumn: 27
          },
          {
            message: 'Avoid using invalid characters in field name "my\\backslash"',
            line: 46,
            column: 10,
            endLine: 46,
            endColumn: 33
          },
          {
            message: 'Avoid using invalid characters in field name ".onedot"',
            line: 51,
            column: 10,
            endLine: 51,
            endColumn: 27
          },
          {
            message: 'Avoid using invalid characters in field name "node\x00name"',
            line: 56,
            column: 10,
            endLine: 56,
            endColumn: 34
          },
          {
            message: 'Avoid using invalid characters in field name "node\tname"',
            line: 61,
            column: 10,
            endLine: 61,
            endColumn: 30
          },
          {
            message: 'Avoid using invalid characters in field name "node\nname"',
            line: 66,
            column: 10,
            endLine: 66,
            endColumn: 30
          },
          {
            message: 'Fields may not have a empty name',
            line: 71,
            column: 10,
            endLine: 71,
            endColumn: 20
          },
          {
            message: 'Avoid using invalid characters in field name "🎉"',
            line: 76,
            column: 10,
            endLine: 76,
            endColumn: 22
          },
          {
            message: 'Avoid using invalid characters in field name "_grouping"',
            line: 81,
            column: 10,
            endLine: 81,
            endColumn: 29
          },
          {
            message: 'Avoid using more than one _ characters in field "abc_group1_group2"',
            line: 86,
            column: 10,
            endLine: 86,
            endColumn: 37
          },
          {
            message: 'Avoid using more than one : characters in field "my:node:name"',
            line: 91,
            column: 10,
            endLine: 91,
            endColumn: 32
          },
          {
            message: 'Avoid using invalid characters in field name "my/invalid/node"',
            line: 101,
            column: 14,
            endLine: 101,
            endColumn: 39
          },
          {
            message: 'Avoid using invalid characters in field name "my/invalid/node"',
            line: 101,
            column: 14,
            endLine: 101,
            endColumn: 39
          }
        ]
      }
    ],
  }
);
