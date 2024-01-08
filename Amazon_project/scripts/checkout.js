import { cart,saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { removeproduct } from "../data/cart.js";

let carthtml='';
cart.forEach((cartitem,index)=>{
    let productId=cartitem.productId;
    let matchingitm;
    products.forEach((product)=>{
        if(productId===product.id)
        {
            matchingitm=product;
        }
    });
    carthtml+=`
    <div class="cart-item-container js-cart-item-${matchingitm.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingitm.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingitm.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingitm.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-update-value-${matchingitm.id}">${cartitem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" 
                  data-product-id="${matchingitm.id}">
                    Update
                  </span>
                  <div class="js-update-input-box-${matchingitm.id}" style="display:inline-block"></div>
                  <span class="delete-quantity-link link-primary js-delete" 
                  data-product-id="${matchingitm.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${index}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>                
        </div>
      </div>
    </div>`;
});
  
document.querySelector('.js-order-summary').innerHTML=carthtml;


let updateelement=document.querySelectorAll('.js-update-quantity');
updateelement.forEach((link)=>{
  link.addEventListener('click',()=>{
    link.style.display='none';
    let productId=link.dataset.productId;
    let updateele=document.querySelector(`.js-update-input-box-${productId}`);
    updateele.innerHTML=`
    <input type=number class="js-update-input-${productId}" style="width:30px">
    <span class="js-update-quantity-save-${productId} link-primary" data-product-id="${productId}">Save</span>`;

    let savelink=document.querySelector(`.js-update-quantity-save-${productId}`);
    savelink.style.display='inline-block';
    updateele.style.display='inline-block';
    savelink.addEventListener('click',()=>{
      let updateinput=document.querySelector(`.js-update-input-${link.dataset.productId}`).value;
      if(updateinput>0){
        let matchingItem;
        cart.forEach((product)=>{
          if(product.productId===productId){
            matchingItem=product;
          }
        });
        matchingItem.quantity=Number(updateinput);
        document.querySelector(`.js-update-value-${productId}`).innerHTML=matchingItem.quantity;
        savelink.style.display='none';
        updateele.style.display='none';
        link.style.display='inline-block';
        saveToStorage();
      }else{
        alert("Update value must be greater than zero");
      }
    });
    
  });
});







document.querySelectorAll('.js-delete').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    removeproduct(productId);
    let productele=document.querySelector(`.js-cart-item-${productId}`);
    productele.remove();
    updateCheckoutItems();
  })
});
updateCheckoutItems();
function updateCheckoutItems(){
  document.querySelector('.js-checkout-items').innerHTML=`${cart.length} items`;
}
