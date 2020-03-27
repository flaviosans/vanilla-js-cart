/* [A] PRODUCTS DATA */
// Load products from the server via dynamic JS or AJAX
var products = {
    1 : {
      name : "MokBook Ground",
      desc : "Greatest properly off ham exercise all.",
      img : "smiley-1.png",
      price : 2034
    },
    2 : {
      name : "MokBook Casual",
      desc : "Unsatiable invitation its possession nor off.",
      img : "smiley-2.png",
      price : 1247
    },
    3 : {
      name : "iPong Max",
      desc : "All difficulty estimating unreserved increasing the solicitude.",
      img : "smiley-3.png",
      price : 675
    },
    4 : {
      name : "iTab Pork",
      desc : "Had judgment out opinions property the supplied. ",
      img : "smiley-4.png",
      price : 842
    }
  };

  window.addEventListener("load", function(){
    var container = document.getElementById("cart-products"),
      item = null, part = null;
    for(let i in products){
      
      item = document.createElement("div");
      item.classList.add("p-item");

      part = document.createElement("img");
      part.src = products[i]['img'];
      part.classList.add("p-img");
      item.appendChild(part);

      part = document.createElement("div");
      part.innerHTML = products[i]['name'];
      part.classList.add("p-name");
      item.appendChild(part);

      part = document.createElement("div");
      part.innerHTML = products[i]['desc'];
      part.classList.add("p-desc");
      item.appendChild(part);

      part = document.createElement("input");
      part.type = "button";
      part.value = "Add to Cart";
      part.classList.add("p-add");
      part.onclick = cart.add;
      part.dataset.id = i;
      item.appendChild(part);

      container.appendChild(item);
    }
  });

  var cart = {
    data:null,
    items:0,
    load:function () {
      cart.data = localStorage.getItem("cart");
      if(cart.data == null) { cart.data = {}; }
      else {cart.data = JSON.parse(cart.data); }
    },
    save:function(){
      localStorage.setItem("cart", JSON.stringify(cart.data));
    },
    add:function(){
      if(cart.data[this.dataset.id] == undefined){
        var product = products[this.dataset.id];
        cart.data[this.dataset.id] = {
          name:product['name'],
          desc:product['desc'],
          img:product['img'],
          price:product['price'],
          qty:1
        };
      } else {
        cart.data[this.dataset.id]['qty']++;
      }
      cart.save();
      cart.list();
    },
    list:function(){
      cart.items = 0;
      var container = document.getElementById("cart-list"),
        item = null, part = null, product = null;
      container.innerHTML = "";

      var isEmpty = function(obj){
        for(var key in obj){
          if(obj.hasOwnProperty(key)){ return false; }
        }
        return true;
      };

      if(isEmpty(cart.data)){
        item = document.createElement("div");
        item.innerHTML = "Cart is empty";
        container.appendChild(item);
      }
      else {
        var total = 0; subtotal = 0;
        for(var i in cart.data){
          item = document.createElement("div");
          item.classList.add("c-item");
          product = cart.data[i];

          part = document.createElement("input");
          part.type = "number";
          part.value = product['qty'];
          part.dataset.id = i;
          part.classList.add("c-qty");
          part.addEventListener("change", cart.change);
          item.appendChild(part);

          part = document.createElement("span");
          part.innerHTML = product['name'];
          part.classList.add("c-name");
          item.appendChild(part);

          // subtotal
          subtotal = product['qty'] * product['price'];
          total += subtotal;
          container.appendChild(item);

          // Number of items
          cart.items += 1 * product['qty'];
        }

        part = document.createElement("div");
        part.innerHTML = this.items;
        container.appendChild(part);

        
        // Empty buttons
        item = document.createElement("input");
        item.type = "button";
        item.value = "Empty";
        item.addEventListener("click", cart.reset);
        item.classList.add("c-empty");
        container.appendChild(item);

        item = document.createElement("input");
        item.type = "button";
        item.value = `Checkout - R$${total}`;
        item.addEventListener("click", cart.checkout);
        item.classList.add("c-checkout");
        container.appendChild(item);
      }
    },
    change:function(){
      if(this.value == 0){
        delete cart.data[this.dataset.id];
      }
      else{
        cart.data[this.dataset.id]['qty'] = this.value;
      }
      cart.save();
      cart.list();
    },
    reset:function(){
      if(confirm("Empty Cart?")){
        cart.data = {};
        cart.save();
        cart.list();
      }
    },
    checkout:function(){
      var pedido = {};
      pedido.itens = cart.data;
      alert(JSON.stringify(pedido));
    }
  };