const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');

      //let radius = 10;
      let dragging = false;

      // Span entire width and height of window
     /*
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     console.log(window.innerWidth, window.innerHeight);
     */

     canvas.width = canvas.clientWidth;
     canvas.height = canvas.clientHeight;
     console.log(canvas.clientWidth, canvas.clientHeight);

      /*
      // Allow to draw on rest of page area upon screen resize
      window.onresize = function(){
        ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.putImageData(0,0)
      }
      */

      // Clear screen
      function clearCanvas(canvas){
        canvas.width = canvas.width;
      }
      

      // Line width
      //ctx.lineWidth = radius*2; 
      //console.log(canvas.getBoundingClientRect())
      // Draws a dot and fills the line
      const putPoint = function(e){
        // Canvas Element location relative to view port
        const rect = canvas.getBoundingClientRect();
        /*
        x = rect.left;
        y = rect.top;
        */
       //console.log(e.clientX,e.clientY, e.offsetX,e.offsetY);
       // e.clientX and e.clientY is relative to the window; e.offsetX and e.offsetY is relative to element.
        if(dragging){
          // Draws line from previous starting point ie moveTo
          //ctx.lineTo(e.clientX, e.clientY);
          ctx.lineTo(e.offsetX, e.offsetY)
          ctx.stroke();
          // Resets path and creates dot
          ctx.beginPath(); 
          //ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
          ctx.arc(e.offsetX,e.offsetY,radius, 0, Math.PI*2)
          ctx.fill()
          // Resets path and begins starting point for next line to connect
          ctx.beginPath();
          //ctx.moveTo(e.clientX, e.clientY);
          ctx.moveTo(e.offsetX,e.offsetY)
        }
      }

      // canvas.addEventListener('mousedown', putPoint);

      const engage = function(e){
        //console.log(e.clientX);
        //console.log(e.clientY);
        dragging = true;
        putPoint(e);
      }
      
      const disengage = function(){
        dragging = false;
        // Removes previous moveTo if mouseup
        ctx.beginPath();
      }

      canvas.addEventListener('mousedown', engage);
      canvas.addEventListener('mousemove', putPoint);
      canvas.addEventListener('mouseup', disengage);