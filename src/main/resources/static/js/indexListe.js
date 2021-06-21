//    ==================================================== GET KOMMUNE ================================================

const myUrl = `http://localhost:5002/select/kommune`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};

fetch(myUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        gotSognData(data)
        console.log(data)
    }).catch(async function(e){
    console.log(e);
})

function gotSognData(data){
    data.forEach(fillTbody)
}

//    ==================================================== FILL Kommune TBODY =========================================
function fillTbody(item, index) {
    const tbody1 = document.querySelector('#tbody1')


    // === CREATE TR ===
    let tr = document.createElement('tr');
    tr.setAttribute('align', 'center');
    tbody1.appendChild(tr);

    // === CREATE TH ===
    let th = document.createElement('th');
    th.textContent = item.id;
    tr.appendChild(th);

    // === CREATE TH ===
    let th1 = document.createElement('th');
    th1.textContent = item.navn;
    tr.appendChild(th1);

    // === CREATE TH ===
    let th2 = document.createElement('th');
    getSmittelist(item.id).then(sum => {
        th2.textContent = sum;
    })
    tr.appendChild(th2);
}


//    ==================================================== GET SOGN  =========================================

const GetReviewUrl  = 'http://localhost:5002/select/sogn';

fetch(GetReviewUrl ,requestOptions)
    .then(response => response.json())
    .then(data => {
        data.forEach(fillTbodySognInfo)
        console.log(data)
    }).catch(function (error){
    console.log(error)
})

//    ==================================================== FILL Sogn TBODY =========================================
function fillTbodySognInfo(item, index) {
    const tbody2 = document.querySelector('#tbody2')


    // === CREATE TR ===
    let tr = document.createElement('tr');
    tr.setAttribute('align', 'center');
    tbody2.appendChild(tr);

    // === CREATE TH ===
    let th = document.createElement('th');
    th.textContent = item.id;
    tr.appendChild(th);

    // === CREATE TH ===
    let th1 = document.createElement('th');
    th1.textContent = item.sognenavn;
    tr.appendChild(th1);

    // === CREATE TH ===
    let th2 = document.createElement('th');
    th2.textContent = item.sognekode;
    tr.appendChild(th2);

    // === CREATE TH ===
    let th3 = document.createElement('th');
    th3.textContent = item.nedlukning;
    tr.appendChild(th3);

    // === CREATE TD ===
    let td = document.createElement('td');
    tr.appendChild(td);

    // === CREATE INPUT ===
    let input = document.createElement('input')
    input.setAttribute('type', 'checkbox');
    if(item.lukket == 1){
        input.checked = true;
    }

    input.disabled = true;
    td.appendChild(input);

    // === CREATE a ===
    let a = document.createElement('a');
    a.setAttribute('class', 'mt-3 w-10 btn btn-info');
    a.href = "/update/sogn/"+ item.id;
    a.textContent = "Updater Sogn";
    tr.appendChild(a);

    // === CREATE a1 ===
    let a1 = document.createElement('a');
    a1.setAttribute('class', 'mt-3 w-10 btn btn-danger');
    a1.setAttribute("onclick", `sletSogn(${item.id})`);
    a1.textContent = "Slet Sogn";
    tr.appendChild(a1);
}

//    ==================================================== GET LISTE AF SMITTETRYK =========================================

    function getSmittelist(id){

    let url = `http://localhost:5002/select/sogn/smittelist/${id}`

    let requestOptions = {
        'content-type' : 'applikationjson',
        method : 'GET',
        redirect : 'follow'
    }
    return fetch(url, requestOptions)
        .then(response => response.json())
            .then(data =>{
                let a = 0;
                for(let i = 0; i < data.length; i++){
                    a += data[i].smittetryk;
                }
                let sum = a / data.length;
                return sum;
            })
        .catch(error => {
            console.log(error);
        })

}


//    ==================================================== DELETE SOGN WITH ID =========================================

function sletSogn(id){
    if (confirm("Vil Du Fjerne Sogn?")){
        const requestOptions = {
            'content-type': 'application/json',
            method: 'DELETE',
            redirect: 'follow'
        };
        const DeleteUrl = `http://localhost:5002/delete/sogn/${id}`
        fetch(DeleteUrl, requestOptions)
            .then(response => response.json())
                .then(data => {
                })
                .catch(error =>{
                    console.log(error);
                    window.location.href = "/";
                })
    }
}