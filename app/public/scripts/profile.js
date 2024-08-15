const template = (data) => `
<img src="${data.photo}"  style="width: 12rem" class="card-img-top" alt="${data.email}">
<div class="card-body">
  <h5 class="card-title">${data.email}</h5>
</div>
</a>`;

fetch("/api/users")
   .then((res) => res.json())
   .then((res) => {
      console.log(res);
      const users = res.response;
      document.querySelector("#users").innerHTML = users
         .map((each) => template(each))
         .join("");
   })
   .catch((err) => console.log(err));
