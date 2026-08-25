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
const db = firebase.firestore();


var uid = sessionStorage.getItem("uid");



var item_name = '';

var carouselData = '';

let currentIndex = 0;

var short_des = '';
var order = '';
var price = '';
var descrip = '';
var id = '';

let total = 0;


var weight = '';

let posi = 0;


const imgElement = document.getElementById("carousel-img");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");


function getOrCreateDeviceID() {
    let deviceId = localStorage.getItem('device_uuid');
    if (!deviceId) {
        // Generates a cryptographically strong unique random ID
        deviceId = crypto.randomUUID();
        localStorage.setItem('device_uuid', deviceId);
    }
    return deviceId;
}



  var totaluser = firebase.database().ref().child("cart").child(getOrCreateDeviceID());


         totaluser.once("value").then(function (snapshot) {

        if (snapshot.exists()) {

            
    snapshot.forEach(function (data) {



      var val = data.val();


         const numberValue =  val.qty;

         total += numberValue;


   console.log(numberValue)





    });


         

        }

        else
        {
            total = 0;
        }


        $('#cartcount').html(total);



        



            });





db.collection('grocery').doc(uid).get().then((snapshot) => {




    const userData = snapshot.data();

    item_name = userData.item_name
  //  short_des = userData.short_des;
    order = userData.order;
    price = userData.price;
    descrip = userData.descrip;
    id = userData.id;

    weight = userData.weight;

    carouselData = userData.imageUrls;


    console.log(carouselData);

    




    $('#fish_name').html(item_name);
    $('#short_des').html(short_des);
    $('#order').html('(' + order + " Orders)");
    $('#price').html(price[posi] + ".00 tk");
    $('#descrip').html(descrip);
    img1.src = carouselData;
    img2.src = userData.imageUrls;
    img3.src = userData.imageUrls;


  const fruits = [price];

  console.log(fruits)
  const listContainer = document.getElementById('weight');

  // Loop and append elements to the DOM
  weight.forEach((fruit, index) => {
    const li = document.createElement('div');

    const isChecked = index === 0 ? "checked" : "";

     li.classList.add('custom-control', 'custom-radio', 'custom-control-inline');

          li.innerHTML = `

        

 
                                <input type="radio" class="custom-control-input" id="${fruit}" name="size" value="${fruit}" onclick="getPosition(${index})" ${isChecked}>
                                <label class="custom-control-label" for="${fruit}">${fruit}</label>
                          
    

                   
                                        
                                     

          `;
    //li.textContent = fruit;
    listContainer.appendChild(li);

   
  });

}).catch(err => {

});



  function getPosition(arrayIndex) {
            const chosenValue = weight[arrayIndex];
          

            posi = arrayIndex;

            $('#price').html(price[posi] + ".00 tk");
        }



let data = 1;

document.getElementById("counting").innerText = data;


//creation of increment function
function increment() {
    data = data + 1;
    document.getElementById("counting").innerText = data;
}
//creation of decrement function
function decrement() {

    if (data > 1) {
        data = data - 1;
    } else {
        data = 1;
    }

    document.getElementById("counting").innerText = data;
}


const button = document.getElementById('myBtn');





button.addEventListener('click', function () {

    var ref7 = firebase.database().ref().child("cart").child(getOrCreateDeviceID());
    // alert( getOrCreateDeviceID());

const selectedRadio = document.querySelector('input[name="size"]:checked');

    ref7.push().set({
        'bimage': carouselData,
        'delevaty_fee': 0,
        'food_name': item_name+"("+selectedRadio.value+")",
        'id': id,
        'price': (price[posi]),
        'qty': data,
        'size':selectedRadio.value,
        'shop_name': "e-Ghatail",
        'sources': "eGhatail",
        'total': data*(price[posi]),
        'uid': details


    })   .then(() => {
        window.location = "cart.html";
    });

    



});









