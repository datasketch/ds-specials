"use strict";function recipeModal(e){e.preventDefault();var o=e.target.getAttribute("data-recipe"),r=document.getElementById(""+o);addClass(body,"no-scroll"),addClass(r,"show")}function closeModal(e){e.preventDefault();var o=document.querySelector(".show");removeClass(body,"no-scroll"),removeClass(o,"show")}var recipes=document.querySelectorAll(".recipe-modal"),header=document.querySelector(".nav"),close=document.querySelectorAll(".close-overlay"),body=document.body,addClass=function(e,o){return e.classList.add(o)},removeClass=function(e,o){return e.classList.remove(o)};recipes.forEach(function(e){return e.addEventListener("click",recipeModal)}),close.forEach(function(e){return e.addEventListener("click",closeModal)});