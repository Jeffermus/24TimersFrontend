const createSognForm = document.getElementById('createSognForm');
const sognenavn = document.getElementById('sognenavn');
const sognekode = document.getElementById('sognekode');


//======= EVENT LISTERNER =======================

createSognForm.addEventListener('submit',  function (e) {
    e.preventDefault();
    InsertSognFetch();
});

function InsertSognFetch(){
    const url = 'http://localhost:5002/insert/sogn'
    const request = {
        method: 'POST',
        body: JSON.stringify({
            "sognekode": sognekode.value,
            "sognenavn": sognenavn.value,
            "kommune": {
                "id": 1,
                "navn": "København Kommune",
                "smittetryk": 49,
                "nedlukning": 1609455600000
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