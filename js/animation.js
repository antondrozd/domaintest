$(document).ready(function() {
    counts.forEach(function(count) {
        $('#count').append(`<option data-count="${count}">${count}</option>`);
    });

    function animate() {
        let delay = 0;
        const duration = $('#duration').val();
        const delayStep = duration / $('.animation polygon').length;
        const appereanceSpeed = 10;

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

    function toggleButton() {
        const btn = $('.animate');

        btn.prop('disabled')
            ? btn.prop('disabled', false)
            : btn.prop('disabled', true);
    }

    $('.animate').on('click', animate);

    function loadSVG() {
        toggleButton();

        const count = $('#count').val();

        $('.animation').load(`/img/vector${count}.svg`, function() {
            $(this)
                .find($('polygon'))
                .each(function() {
                    $(this).css({
                        opacity: 0
                    });
                });

            setSVGSize();
            toggleButton();
        });
    }

    $('#count').on('change', loadSVG);

    function setSVGSize() {
        const width = $('.animation').width();

        $('svg g').css({
            transform: `scale(${width / 265}) translate(${width /
                135}px, ${width / 135}px)`
        });
    }

    $(window).on('resize', setSVGSize);

    function getParamsFromURL() {
        const params = new URLSearchParams(window.location.search.slice(1));

        const count = Number(params.get('c'));
        const duration = Number(params.get('d'));

        if (!count || !duration || !counts.includes(count) || duration < 0) {
            console.info('Empty or invalid search query');
            return false;
        }

        return { count, duration };
    }

    function setURLConfig({ count, duration }) {
        $(`option[data-count="${count}"]`).prop('selected', true);
        $('#duration').val(duration);
    }

    function getLinkWithParams() {
        const origin = window.location.origin;
        const pathname = window.location.pathname;

        const count = $('#count').val();
        const duration = $('#duration').val();

        const query = `?c=${count}&d=${duration}`;

        return `${origin}${pathname}${query}`;
    }

    $('.link').on('click', function() {
        const container = $('.link-container');
        const link = getLinkWithParams();

        container.html(`<input type="text" value="${link}">`);

        const input = container.find($('input'));

        input.select();
        document.execCommand('copy');

        $('<span>Copied to clipboard!</span>')
            .insertBefore(input)
            .animate(
                {
                    opacity: 0
                },
                700
            );
    });

    const params = getParamsFromURL();

    if (params) {
        setURLConfig(params);
    }

    loadSVG();
});
