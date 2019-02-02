// Function to keep radius within range of minRad and maxRad
const setRadius = function(newRadius){
  /*
  if(newRadius<minRad)
  newRadius=minRad;
  else if (newRadius>minRad)
  newRadius = Math.floor(newRadius);
  else if(newRadius>maxRad)
    newRadius = maxRad;
  */
    radius = newRadius;
    //console.log(radius);
    ctx.lineWidth = radius*2;
    radSpan.innerHTML = radius;
}


const defaultRad = 20,
      radSpan = document.getElementById('radval'),
      //decRad = document.getElementById('decrad'),
      //incRad = document.getElementById('incrad');
      slider = document.getElementById('myRange')  
/*
decRad.addEventListener('click', function(){
  setRadius(radius-interval);
});
incRad.addEventListener('click', function(){
  setRadius(radius+interval);
})
*/

slider.oninput = function() {
  radius=this.value;
  setRadius(radius);
}

// Set radius initially to 20
setRadius(defaultRad);

