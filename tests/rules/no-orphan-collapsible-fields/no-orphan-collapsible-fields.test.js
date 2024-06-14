const path = require('path');
const { RuleTester } = require('eslint');
const subject = require('../../../lib/rules/no-orphan-collapsible-fields.js');
const ruleTester = new RuleTester();

ruleTester.run(
  'no-orphan-collapsinle-fields',
  subject,
  { // checks
    // 'invalid' checks cases that should not pass
    valid: [
      {
        code: '',
        name: 'with orphans',
        filename: path.resolve(__dirname, 'valid', 'component-models.json')
      }
    ],
    invalid: [
      {
        code: '',
        name: 'without orphans',
        filename: path.resolve(__dirname, 'invalid', 'component-models.json'),
        errors: [
          {
            message: 'Avoid using orphan collapsible field names.',
            line: 6,
            column: 10,
            endLine: 6,
            endColumn: 28
          },
          {
            message: 'Avoid using orphan collapsible field names.',
            line: 11,
            column: 10,
            endLine: 11,
            endColumn: 33
          },
          {
            message: 'Avoid using orphan collapsible field names.',
            line: 16,
            column: 10,
            endLine: 16,
            endColumn: 28
          }
        ]
      }
    ],
  }
);
