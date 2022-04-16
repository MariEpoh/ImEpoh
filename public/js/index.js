
document.getElementById("cat0").addEventListener("click", () => {
    axios.get("/cat0_toggle").then((req, res) => {
        console.log("cat0 toggle");
    })
})


document.getElementById("cat1").addEventListener("click", () => {
    axios.get("/cat1_toggle").then((req, res) => {
        console.log("cat1 toggle");
    })
})


document.getElementById("cat2").addEventListener("click", () => {
    axios.get("/cat2_toggle").then((req, res) => {
        console.log("cat2 toggle");
    })
})

document.getElementById("cat0off").addEventListener("click", () => {
    axios.get("/cat0_toggle").then((req, res) => {
        console.log("cat0 toggle");
    })
})


document.getElementById("cat1off").addEventListener("click", () => {
    axios.get("/cat1_toggle").then((req, res) => {
        console.log("cat1 toggle");
    })
})


document.getElementById("cat2off").addEventListener("click", () => {
    axios.get("/cat2_toggle").then((req, res) => {
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
    });
    axios.get('cat_state').then((res) => {
        let cat = res.data;
        if(cat.cat0){
            document.getElementById("cat0").style.display = "block";
            document.getElementById("cat0off").style.display = "none";
        }
        else {
            document.getElementById("cat0").style.display = "none";
            document.getElementById("cat0off").style.display = "block";
        }
        if(cat.cat1){
            document.getElementById("cat1").style.display = "block";
            document.getElementById("cat1off").style.display = "none";
        }
        else {
            document.getElementById("cat1").style.display = "none";
            document.getElementById("cat1off").style.display = "block";
        }
        if(cat.cat2){
            document.getElementById("cat2").style.display = "block";
            document.getElementById("cat2off").style.display = "none";
        }
        else {
            document.getElementById("cat2").style.display = "none";
            document.getElementById("cat2off").style.display = "block";
        }
    })

}, 250);