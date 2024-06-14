# Do not use collapsible field name suffixes without the actual field being present in the model (`xwalk/no-orphan-collapsible-fields`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Field collapsing is the mechanism to render a single sematnic HTML element form multiple propertis. That enables developers to set the image alt text, a link text and title or the type of a heading for example.

Some suffixes of field names are reserved for some specific behaviour. Using them without the respective field is not recommended. For example, you may not use the field name `cfModelType` without the respective `cfModel` field. 

For more details and examples see [Content Modeling for AEM authoring with Edge Delivery Services Projects](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/aem-authoring/content-modeling#field-collapse).


| Suffix | Behaviour |
| ------ | --------- |
| Alt | Used as `alt` text for images. |
| Text | Used as `#text` node for links and any reference `field` that has a `fieldText` will be treated as link, no matter the mime type of the resolved resource. |
| Title | Used as `title` for links. |
| Type | Used as type of heading (`<h1>` - `<h6>`), or a type of a link (`primary` or `secondary`) |
| Mime Type | Used to indicate that a reference `field` is of a specific mime type to facilitate type inference, and render for example images with an absolute url as `<img>`
