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






// Fetch data from Firestore and render in the table
db.collection('dryfish').where('status', '==', 'Active').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        //  renderAccount(doc);


        const itemsList = document.getElementById('itemsList');
        var content = '';
        const data = doc.data();

        const li = document.createElement('div');


        li.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'pb-1');


        if(data.pre_order == 'No')
        {
            content = 'none'
        }
        else
        {
             content = 'block'
        }


           

        li.innerHTML = `

        

  
                 
                <div class="product-item bg-light mb-4" id= "aaa">
                    <div class="product-img position-relative overflow-hidden" onclick=dtl("${doc.id}")>
                        <img class="img-fluid w-100" src="${data.imageUrls}" alt=""  onmouseover="this.src='${data.imageUrls}'" 
  onmouseout="this.src='${data.imageUrls}'" style = "height:260px;cursor: pointer;">


      
  
                   
                    </div>
                    <div class="text-center py-4" style = "cursor: pointer;" >
                        <a class="h6 text-decoration-none text-truncate" href="">${data.item_name}</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                          <p><span style="font-weight: bold;">tk ${data.price[0]}.00 </span><span style="font-size: 13px;">থেকে শুরু </span></p>
                            
                        </div>

                      
                
                        <div class="d-flex align-items-center justify-content-center mb-1" style="gap: 45%; ">
                 
                            <small >Order : ${data.order}</small>

                            <small>Like : ${data.like}</small>
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



function dtl(id) {

   sessionStorage.setItem("uid", id);

  window.location = "dryfish_details.html";



}
