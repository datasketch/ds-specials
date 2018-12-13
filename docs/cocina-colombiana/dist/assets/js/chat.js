"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var a=0,o=Array(e.length);a<e.length;a++)o[a]=e[a];return o}return Array.from(e)}function fitChat(){var e=window.innerWidth<768,a=window.innerHeight,o=document.querySelector("header").clientHeight,n=a-document.querySelector(".chat-header").clientHeight-document.querySelector(".chat-input").clientHeight;document.querySelector(".chat-messages").style.height=n+"px",document.querySelector(".chat").style.height=a-o+"px";var s=document.getElementsByClassName("chat-list-item");if(e){if(e){typed instanceof Typed&&typed.destroy(),document.querySelector(".chat-messages-welcome").style.display="none";var t=document.querySelectorAll(".chat-list-item");[].concat(_toConsumableArray(t)).forEach(function(e){return e.classList.remove("chat-active")}),[].concat(_toConsumableArray(s)).forEach(function(e){return e.addEventListener("click",manageChatMobile)}),[].concat(_toConsumableArray(s)).forEach(function(e){return e.removeEventListener("click",manageChatDesktop)})}}else document.querySelector(".chat-list").classList.remove("chat-triggered"),document.querySelector(".chat-detail").classList.remove("chat-triggered"),[].concat(_toConsumableArray(s)).forEach(function(e){return e.removeEventListener("click",manageChatMobile)}),[].concat(_toConsumableArray(s)).forEach(function(e){return e.addEventListener("click",manageChatDesktop)})}function updateTimeAgo(){document.querySelectorAll(".chat-time").forEach(function(e){e.innerHTML=moment.from()})}function manageChatDesktop(e){typed instanceof Typed&&typed.reset(!1);var a=e.target,o=a.getAttribute("data-chat")||a.parentNode.getAttribute("data-chat")||a.parentNode.parentNode.getAttribute("data-chat");document.querySelector(".chat-messages-welcome").style.display="none";var n=document.querySelectorAll(".chat-list-item");[].concat(_toConsumableArray(n)).forEach(function(e){return e.classList.remove("chat-active")});[].concat(_toConsumableArray(n)).filter(function(e){return e.getAttribute("data-chat")===o})[0].classList.add("chat-active");var s=document.querySelectorAll(".chat-messages-content");[].concat(_toConsumableArray(s)).forEach(function(e){return e.style.display="none"});var t=document.querySelectorAll(".chat-message");[].concat(_toConsumableArray(t)).forEach(function(e){e.style.opacity="0",e.style.visibility="hidden"});document.querySelector(".typed-cursor")&&(document.querySelector(".typed-cursor").style.display="none");document.querySelector(".chat-header-name").innerHTML=nameChat[o];var r=document.getElementById(o);r.style.display="block";var c=r.getElementsByClassName("chat-message");options.onStringTyped=function(e){setTimeout(function(){c[e].style.opacity="1",c[e].style.visibility="visible"},700)},options.strings=messagesList[o],typed=new Typed(".chat-input-text",options)}function manageChatMobile(e){var a=e.target,o=a.getAttribute("data-chat")||a.parentNode.getAttribute("data-chat")||a.parentNode.parentNode.getAttribute("data-chat");document.querySelector(".chat-list").classList.add("chat-triggered"),document.querySelector(".chat-detail").classList.add("chat-triggered"),document.querySelector(".chat-header-name").innerHTML=nameChat[o];var n=document.getElementById(o);n.classList.add("chat-opened"),n.style.display="block";var s=n.getElementsByClassName("chat-message");[].concat(_toConsumableArray(s)).forEach(function(e){e.style.opacity="1",e.style.visibility="visible"})}var typed=void 0,moment=window.moment(new Date);moment.locale("es"),fitChat(),updateTimeAgo(),setInterval(updateTimeAgo,1e3),window.addEventListener("resize",fitChat);var messages=document.getElementsByClassName("chat-message"),nameChat={"chat-1":"Ana & Alejo","chat-2":"Iván & Virginia","chat-3":"Aura & Dominique","chat-4":"Luisa & Antonuela","chat-5":"Ivan & María"},messagesList={"chat-1":["¿Tienes alguna anécdota en la cocina que quieras compartir?","La cocina es una de las actividades que he compartido toda la vida con mi mamá. Para mí, cocinar es conectarme con esa herencia que ella me ha transmitido de cuidar a la familia a través de la comida.","El recuerdo de un buen tamal en navidad, su aroma cuando se abren sus hojas. Eso es una cosa que uno llevará en su corazón durante toda la vida. Me parece una cosa hermosa.","Sabemos que la cocina colombiana es muy amplia, ¿Podrías decirnos cuales son esos platos que preparas con frecuencia?","Normalmente no preparo mucha comida colombiana porque me gusta la cocina sencilla. Me parece que la nuestra es una cocina muy elaborada y yo soy más práctica cuando cocino. Si tengo que preparar algo colombiano hago sopa de lentejas y me gusta el ajiaco y el caldo con huevo y arepa amarilla santandereana.","Chorizo con arepa y sancocho valluno. Si uno entiende bien la cocina colombiana, uno entiende que todos esos platos cuentan una historia en particular, las culturas que han vivido allí, los ingredientes abundantes en esa región. Un sancocho es el paisaje de una región metido en una olla con agua.","Nuestra infancia está marcada por muchos recuerdos, entre esos sabores y aromas que se grabaron en nuestra memoria, para ti ¿Cuál es ese plato típico que te recuerda a tu casa?","El mondongo porque es el plato típico de la familia de mi mamá, que es paisa. Es el plato especial que le pedimos a la abuelita y es el plato que nos reúne como familia.","El chorizo santarrosano me parece increíble o un chicharrón tostado con guiso, como lo hacen en Armenia.","¿Recuerdas a esa persona qué te inspiró  aprender a cocinar?","Mi mamá. Más que enseñarme fue el aprendizaje de verla a ella toda la vida cocinar y eso me hizo querer ayudarla e interesarme por la cocina.","Estaba estudiando biología, pero no me gustaba la carrera a pesar de que ya había cursado varios semestres. Sin embargo, cocinar me liberaba de esa angustia que sentía. Eso me permitió entender lo que quería. Además, aprendí que a uno nadie le enseña a cocinar y uno nunca termina de cocinar.","¿Qué consejo le daría a futuras generaciones de cocineros colombianos?","No dejar perder los ingredientes tradicionales y las formas en las que son preparados. La vida moderna nos lleva a querer comer cosas preparadas y menos elaboradas y eso nos hace perder la costumbre de cocinar, cocinar lentamente.","En términos de sabor uno puede enseñarles a otros cocineros qué está rico y qué no. Pero creo que es un proceso en el que no se enseña de una forma, sino que esa persona está en un continuo aprendizaje de sabores y aromas que solo se adquieren practicando."],"chat-2":["Todos tenemos unos platos típicos que nos llenan más que otros, ¿Podrías decirnos cuales son esos platos de cocina colombiana qué más te gustan?","El ajiaco porque contiene los ingredientes de los alrededores de Cundinamarca como la crema de leche de Ubaté o las guascas y el aguacate de Mariquita.","Yo soy muy fanático de los guisos tradicionales colombianos y los sudados también me encantan.","Nuestra infancia está marcada por muchos recuerdos, entre esos sabores y aromas que se grabaron en nuestra memoria, para ti ¿Cuál es ese plato típico que te recuerda a tu casa?","El ajiaco y el entero con Bagre o Gallina.","Las chorotas de maíz, que no son muy conocidas, pero son como nuestra versión boyacense de los raviolis y van rellenos de queso y cuajada. Son deliciosas.","A la hora de cocinar, siempre hay unos ingredientes que son fundamentales para sazonar nuestros platos, para ti ¿Cuál es el ingrediente que consideras  fundamental?","El pollo, el ajo y la cebolla...","El cilantro","La cocina no podría existir sin esas herramientas que hacen que todo pueda prepararse, podrías decirnos ¿Cuál es el utensilio de cocina que no puede faltar para ti?","El sartén.","El cuchillo y el batidor de mano.","¿Qué consejo le daría a futuras generaciones de cocineros colombianos?","Las nuevas generaciones deberían conservar la cocina colombiana y experimentar nuevos sabores con nuevos ingredientes.","Que cocinen con respeto. Es muy triste que hasta ahora estemos haciendo una apropiación cultural de nuestra cocina. Por ejemplo, he visto eso en cocineros que hacen puchero boyacense con otros ingredientes. Eso quiere decir que nunca han ido al campo y que no conocen la cocina colombiana."],"chat-3":["Nuestra infancia está marcada por muchos recuerdos, entre esos sabores y aromas que se grabaron en nuestra memoria, para ti ¿Cuál es ese plato típico que te recuerda a tu casa?","En la casa todos los días comíamos frijoles y dos o tres veces a la semana, sancocho. Nuestra familia es muy antioqueña y cocinaba muy paisa.","Mi casa era rara porque podíamos tener un plato europeo con uno colombiano. Si me pides un plato colombiano yo pensaría en el ajiaco.","La cocina es un proceso alquímico en el que todos los sentidos están activos, ¿Cuáles son esos aromas que disfrutas cuando estas cocinando?","Me gusta la salsa de soya, el ajo, la canela, las guascas, que no solo las uso en el ajiaco.","El olor de la cebolla, el ajo y del guiso colombiano.","Todos tenemos un sabor que nos recuerda a la infancia ¿Cuál es el tuyo?","El arroz con arvejas que hacía mi mamá. Lo preparaba con plátano maduro frito y albóndigas. Era muy rico.","Los caracoles con mantequilla y ajo me recuerdan mucho a mi infancia. También el poleo y la morcilla, que me recuerdan a una  visita a la finca.","En la cocina se entremezclan todo tipo de procesos, cuando se pican  cosas en una tabla o cuando la cebolla entra en el aceite caliente. ¿Para ti, cuáles son esos sonidos que te gustan cuando cocinas?","Me gusta cocinar con el ruido de la radio y por eso siempre la tengo prendida. Me parece que es un sonido que le da vida a la cocina.","El sonido del ajo que se asa en una olla. También el sonido de un cuchillo muy afilado cortando sobre una tabla.","Hay restaurantes que nos gustan tanto que lo recordamos con cariño y lo recomendamos ¿Qué restaurante de cocina colombiana te gusta?","En Circasia, Quindío, hay un restaurante que se llama La Patasola. Me llama mucho la atención por la comida que sirven. A uno le venden frijoles, comida casera, pescado y chuleta. Es pura comida típica colombiana.","Casa Vieja, que es un clásico. También para probar cosas distintas de la cocina me iría por Mini-Mal."],"chat-4":["¿Recuerdas a esa persona qué te inspiró  aprender a cocinar?","Mi abuela y mi mamá. Les ayudé muchas veces, mi tía abuela escribió un libro de cocina. A ella le heredé muchas de esas recetas.","La niñera de la casa cocinaba y eso me despertó la curiosidad. Además, soy autodidacta, lo que me permitió aprender por mi cuenta.","En el momento de cocinar, hay aromas que quizá no son tan agradables pero son importantes para los platillos que queremos hacer. ¿Cuáles son esos aromas que te molestan cuando estas cocinando?","En realidad casi ninguno, de pronto el comino, el anís o el hinojo porque tienen un olor fuerte y casi no saben tan rico.","En realidad no tengo uno que me disguste.","Los postres son el toque dulce que no puede faltar en la gastronomía colombiana ¿Hay algún postre que nos quieras recomendar?","Los postres con ruibarbo.","El merengón y el de copoazú.","La gastronomía colombiana es tan extensa que podríamos recomendar un plato para cualquier ocasión, un plato que nos quieran recomendar para un momento romántico","Un asado con mazorca colombiana a la parrilla.","Una sopa sencilla sin tantos ingredientes.","Y para una tusa","Un merengue","Chocolate con ají."],"chat-5":["A la hora de cocinar, siempre hay unos ingredientes que son fundamentales para sazonar nuestros platos, para ti ¿Cuál es el ingrediente que consideras  fundamental?","El ajo.","El ají, los cítricos y el cilantro cimarrón.","Nuestra infancia está marcada por muchos recuerdos, entre esos sabores y aromas que se grabaron en nuestra memoria, para ti ¿Cuál es ese plato típico que te recuerda a tu casa?","El mondongo no puede faltar en ninguna reunión.","El hogao porque es un fondo que permite sacar muchos platos y eso me obsesiona, poder aprovecha muy bien los sabores.","Un plato de cocina colombiana que quieras recomendar para una tusa","Un pollo asado que sea bien rico. Bien preparado.","Los dulces porque generan felicidad. Pienso en el chocolate.","¿Y para un momento romántico?","Un róbalo al ajillo.","Un ceviche o un enyucado delicioso con arroz crocante es lo mejor."]},options={fadeOut:!0,smartBackspace:!1,startDelay:500,typeSpeed:5,onComplete:function(e){setTimeout(function(){document.querySelector(".chat-input-text").innerHTML=""},500)}};document.querySelector(".list-chats").addEventListener("click",function(e){var a=document.querySelector(".chat-opened"),o=a.getElementsByClassName("chat-message");[].concat(_toConsumableArray(o)).forEach(function(e){e.style.opacity="0",e.style.visibility="hidden"}),a.style.display="none",a.classList.remove("chat-opened"),document.querySelector(".chat-list").classList.remove("chat-triggered"),document.querySelector(".chat-detail").classList.remove("chat-triggered")});