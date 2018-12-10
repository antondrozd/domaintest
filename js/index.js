$(document).ready(function() {
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: false,
        mobileFirst: true
        // waitForAnimate: false
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
        const duration = $('#duration').val();
        const delayStep = duration / $('.animation polygon').length;
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

    function loadSVG() {
        const count = $('select').val();

        $('.animation').load(`/img/vector${count}.svg`, function() {
            setSVGSize();
        });
    }

    $('select').on('change', loadSVG);

    function setSVGSize() {
        const width = $('.animation').width();

        $('svg g').css({
            transform: `scale(${width / 265}) translate(${width /
                135}px, ${width / 135}px)`
        });
    }

    $(window).on('resize', setSVGSize);

    loadSVG();
});
