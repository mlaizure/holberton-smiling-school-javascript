function createQuote (id, pic_url, name, title, text) {
  const $newQuote = $('<div class="carousel-item"></div>');
  if (id === 1) {
    $($newQuote).addClass('active');
  }
  const $textAndPic = $('<div class="text-and-pic d-flex w-75 mx-auto my-5 flex-sm-row flex-column align-items-center"></div>');
  const $image = $('<img class="rounded-circle mb-sm-0 mb-3" alt="Pic of reviewer"></img>');
  $($image).attr('src', pic_url);
  const $textGroup = $('<div class="ml-0 ml-sm-5 text-sm-left text-justify text-white"></div>');
  const $review = $('<p></p>');
  $($review).text(text);
  const $author = $('<p class="mb-0 font-weight-bold"></p>');
  $($author).text(name);
  const $authTitle = $('<p class="font-italic"></p>');
  $($authTitle).text(title);
  $($textGroup).append($review, $author, $authTitle);
  $($textAndPic).append($image, $textGroup);
  $($newQuote).append($textAndPic);
  $(".testimonials-section .carousel-inner").append($newQuote);
}

function queryTestimonials () {
  const url = "https://smileschool-api.hbtn.info/quotes"
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

$(document).ready(function () {
  queryTestimonials();
});
