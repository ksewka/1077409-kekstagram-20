'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorMessage = document.querySelector('#error')
    .content
    .querySelector('.error');
  var errorButton = errorMessage.querySelector('.error__button');
  var successButton = successMessage.querySelector('.success__button');
  var main = document.querySelector('main');

  var getDefaultSettings = function () {
    form.reset();
    window.slider.defaultSettings();
    window.scale.defaultSettings();
  };

  var successClickCloseHandler = function () {
    successCloseHandler();
  };

  var successEscCloseHandler = function (evt) {
    window.util.isEscEvent(evt, successCloseHandler);
  };

  var successCloseHandler = function () {
    successMessage.classList.add('hidden');

    document.removeEventListener('keydown', successEscCloseHandler);
    successMessage.removeEventListener('click', successClickCloseHandler);
    successButton.removeEventListener('click', successCloseHandler);
  };

  // Сообщение при успешной отправке данных
  var showSuccessMessage = function () {
    successMessage.classList.remove('hidden');
    imgUpload.classList.add('hidden');
    main.appendChild(successMessage);

    document.addEventListener('keydown', successEscCloseHandler);
    successMessage.addEventListener('click', successClickCloseHandler);
    successButton.addEventListener('click', successCloseHandler);
  };

  // Обработчик при успешной отправке данных
  var successSubmitHandler = function () {
    showSuccessMessage();
    getDefaultSettings();
  };

  var errorEscCloseHandler = function (evt) {
    window.util.isEscEvent(evt, errorCloseHandler);
  };

  var errorClickCloseHandler = function () {
    errorCloseHandler();
  };

  var errorCloseHandler = function () {
    errorMessage.classList.add('hidden');

    document.removeEventListener('keydown', errorEscCloseHandler);
    errorButton.removeEventListener('click', errorCloseHandler);
    document.removeEventListener('click', errorClickCloseHandler);
  };

  // Сообщение при ошибке отправки данных на сервер
  var showErrorMessage = function () {
    errorMessage.classList.remove('hidden');
    imgUpload.classList.add('hidden');
    main.appendChild(errorMessage);

    document.addEventListener('keydown', errorEscCloseHandler);
    errorButton.addEventListener('click', errorCloseHandler);
    document.addEventListener('click', errorClickCloseHandler);
  };

  // Обработчик при ошибке загрузки данных на сервер
  var errorSubmitHandler = function () {
    showErrorMessage();
    getDefaultSettings();
  };

  // Отправка данных на сервер Ajax
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), successSubmitHandler, errorSubmitHandler);
  });
})();
