const colors = ['black', 'grey', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

/*
const swatches = document.getElementsByClassName('swatch');
for( let i = 0, n=swatches.length; i<n; i++){
  swatches[i].addEventListener('click', setSwatch);
}
*/

for( let i = 0, n=colors.length; i<n; i++){
  const swatch = document.createElement('div');
  swatch.className = 'swatch';
  swatch.style.backgroundColor = colors [i];
  swatch.addEventListener('click', setSwatch);
  document.getElementById('colors').appendChild(swatch);
}

function setColor(color){
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  const active = document.getElementsByClassName('active')[0];
  if(active){
    active.className = 'swatch';
  }
}

function setSwatch(e){
  // Identify swatch
  const swatch = e.target;
  // Set Color
  setColor(swatch.style.backgroundColor);
  // Give active class
  swatch.className += ' active';
}

setSwatch({target: document.getElementsByClassName('swatch')[0]});