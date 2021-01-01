var SlideOpen = [];
InitSlides();

function InitSlides() {
    var i;
    var slides = document.getElementsByClassName("MenuSlides");
    for (i = 0; i < slides.length; i++) {
        SlideOpen.push(false);
    }
}

function SlideStateUpdate(n) {
    var i;
    var slides = document.getElementsByClassName("MenuSlides");
    if (SlideOpen[(n - 1)] == false) {
        slides[n - 1].style.display = "block";
        SlideOpen[n - 1] = true;
    } else if (SlideOpen[(n - 1)] == true) {
        slides[n - 1].style.display = "none";
        SlideOpen[n - 1] = false;
    }
}