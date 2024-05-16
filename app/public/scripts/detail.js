const queries = new URL(location.href);
const pid = queries.searchParams.get("id");

const template = (data) => `<a href="/pages/details.html?id=${data._id}" class="card m-4" style="width: 12rem;">
<img src="${data.photo}"  style="width: 12rem" class="card-img-top" alt="${data._id}">
<div class="card-body">
  <h5 class="card-title">${data.title}</h5>
  <p class="card-text">Precio: ${data.price}</p>
  <p class="card-text">Disponibles: ${data.stock}</p>
  <button type="button" class="btn btn-primary">Add to cart</button>
</div>
</a>`;

fetch("/api/products/" + pid)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const detail = data.response;
        const templateDetail = template(detail);
        document.querySelector("#detail").innerHTML = templateDetail; 
    })
    .catch((error) => console.log(error));
