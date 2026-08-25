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


function getOrCreateDeviceID() {
    let deviceId = localStorage.getItem('device_uuid');
    if (!deviceId) {
        // Generates a cryptographically strong unique random ID
        deviceId = crypto.randomUUID();
        localStorage.setItem('device_uuid', deviceId);
    }
    return deviceId;
}

let qty = 1;
var price = '';
let total;

var totaluser = firebase.database().ref().child("cart").child(getOrCreateDeviceID());


totaluser.once("value").then(function (snapshot) {

    if (snapshot.exists()) {

        total = snapshot.numChildren();
    }

    else {
        total = 0;
    }


    $('#cartcount').html(total);







});



var alluser = firebase.database().ref().child("cart").child(getOrCreateDeviceID());




alluser.once("value").then(function (snapshot) {

    if (snapshot.exists()) {

        var content = '';



        snapshot.forEach(function (data) {



            var val = data.val();

            content += '<tr>';

            content += "<td class= 'align-middle'> <img    width='50'  src='";
            content += val.bimage;

            content += "'/>";

            content += "</td>";

            content += "</td>";
            content += "<td class= 'align-middle' style='text-align: start;'>" + val.food_name + "</td>";
            content += "<td class= 'align-middle' style='text-align: start;'>" + val.price + " tk" + "</td>";

            content += "<td class= 'align-middle'>" + '<div class="input-group quantity mx-auto" style="width: 100px;">' + '<div class="input-group-btn">' + '<button class="btn btn-sm btn-primary btn-minus" onclick=edit("' + data.key + '")>' + ' <i class="fa fa-minus"></i>' + '</button>' + '</div>' + ' <p class="form-control form-control-sm bg-secondary border-0 text-center" >' + val.qty + '</p>' + '<div class="input-group-btn">' + '<button class="btn btn-sm btn-primary btn-plus" >' + ' <i class="fa fa-plus"></i>' + '</button>' + '</div>' + '</div>' + "</td>";

            content += "<td class= 'align-middle' style='text-align: start;'>" + val.total + " tk" + "</td>";

            content += "<td class= 'align-middle' style='text-align: start;'>" + '<button class="btn btn-sm btn-danger"><i class="fa fa-times"></i></button>' + "</td>";

            content += '</tr>';






        });







        $('#atttbl_posts_body').html(content);



    }


});

function edit(key) {

    var ref5 = firebase.database().ref().child("cart").child(getOrCreateDeviceID()).child(key);

    ref5.on("value", function (snapshot4) {
        if (snapshot4.exists()) {



            qty = snapshot4.val().qty + 1;
            price = snapshot4.val().price;




        }


        updateCartUI(key, qty, price);


        //alert(total);


        //console.log(total)






    });






    /*
    
       firebase.database().ref().child("cart").child(getOrCreateDeviceID()).child(key).update({
    
    
            'qty':qty+1,
            'total':total
    
        });
    
        */

}



function updateCartUI(key, qty, price) {





    console.log('qty' + qty);
    console.log('price' + price);




    firebase.database().ref().child("cart").child(getOrCreateDeviceID()).child(key).update({


        'qty': qty,
        'total': qty * price

    }) .then(() => {
        return false;
    });




}