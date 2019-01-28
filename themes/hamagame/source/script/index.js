function throttle(fn, gapTime) {
    let _lastTime = null;

    return () => {
        let _nowTime = new Date();
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn();
            _lastTime = _nowTime;
        }
    };
}

function loadImage() {
    $('img.lazyload').each(function() {
        let $elem = $(this);
        let $main = $('#main');
        setTimeout(() => {
            let $elemTop = $elem.offset().top;
            if (
                $elemTop < $main.outerHeight() &&
                $elemTop > 32 - $elem.outerHeight() * 2
            ) {
                let src = $elem.data('src   ');
                $elem.attr('src', src);
                $('<img>')
                    .attr('src', src)
                    .on('load', () => {
                        $elem.css('opacity', 1);
                    });
            } else {
                $elem.css('opacity', 0).removeAttr('src');
            }
        });
    });
}

$(() => {
    let lazyLoad = throttle(loadImage, (1000 / 60) * 10);
    let $main = $('#main');
    lazyLoad();
    $main.on('scroll', lazyLoad);
    $(window).on('resize', lazyLoad);
});
