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

    // Call at Touch Move
    // e as event
    function cardFlipMove(e) {

        let deltaX = PageX - e.touches[0].pageX;
        let deltaY = PageY - e.touches[0].pageY;
        let deltaScale = deltaY/(winHeight*0.6)
        let deltaDX = deltaScale * 180;

        // Adjust Card Lighting on the fly
        if (deltaDX >= 0) {
            $(`${selector} .card.bottom`).css('transform',`rotateX(${deltaDX}deg)`);
            $(`${selector} .card.bottom`).css('-webkit-filter',`brightness(${1-deltaScale})`);
            $(`${selector} .card.bottom`).css('filter',`brightness(${1-deltaScale})`);
        } else {
            $(`${selector} .card.top`).css('transform',`rotateX(${deltaDX}deg)`);
            $(`${selector} .card.top`).css('transform',`rotateX(${deltaDX}deg)`);
            $(`${selector} .card.top`).css('-webkit-filter',`brightness(${1+deltaScale})`);
            $(`${selector} .card.top`).css('filter',`brightness(${1+deltaScale})`);
        };

        // Debug
        console.log(deltaX);
        console.log(deltaDX);
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
        console.log('touch ended');
    }

    // Bind Card Flip to Deck
    $(selector).bind('touchstart', cardFlipStart);
    $(selector).bind('touchend', cardFlipEnd);
    $(selector).bind('touchmove', cardFlipMove);
}

//Bind CardFlip to '.deck'
cardFlip('.deck');