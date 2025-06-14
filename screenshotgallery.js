// ==UserScript==
// @name         GamePageGallery
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Game Screenshots for the PS Store
// @author       Lac
// @match        https://store.playstation.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=playstation.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    //var checkExist = setInterval(function() {
    const images = [];
    var fsku = "[id='mfe-jsonld-tags']";
    var ysku = document.querySelector(fsku);
    var jsku = JSON.parse(ysku.text);
    var sku = ""

    var oo = "[data-mfe-name='gameBackgroundImage']";
    var zz = document.querySelector(oo);
    var env = "[id='" + zz.dataset.initial + "']";
    var ydoc = document.querySelector(env);
    var jdoc = JSON.parse(ydoc.text);

    var y = document.getElementsByClassName("psw-l-stack-left psw-c-bg-2")
    var anc = `[class='${y[0].childNodes[0].className}'`;
    var dec = false;
    //psw-l-stack-left psw-fill-x
    //psw-pdp-tile-top-h-min psw-l-stack-left psw-fill-x
    var anchor = document.querySelector(anc);
    for (var j=0; j<Object.keys(jdoc["cache"]).length; j++) {
        if (Object.keys(jdoc["cache"])[j].match(/Product.*/)) dec = true;
    }
    if(dec){ sku = "Product:"+jsku.sku;}else{sku = "Concept:"+jsku.sku;}
    var media = jdoc["cache"][sku]["media"];
    var inhtl = ""

    inhtl += '<div class="gallery-row">'
    // class="psw-m-t-10 psw-fill-x"
    for (let i = 0; i < media.length; i++) {
        console.log(media[i].role)
        switch (media[i].role)
        {
            case "GAMEHUB_COVER_ART":
                inhtl +='<div class="column">'
                inhtl +='<img src="'+ media[i].url + '"id="'+jdoc["cache"][sku]["id"]+'"/*onclick="enhance(this);"*/>'
                inhtl +='</div>'
                break;
            case "SCREENSHOT":
                inhtl +='<div class="column">'
                inhtl +='<img src="'+ media[i].url + '"id="'+jdoc["cache"][sku]["id"]+'"/*onclick="enhance(this);"*/>'
                inhtl +='</div>'
                break;

        }
    }
    inhtl +='</div>'


    var DBut = document.createElement('div');
    DBut.innerHTML = inhtl
    anchor.insertAdjacentElement('afterend', DBut)

    var modalt = ""
    modalt = `
    <div id="myModal" class="modal">

    <!-- The Close Button -->
    <span class="close">&times;</span>

    <!-- Modal Content (The Image) -->
    <img class="modal-content" id="cont">
    </div>
    `
    var modaldiv = document.createElement('div');
    modaldiv.innerHTML = modalt
    document.body.appendChild(modaldiv);

     var styles = `

.gallery-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10vmin;
  overflow: hidden;
  transform: skew(5deg);
}
.gallery-row .column {
  flex: 1;
  transition: all 1s ease-in-out;
  height: 75vmin;
  position: relative;
}
.gallery-row .column .card__head {
  color: black;
  background: rgba(255, 30, 173, 0.75);
  padding: 0.5em;
  transform: rotate(-90deg);
  transform-origin: 0% 0%;
  transition: all 0.5s ease-in-out;
  min-width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 1em;
  white-space: nowrap;
}
.gallery-row .column:hover {
  flex-grow: 20;
}
.gallery-row .column:hover img {
  filter: grayscale(0);
}
.gallery-row .column img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 1s ease-in-out;
  filter: grayscale(100%);
}
.gallery-row .column:not(:nth-child(5)) {
  margin-right: 1em;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: none; Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}

/* Modal Content (Image) */
.modal-content {
  margin: auto;
  display: block;
  width: 100%;
  max-width: 1300px;
}
/* Add Animation - Zoom in the Modal */
.modal-content, #caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {transform:scale(0)}
  to {transform:scale(1)}
}

/* The Close Button */
.close {
  position: fixed;
  top: 100px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px){
  .modal-content {
    width: 100%;
  }
}

`
//https://codepen.io/bbx/pen/Jxoqdg?editors=1111
     var modal = document.getElementById("myModal");
    var p = document.getElementsByClassName("column")
    for (var c=0; c<p.length; c++) {
       p[c].onclick= function enhance() {
console.log(this)
         var modalImg = document.getElementById("cont");
         modal.style.display = "block";
         modalImg.src = this.firstElementChild.src;
    }
    }




    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    var styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
})();
