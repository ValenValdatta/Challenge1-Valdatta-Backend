const template = (data) => `<a href="/pages/details.html?id=${data.product_id._id}" class="card m-4" style="width: 12rem;">
<img src="${data.product_id.photo}"  style="width: 12rem" class="card-img-top" alt="${data.product_id._id}">
<div class="card-body">
  <h5 class="card-title">${data.product_id.title}</h5>
  <p class="card-text">Precio: ${data.product_id.price}</p>
  <p class="card-text">Cantidad: ${data.quantity}</p>
  <button type="button" class="btn btn-danger">Eliminar</button>
</div>
</a>`;

fetch("/api/carts")
   .then((res) => res.json())
   .then((res) => {
    console.log(res);
    const products = res.response;
    if (!products || products.length === 0) {
        document.querySelector("#carts").innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        document.querySelector("#carts").innerHTML = products
            .map((each) => template(each))
            .join("");
    }
})
.catch((err) => console.log('Fetch error: ', err));