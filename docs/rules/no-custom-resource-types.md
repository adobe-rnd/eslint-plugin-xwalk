# Do not use custom resource types. Serverside extensibility with customer resource types is not supported (`xwalk/no-custom-resource-types`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

AEM based authoring with Edge Delivery Services does not suppot serverside extensibility of the rendering stack. The integration layer fully implement the contract supported for Edge Delivery Services BOYM content sources, which cannot be changed. 

Even if a custom component can render the same semantic HTML contract, it may not resolve any server side references, as causes further issues downstream with cache invalidation or affects the cache hit ratio and hence site performance. 

All use cases of custom blocks must be covered using the generic block component. For more details and examples see [Content Modeling for AEM authoring with Edge Delivery Services Projects](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/aem-authoring/content-modeling#blocks).
