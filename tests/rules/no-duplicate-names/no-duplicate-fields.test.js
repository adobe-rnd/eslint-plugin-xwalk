const path = require('path');
const { RuleTester } = require('eslint');
const subject = require('../../../lib/rules/no-duplicate-fields');
const ruleTester = new RuleTester();

ruleTester.run(
  'no-duplicate-fields',
  subject,
  { // checks
    // 'invalid' checks cases that should not pass
    valid: [
      {
        code: '',
        name: 'without duplicates',
        filename: path.resolve(__dirname, 'valid', 'component-models.json')
      }
    ],
    invalid: [
      {
        code: '',
        name: 'with duplicates',
        filename: path.resolve(__dirname, 'invalid', 'component-models.json'),
        errors: [
          {
            message: 'Do not use duplicate field names',
            line: 6,
            column: 10,
            endLine: 6,
            endColumn: 24
          },
          {
            message: 'Do not use duplicate field names',
            line: 27,
            column: 10,
            endLine: 27,
            endColumn: 24
          },
          {
            message: 'Do not use duplicate field names',
            line: 31,
            column: 10,
            endLine: 31,
            endColumn: 30
          },
          {
            message: 'Do not use duplicate field names',
            line: 34,
            column: 14,
            endLine: 34,
            endColumn: 28
          }
        ]
      }
    ],
  }
);
