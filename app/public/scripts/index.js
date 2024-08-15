const template = (data) => `<a href="/pages/details.html?id=${data._id}" class="card m-4" style="width: 12rem;">
<img src="${data.photo}"  style="width: 12rem" class="card-img-top" alt="${data._id}">
<div class="card-body">
  <h5 class="card-title">${data.title}</h5>
  <p class="card-text">Precio: ${data.price}</p>
  <p class="card-text">Disponibles: ${data.stock}</p>
  <button type="button" class="btn btn-primary">Agregar al Carrito</button>
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


   // fetch("/api/sessions/login")
   // .then((res) => res.json())
   // .then((res) => {
   //    console.log("Respuesta del servidor:", res);
   //    const user = getCookieValue("email");
   //    if(user) {
   //       document.querySelector("#user").innerHTML = user;
   //    } else {
   //       console.log("no se encontro el email en la cookie");
   //    }
   // })
   // .catch((error) => {
   //    console.error("Error:", error);
   // });