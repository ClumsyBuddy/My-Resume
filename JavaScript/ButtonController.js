var SlideOpen = [];
InitContentArray();

function InitContentArray() {
    var i;
    var slides = document.getElementsByClassName("CenterContentHolder");
    for (i = 0; i < slides.length; i++) {
        SlideOpen.push(false);
    }
}

function UpdateContent(n) {
    var i;
    var slides = document.getElementsByClassName("CenterContentHolder");
    if (SlideOpen[(n - 1)] == false) {
        slides[n - 1].style.display = "block";
        SlideOpen[n - 1] = true;
    } else if (SlideOpen[(n - 1)] == true) {
        slides[n - 1].style.display = "none";
        SlideOpen[n - 1] = false;
    }
}