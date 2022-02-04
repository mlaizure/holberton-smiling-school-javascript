// Makes the cards for the quotes carousel.
function createQuote (id, pic_url, name, title, text) {
  const $newQuote = $('<div class="carousel-item"></div>');
  if (id === 1) {
    $newQuote.addClass('active');
  }
  const $textAndPic = $('<div class="text-and-pic d-flex w-75 mx-auto my-5 flex-sm-row flex-column align-items-center"></div>');
  const $image = $('<img class="rounded-circle mb-sm-0 mb-3" alt="Pic of reviewer"></img>');
  $image.attr('src', pic_url);
  const $textGroup = $('<div class="ml-0 ml-sm-5 text-sm-left text-justify text-white"></div>');
  const $review = $('<p></p>');
  $review.text(text);
  const $author = $('<p class="mb-0 font-weight-bold"></p>');
  $author.text(name);
  const $authTitle = $('<p class="font-italic"></p>');
  $authTitle.text(title);
  $textGroup.append($review, $author, $authTitle);
  $textAndPic.append($image, $textGroup);
  $newQuote.append($textAndPic);
  $(".testimonials-section .carousel-inner").append($newQuote);
}

// Getting picture and quote data from API and then calls createQuote to assemble each card for the quotes carousel.
function queryTestimonials () {
  const url = "https://smileschool-api.hbtn.info/quotes";
  $('.testimonials-section .lds-heart').show();
  $('#testimonials .holberton_school-icon-arrow_3, #testimonials .holberton_school-icon-arrow_4').hide();
  $.get(url, function (data) {
    data.forEach(quote => {
      createQuote(quote.id, quote.pic_url, quote.name, quote.title, quote.text);
    });
  }).then(() => {
    $('.testimonials-section .lds-heart').hide();
    $('#testimonials .holberton_school-icon-arrow_3, #testimonials .holberton_school-icon-arrow_4').show();
  });
}

// Creates cards and adds them to a tutorial or video carousel.
function createCarouselCard($carousel, id, ...args) {
  const $newCarouselItem = $('<div class="carousel-item"></div>');
  if (id === 1) {
    $newCarouselItem.addClass('active');
  }
  $newCarouselItem.append(createCard(id, 'col-lg-3', ...args));
  $carousel.find(".carousel-inner .inner-container").append($newCarouselItem);
}

// Creates cards from search results and adds them to the search results page
function createResultsCard(id, ...args) {
  $('.results .container .row').append(createCard(id, 'col-lg-3 col-md-4 col-sm-6 col-12 overflow-hidden', ...args));
}

// Creates cards for tutorial or video carousels
function createCard (id, cardClasses, title, sub_title, thumb_url, author, author_pic_url, star, duration) {
  const $newCard = $('<div class="card border-0"></div>');
  $newCard.addClass(cardClasses);
  const $cardImg = $('<img class="card-img-top mx-auto d-block" alt="tutorial thumbnail">');
  $cardImg.attr('src', thumb_url);
  const $cardOverlay = $('<div class="card-img-overlay d-flex justify-content-center mx-auto"><img class="align-self-center" src="./images/play.png" alt="play symbol"></div>');
  const $cardBody = $('<div class="card-body mx-auto p-3"></div>');
  const $cardTitle = $('<p class="font-weight-bold card-text mb-2 vid-title"></p>');
  $cardTitle.text(title);
  const $cardSubTitle = $('<p class="card-text text-muted vid-desc"></p>');
  $cardSubTitle.text(sub_title);
  const $authorInfo = $('<div class="d-flex reviewer-info align-items-center"></div>');
  const $authorImg = $('<img class="rounded-circle" alt="author profile pic">');
  $authorImg.attr('src', author_pic_url);
  const $authorName = $('<p class="reviewer-name ml-2 mb-0 card-text"></p>');
  $authorName.text(author);
  const $starsAndLen = $('<div class="stars-length d-flex justify-content-between align-items-center mt-2"></div>');
  const $stars = $('<div class="stars"></div>');
  let i = 0;
  for (i; i < star; ++i) {
    $stars.append('<img src="./images/star_on.png" alt="purple star">');
  }
  for (i; i < 5; ++i) {
    $stars.append('<img src="./images/star_off.png" alt="grey star">');
  }
  const $vidLength = $('<p class="length mb-0"></p>');
  $vidLength.text(duration);
  $starsAndLen.append($stars, $vidLength);
  $authorInfo.append($authorImg, $authorName);
  $cardBody.append($cardTitle, $cardSubTitle, $authorInfo, $starsAndLen);
  $newCard.append($cardImg, $cardOverlay, $cardBody);
  return $newCard;
}

