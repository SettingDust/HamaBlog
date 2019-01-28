let $main = $('main');
$main.on('scroll', () => {
    let $header = $('.header');
    if ($main.scrollTop() > 0) $header.addClass('on');
    else $header.removeClass('on');
});
$(() => {
    $.ripple('.ripple-elem', {
        duration: 0.5,
        easing: 'ease-in'
    });
    $('.card.tooltip').tooltipster({
        theme: 'tooltipster-customized',
        arrow: false,
        animationDuration: 125,
        zIndex: 11,
        parent: 'main',
        distance: 4
    });
    $('nav a.tooltip').tooltipster({
        theme: 'tooltipster-customized',
        arrow: false,
        animationDuration: 125,
        zIndex: 11,
        distance: 4
    });
    $('[data-href]').on('click', function() {
        window.open($(this).data('href'));
    });
});
