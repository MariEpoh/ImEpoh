
document.getElementById("cat0").addEventListener("click", () => {
    axios.get("/cat0_toggle").then(() => {
        console.log("cat0 toggle");
    })
})


document.getElementById("cat1").addEventListener("click", () => {
    axios.get("/cat1_toggle").then(() => {
        console.log("cat1 toggle");
    })
})


document.getElementById("cat2").addEventListener("click", () => {
    axios.get("/cat2_toggle").then(() => {
        console.log("cat2 toggle");
    })
})

setInterval(() => {
    axios.get('/epoh_data').then((res) => {
        let elm = document.getElementById("debug");
        elm.innerHTML = "";
        for(const [key, value] of Object.entries(res.data)){
            const para = document.createElement("h6");
            const node = document.createTextNode(`${key}:${value}`);
            para.appendChild(node);
            elm.appendChild(para);
        }
    })
}, 100);