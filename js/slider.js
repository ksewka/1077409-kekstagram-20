'use strict';

(function () {
  var levelPin = document.querySelector('.effect-level__pin');
  var depthLevel = document.querySelector('.effect-level__depth');
  var levelValue = document.querySelector('.effect-level__value');
  var effectLine = document.querySelector('.effect-level__line');

  var effects = document.querySelectorAll('.effects__radio');
  var effectsList = document.querySelector('.effects__list');
  var slider = document.querySelector('.effect-level');

  var uploadPreview = document.querySelector('.img-upload__preview');
  var preloadImg = uploadPreview.querySelector('img');
  var coefficientMax = 1;
  var blur = {
    MIN: 0,
    MAX: 3
  };
  var brightness = {
    MIN: 1,
    MAX: 3
  };
  var percent = {
    MIN: 0,
    MAX: 100
  };
  var effectMap = {
    'none': function () {
      return '';
    },
    'chrome': function (ratio) {
      return 'grayscale(' + ratio + ')';
    },
    'sepia': function (ratio) {
      return 'sepia(' + ratio + ')';
    },
    'marvin': function (ratio) {
      return 'invert(' + ratio * percent.MAX + '%)';
    },
    'phobos': function (ratio) {
      return 'blur(' + ratio * blur.MAX + 'px)';
    },
    'heat': function (ratio) {
      return 'brightness(' + ratio * brightness.MAX + ')';
    }
  };

  // Функция для сброса настроек без фильтров
  var getDefaultSettings = function () {
    slider.classList.add('hidden');
    preloadImg.removeAttribute('style');
    preloadImg.removeAttribute('class');
    levelValue.setAttribute('value', percent.MIN);
  };
  getDefaultSettings();

  // Функция для установки начальных параметров слайда с фильтром
  var getCustomSettings = function () {
    slider.classList.remove('hidden');
    levelPin.style.left = percent.MAX + '%';
    depthLevel.style.width = percent.MAX + '%';
    levelValue.setAttribute('value', percent.MAX);
  };

  // Выбор и применение фильтра
  effectsList.addEventListener('change', function (evt) {
    if (evt.target.value === 'none') {
      getDefaultSettings();
    } else {
      for (var i = 0; i < effects.length; i++) {
        preloadImg.classList.remove('effects__preview--' + effects[i].value);
      }
      getCustomSettings();
      if (preloadImg) {
        preloadImg.classList.add('effects__preview--' + evt.target.value);
        preloadImg.style.filter = effectMap[evt.target.value](coefficientMax);
      }
    }
  });

  // Перетаскивание ползунка и изменение эффекта фильтра
  levelPin.addEventListener('mousedown', function (evt) {
    var startX = evt.clientX;
    var limits = {
      left: 0,
      right: effectLine.getBoundingClientRect().width,
    };

    var mouseMoveHandler = function (moveEvt) {
      var shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;
      var levelPinX = levelPin.offsetLeft - shiftX;
      var ratio = levelPinX / limits.right;
      if (levelPinX >= limits.left && levelPinX <= limits.right) {
        levelPin.style.left = levelPinX + 'px';
        depthLevel.style.width = levelPinX + 'px';
        var levelValueCoefficient = Math.round(ratio * percent.MAX);
        levelValue.setAttribute('value', levelValueCoefficient);
        var currentEffect = preloadImg.className.replace(/effects__preview--/, '');
        preloadImg.style.filter = effectMap[currentEffect](ratio);
      }
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });

  window.slider = {
    defaultSettings: getDefaultSettings,
  };

})();

