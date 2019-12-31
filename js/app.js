'use strict';

const picArr = []; // ARRAY OF ALL PICTURES
const keywordArr = []; // ARRAY OF DISTINCT KEYWORDS

// INITIAL PICTURE ARRAY CREATED FROM JSON INTO picArr

function Pic(picObj) {
  this.title = picObj.title;
  this.description = picObj.description;
  this.keyword = picObj.keyword;
  this.horns = picObj.horns;
  this.image_url = picObj.image_url;
  picArr.push(this);
}

// RENDER EACH PICTURE

Pic.prototype.render = function () {
  const picTemplate = $('#pic-template').html();
  const $newSection = $('<section></section>');
  $newSection.find('section').addClass(this.keyword);
  $newSection.html(picTemplate);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.keyword);
  $newSection.find('p').text(this.description);
  $('main').append($newSection);
};

// POPULATE DISTINCT KEYWORD ARRAY AND DROPDOWN MENU

$.get('./data/page-1.json', data => {
  data.forEach(pic => {
    new Pic(pic).render();
    if (!keywordArr.includes(pic.keyword)) {
      keywordArr.push(pic.keyword);
    }
  });
  keywordArr.forEach(i => {
    $('select').append(`<option>${i}</option>`);
  });
});

// WHEN NEW KEYWORD FROM MENU SELECTED, HIDE ALL, THEN RENDER MATCHES

$('select').on('change', function() {
  $('section').hide();
  picArr.forEach(pic => {
    if (this.value === pic.keyword || this.value === 'default') {
      pic.render();
    }
  });
});

// name separate later
