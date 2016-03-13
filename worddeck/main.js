'use strict'

// ES6 Syntax
/** 
 * Flip the Card
 * E as Event 
 * component as jquery selector
 * pageX and pageY for moving point
 */
function cardFlip(selector) {
    //Global PageX & PageY for recording
    var PageX, PageY;
    PageX = PageY = 0;
    var winHeight = window.innerHeight;

    let metrics = {
        deltaX: 0,
        deltaY: 0,
        deltaScale: 0,
        deltaDX: 0,
    }

    // Call at Touch Move
    // e as event
    function cardFlipMove(e) {
        metrics.deltaX = PageX - e.touches[0].pageX;
        metrics.deltaY = PageY - e.touches[0].pageY;
        metrics.deltaScale = metrics.deltaY / (winHeight*0.6) 
        metrics.deltaDX = metrics.deltaScale * 180;

        // Adjust Card Lighting on the fly
        if (metrics.deltaDX >= 0) {
            $(`${selector} .card.bottom`).css('transform',`rotateX(${metrics.deltaDX}deg)`);
            $(`${selector} .card.bottom`).css('-webkit-filter',`brightness(${1 - metrics.deltaScale})`);
            $(`${selector} .card.bottom`).css('filter',`brightness(${1 - metrics.deltaScale})`);
            $(`${selector} .card.bottom`).css('-webkit-filter',`contrast(${1 - metrics.deltaScale})`);
            $(`${selector} .card.bottom`).css('filter',`contrast(${1 - metrics.deltaScale})`);
        } else {
            $(`${selector} .card.top`).css('transform',`rotateX(${metrics.deltaDX}deg)`);
            $(`${selector} .card.top`).css('-webkit-filter',`brightness(${1 + metrics.deltaScale})`);
            $(`${selector} .card.top`).css('filter',`brightness(${1 + metrics.deltaScale})`);
            $(`${selector} .card.top`).css('-webkit-filter',`contrast(${1 + metrics.deltaScale})`);
            $(`${selector} .card.top`).css('filter',`contrast(${1 + metrics.deltaScale})`);
        };

        // Debug
        console.log(metrics.deltaX);
        console.log(metrics.deltaDX);
    }

    // Call at Touch Start
    // e as event
    function cardFlipStart(e) {
        PageX = e.touches[0].pageX;
        PageY = e.touches[0].pageY;
        console.log('touch started');
    }

    // Call at Touch End
    // e as event
    function cardFlipEnd(e) {
        PageX = PageY = 0;
        console.info('touch ended');
        $(`${selector} .card.bottom`).animate({rotateX: '0deg'}, 500, 'ease-out', function(){
            $(`${selector} .card.bottom`).css('-webkit-filter', 'contrast(1)')
            $(`${selector} .card.bottom`).removeClass('restore-progress')
        });
        $(`${selector} .card.bottom`).addClass('restore-progress')
    }

    // Bind Card Flip to Deck
    $(selector).bind('touchstart', cardFlipStart);
    $(selector).bind('touchend', cardFlipEnd);
    $(selector).bind('touchmove', cardFlipMove);
}

//Bind CardFlip to '.deck'
$(document).ready(() => {
    window.cardFlip('.deck');
});
