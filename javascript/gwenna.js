// 
const headerLarge = document.querySelector('#home');
const headerSlim = document.querySelector('#slim-nav');
const menuSec = document.querySelector('.menu');
const slides = document.getElementsByClassName('slides');



// const lazyImages = document.getElementsByClassName('lazy');

const lazyImages = [].slice.call(document.getElementsByClassName("lazy"));
let loaded = false;



// initialise slide show variables
let slideIndex = 1;
let autoPlay;
let playing = false;



function readyPage() {
    // sets listeners for buttons requiring js actions
    document.querySelector('#open-menu').addEventListener("click", openSideMenu);
    document.querySelector('#close-menu').addEventListener("click", closeSideMenu);



    //parallax plugin
    var rellax = new Rellax('.rellax', {
        speed: -4.8,
        round: true,
        vertical: true,
        horizontal: false,
        wrapper: null
    });

}

function openSideMenu() {
    // reveal the side menu.
    document.querySelector('#side-menu').style.width = '150px';
    document.querySelector('#wrapper').style.marginRight = '150px';
}

function closeSideMenu() {
    // close the side menu
    document.querySelector('#side-menu').style.width = '0';
    document.querySelector('#wrapper').style.marginRight = '0';
}


// nav bar transform
// --------------------------------------------------------------------------------
function checkScroll(e) {
    //monitors the scroll position of the page to toggle a class that changes the nav-bar
    const scrolls = window.scrollY

    if (scrolls > (headerLarge.scrollHeight - 100) && headerLarge.classList.contains("reveal")) {
        headerLarge.classList.toggle('reveal');
        headerSlim.classList.toggle('reveal');
    } else if (scrolls < (headerLarge.scrollHeight - 100) && !headerLarge.classList.contains("reveal")) {
        headerLarge.classList.toggle('reveal');
        headerSlim.classList.toggle('reveal');
    }

    //lazy loading the image carousel
    if (scrolls > menuSec.scrollHeight && loaded === false) {
        // console.log("triggered");
        loaded = true;
        lazyImages.forEach((lazyImage) => {
            lazyImage.src = lazyImage.dataset.src;
        });
        //start playing the image carousel
        playSlides();
    }

}

//scroll event throttler to stop the browser from overworking
let scrollTimeout;

function scrollThrottler() {
    // ignore scroll events as long as an checkScroll execution is in the queue
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            checkScroll();


            // The checkScroll will execute at a rate of 
        }, 200);
    }
}




// image carousel
// ----------------------------------------------------------------------------------

// auto play through slides at 3 second intervals
function playSlides() {

    slideIndex++;
    showSlides(slideIndex);
    autoPlay = setTimeout(playSlides, 3000);
    playing = true;
}

// display a given slide
function showSlides(n) {
    //take 'n' as an input of the slideIndex to be displayed
    //if slide index is too large, reset to 1
    if (n > slides.length) { slideIndex = 1 };
    // if slide index is less than 1, then set to maximum
    if (n < 1) { slideIndex = slides.length };
    // if any slide has a class of "current-slide" change to previous-slide.
    for (let x = 0; x < slides.length; x++) {
        slides[x].className = slides[x].className.replace("previous-slide", "");
        slides[x].className = slides[x].className.replace("first-slide", "previous-slide");
        slides[x].className = slides[x].className.replace("current-slide", "previous-slide");
    }
    //set slide of given index to have "current-slide" class
    slides[slideIndex - 1].classList.add('current-slide');
}
// ------------------------------------------------------------------------------------

window.onload = readyPage();
window.addEventListener("scroll", scrollThrottler);