# eslint-plugin-xwalk

Custom rules to validate aem-boilerplate-xwalk projects

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-xwalk`:

```sh
npm install eslint-plugin-xwalk --save-dev
```

## Usage

Add `xwalk` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "xwalk"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "xwalk/max-cells": "error"
    }
}
```

Or extend the recommended configuration

```json
{
  "extend" [
    "plugin:xwalk/recommended"
  ]
}
```


## Configurations

<!-- begin auto-generated configs list -->

|    | Name          |
| :- | :------------ |
| ✅  | `recommended` |

<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
✅ Set in the `recommended` configuration.

| Name                                                                       | Description                                                                                               | 💼 |
| :------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- | :- |
| [invalid-field-name](docs/rules/invalid-field-name.md)                     | Restrict characters used in field names.                                                                  | ✅  |
| [max-cells](docs/rules/max-cells.md)                                       | Limit the number of cells in a block.                                                                     | ✅  |
| [no-custom-resource-types](docs/rules/no-custom-resource-types.md)         | Do not use custom resource types. Serverside extensibility with customer resource types is not supported. | ✅  |
| [no-duplicate-fields](docs/rules/no-duplicate-fields.md)                   | Avoid duplicate field names.                                                                              | ✅  |
| [no-orphan-collapsible-fields](docs/rules/no-orphan-collapsible-fields.md) | Do not use collapsible field name suffixes without the actual field being present in the model.           | ✅  |

<!-- end auto-generated rules list -->


