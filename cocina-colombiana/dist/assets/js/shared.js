"use strict";var hamburger=document.querySelector(".hamburger"),menu=document.querySelector(".menu"),body=document.body;hamburger.addEventListener("click",function(e){hamburger.classList.toggle("is-active"),menu.classList.toggle("overlayed"),body.classList.toggle("no-scroll")});