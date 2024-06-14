# Limit the number of cells in a block (`xwalk/max-cells`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Defining content models that are agnostic to a content source, maintainable and easy to work with for both content authors and developers is an art, and probably the most difficult task for developers when starting an Edge Delivery Services project. It is important to continously and carefully spend time on modelling content. 

One thing that is very important is, that the number of "parts" of a block should not grow too much, and if there are many fields they should be combined together to generate a semantically correct representation of the content using field collapsing and element grouping. Both are naming conventions. Field collapsing can be used to combine multiple properties of a block to a single semantic element. For example a link, link title and link text can be represented as `<a href="..." title="...">...</a>`. Element grouping on the other hand allows to concatenate multiple elements into a single cell. For example all the foreground content of a teaser (pretitle, title, description and CTAs) can be grouped in one cell, and all background content (image, mobile image, video) into another. More details and examples can be found in [Content Modeling for AEM authoring with Edge Delivery Services Projects](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/aem-authoring/content-modeling#field-collapse).

The `xwalk/max-cells` rule checks how many cells a block will be rendered as, and it is configured to allow a maxium of `4` cells per default for models that are not used for `key-value` only. 

## Options

<!-- begin auto-generated rule options list -->



<!-- end auto-generated rule options list -->

You can specify the number of allowed cells for each model id or for all model ids.

```
{
  rules: {
    'xwalk/max-cells': ['error', {
      '*': 3,
      'a-specific-model': 4,
      'another-specific-model': 2,
    }]
  }
}
```
