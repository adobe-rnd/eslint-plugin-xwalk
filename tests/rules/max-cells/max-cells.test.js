const path = require('path');
const { RuleTester } = require('eslint');
const maxCellsRule = require('../../../lib/rules/max-cells');
const ruleTester = new RuleTester();

ruleTester.run(
  'max-cells',
  maxCellsRule,
  { // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: '',
        name: 'default confgiuration',
        options: [],
        filename: path.resolve(__dirname, 'component-models.json'),
      },
      {
        code: '',
        name: 'limited to 2 cells per block with specifc exclusions',
        options: [{
          '*': 2,
          'model-with-4-fields': 4,
          'model-with-2-tabs-2-fields-each': 4,
          'model-with-2-containers-2-fields-each': 4
        }],
        filename: path.resolve(__dirname, 'component-models.json'),
      }
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: '',
        name: 'limited to 1 cell per block',
        options: [{
          '*': 1
        }],
        filename: path.resolve(__dirname, 'component-models.json'),
        errors: [
          {
            message: 'Avoid using more then 1 cells in a block, found 4',
            line: 17,
            column: 4,
            endLine: 41,
            endColumn: 5
          },
          {
            message: 'Avoid using more then 1 cells in a block, found 2',
            line: 67,
            column: 4,
            endLine: 101,
            endColumn: 5
          },
          {
            message: 'Avoid using more then 1 cells in a block, found 4',
            line: 102,
            column: 4,
            endLine: 136,
            endColumn: 5
          },
          {
            message: 'Avoid using more then 1 cells in a block, found 4',
            line: 137,
            column: 4,
            endLine: 173,
            endColumn: 5
          }
        ]
      }
    ],
  }
);
