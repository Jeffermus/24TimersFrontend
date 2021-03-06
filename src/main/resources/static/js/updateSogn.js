const updateSognForm = document.getElementById('updateSognForm');
const sognekode = document.getElementById('sognekode');
const sognenavn = document.getElementById('sognenavn');
const sognid = document.getElementById('sognid');
const nedlukning = document.getElementById('nedlukning');
const smittetryk = document.getElementById('smittetryk');

// document.getElementById er et objekt

updateSognForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    UpdateSognFetch();

});

// ======== INITIALIZE SOGN DATA ===========
GetSognData().then(data =>{
console.log(data)
    insertSognInformationsData(data);
})

function GetSognData(){
    let thePath = window.location.pathname;
    const id = thePath.substring(thePath.lastIndexOf('/')+1)

    const GetOneSognWIdUrl = `http://localhost:5002/select/one/sogn/${id}`;

    console.log(id)

    const requestOptions = {
        'content-type' : 'application/json',
        method: 'GET',
        redirect: 'follow'
    }

    return fetch(GetOneSognWIdUrl, requestOptions)
        .then(response => response.json())
        .then((responseData) => {
            return responseData;
        })
        .catch(error => console.warn(error));
}

// ========= INSERT SOGN INFORMATIONS DATA
function insertSognInformationsData(data){
    sognid.value = data.id;
    sognenavn.value = data.sognenavn;
    sognekode.value = data.sognekode;
    smittetryk.value = data.smittetryk;
    console.log(smittetryk)
    console.log(data.sognenavn)
    console.log(data.sognekode)
}


//======== FETCH UPDATE SOGN ========

function UpdateSognFetch(){
    let lukket;
    if(nedlukning.value == ""){
         lukket = 0;
    }else{
         lukket = 1;
    }
    console.log(lukket)
    console.log(nedlukning.value)
    const url = 'http://localhost:5002/edit/sogn'
    const request = {
        method: 'PUT',
        body: JSON.stringify({
            "id": sognid.value,
            "sognekode": sognekode.value,
            "sognenavn": sognenavn.value,
            "lukket"    : lukket,
            "smittetryk": smittetryk.value,
            "nedlukning": nedlukning.value,
            "kommune": {
                "id": 1,
                "navn": "test",
                "smittetryk": 49,

            }
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }
    console.log(request);
    fetch(url,request)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
        window.location.href = "/"
        console.log(data)
    }).catch(function (error) {
        console.warn('Something went wrong.', error);


    });
}