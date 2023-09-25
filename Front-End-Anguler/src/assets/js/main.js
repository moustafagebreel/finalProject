var container;
var dragItems;
var active;
var currentX;
var initialX;
var xOffset;
var containerHeight;
var containerWidth;
var limitWidth;
var itemWidth;

function loadSlideItems() {
    container = document.querySelector(".slide-track");
    dragItems = document.querySelectorAll(".slide-track .slide-item");
    buttonPrev = document.querySelector(".slide-prev");
    buttonNext = document.querySelector(".slide-next");
    
    
    active = false;
    currentX = 0;
    initialX = 0;
    xOffset = 0;


    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);
    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    buttonPrev.addEventListener("click", prevSlide, false);
    buttonNext.addEventListener("click", nextSlide, false);

}

function getMeasures(){
    containerHeight = container.offsetHeight;
    containerWidth = container.offsetWidth;
    itemWidth = dragItems[0].offsetWidth;
    limitWidth = (itemWidth * dragItems.length) - containerWidth;
}

function dragStart(e) {

    getMeasures();

    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
    } else {
        initialX = e.clientX - xOffset;
    }

    active = true;
}

function dragEnd(e) {
    active = false;
}

function drag(e) {
    if (active) {
        e.preventDefault();
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
        } else {
            currentX = e.clientX - initialX;
        }

        // No uso valor absoluto para no llamar errores usando mobile devices
        if (currentX <= 0 && (currentX * -1) < limitWidth) {
            xOffset = currentX;
            setTranslate(currentX);
        }
        if (e.offsetY == 0 || (e.offsetY + 1) == containerHeight) {
            dragEnd();
        }
    }
}

function setTranslate(xPos) {
    dragItems.forEach(element => {
        element.style.transform = "translate3d(" + xPos + "px, 0, 0)";
    });
}

function prevSlide(){
    getMeasures();
    itemsPerSlide = Math.floor(containerWidth/itemWidth)
    xOffset = xOffset + itemWidth*itemsPerSlide;

    if (xOffset >= 0) {
        xOffset = 0
    }

    setTranslate(xOffset);
    
}

function nextSlide(){
    getMeasures();
    itemsPerSlide = Math.floor(containerWidth/itemWidth)
    xOffset = xOffset - itemWidth*itemsPerSlide;

    if (xOffset <= (-limitWidth)) {
        xOffset = (-limitWidth)
    }

    setTranslate(xOffset);
}
