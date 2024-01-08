export const cart =JSON.parse(localStorage.getItem('cart')) || [
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:3,
  }
];
export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId)
{
  let matchingItem;
  let proquantityele=document.querySelector(`.js-select-${productId}`);
  let proquantity=proquantityele.value;
  let quantity=Number(proquantity);

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    };
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity
    });
  }
  saveToStorage();
};

export function removeproduct(productId){
  let curritem;
  cart.forEach((item)=>{
    if(item.productId===productId){
      curritem=item;
    }
  });
  cart.splice(cart.indexOf(curritem),1);
  saveToStorage();
}