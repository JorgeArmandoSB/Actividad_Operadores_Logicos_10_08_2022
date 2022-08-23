addEventListener("DOMContentLoaded", (e)=>{
    let form = document.querySelector("form");
    let vista = document.querySelector("input[name=vista]");
    let operador = document.querySelector('#mostrar');
    let cajaAND = document.querySelector("#cajaAND");
    let cajaOR = document.querySelector("#cajaOR");
    let cajaNOT = document.querySelector("#cajaNOT");
    let AND = document.querySelector("#miRespuestaPHPAND");
    let OR = document.querySelector("#miRespuestaPHPOR");
    let NOTA = document.querySelector("#miRespuestaPHPNOTA");
    let NOTB = document.querySelector("#miRespuestaPHPNOTB");
    form.addEventListener("submit", async(e)=>{
        e.preventDefault();
        AND.innerHTML = "";
        OR.innerHTML = "";
        NOTA.innerHTML = "";
        NOTB.innerHTML = "";
        let checkboxInput = document.querySelectorAll("input[type='checkbox']");
        let checkboxNames = [];
        checkboxInput.forEach(res => checkboxNames.push(res.name));
        checkboxInput = new Set(checkboxNames);
        checkboxNames = [... checkboxInput];
        let input = new FormData(e.target);
        let json = Object.fromEntries(input.entries());
        checkboxNames.forEach(res => json[res] = input.getAll(res));

        let config = {
            method: form.method, 
            body: JSON.stringify(json)
        };
        let peticion = await fetch(form.action, config);
        let data = await peticion.json();
        console.log(json)
        switch (json.logicos) {
            case "and":
                AND.insertAdjacentHTML("afterend" , `<div class="container__celda container__celda--c18  color2"><p class="text" data-numero="${data.Respuesta.A}"></p></div><div class="container__celda container__celda--c19 color2"><p class="text" data-numero="${data.Respuesta.B}"></p></div><div class="container__celda container__celda--c20 color2"><p class="text" data-numero="${data.Respuesta.res}"></p></div>`);
                break;
            case "or":
                OR.insertAdjacentHTML("afterend" , `<div class="container__celda container__celda--c18  color2"><p class="text" data-numero="${data.Respuesta.A}"></p></div><div class="container__celda container__celda--c19 color2"><p class="text" data-numero="${data.Respuesta.B}"></p></div><div class="container__celda container__celda--c20 color2"><p class="text" data-numero="${data.Respuesta.res}"></p></div>`);
                break;
            case "not":
                console.log(data);
                NOTA.insertAdjacentHTML("afterend" ,  `<div class="container__celda container__celda--x9 color2"><p class="text" data-numero="${data.Respuesta.A}"></p></div><div class="container__celda container__celda--x10 color2"><p class="text" data-numero="${data.Respuesta.res[0]}"></p></div>`);
                NOTB.insertAdjacentHTML("afterend" , `<div class="container__celda container__celda--x9 color2"><p class="text" data-numero="${data.Respuesta.B}"></p></div><div class="container__celda container__celda--x10 color2"><p class="text" data-numero="${data.Respuesta.res[1]}"></p></div>`);
                break;
        }
    })
    vista.addEventListener("change", (e)=>{
        let p = document.querySelectorAll("section div p");
        if(e.target.checked){
            p.forEach(element => {
                element.dataset.numero = (element.dataset.numero=="V") ? "1" : "0"; 
            });
        }else{
            p.forEach(element => {
                element.dataset.numero = (parseInt(element.dataset.numero)) ? "V" : "F"; 
            });
        }
    })
    operador.addEventListener("click", (e)=>{
        if(e.target.localName != "div"){
            switch (e.target.value) {
                case "and":
                    cajaAND.classList.remove("activa");
                    cajaOR.classList.add("activa");
                    cajaNOT.classList.add("activa");
                    break;
                case "or":
                    cajaAND.classList.add("activa");
                    cajaOR.classList.remove("activa");
                    cajaNOT.classList.add("activa");
                    break;
                case "not":
                    cajaAND.classList.add("activa");
                    cajaOR.classList.add("activa");
                    cajaNOT.classList.remove("activa");
                    break;
            }
        }
    })





    
})


    

    
