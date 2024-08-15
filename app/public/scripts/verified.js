document.querySelector("#verified").addEventListener("click", async () => {
   const data = {
      email: document.querySelector("#email").value,
      code: document.querySelector("#code").value,
   };
   const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
   };
   let response = await fetch("/api/sessions/verify", opts);
   response = await response.json();
   console.log(response);
   if (response.statusCode === 200) {
      // localStorage.setItem("token", response.token);
      return location.replace("/");
   }
   return Swal.fire({
      title: response.message,
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#ff3b3c",
   });
});
