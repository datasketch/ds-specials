"use strict";var spacer=document.querySelector(".spacer");function setSpacerHeight(){var e=document.querySelector(".nav").offsetHeight;spacer.style.height=e+"px"}setSpacerHeight(),window.addEventListener("resize",function(){setSpacerHeight()});