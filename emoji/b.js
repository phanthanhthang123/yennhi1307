var xmlns = "http://www.w3.org/2000/svg",
    xlinkns = "http://www.w3.org/1999/xlink",
    select = function (s) {
        return document.querySelector(s);
    },
    selectAll = function (s) {
        return document.querySelectorAll(s);
    },
    // emojiArr = [' 😮 ', ' 😳 ', ' 🤣 ', ' 😍 ', ' 😇 ', ' 😎 ', ' 🤢 ', ' 🙄 '],
    emojiArr = [' 😊 ', ' 😳 ', ' 😍 ', ' 🥰 ', ' 😚 ', ' 🤗 ', ' 🤭 ', ' 😶‍🌫️ '],
    hitColorArr = ['#111', '#F7894A', '#00BCF2', '#F03A17', '#00BCF2', '#000', '#8CBD18', '#333'],
    shadow = select('#shadow'),
    emojiContainer = select('#emojiContainer'),
    hitLines = select('#hitLines'),
    emoji = select('#emoji'),
    count = 0,
    scale = 4;

gsap.set('svg', {
    visibility: 'visible'
});

gsap.set(emojiContainer, {
    transformOrigin: '50% 100%',
    scale: scale
});

gsap.set([shadow], {
    transformOrigin: '50% 50%'
});

gsap.set([shadow, emoji], {
    transformOrigin: '50% 50%'
});

var hitTl = gsap.timeline();

hitTl.fromTo('#hitLines line', { drawSVG: '0% 0%' }, { drawSVG: '0% 50%', ease: 'none' })
    .to('#hitLines line', { drawSVG: '60% 80%', ease: 'none' })
    .to('#hitLines line', { drawSVG: '100% 100%', ease: 'power1.out' });

    // tl.timeScale(10); // Tăng tốc độ lên gấp đôi
var tl = gsap.timeline({ paused: false, repeat: -1 }).timeScale(3);

tl.from(emojiContainer, { duration: 0.7, y: -100, ease: 'power1.in' })
    .from(emojiContainer, { duration: 0.7, scaleX: scale / 1.2, ease: 'power3.in' }, 0)
    .from(shadow, { duration: 0.7, scaleX: 0.3, alpha: 0.2, ease: 'power3.in' }, '-=0.7')
    .add(function () { hitTl.play(0).timeScale(3); gsap.set(hitLines, { stroke: hitColorArr[count] }); })
    .to(emojiContainer, { duration: 0.3, scaleY: scale / 2, scaleX: scale + (scale / 4) })
    .addLabel('hit', '-=0.3')
    .to(emojiContainer, { duration: 0.13, scaleY: scale, scaleX: scale / 1.2, ease: 'expo.out' }, '+=0.1')
    .add(onRepeat, '-=0.08')
    .to(emojiContainer, { duration: 0.7, y: -100, ease: 'power1.out' }, '-=0.1')
    .to(shadow, { duration: 0.7, scaleX: 0.3, alpha: 0.2, ease: 'power3.out' }, '-=0.7');

console.log(tl.duration());

gsap.to(emoji, { duration: tl.duration() / 1.5, rotation: '-=360', repeat: -1, ease: 'none' });

function onRepeat() {
    count = (count++ === emojiArr.length - 1) ? 0 : count;
    emoji.textContent = emojiArr[count];
}

