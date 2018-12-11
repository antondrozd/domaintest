$(document).ready(function() {
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: false,
        mobileFirst: true
        // waitForAnimate: false
    });

    $('.slide').each(function(index) {
        $(this)
            .find('.count')
            .text(counts[index] + ' triangles');
    });
});
