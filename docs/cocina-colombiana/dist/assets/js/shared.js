"use strict";var hamburger=document.querySelector(".hamburger"),menu=document.querySelector(".menu"),body=document.body,toggleClass=function(e,r){return e.classList.toggle(r)};hamburger.addEventListener("click",function(e){toggleClass(hamburger,"is-active"),toggleClass(menu,"overlayed"),toggleClass(body,"no-scroll")});