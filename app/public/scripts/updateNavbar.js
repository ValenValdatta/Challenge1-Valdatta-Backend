async function updateNavbar() {
   let template = "";
   let online = await fetch("/api/sessions/");
   online = await online.json();
   console.log(online);
   if (online.statusCode === 200) {
      template = `
      <nav class="navbar navbar-expand-lg bg-primary">
        <div class="container-fluid d-flex">
          <a class="navbar-brand" href="/">HOME</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <div class="navbar-nav">
              <a class="nav-link" href="#" id="profile">Profile</a>
              <a class="nav-link" href="#" id="cart">Cart</a>
              <a class="nav-link" href="" id="signout">Logout</a>
            </div>
          </div>
        </div>
      </nav>`;
      document.querySelector("#update").innerHTML = template;
      document.querySelector("#signout").onclick = async () => {
         const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
         };
         let response = await fetch("/api/sessions/signout", opts);
         response = await response.json();
         if (response.statusCode === 200) {
            
            location.replace("/");
         }
      };
   } else {
      template = `
        <nav class="navbar navbar-expand-lg bg-primary">
            <div class="container-fluid d-flex">
            <a class="navbar-brand" href="/">HOME</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <div class="navbar-nav">
                <a class="nav-link" href="/pages/register.html" id="register">Register</a>
                <a class="nav-link" href="/pages/login.html" id="login">Login</a>
                </div>
            </div>
            </div>
        </nav>`;
        document.querySelector("#update").innerHTML = template;
   }
}

export default updateNavbar;