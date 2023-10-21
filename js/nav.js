// SIDE POPUP NAV
function showNav() {
  $(".sidebars").addClass("show");
}
function closeNav() {
  $(".sidebars").removeClass("show");
}

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight() + 300; 

$(window).on("scroll", function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 100);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if ((st > lastScrollTop && st > navbarHeight) || window.pageYOffset < navbarHeight){   
        // Scroll Down
        $('.nav-sticky').removeClass('sticky');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.nav-sticky').addClass('sticky');
        }
    }
    
    lastScrollTop = st;
}

