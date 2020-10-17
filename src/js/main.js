var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
var iPad = /iPad/.test(navigator.userAgent) && !window.MSStream;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(iPhone){
    $('body').addClass('iphone');
}
if(iPad){
    $('body').addClass('ipad');
}
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
  if (ua.indexOf('chrome') > -1) {
    // alert("1") // Chrome
  } else {
    // alert("2") // Safari
    $('body').addClass('safari');
  }
}



if(window.navigator.userAgent.indexOf("Edge") > -1) {
  $('body').addClass('edge');
}

var UAString = navigator.userAgent;
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1)
{
  $('body').addClass('ie');
}
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:10") !== -1)
{
  $('body').addClass('ie');
}


$(document).ready(function () {

  $(".home__sphere-preview").hover(
    function() {
      $( this ).addClass("hover");
    }, function() {
      $( this ).removeClass("hover");
    }
  );

  $(document).on('click', '.home__sphere-preview', function (e) {
    $('[data-sphere-detail]').removeClass('active');
    $('[data-sphere-item]').removeClass('active');

    $(this).closest('.home__sphere-item').addClass('active');
    var numberItem = $(this).closest('.home__sphere-item').attr('data-sphere-item');
    $('[data-sphere-detail=' + numberItem + ']').addClass('active');
  });

  $(document).on('click', '.home__sphere-detail-close', function (e) {
    var numberItem = $(this).closest('.home__sphere-detail').attr('data-sphere-detail');
    $('[data-sphere-item=' + numberItem + ']').removeClass('active');
    $(this).closest('.home__sphere-detail').removeClass('active');
  });



  var bLazy = new Blazy({
    src: 'data-blazy' // Default is data-src
  });

  $('#menu-btn').click(function () {
    $('#menu-list').slideToggle();
    $('.header').toggleClass('menu-open');
    // $('body').toggleClass('oh');
  });

  // $(document).on('click', function (e) {
  //   if($(e.target).closest('.header.menu-open').length === 0 && $('.header.menu-open').length > 0 && $(e.target).closest('#menu-btn').length === 0) {
  //     $('#menu-list').slideToggle();
  //     // $('body').removeClass('oh');
  //   }
  // });

  $(document).on('click', function (e) {
    if($(e.target).closest('.header__nav').length === 0 && $('.header.menu-open').length > 0) {
      $('#menu-list').slideToggle();
      $('.header').removeClass('menu-open');
      // $('body').removeClass('oh');
    }
  });

  $(document).scroll(function () {
    var top = $(document).scrollTop();
    if (top < 150) {
      $(".header").removeClass('scroll');
    } else {
      $(".header").addClass('scroll');
    }
  });

  // checking browser for WEBP
  hasWebP().then(function () {

    if($(window).width() > 768) {
      $('.webp-img').each(function () {
        var webp = $(this).data('webp');
        $(this).attr('data-blazy', webp);
      });
    } else {
      $('.webp-img').each(function () {
        var webp;
        if($(this).data('webp-mobile') !== undefined)
          webp = $(this).data('webp-mobile'); else webp = $(this).data('webp');
        console.log($(this).data('webp-mobile'));
        $(this).attr('data-blazy', webp);
      });
    }

    bLazy.revalidate();

  }, function () {
    if($(window).width() > 768) {
      $('.webp-img').each(function () {
        var img = $(this).data('img');
        $(this).attr('data-blazy', img);
      });
    } else {
      $('.webp-img').each(function () {
        var img;
        if($(this).data('img-mobile') !== undefined)
          img = $(this).data('img-mobile'); else img = $(this).data('img');
        $(this).attr('data-blazy', img);
      });
    }

    bLazy.revalidate();
  });


  /*popups start*/
  $(document).on('click', 'a[data-modal-class]', function (e) {
    e.preventDefault();
    var dataModalId = $(this).attr('data-modal-class');
    $('.popup.' + dataModalId + '').addClass('open');
    setTimeout(function () {
      bLazy.revalidate();
    },500)
  });

  $(document).on('click', '.popup__close', function (e) {
    $('.popup ').removeClass('open');
  });

  $(document).on('click', '.popup', function (e) {
    if(e.target.classList[0] == "popup") {
      $('.popup ').removeClass('open');
    }
  });
  /*popups end*/

  // $(document).scroll(function () {
  //   var top = $(document).scrollTop();
  //   if (top < 1) {
  //     $(".header").removeClass('scroll');
  //   } else {
  //     $(".header").addClass('scroll');
  //   }
  // });

  /*validation start*/
  $(document).on('click', '.site-form-submit-js', function(e){
    e.preventDefault();
    if($(this).closest('form').find('input[type="tel"]').length != 0) {
      var inputTel = $(this).closest('form').find('input[type="tel"]');
      if (inputTel.val().indexOf('_') === -1 && inputTel.val() != 0) {
        $(inputTel).closest('.site-form__input').addClass('correct');
        $(inputTel).closest('.site-form__input').removeClass('error-field');
      } else {
        $(inputTel).closest('.site-form__input').addClass('error-field');
        $(inputTel).closest('.site-form__input').removeClass('correct');
      }
    }

    if($(this).closest('form').find('input[type="email"].required').length != 0) {
      var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

      var input = $(this).closest('form').find('input[type="email"].required');
      var email = $(this).closest('form').find('input[type="email"].required').length > 0
        ? $(this).closest('form').find('input[type="email"].required')
        : false;


      if (email.val() == "" && email !== false) {
        email.closest('.site-form__input').addClass('error-field');

      } else {
        if (reg.test(email.val()) == false) {
          email.closest('.site-form__input').addClass('error-field');
          email.closest('.site-form__input').removeClass('correct');

        } else {
          email.closest('.site-form__input').addClass('correct');
          email.closest('.site-form__input').removeClass('error-field');
        }
      }
    }

    $(this).closest('form').find('input[type="password"].required').each(function () {

      if($(this).val().length < 4){
        $(this).closest('.site-form__row').addClass('error-field');
        $(this).closest('.site-form__row').removeClass('correct');
      } else {
        $(this).closest('.site-form__row').addClass('correct');
        $(this).closest('.site-form__row').removeClass('error-field');
      }
    });

    $(this).closest('form').find('input[type="text"].required').each(function () {
      if($(this).val() === ''){
        $(this).closest('.site-form__input').addClass('error-field');
        $(this).closest('.site-form__input').removeClass('correct');
      } else {
        $(this).closest('.site-form__input').addClass('correct');
        $(this).closest('.site-form__input').removeClass('error-field');
      }
    });

    $(this).closest('form').find('textarea.required').each(function () {
      if($(this).val() === ''){
        $(this).closest('.site-form__textarea').addClass('error-field');
        $(this).closest('.site-form__textarea').removeClass('correct');
      } else {
        $(this).closest('.site-form__input').addClass('correct');
        $(this).closest('.site-form__input').removeClass('error-field');
      }
    });

    if($(this).closest('form').find('.error-field').length == 0 && ($(this).closest('form').find('.required').length === 0 || $(this).closest('form').find('.correct').length > 0)){
      $(this).closest('form').find('.correct').removeClass('correct');
      $(this).siblings('input[type="submit"]').click();
    }
  });

  // $('.phonemask').inputmask("+38(999)99-99-99");

  /*validation end*/


});


//script fro webp img and background
var hasWebP = (function () {
  // some small (2x1 px) test images for each feature
  var images = {
    basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
    lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
  };

  return function (feature) {
    var deferred = $.Deferred();

    $("<img>").on("load", function () {
      // the images should have these dimensions
      if (this.width === 2 && this.height === 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).on("error", function () {
      deferred.reject();
    }).attr("src", images[feature || "basic"]);

    return deferred.promise();
  }
})();

