'use strict';

(function () {
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgPreview = document.querySelector('.img-upload__preview');
  var SCALE = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    START: 100
  };
  var currentScale = SCALE.START;

  var changeScale = function () {
    scaleControlSmaller.onclick = getSmallerPic;
    scaleControlBigger.onclick = getBiggerPic;
  };

  // При уменьшении изображении
  var getSmallerPic = function () {
    var nextScale = currentScale - SCALE.STEP;
    if (nextScale >= SCALE.MIN) {
      scalePic(nextScale);
    }
  };

  // При увеличении изображения
  var getBiggerPic = function () {
    var nextScale = currentScale + SCALE.STEP;
    if (nextScale <= SCALE.MAX) {
      scalePic(nextScale);
    }
  };

  var scalePic = function (scalePic) {
    imgPreview.style.transform = 'scale(' + (scalePic / SCALE.MAX) + ')';
    scaleControlValue.setAttribute('value', scalePic + '%');
    currentScale = scalePic;
  };

  window.scale = {
    zooming: changeScale,
  };
})();
