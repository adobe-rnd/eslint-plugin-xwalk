const { findLocationOfResourceType } = require('../ast');
const { makeComponentDefinitionRule } = require("../base-rule");

const allowedResourceTypePrefixes = [
  'core/franklin/components/',
  'fd/franklin/components/',
  'core/fd/components/form/'
];

function getComponentDefs(componentDef) {
  return (componentDef.groups || [])
    .flatMap(group => group.components || [])
    .map(def => ({
      id: def.id,
      resourceType: def
        && def.plugins
        && def.plugins.xwalk
        && def.plugins.xwalk.page
        && def.plugins.xwalk.page.resourceType || ''
    }))
}

const create = makeComponentDefinitionRule(({ ruleContext, obj: def, getAst }) => {
  for (let { id, resourceType } of getComponentDefs(def)) {
    const isAllowed = allowedResourceTypePrefixes.some(prefix => resourceType.startsWith(prefix));
    if (!isAllowed) {
      ruleContext.report({
        ruleId: "no-custom-resource-types",
        messageId: 'noCustomResourceType',
        data: { resourceType },
        loc: findLocationOfResourceType(getAst(), id)
      });
    }
  }
});

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Do not use custom resource types. Serverside extensibility with customer resource types is not supported.",
      category: "Best Practices",
      recommended: true
    },
    schema: [],
    messages: {
      noCustomResourceType: "Do not use custom resource type {{ resourceType }}"
    }
  },
  create
}
