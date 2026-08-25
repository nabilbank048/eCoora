

const firebaseConfig = {
    apiKey: "AIzaSyCL1wEdp0ViHXnXhDr_kvuZFoM6ZihTU9s",
    authDomain: "eghatail-29bc3.firebaseapp.com",
    databaseURL: "https://eghatail-29bc3-default-rtdb.firebaseio.com",
    projectId: "eghatail-29bc3",

    storageBucket: "eghatail-29bc3.firebasestorage.app",
    messagingSenderId: "321001114933",
    appId: "1:321001114933:web:ea04ec1005b15ef14d107c",
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const database = firebase.database();


var uid = sessionStorage.getItem("uid");
var gtotal = sessionStorage.getItem("gtotal");
var count = sessionStorage.getItem("count");
console.log(uid);

const itemsRef = database.ref('cart').child(uid);

let torder = 0;


var totalorder = firebase.database().ref().child("order");




totalorder.once("value").then(function (snapshot) {



    torder = snapshot.numChildren();





});



const itemsList = document.getElementById('itemsList');


const errorSpan = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const addError = document.getElementById('addError');


console.log(itemsRef);

itemsRef.once('value')
    .then(snapshot => {
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            const li = document.createElement('div');








            li.innerHTML = `


                   <div class="d-flex justify-content-between">
                            <p>${data.food_name}</p>
                            <p style="font-weight: bold;">৳ ${data.total}</p>
                        </div>

                                        
                                     

          `;


            console.log(li)
            itemsList.appendChild(li);
        });





        $('#gtotal').html(gtotal);
        $('#stotal').html(gtotal);
    });





function next() {

    const cname = document.getElementById('cname').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;









    let myDate = new Date();

    let hours = myDate.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutes = myDate.getMinutes();
    let second = myDate.getSeconds();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let myTime = hours + ":" + minutes + ":" + second + " " + ampm;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;





    const min = 1000000;
    const max = 9999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;



    const itemsRef2 = database.ref('cart').child(uid);



    if (cname === '') {
        errorSpan.textContent = 'Name cannot be left empty.';
    }

    else {
        errorSpan.textContent = '';
    }

    if (phone === '') {
        phoneError.textContent = 'Phone cannot be left empty.';
    }
    else {
        //  alert(cname)

        phoneError.textContent = '';

    }

    if (address === '') {
        addError.textContent = 'Address cannot be left empty.';
    }
    else {
        //  alert(cname)


        addError.textContent = '';
    }



    if (cname === '' || address === '' || phone === '') {
        console.log('hhhhhhhhhh')
    }
    else {
        // alert(today +' - '+myTime)

        // alert(randomNumber)


        var ref7 = firebase.database().ref().child("order_list").child(10000000 - torder);


        console.log(itemsRef2)

        const itemsRef5 = database.ref('cart').child(uid);







        var ref8 = firebase.database().ref().child("order").child(10000000 - torder);






        ref8.set({
            '_address': address,
            '_name': cname,
            '_phone': phone,
            'delivery': 0,
            'dtime': today + ' - ' + myTime,
            'id': 10000000 - torder,
            'items': count,
            'order_id': randomNumber,
            'status': "Pending",
            'subtotal': gtotal,
            'uid': uid,
            'tday':today 

        });


        itemsRef5.once("value").then(function (snapshot) {

            if (snapshot.exists()) {

                const rawData = snapshot.val();




                ref7.set({
                    "order": rawData,



                }).then(() => {
                    const itemsRef6 = database.ref('cart').child(uid);
                    itemsRef6.remove();
                    window.location = "index.html";
                });


            }

            else {
                console.log('no data')
            }










        });










    }


}
