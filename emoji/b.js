var xmlns = "http://www.w3.org/2000/svg",

    xlinkns = "http://www.w3.org/1999/xlink",

    select = function (s) {

        return document.querySelector(s);

    },

    selectAll = function (s) {

        return document.querySelectorAll(s);

    },

    emojiArr = [' 😮 ', ' 😳 ', ' 🤣 ', ' 😍 ', ' 😇 ', ' 😎 ', ' 🤢 ', ' 🙄 '],

    hitColorArr = ['#111', '#F7894A', '#00BCF2', '#F03A17', '#00BCF2', '#000', '#8CBD18', '#333'],

    shadow = select('#shadow'),

    emojiContainer = select('#emojiContainer'),

    hitLines = select('#hitLines'),

    emoji = select('#emoji'),

    count = 0,

    scale = 4




TweenMax.set('svg', {

    visibility: 'visible'

})

TweenMax.set(emojiContainer, {

    transformOrigin: '50% 100%',

    scale: scale

})

TweenMax.set([shadow], {

    transformOrigin: '50% 50%'

})

TweenMax.set([shadow, emoji], {

    transformOrigin: '50% 50%'

})


var hitTl = new TimelineMax();


hitTl.fromTo('#hitLines line', 0.2, {

    drawSVG: '0% 0%'

}, {

    drawSVG: '0% 50%',

    ease: Linear.easeNone

})

    .to('#hitLines line', 0.2, {

        drawSVG: '60% 80%',

        ease: Linear.easeNone

    })

    .to('#hitLines line', 0.4, {

        drawSVG: '100% 100%',

        ease: Sine.easeOut

    })


var tl = new TimelineMax({ paused: false, repeat: -1 }).timeScale(3);

tl.from(emojiContainer, 0.7, {

    y: -100,

    ease: Power1.easeIn

})

    .from(emojiContainer, 0.7, {

        scaleX: scale / 1.2,

        ease: Power3.easeIn

    }, 0)

    .from(shadow, 0.7, {

        scaleX: 0.3,

        alpha: 0.2,

        ease: Power3.easeIn

    }, '-=0.7')

    .addCallback(function () { hitTl.play(0).timeScale(3); TweenMax.set(hitLines, { stroke: hitColorArr[count] }); })

    .to(emojiContainer, 0.3, {

        scaleY: scale / 2,


        scaleX: scale + (scale / 4)

    })

    .addLabel('hit', '-=0.3')

    .to(emojiContainer, 0.13, {

        scaleY: scale,

        scaleX: scale / 1.2,

        ease: Expo.easeOut

    }, '+=0.1')

    .addCallback(onRepeat, '-=0.08')

    .to(emojiContainer, 0.7, {

        y: -100,

        ease: Power1.easeOut

    }, '-=0.1')

    .to(shadow, 0.7, {

        scaleX: 0.3,

        alpha: 0.2,

        ease: Power3.easeOut

    }, '-=0.7')


console.log(tl.duration())




TweenMax.to(emoji, tl.duration() / 1.5, {

    rotation: '-=360',

    //yoyo:true,

    repeat: -1,

    ease: Linear.easeNone

})


function onRepeat() {

    count = (count++ === emojiArr.length - 1) ? 0 : count;

    emoji.textContent = emojiArr[count];



}