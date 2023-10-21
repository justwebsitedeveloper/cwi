// Home-testimonials
$(document).ready(function () {
  $(".home-testimonials__carousel").owlCarousel({

    margin: 40,
    loop: true,
    autoWidth: true,
    responsiveClass: true, 
    dots:true,
    responsive: {
      490: {
        center: false, 
      },

      0: {
        center: true,
      }
    }
  });
});


// Living young programme
$(document).ready(function () {
  $(".lyp-cards").owlCarousel({
    margin: 16,
    loop: true,
    autoWidth: true,
    nav: true,
  });
});


// Thermiva
$(document).ready(function () {
  $(".thermiva-conditions").owlCarousel({
    margin: 50,
    loop: true,
    autoWidth: true,
    center: true,
    items: 4,
    nav: true,
  });
});


// Home - services
$(document).on("click", ".home-services__card-title", function () {
  var elem = $(this).parent().find("label");
  elem.trigger("click");
});

