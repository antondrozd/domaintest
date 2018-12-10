$(document).ready(function() {
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: false,
        mobileFirst: true,
        // waitForAnimate: false
    });
});

const arr = ['50', '100', '200', '1k', '5k'];

$('.slide').each(function(index) {
    $(this)
        .find('.count')
        .text(arr[index] + ' triangles');
});

arr.forEach(function(count) {
    $('select').append(`<option>${count}</option>`);
});

function animate() {
    let delay = 0;
    const delayStep = 2500 / $('.animation polygon').length;
    const appereanceSpeed = 10;

    $('.animation polygon').each(function() {
        $(this).css({
            opacity: 0
        });
    });

    $('.animation polygon').each(function() {
        $(this)
            .delay(delay)
            .animate(
                {
                    opacity: 1
                },
                appereanceSpeed
            );

        delay += delayStep;
    });
}

$('.animate').on('click', animate);

$('select').on('change', function() {
    const count = $(this).val();

    $('.animation').text('Loading...');
    $('.animation').load(`/img/vector${count}.svg`);
});

$('select').trigger('change');
