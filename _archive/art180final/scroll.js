num_images = 12;
rows = 0;
run = false;

quoteElement = document.querySelector('.images');

function preload_images() {
    for(i=0; i<num_images; i++) {
        quoteElement.innerHTML += `
        <div class="row" style='display:none'>
            <img class="full-left-image" src="images/` + i + `.jpg">
        </div>`
    }
}

preload_images()

function add_row() {
    do {
        r1 = Math.floor(Math.random()*num_images)
        r2 = Math.floor(Math.random()*num_images)
        r3 = Math.floor(Math.random()*num_images)
    }while(r1==r2 || r1==r3 || r2==r3);

    console.log(r1, r2, r3)
    
    rows ++;

    if (rows%2==0) {
        quoteElement.innerHTML += `
        <div class="row">
            <img class="left-image" src="images/` + r1 + `.jpg">
            <img class="left-image" src="images/` + r2 + `.jpg">
            <img class="left-image" src="images/` + r3 + `.jpg">

        </div>`
    }
    else {
        quoteElement.innerHTML += `
        <div class="row">
            <img class="image" src="images/` + r1 + `.jpg">
            <img class="image" src="images/` + r3 + `.jpg">
        </div>`
    }
    console.log("add row")
}

document.onclick = click;

function click() {
    if(!run) {
        document.getElementById("info").style.display = "none";    
        run = true;
        add_row();
        add_row();
        add_row();
        add_row();
        add_row();
    }
}


// console.log(window.innerHeight);
// console.log(window.scrollY);
// console.log(document.body.offsetHeight);

window.addEventListener('scroll', function () {
	// console.log(window.innerHeight + window.scrollY, document.body.offsetHeight);
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if ((window.innerHeight + window.scrollY+20) >= document.body.offsetHeight && run) {
            console.log('scroll');
            add_row()
        }
    }, {
        passive: true
});
