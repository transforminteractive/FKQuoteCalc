// function for addings events to Domload
function addDOMLoadEvent(func) {
   if (!window.__load_events) {
      var init = function () {
          // quit if this function has already been called
          if (arguments.callee.done) return;
      
          // flag this function so we don't do the same thing twice
          arguments.callee.done = true;
      
          // kill the timer
          if (window.__load_timer) {
              clearInterval(window.__load_timer);
              window.__load_timer = null;
          }
          
          // execute each function in the stack in the order they were added
          for (var i=0;i < window.__load_events.length;i++) {
              window.__load_events[i]();
          }
          window.__load_events = null;
      };
   
      // for Mozilla/Opera9
      if (document.addEventListener) {
          document.addEventListener("DOMContentLoaded", init, false);
      }
      
      // for Internet Explorer
      /*@cc_on @*/
      /*@if (@_win32)
          document.write("<scr"+"ipt id=__ie_onload defer src=//0><\/scr"+"ipt>");
          var script = document.getElementById("__ie_onload");
          script.onreadystatechange = function() {
              if (this.readyState == "complete") {
                  init(); // call the onload handler
              }
          };
      /*@end @*/
      
      // for Safari
      if (/WebKit/i.test(navigator.userAgent)) { // sniff
          window.__load_timer = setInterval(function() {
              if (/loaded|complete/.test(document.readyState)) {
                  init(); // call the onload handler
              }
          }, 10);
      }
      
      // for other browsers
      window.onload = init;
      
      // create event function stack
      window.__load_events = [];
   }
   
   // add function to event stack
   window.__load_events.push(func);
}