// Getting video and/or tutorial data from API and then calls createCarouselCard to assemble each card for a tutorial or video carousel.
function queryTutorialsOrVideos (url, $carousel) {
  const $heart = $carousel.find('.lds-heart');
  $heart.show();
  return $.get(url, function (data) {
    data.forEach(item => {
      createCarouselCard($carousel, item.id, item.title, item['sub-title'], item.thumb_url, item.author, item.author_pic_url, item.star, item.duration);
    });
    $carousel.carousel({ interval: 10000 });
  }).then(() => { $heart.hide(); });
}

// Overriding Bootstrap functionality for multi-card carousel.
function initCarousel () {
  $('.late-and-tut .carousel .carousel-item').each(function () {
    var minPerSlide = 3;
    var next = $(this).next();

    if (!next.length)
      next = $(this).siblings(':first');

    for (var i = 0; i < minPerSlide; i++) {
      if (!next.length)
	next = $(this).siblings(':first');

      next.children(':first-child').clone().appendTo($(this));
      next = next.next();
    }
  });
}

// Changes string from snake case to title case.
function titleize (str) {
  return str
    .split("_")
    .map((chunk) => chunk[0].toUpperCase() + chunk.substring(1))
    .join(" ")
}

// Creates a dropdown item and appends it to the menu.
function createDropdownItem (menuItem, $menu, $button) {
  const $menuSelector = $('<a class="dropdown-item" href="#" data-val="' + menuItem + '">' + titleize(menuItem) + '</a>');
  $menuSelector.click(() => { $button.text(titleize(menuItem));
			      $button.attr('data-val', menuItem);
			      queryCourses(); } );
  $menu.append($menuSelector);
}

// Creates dropdown menus.
function buildDropdowns (data) {
  data.topics.forEach(t => {
    createDropdownItem(t, $('.topic-menu'), $('#topic'));
  });
  $('#topic').text(titleize(data.topic));
  data.sorts.forEach(s => {
    createDropdownItem(s, $('.sort-menu'), $('#sort'));
  });
  $('#sort').text(titleize(data.sort));
}

// Gets course data from api, creates results cards by calling createTresultsCards, and appends result cards to results page
function queryCourses () {
  const url = 'https://smileschool-api.hbtn.info/courses';
  let topic = $('#topic').attr('data-val');
  let sort = $('#sort').attr('data-val');
  let q = $('#search').val() || null;
  $('.results .container .row').empty();
  $('.results .container').append('<div class="lds-heart"><div></div></div>');
  return $.get(url, {topic, sort, q}, function (data) {
    data.courses.forEach(item => {
      createResultsCard(item.id, item.title, item['sub-title'], item.thumb_url, item.author, item.author_pic_url, item.star, item.duration);
    });
    $('.results .num-vids').text(data.courses.length + ' videos');
  }).then((data) => { $('.results .lds-heart').hide();
		      return data });
}

// Initializes page.
$(document).ready(function () {
  queryTestimonials();
  const tutorials = 'https://smileschool-api.hbtn.info/popular-tutorials';
  const videos = 'https://smileschool-api.hbtn.info/latest-videos';
  queryTutorialsOrVideos(tutorials, $('#tutorials'))
    .then(() => queryTutorialsOrVideos(videos, $('#latest')))
    .then(() => initCarousel());
  queryCourses().then(buildDropdowns);
  $('#search').change(queryCourses);
});
