export const productSelectors = {
  productDetail: {
    name: "h1",
    price: "div[data-appears-component-name] p",
    description: "p[data-product-details-description-text-content]",
    sizes: "#variation-selector-1 option",
    image: "img[data-src-zoom-image]",
  },
  variationColor: "#variation-selector-0",
  variationSize: "#variation-selector-1",
  homepageRowContainer: ".wt-body-max-width.homepage-row-container",
  productListItem: "li.wt-block-grid__item.wt-pt-xs-0.wt-pb-xs-1.wt-pb-md-0",
  nextCategoryButton: "a.wt-btn.wt-btn--transparent.wt-btn--small",
  shoppingWindow: ".shopping-window",
  singleProductButton:
    "a.wt-btn.wt-btn--outline.wt-pl-xs-7.wt-pr-xs-7.wt-mt-xs-4",
};
