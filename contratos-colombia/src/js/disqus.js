const disqus_config = function() {
  this.page.url = window.location.href; 
  this.page.identifier = window.location.href;
  this.language = "es_MX";
};
(function() {
  const s = document.createElement('script');
  s.src = '//datasketch.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  document.body.appendChild(s)
})();