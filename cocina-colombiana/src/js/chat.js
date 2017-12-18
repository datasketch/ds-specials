/* Fit chat height and scroll */
function fitChat() {
  const windowHeight = window.innerHeight;
  const chatHeader = document.querySelector('.chat-header').clientHeight;
  const chatInput = document.querySelector('.chat-input').clientHeight;
  const chatContentHeight = windowHeight - chatHeader - chatInput;
  document.querySelector('.chat-messages').style.height = chatContentHeight + 'px';
}

/* Define start point to update time message */
function updateTimeAgo() {
  document.querySelectorAll('.chat-time').forEach(function(element) {
    element.innerHTML = moment.from();
  })
}

const moment = window.moment(new Date());
moment.locale('es');

fitChat();
updateTimeAgo();
setInterval(updateTimeAgo, 1000);
window.addEventListener('resize', fitChat);

const messages = document.getElementsByClassName('chat-message');
const messagesList = {
  'chat-1': [
    '¿Tienes alguna anécdota en la cocina que quieras compartir?',
    'La cocina es una de las actividades que he compartido toda la vida con mi mamá. Para mí, cocinar es conectarme con esa herencia que ella me ha transmitido de cuidar a la familia a través de la comida.',
    'El recuerdo de un buen tamal en navidad, su aroma cuando se abren sus hojas. Eso es una cosa que uno llevará en su corazón durante toda la vida. Me parece una cosa hermosa.',
    'Sabemos que la cocina colombiana es muy amplia, ¿Podrías decirnos cuales son esos platos que preparas con frecuencia?',
    'Normalmente no preparo mucha comida colombiana porque me gusta la cocina sencilla. Me parece que la nuestra es una cocina muy elaborada y yo soy más práctica cuando cocino. Si tengo que preparar algo colombiano hago sopa de lentejas y me gusta el ajiaco y el caldo con huevo y arepa amarilla santandereana.',
    'Chorizo con arepa y sancocho valluno. Si uno entiende bien la cocina colombiana, uno entiende que todos esos platos cuentan una historia en particular, las culturas que han vivido allí, los ingredientes abundantes en esa región. Un sancocho es el paisaje de una región metido en una olla con agua.',
    'Nuestra infancia está marcada por muchos recuerdos, entre esos sabores y aromas que se grabaron en nuestra memoria, para ti ¿Cuál es ese plato típico que te recuerda a tu casa?',
    'El mondongo porque es el plato típico de la familia de mi mamá, que es paisa. Es el plato especial que le pedimos a la abuelita y es el plato que nos reúne como familia.',
    'El chorizo santarrosano me parece increíble o un chicharrón tostado con guiso, como lo hacen en Armenia.',
    '¿Recuerdas a esa persona qué te inspiró  aprender a cocinar?',
    'Mi mamá. Más que enseñarme fue el aprendizaje de verla a ella toda la vida cocinar y eso me hizo querer ayudarla e interesarme por la cocina.',
    'Estaba estudiando biología, pero no me gustaba la carrera a pesar de que ya había cursado varios semestres. Sin embargo, cocinar me liberaba de esa angustia que sentía. Eso me permitió entender lo que quería. Además, aprendí que a uno nadie le enseña a cocinar y uno nunca termina de cocinar.',
    '¿Qué consejo le daría a futuras generaciones de cocineros colombianos?',
    'No dejar perder los ingredientes tradicionales y las formas en las que son preparados. La vida moderna nos lleva a querer comer cosas preparadas y menos elaboradas y eso nos hace perder la costumbre de cocinar, cocinar lentamente.',
    'En términos de sabor uno puede enseñarles a otros cocineros qué está rico y qué no. Pero creo que es un proceso en el que no se enseña de una forma, sino que esa persona está en un continuo aprendizaje de sabores y aromas que solo se adquieren practicando.'
  ],
  'chat-2': [
    '¿Cuáles son los platos de cocina colombiana que más le gustan?',
    'El ajiaco porque contiene los ingredientes de los alrededores de cundinamarca como la crema de leche de ubaté, las guascas y el aguacate de Mariquita.',
    'Yo soy muy fanático de los guisos tradicionales colombianos y los sudados también me encantan.'
  ],
  'chat-3': [
    'Este es el chat número 3'
  ],
  'chat-4': [
    'Este es el chat número 4'
  ],
  'chat-5': [
    'Este es el chat número 5'
  ]
}
const options =  {
  fadeOut: true,
  smartBackspace: false,
  startDelay: 500,
  typeSpeed: 5,
  onComplete: function(self) {
    setTimeout(function() {
      document.querySelector('.chat-input-text').innerHTML = ''
    }, 500)
  }
};

/* Manage chat tabs */

const chatListItem = document.getElementsByClassName('chat-list-item');

[...chatListItem].forEach((chat) => chat.addEventListener('click', manageChat))

function manageChat(event) {
  const { target } = event;
  const data = 
    target.getAttribute('data-chat') ||
    target.parentNode.getAttribute('data-chat') ||
    target.parentNode.parentNode.getAttribute('data-chat');
  document.querySelector('.chat-messages-welcome').style.display = 'none';
  const chats = document.querySelectorAll('.chat-messages-content');
  [...chats].forEach((chat) => chat.style.display = 'none');
  const previousMessages = document.querySelectorAll('.chat-message');
  [...previousMessages].forEach((n) => {
    n.style.opacity = '0';
    n.style.visibility = 'hidden';
  });
  const cursor = document.querySelector('.typed-cursor') ? 
    document.querySelector('.typed-cursor').style.display = 'none' :
    null;
  const chat = document.getElementById(data);
  chat.style.display = 'block';
  const messages = chat.getElementsByClassName('chat-message');
  options.onStringTyped = function(index) {
    setTimeout(function() {
      messages[index].style.opacity = '1';
      messages[index].style.visibility = 'visible';
    }, 700)
  }
  options.strings = messagesList[data];
  const typed = new Typed('.chat-input-text', options);
}