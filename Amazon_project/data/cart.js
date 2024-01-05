export const cart = [];
export function addToCart(productId)
{
  let matchingItem;
  let proquantityele=document.querySelector(`.js-select-${productId}`);
  let proquantity=proquantityele.value;
  let quantity=Number(proquantity);

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity
    });
  }
}