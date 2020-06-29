'use strict';

(function() {
  var urlGet = 'https://javascript.pages.academy/kekstagram/data';
  var urlPost = 'https://javascript.pages.academy/kekstagram';
  var statusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var makeRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };
  // Загрузка данных с сервера
  var load = function (onLoad, onError) {
    var request = makeRequest(onLoad, onError);
    request.open('GET', urlGet);
    request.send();
  };

  // Отправка данных на сервер
  var upload = function (data, onLoad, onError) {
    var request = makeRequest(onLoad, onError);
    request.open('POST', urlPost);
    request.send(data);
  };

  window.backend = {
    load: load,
    upload: upload,
  };

})();
