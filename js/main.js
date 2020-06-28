'use strict';

(function () {


  var scale = document.querySelector('.scale');
  var uploadInput = document.querySelector('#upload-file');
  var comments = document.querySelector('.text__description');
  var hashtagsInput = document.querySelector('.text__hashtags');



  var onPopupEcsClose = function (evt) {
    if (evt.key === 'Escape' && hashtagsInput !== document.activeElement && comments !== document.activeElement) {
      closePopup();
    }
  };

  var closePopup = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEcsClose);
    scale.removeEventListener('click', scaleChangeHandler);
    uploadInput.value = '';
  };

  // Форма редактирования открывается при загрузке фотографии

  uploadInput.onchange = function () {
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('.img-upload__cancel').addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onPopupEcsClose);
    scale.addEventListener('click', scaleChangeHandler);
    hashtagsInput.addEventListener('input', hashtagValidateHandler);
  };

  var hashtagValidateHandler = function () {
    window.hashtags.validate();
  };
  var scaleChangeHandler = function () {
    window.scale.zooming();
  };

})();
