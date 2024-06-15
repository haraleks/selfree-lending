
function animate({timing, draw, duration, forward}) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        if (forward) {
            progress = 1 - progress;
        }

        draw(progress);

        if (timeFraction < 1) {
        requestAnimationFrame(animate);
        }

    });
}






let player = new Plyr('#vidRev', {
    controls: ['play-large', 'play', 'progress', 'mute', 'volume', 'current-time', 'settings', 'fullscreen']
});

var modalPlayer = new HystModal({
    linkAttributeName: "data-modalPlayer",
    afterClose: () => {
        player.pause();
    }
});


let videoReviewContent = document.querySelector('.videoReviewModalInner');
let openVideo = document.querySelectorAll('.openVideo');

openVideo.forEach((elem, i)=>{
    elem.addEventListener('click',(e)=>{
        switch (i) {
            case 0:
                videoReviewContent.innerHTML=`
                <video id="vidRev" playsinline controls>
                <source id="vidSrc" src="/assets/media/video/reviews/surenVideo.MOV" type="video/mp4" />
            </video>
                `
                ;
                 player = new Plyr('#vidRev', {
                    controls: [ 'play-large', 'play','progress', 'mute', 'volume',   'current-time',  'settings', 'fullscreen']
                });

            break;
            case 1:
                videoReviewContent.innerHTML=`
          
                <video id="vidRev" playsinline controls>
                <source id="vidSrc" src="/assets/media/video/reviews/selfreeRewiev2.mp4" type="video/mp4" />
            </video>
                `
                ;
                 player = new Plyr('#vidRev', {
                    controls: [ 'play-large', 'play','progress', 'mute', 'volume',   'current-time',  'settings', 'fullscreen']
                });
            break;
            case 2:
                videoReviewContent.innerHTML=`
           
                <video id="vidRev" playsinline controls>
                <source id="vidSrc" src="/assets/media/video/reviews/selfreeRewiev3.mp4" type="video/mp4" />
            </video>
                `
                ;

                 player = new Plyr('#vidRev', {
                    controls: [ 'play-large', 'play','progress', 'mute', 'volume',   'current-time',  'settings', 'fullscreen']
                });
            break;
            case 3:
                videoReviewContent.innerHTML=`
            
                <video id="vidRev" playsinline controls>
                <source id="vidSrc" src="/assets/media/video/reviews/selfreeRewiev1.mp4" type="video/mp4" />
            </video>
                `
                ;
                 player = new Plyr('#vidRev', {
                    controls: [ 'play-large', 'play','progress', 'mute', 'volume',   'current-time',  'settings', 'fullscreen']
                });
            break;
            case 4:
                videoReviewContent.innerHTML=`
     
                <video id="vidRev" playsinline controls>
                <source id="vidSrc" src="/assets/media/video/reviews/selfreeRewiev4.mp4" type="video/mp4" />
            </video>
                `
                ;
                 player = new Plyr('#vidRev', {
                    controls: [ 'play-large', 'play','progress', 'mute', 'volume',   'current-time',  'settings', 'fullscreen']
                });
            break;
        }
    });
});


let faqButtons = document.querySelectorAll('.relevantQuestionsBlock__button');
let faqHightlight = document.querySelectorAll('.relevantQuestionsBlock__titleHigthlight');
let answers = document.querySelectorAll('.relevantQuestionsBlock__answerText');
let answerContainer = document.querySelectorAll('.answerTextContainer');

faqButtons.forEach((elem, i) => {
    elem.addEventListener('click', (e) => {
        faqButtons[i].classList.toggle('relevantQuestionsBlock__button_status_opened');
        if (answers[i].classList.contains('relevantQuestionsBlock__answerText_state_hidden')) {
            answers[i].classList.toggle('relevantQuestionsBlock__answerText_state_hidden');
            animate({
                duration: 250,
                timing: function (time) {
                return time
                },
                draw: function (progress) {
                    answerContainer[i].style.height = progress * answers[i].clientHeight + 'px';
                },
                forward: false,
            })
        } else {
            answers[i].classList.toggle('relevantQuestionsBlock__answerText_state_hidden');
            animate({
                duration: 250,
                timing: function (time) {
                return time
                },
                draw: function (progress) {
                    answerContainer[i].style.height = progress * answers[i].clientHeight + "px"
                }, 
                forward: true,
            })
        }
        faqHightlight[i].classList.toggle('relevantQuestionsBlock__titleHigthlight_state_hidden');
    })
})


let teacherToggle = document.querySelectorAll('.teachersBlock__titleElement');
let teacherButtonOpen = document.querySelectorAll('.teacherBlock');
let teacherContent = document.querySelectorAll('.teacherBlock__content');
let teacherPhoto = document.querySelectorAll('.teacherPhoto_preview');

teacherToggle.forEach((elem, i) => {
    elem.addEventListener('click', (e) => {
        teacherContent[i].classList.toggle('teacherBlock__content_opened');
        switch (i) {
            case 0: teacherButtonOpen[i].classList.toggle('teacherBlock_opened_suren');
                teacherPhoto[i].classList.toggle('teacherPhoto__suren'); break;

            case 1: teacherButtonOpen[i].classList.toggle('teacherBlock_opened_philip');
                teacherPhoto[i].classList.toggle('teacherPhoto__philip'); break;

            case 2: teacherButtonOpen[i].classList.toggle('teacherBlock_opened_lolita');
                teacherPhoto[i].classList.toggle('teacherPhoto__lolita'); break;

            case 3: teacherButtonOpen[i].classList.toggle('teacherBlock_opened_nelly');
                teacherPhoto[i].classList.toggle('teacherPhoto__nelly'); break;

            case 4: teacherButtonOpen[i].classList.toggle('teacherBlock_opened_pascal');
                teacherPhoto[i].classList.toggle('teacherPhoto__pascal'); break;

            case 5: teacherButtonOpen[i].classList.toggle('teacherBlock_opened_maria');
                teacherPhoto[i].classList.toggle('teacherPhoto__maria'); break;

            case 6: teacherButtonOpen[i].classList.toggle('teacherBlock_opened_ulia');
                teacherPhoto[i].classList.toggle('teacherPhoto__ulia'); break;

            case 7: teacherButtonOpen[i].classList.toggle('teacherBlock_opened_inessa');
                teacherPhoto[i].classList.toggle('teacherPhoto__inessa'); break;
        }
    })
})


let courseSelector = document.querySelectorAll('.courseSelector');
let selected = 0;
let coursesContent = document.querySelectorAll(".flexBox_forCourses");

courseSelector.forEach((elem, i) => {
    elem.addEventListener('click', (e) => {
        courseSelector[selected].classList.toggle('courseSelector_selected');
       

        switch (selected) {
            case 0:
                coursesContent[selected].classList.toggle('visibility_hidden');
                break;
            case 1:
                coursesContent[selected].classList.toggle('visibility_hidden');
                break;
            case 2:
                coursesContent[selected].classList.toggle('visibility_hidden');
                break;
        }

        coursesContent[i].classList.toggle('visibility_hidden');
        courseSelector[i].classList.toggle('courseSelector_selected');
        selected = i;

    })
});


window.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 980) {
        const imgBillyMobile = document.getElementById('billyMobile');

        imgBillyMobile.style = `opacity:0; transition: opacity .4s ease-in-out;`;

        imgBillyMobile.onload = () => {
            imgBillyMobile.style.opacity = 1;
        }

        setTimeout(() => {
            imgBillyMobile.src = imgBillyMobile.getAttribute('data-img-src');
        }, 500);
    }
})