//const axios = require('../../axios');

const saveButton = document.getElementById('save');

saveButton.addEventListener('click', saveImage);

function saveImage(){
  
  const data = canvas.toDataURL();
  console.log(data);
  document.getElementById('imgData').value = data
  /*
  const img = {
    data: data
  }
  console.log(img);
  axios.post('http://localhost:5000/ideas', img)
  */

  // To open in new window
  // window.open(url, name, options);
  //window.open(data,'_blank','location=0, menubar=0')<--No Longer works in browser due to phishing-->
  //console.log(data)

  /*
  const request = new XMLHttpRequest();

  // New Post Request
  request.open('POST', 'save.php', true);

  // Send the proper header information along with the request
  request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  
  // Send the request
  request.send('img='+'https://cors-anywhere.herokuapp.com/'+data);

  // Callback function
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
      //do our stuff
      var response = request.responseText;
      console.log(response);
      //window.open(response,'_blank','location=0, menubar=0');
      //window.open('download.php?file='+response,'_blank','location=0, menubar=0');
      document.getElementById('downloadframe').src = 'download.php?file='+response;
    }
  }

  //Example of x-www-form-urlencoded (name=john)
  // www.example.com/file.php?name=john
  */
}