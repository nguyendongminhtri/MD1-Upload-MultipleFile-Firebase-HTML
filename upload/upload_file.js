const firebaseConfig = {
    apiKey: "AIzaSyAHbXIdiO5i-nOweX-szmiNn4JSyrOjDi4",
    authDomain: "chinhbeo-18d3b.firebaseapp.com",
    databaseURL: "https://chinhbeo-18d3b.firebaseio.com",
    projectId: "chinhbeo-18d3b",
    storageBucket: "chinhbeo-18d3b.appspot.com",
    messagingSenderId: "197467443558",
    appId: "1:197467443558:web:7cccdbe875f827eb84b8a7",
    measurementId: "G-D375CXH5LG"
};
firebase.initializeApp(firebaseConfig);
var image = [];
// firebase bucket name
// REPLACE WITH THE ONE YOU CREATE
// ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
var fbBucketName = 'images';

// get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

// listen for file selection
fileButton.addEventListener('change', function(e){
    //Get files
    for (var i = 0; i < e.target.files.length; i++) {
        var imageFile = e.target.files[i];

        uploadImageAsPromise(imageFile);
    }
});

//Handle waiting to upload each file using promise
function uploadImageAsPromise (imageFile) {
    return new Promise(function (resolve, reject) {
        var storageRef = firebase.storage().ref(fbBucketName+"/"+imageFile.name);

        //Upload file
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                uploader.value = percentage;
            },
            function error(err){

            },
            function complete(){
                var downloadURL = task.snapshot.downloadURL;
                console.log('dowload URL --->', downloadURL)
                image.push(downloadURL)
                let divLocation = document.getElementById("imgDiv");
                let imgElement = document.createElement("img");
                imgElement.src = downloadURL
                divLocation.append(imgElement);

            }
        );
    });
}
function getImage() {
    return image;
}
