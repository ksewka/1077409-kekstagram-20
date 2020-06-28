'use strict';

(function () {
  var hashtagsInput = document.querySelector('.text__hashtags');
  var hashtagsAmount = 5;
  var maxLengthOfHashtag = 20;

  var validateHashtags = function () {
    var hashtags = hashtagsInput.value.toLowerCase().split(' '); // Разбили строку на массив
    var message = '';
    if (hashtags.length > hashtagsAmount) {
      message = 'Нельзя указать больше' + hashtagsAmount + ' хэш-тегов';
    }

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i] === '#') {
        message = 'Хеш-тег не может состоять только из одной решётки';
      } else if (hashtags[i].length > maxLengthOfHashtag) {
        message = 'Максимальная длина одного хэш-тега ' + maxLengthOfHashtag + ' символов, включая решётку';
      } else if (/^#[^A-Za-zа-яА-я0-9_]/.test(hashtags[i])) {
        message = 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;';
      } else if (/\s{2,}/g.test(hashtagsInput.value)) {
        message = 'Хэш-теги разделяются одним пробелом';
      } else if (!/^#/.test(hashtags[i])) {
        message = 'Каждый хэш-тег начинается с символа # (решётка)';
      }
      for (var j = i + 1; j < hashtags.length; j++) {
        if (hashtags[i] === hashtags[j]) {
          message = 'Хэш-теги не должны повторяться';
        }
      }
    }
    hashtagsInput.setCustomValidity(message);
  };

  window.hashtags = {
    validate: validateHashtags,
  };

})();
