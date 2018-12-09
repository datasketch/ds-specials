"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var o=0,a=Array(e.length);o<e.length;o++)a[o]=e[o];return a}return Array.from(e)}function spider(e,o){var a=e.slice().reduce(function(e,a){return o.forEach(function(o){a.from!==o&&a.to!==o||e.push(a.from,a.to)}),e},[]);return[].concat(_toConsumableArray(new Set(a)))}window.network=void 0;var Sidebar={props:["nodes","index"],template:'\n    <div id="sidebar">\n     <ul class="sidebar-list font-family--exo">\n      <li v-for="(n,i) in nodes" :key="i" :class="[\'Column\', \'font-weight-light\',{ \'active\': index === i }]" @click="register(n,i)">{{n.label}}</li>\n     </ul>\n    </div>\n  ',methods:{register:function(e,o){this.$emit("item",e,o)}}},Network={props:["data","index","description"],template:'\n    <div id="network-container" class="Column">\n      <div class="network-info Column VCenter">\n        <div class="container-section">\n         <p style="margin: 0" class="font-family--exo">{{description}}</p>\n         <a href="" class="font-family--exo text-emerald reset" style="font-size: small" @click.prevent="reset" v-if="index !== undefined">Reiniciar</a>\n        </div>\n      </div>\n      <div id="network">\n      <div>\n    </div>\n  ',data:function(){return{options:{interaction:{navigationButtons:!0},nodes:{mass:3,shape:"dot",color:"#f26101",font:{size:10},scaling:{min:1,max:5},value:3},edges:{arrows:{to:{enabled:!0,scaleFactor:.5,type:"arrow"}},font:{align:"top",size:8}},physics:{stabilization:!0}}}},mounted:function(){var e=document.getElementById("network"),o={nodes:new vis.DataSet(this.data.nodes),edges:new vis.DataSet(this.data.edges)};network=new vis.Network(e,o,this.options)},watch:{data:function(e){var o=new vis.DataSet(e.nodes),a=new vis.DataSet(e.edges);network.setData({nodes:o,edges:a})}},methods:{reset:function(){this.$emit("reset")}}},whois=new Vue({el:"#whois",data:{nodesList:[],nodes:[],edges:[],filtered_nodes:[],filtered_edges:[],index:void 0,loaded:!1,description:"Selecciona un político de la lista para filtrar la red"},computed:{network:function(){return{nodes:this.filtered_nodes,edges:this.filtered_edges}}},methods:{filter:function(e,o){var a=this,s=e.id;this.index=o,this.filtered_edges=[],this.description=this.nodesList.slice().find(function(e){return s===e.id}).description;var n=this.edges.slice().filter(function(e){return e.from===s||e.to===s}).reduce(function(e,o){return a.filtered_edges.push(o),e.push(o.from,o.to),e},[]);n=[].concat(_toConsumableArray(new Set(n)));var i=this.edges.slice().reduce(function(e,o){return n.forEach(function(s){o.from!==s&&o.to!==s||(a.filtered_edges.push(o),e.push(o.from,o.to))}),e},[]);i=[].concat(_toConsumableArray(new Set(i))),this.filtered_edges=[].concat(_toConsumableArray(new Set(this.filtered_edges))),this.filtered_nodes=this.nodes.slice().filter(function(e){return i.includes(e.id)})},reset:function(){this.description="Selecciona un político de la lista para filtrar la red",this.filtered_nodes=this.nodes.slice(),this.filtered_edges=this.edges.slice(),this.index=void 0}},created:function(){var e=this;Tabletop.init({key:"https://docs.google.com/spreadsheets/d/1y-GhkwBvNjhzAjLj3Syg1DZstGHhHUU7ssm82a4i9GQ/edit?usp=sharing",callback:function(o,a){var s=a.sheets("nodos-lista").all(),n=a.sheets("nodos-viz").all(),i=a.sheets("links").all().map(function(e){var o=e.source,a=e.rel_type;return{from:o,to:e.target,label:a}});e.nodesList=s,e.nodes=n,e.edges=i,e.filtered_nodes=e.nodes.slice(),e.filtered_edges=e.edges.slice(),e.loaded=!0}})},components:{Sidebar:Sidebar,Network:Network}}),Table=new Vue({el:"#table",data:{table:[{position:"Senador",name:"Óscar Reyes",proposal:"Unificar la forma de cantar el himno nacional",approved:"No"},{position:"Senador",name:"Manuel Velázquez",proposal:"Heredar las armas de padre a hijo",approved:"No"},{position:"Senador",name:"Édgar Espíndola",proposal:"Multa de ocho millones por ser infiel",approved:"No"},{position:"Senador",name:"Édgar Espíndola",proposal:"El día de la Biblia",approved:"No"},{position:"Presidente Cámara de Representantes",name:"Augusto Posada",proposal:"No se podrán hacer parodias",approved:"No"},{position:"Senador",name:"Armando Benedetti",proposal:"Prohibir los nombres feos",approved:"No"},{position:"Senador",name:"Édgar Espíndola",proposal:"Acabar con las tareas en los colegios",approved:"No"},{position:"Senador",name:"Efraín Cepeda",proposal:"Sacar a Panamá del escudo nacional y poner a San Andrés",approved:"No"},{position:"Senador",name:"Édgar Espíndola",proposal:"Viajar sin visa",approved:"No"},{position:"Cámara de Representantes",name:"Alfredo Cuello Baute",proposal:"El proyecto del primer día hábil",approved:"Reposado"},{position:"Cámara de Representantes",name:"Yahir Acuña",proposal:"Prohibir el uso de saleros en las mesas de los restaurantes",approved:"Reposado"},{position:"Cámara de Representantes",name:"Yahir Acuña",proposal:"Prohibir la venta de comida chatarra en colegios",approved:"Reposado"},{position:"Cámara de Representantes",name:"Yahir Acuña",proposal:"Prohibir la exhibición de bebidas alcohólicas en locales comerciales",approved:"Reposado"},{position:"Cámara de Representantes",name:"Yahir Acuña",proposal:"Búsquedas en internet con palabras groseras serán prohibidas",approved:"Reposado"},{position:"Cámara de Representantes",name:"Laureano Acuña Díaz",proposal:"Empleados no trabajarán más de diez horas en días previos a Navidad",approved:"Reposado"},{position:"Senador",name:"Jimmy Chamorro",proposal:"Eliminar tres festivos y aumentar a 18 días las vacaciones",approved:"Reposado"}]}});