'use strict';

(function () {
  var levelPin = document.querySelector('.effect-level__pin');
  var liner = document.querySelector('.effect-level__line');
  var limits = {
    left: 0,
    right: liner.offsetWidth,
  };

  levelPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX
    };
    console.log(startCoords.x);
    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      var levelPinX = levelPin.offseLeft - shift.x;
      levelPin.style.left = levelPinX + 'px';
    };
    var mouseUpHandler = function () {
      console.log('up');
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);


  });
})();

