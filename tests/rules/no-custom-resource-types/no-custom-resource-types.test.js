const path = require('path');
const { RuleTester } = require('eslint');
const subject = require('../../../lib/rules/no-custom-resource-types.js');
const ruleTester = new RuleTester();

ruleTester.run(
  'no-custom-resource-types',
  subject,
  { // checks
    // 'invalid' checks cases that should not pass
    valid: [
      {
        code: '',
        name: 'without custom resource types',
        filename: path.resolve(__dirname, 'valid', 'component-definition.json')
      }
    ],
    invalid: [
      {
        code: '',
        name: 'with custom resource type',
        filename: path.resolve(__dirname, 'invalid', 'component-definition.json'),
        errors: [{
          message: 'Do not use custom resource type myapp/components/navigation',
          line: 13,
          column: 18,
          endLine: 13,
          endColumn: 63
        },]
      }
    ],
  }
);
