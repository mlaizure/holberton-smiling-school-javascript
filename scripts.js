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

function createCard (id, title, sub_title, thumb_url, author, author_pic_url, star, duration) {
  const $newCarouselItem = $('<div class="carousel-item"></div>');
  if (id === 1) {
    $newCarouselItem.addClass('active');
  }
  const $newCard = $('<div class="card border-0 col-lg-3"></div>');
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
  $newCarouselItem.append($newCard);
  $(".tutorials-section .carousel-inner .inner-container").append($newCarouselItem);
}

function queryTutorials () {
  const url = "https://smileschool-api.hbtn.info/popular-tutorials";
  $('.tutorials-section .lds-heart').show();
  $.get(url, function (data) {
    data.forEach(tutorial => {
      createCard(tutorial.id, tutorial.title, tutorial['sub-title'], tutorial.thumb_url, tutorial.author, tutorial.author_pic_url, tutorial.star, tutorial.duration);
    });
    $('#tutorials').carousel({
      interval: 10000
    })
    $('.tutorials-section .carousel .carousel-item').each(function () {
      var minPerSlide = 3;
      var next = $(this).next();
      console.log("NEXT: ", next.get(0));

      if (!next.length)
	next = $(this).siblings(':first');

      for (var i = 0; i < minPerSlide; i++) {
	if (!next.length)
	  next = $(this).siblings(':first');

	next.children(':first-child').clone().appendTo($(this));
	next = next.next();
      }
    });
  }).then(() => { $('.tutorials-section .lds-heart').hide(); });
}

$(document).ready(function () {
  queryTestimonials();
  queryTutorials();
});
