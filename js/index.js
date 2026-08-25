
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


let total = 0;

var count = '';
var groc = '';
var organic = '';
var dryfis = '';
var ffood = '';

var fproduct = '';


db.collection('fish').get().then((snapshot) => {


    count = snapshot.size;

    console.log('Document count:', count);


    $('#sea').html(count + " Products");



}).catch(err => {

});



db.collection('grocery').get().then((snapshot) => {


    groc = snapshot.size;

    if (groc == 0) {

       $('#groc').html(groc + " Products");
      //  document.getElementById("groc").style.color = "red";

    }

    else {
        $('#groc').html(groc + " Products");

       // document.getElementById("groc").classList.add('text-body');
    }

    console.log('Document count:', count);






}).catch(err => {

});


db.collection('grocery').where('status', '==', 'Active').where('produc_category', '==', 'Organic').get().then((snapshot) => {


    organic = snapshot.size;

    if (organic == 0) {

       $('#orga').html(organic + " Product");
      //  document.getElementById("groc").style.color = "red";

    }

    else {
        $('#orga').html(organic + " Products");

       // document.getElementById("groc").classList.add('text-body');
    }

    console.log('Document count:', count);






}).catch(err => {

});



db.collection('dryfish').get().then((snapshot) => {


    dryfis = snapshot.size;

    console.log('Document count:', count);


    $('#drtfis').html(dryfis + " Products");



}).catch(err => {

});



db.collection('food').get().then((snapshot) => {


    ffood = snapshot.size;

    console.log('Document count:', count);


    $('#ffood').html(ffood + " Products");



}).catch(err => {

});




db.collection('product').get().then((snapshot) => {


    fproduct = snapshot.size;

    console.log('Document count:', count);


    $('#fproduct').html(fproduct + " Products");



}).catch(err => {

});



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


            const numberValue = val.qty;

            total += numberValue;


            console.log(numberValue)





        });




    }

    else {
        total = 0;
    }


    $('#cartcount').html(total);







});




// Fetch data from Firestore and render in the table
db.collection('product').where('status', '==', 'Active').limit(4).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        //  renderAccount(doc);


        const itemsList = document.getElementById('itemsList');
        var content = '';
        const data = doc.data();

        const li = document.createElement('div');


        li.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'pb-1');




        li.innerHTML = `

        

  
                 
                <div class="product-item bg-light mb-4" id= "aaa">
                   <div class="product-img position-relative overflow-hidden" onclick=dtl33("${doc.id}")>
                        <img class="img-fluid w-100" src="${data.imageUrls[0]}" alt=""  onmouseover="this.src='${data.imageUrls[1]}'" 
  onmouseout="this.src='${data.imageUrls[0]}'" style = "height:260px;cursor: pointer;">
  
                   
                    </div>
                    <div class="text-center py-4" style = "cursor: pointer;">
                        <a class="h6 text-decoration-none text-truncate" href="">${data.pro_name}</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            <h5>tk ${data.price}.00</h5>
                        </div>
                
                     
                    </div>
                </div>
    

                   
                                        
                                     

          `;
        itemsList.appendChild(li);



    });
    // $('#atttbl_posts_body').html(content);
}).catch(err => {
    console.log('Error getting documents', err);
});


// 1. Defining the JavaScript array


// Fetch data from Firestore and render in the table
db.collection('grocery').where('status', '==', 'Active').where('produc_category', '==', 'Organic').limit(4).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        //  renderAccount(doc);


        const itemsList2 = document.getElementById('itemsList2');
        var content = '';
        const data = doc.data();

        const dataArray = [];

        const li = document.createElement('div');


        li.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'pb-1');







        // 3. Iterating through the array to generate HTML markup
        let htmlContent = "";

        // 4. Injecting the markup into the page






        li.innerHTML = `

        

  
                 
                <div class="product-item bg-light mb-4" id= "aaa3">
                  <div class="product-img position-relative overflow-hidden" onclick=dtl22("${doc.id}")>
                        <img class="img-fluid w-100" src="${data.imageUrls}" alt=""  onmouseover="this.src='${data.imageUrls}'" 
  onmouseout="this.src='${data.imageUrls}'" style = "height:260px;cursor: pointer;" >
  
                   
                    </div>
                    <div class="text-center py-4" style = "cursor: pointer;">
                        <a class="h6 text-decoration-none text-truncate" href="">${data.item_name}</a>
                    

                        <div class="d-flex align-items-center justify-content-center mt-2">
                            <p><span style="font-weight: bold;">tk ${data.price[0]}.00 </span><span style="font-size: 11px;">থেকে শুরু </span></p>
                        </div>

                      
                    </div>
                </div>
    

                   
                                        
                                     

          `;
        itemsList2.appendChild(li);



    });
    // $('#atttbl_posts_body').html(content);
}).catch(err => {
    console.log('Error getting documents', err);
});






// Fetch data from Firestore and render in the table
db.collection('fish').where('status', '==', 'Active').limit(4).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        //  renderAccount(doc);


        const itemsList3 = document.getElementById('itemsList3');
        var content = '';
        const data = doc.data();

        const li = document.createElement('div');


        li.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'pb-1');


        if (data.pre_order == 'No') {
            content = 'none'
        }
        else {
            content = 'block'
        }




        li.innerHTML = `

        

  
                 
                <div class="product-item bg-light mb-4" id= "aaa">
                    <div class="product-img position-relative overflow-hidden" onclick=dtl("${doc.id}")>
                        <img class="img-fluid w-100" src="${data.imageUrls[0]}" alt=""  onmouseover="this.src='${data.imageUrls[1]}'" 
  onmouseout="this.src='${data.imageUrls[0]}'" style = "height:260px;cursor: pointer;">


      
   <div class="overlay-text" style="display:${content};">${data.pre_order}</div>
                   
                    </div>
                    <div class="text-center py-4" style = "cursor: pointer;" >
                        <a class="h6 text-decoration-none text-truncate" href="">${data.fish_name}</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                          <p><span style="font-weight: bold;">tk ${data.price[0]}.00 </span><span style="font-size: 13px;">থেকে শুরু </span></p>
                            
                        </div>


                
                      
                    </div>
                </div>
    

                   
                                        
                                     

          `;
        itemsList3.appendChild(li);



    });
    // $('#atttbl_posts_body').html(content);
}).catch(err => {
    console.log('Error getting documents', err);
});


function dtl(id) {

    sessionStorage.setItem("details", id);

    window.location = "detail.html";



}


function dtl22(id) {

    sessionStorage.setItem("uid", id);

    window.location = "grocery_details.html";



}



function dtl33(id) {

    sessionStorage.setItem("uid", id);

    window.location = "featured_details.html";



}