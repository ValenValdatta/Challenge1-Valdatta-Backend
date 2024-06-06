document.querySelector("#register").addEventListener("click", async () => {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      photo: document.querySelector("#photo").value || "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
      age: document.querySelector("#age").value || "18",
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/register", opts);
    response = await response.json();
    if (response.statusCode === 201) {
        return location.replace("/pages/login.html");
    }
    return Swal.fire({
      title: response.message,
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#ff3b3c",
    });
  });