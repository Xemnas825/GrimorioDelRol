document.addEventListener('DOMContentLoaded', function () {
  // Toggle menú móvil
  var navToggle = document.getElementById('js-nav-toggle');
  var headerNav = document.querySelector('.header__nav');

  if (navToggle && headerNav) {
    navToggle.addEventListener('click', function () {
      headerNav.classList.toggle('header__nav--open');
    });

    
    var navLinks = headerNav.querySelectorAll('.nav__link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 768) {
          headerNav.classList.remove('header__nav--open');
        }
      });
    });
  }

  // ficha de personaje
  var characterForm = document.getElementById('js-character-form');

  if (characterForm) {
    characterForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var formData = new FormData(characterForm);
      content += '   FICHA DE PERSONAJE - GRIMORIO DEL ROL\n';

      formData.forEach(function (value, key) {
        content += key + ': ' + value + '\n';
      });

      content += 'Creado en Grimorio del Rol\n';
      content += new Date().toLocaleDateString('es-ES') + '\n';
      

      var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      var characterName = formData.get('Nombre') || 'personaje';
      var fileName = characterName.toLowerCase().replace(/\s+/g, '-') + '-ficha.txt';

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      
      alert('¡Ficha descargada! Tu héroe está listo para la aventura.');
    });
  }
});
