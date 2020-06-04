'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = ['Артем', 'Зина', 'Александр', 'Джангар', 'Чаяна', 'Лилия'];
var postsAmount = 25;
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var pictures = document.querySelector('.pictures');


// Функция подбора случайного числа в заданном промежутке
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для создания одного комментария
var createComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
    name: NAMES[getRandomNumber(0, NAMES.length - 1)]
  };
  return comment;
};

// Функция для создания рандомного количества комментариев
var createComments = function () {
  var commentsArray = [];
  for (var i = 0; i <= getRandomNumber(1, 5); i++) {
    commentsArray.push(createComment());
  }
  return commentsArray;
};


// Функция для создания одного поста
var createPost = function (index) {
  var post = {
    url: 'photos/' + (index + 1) + '.jpg', // 1-25
    description: 'Все ок!',
    likes: getRandomNumber(15, 200),
    comments: createComments(),
  };
  return post;
};

// Создание 25 постов
var posts = [];
for (var i = 0; i < postsAmount; i++) {
  posts.push(createPost(i));
}

// Создание DOM элемента
var getPost = function (post) {
  var clonedPost = pictureTemplate.cloneNode(true);
  clonedPost.querySelector('.picture__img').src = post.url;
  clonedPost.querySelector('.picture__likes').textContent = post.likes;
  clonedPost.querySelector('.picture__comments').innerHTML = post.comments.length;
  return clonedPost;
};


// Отрисовка DOM элемента на странице
var fragment = document.createDocumentFragment();
for (var j = 0; j < postsAmount; j++) {
  fragment.appendChild(getPost(posts[j]));
}
pictures.appendChild(fragment);
