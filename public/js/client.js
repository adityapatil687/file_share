

let socket = io.connect("http://192.168.0.102:4000");


//////////////////// send_file() ////////////////////

function  send_file () {

   let file = document.getElementById('selected_file');
   let imgPreview = document.getElementById("output_div");
   let path = (window.URL || window.webkitURL).createObjectURL(file.files[0]);

   if (file.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file.files[0]);
      fileReader.addEventListener("load", function () {
      //   imgPreview.style.display = "block";
      //   imgPreview.innerHTML = '<img src="' + this.result + '" height="500px" width="auto" />';
        socket.emit("file_path", {result: this.result, path: path});
      }); 
   }   

   // let path = (window.URL || window.webkitURL).createObjectURL(file.files[0]);
   // console.log('path => ', path);

   // document.getElementById("download_link").href = path;
   // document.getElementById("download_link").innerText = "Download";

   // socket.emit("file_path", path);

}


socket.on("connect", () => {
   document.getElementById("socket_id").innerText="You are currently discoverable on your network as => "+socket.id; 
});

// socket.emit("hello", "world");
socket.on("file_path",(data)=>{
   
   let imgPreview = document.getElementById("output_div");

   imgPreview.innerHTML = '<img src="' + data.result + '" height="500px" width="auto" id="renderedImg" />';

  

   document.getElementById("download_link").href = "data:image/jpeg;base64" + data.result;
   document.getElementById("download_link").innerText = "Download";

});
