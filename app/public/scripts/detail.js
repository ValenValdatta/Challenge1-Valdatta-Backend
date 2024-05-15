const queries = new URL(location.href)
const pid = queries.searchParams.get("id")


fetch("/api/products/"+pid)
    .then(res=>res.json())
    .then(res=>{
        
    })