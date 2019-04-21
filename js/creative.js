/*SOFTWARE*/
let pointerSoftware= document.getElementById('pointerSoftware');
let TextSoftware= document.getElementById('TextSoftware');

/*WEB DEV*/
let pointerWebDev= document.getElementById('pointerWebDev');
let textWebDev= document.getElementById('textWebDev');

/*ELETRIC ENGINEERING*/
let pointerEletric= document.getElementById('pointerEletric');
let textEletric= document.getElementById('textEletric');

/*EMBEDDED SYSTEMS*/
let pointerEmbedded= document.getElementById('pointerEmbedded');
let textEmbedded= document.getElementById('textEmbedded');


function changeColor(text,pointer){
	text.style.color= "grey";
	pointer.style.opacity = 0.5;
}
function changeDefault(text,pointer){
	text.style.color= "black";
	pointer.style.opacity = 1;

}
/*SOFTWARE*/
pointerSoftware.addEventListener('mouseover',changeColor.bind(null,TextSoftware,pointerSoftware))
pointerSoftware.addEventListener('mouseout',changeDefault.bind(null,TextSoftware,pointerSoftware))

/*WEB DEV*/
pointerWebDev.addEventListener('mouseover',changeColor.bind(null,textWebDev,pointerWebDev))
pointerWebDev.addEventListener('mouseout',changeDefault.bind(null,textWebDev,pointerWebDev))

/*ELETRIC ENGINEERING*/
pointerEletric.addEventListener('mouseover',changeColor.bind(null,textEletric,pointerEletric))
pointerEletric.addEventListener('mouseout',changeDefault.bind(null,textEletric,pointerEletric))

/*EMBEDDED SYSTEMS*/
pointerEmbedded.addEventListener('mouseover',changeColor.bind(null,textEmbedded,pointerEmbedded))
pointerEmbedded.addEventListener('mouseout',changeDefault.bind(null,textEmbedded,pointerEmbedded))


/*SOFTWARE*/
function moveS() {
  var elem = document.getElementsByClassName("myProgressS"); 

  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 150) {
      clearInterval(id);
    } else {
      width++; 
	  for(var i=0; i<elem.length; i++) {
      elem[i].style.width = width + '%'; 
	  }
    }
  }
}
/*WEB DEV*/
function moveW() {
  var elem = document.getElementsByClassName("myProgressW"); 

  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 150) {
      clearInterval(id);
    } else {
      width++; 
	  for(var i=0; i<elem.length; i++) {
      elem[i].style.width = width + '%'; 
	  }
    }
  }
}
/*ELETRIC ENGINEERING*/
function moveEL() {
  var elem = document.getElementsByClassName("myProgressEL"); 

  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 150) {
      clearInterval(id);
    } else {
      width++; 
	  for(var i=0; i<elem.length; i++) {
      elem[i].style.width = width + '%'; 
	  }
    }
  }
}
/*EMBEDDED SYSTEMS*/
function moveEM() {
  var elem = document.getElementsByClassName("myProgressEM"); 

  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 150) {
      clearInterval(id);
    } else {
      width++; 
	  for(var i=0; i<elem.length; i++) {
      elem[i].style.width = width + '%'; 
	  }
    }
  }
}

(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();
