'use strict';

var nav = document.querySelector('.nav');
console.dir(nav);
var affix = function affix() {
	window.scrollY > window.innerHeight - nav.clientHeight ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
};

affix();
window.addEventListener('scroll', affix);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm5hdiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnNvbGUiLCJkaXIiLCJhZmZpeCIsIndpbmRvdyIsInNjcm9sbFkiLCJpbm5lckhlaWdodCIsImNsaWVudEhlaWdodCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsTUFBTUMsU0FBU0MsYUFBVCxDQUF1QixNQUF2QixDQUFaO0FBQ0FDLFFBQVFDLEdBQVIsQ0FBWUosR0FBWjtBQUNBLElBQU1LLFFBQVEsU0FBUkEsS0FBUSxHQUFNO0FBQ25CQyxRQUFPQyxPQUFQLEdBQWtCRCxPQUFPRSxXQUFQLEdBQXFCUixJQUFJUyxZQUEzQyxHQUNDVCxJQUFJVSxTQUFKLENBQWNDLEdBQWQsQ0FBa0IsVUFBbEIsQ0FERCxHQUVDWCxJQUFJVSxTQUFKLENBQWNFLE1BQWQsQ0FBcUIsVUFBckIsQ0FGRDtBQUdBLENBSkQ7O0FBTUFQO0FBQ0FDLE9BQU9PLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDUixLQUFsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcbmNvbnNvbGUuZGlyKG5hdilcbmNvbnN0IGFmZml4ID0gKCkgPT4ge1xuXHR3aW5kb3cuc2Nyb2xsWSA+ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSBuYXYuY2xpZW50SGVpZ2h0KSA/IFxuXHRcdG5hdi5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZCcpIDpcblx0XHRuYXYuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsZWQnKTtcdFxufVxuXG5hZmZpeCgpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFmZml4KTsiXX0=
