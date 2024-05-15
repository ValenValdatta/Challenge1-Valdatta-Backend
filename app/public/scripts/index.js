const template = (data) => `<a href="/pages/details.html?id=${data._id}" class="card m-2" style="width: 12rem;">
<img src="${data.photo}"  style="width: 12rem" class="card-img-top" alt="${data._id}">
<div class="card-body">
  <h5 class="card-title">${data.title}</h5>
  <p class="card-text">${data.price}</p>
  <p class="card-text">${data.stock}</p>
  <button type="button" class="btn btn-primary">Add to cart</button>
</div>
</a>`;

fetch("/api/products")
   .then((res) => res.json())
   .then((res) => {
      console.log(res);
      const products = res.response;
      document.querySelector("#products").innerHTML = products
         .map((each) => template(each))
         .join("");
   })
   .catch((err) => console.log(err));
