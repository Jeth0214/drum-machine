// click to play
const drumPad = document.querySelectorAll('.drum-pad');
const clip = document.querySelectorAll('.clip');
const bankCheckBox = document.querySelector('#mode');
const displayMessage = document.querySelector('#display');
const volume = document.querySelector('#volume');
const powerCheckedBox = document.querySelector('#power');


//get data from json file
function getData() {
    return fetch('drum.json').then((response) => response.json())
        .then((data) => data)
        .catch(error => console.error(error)
    )
}


//play Heater Kit
async function playHeaterKit() {
    const data$ = await getData();
    drumPad.forEach(drumKey => {
        data$.forEach(eachKey => {
            if (eachKey.key.toUpperCase() === drumKey.textContent) {
                drumKey.setAttribute("id", eachKey.drumPadName[0]);
                drumKey.children[0].setAttribute("src", eachKey.src[0]);
                drumKey.children[0].setAttribute("id", eachKey.key.toUpperCase());
            }
            drumKey.addEventListener('click', function () {
                drumKey.children[0].play();
                drumKey.children[0].volume = volume.value / 100;
                displayMessage.textContent = drumKey.id;
            })
        })
    });
}

//play Smooth Piano Kit
async function playSmoothPianoKit() {
    const data$ = await getData();
    drumPad.forEach(drumKey => {
        data$.forEach(eachKey => {
            if (eachKey.key.toUpperCase() === drumKey.textContent) {
                drumKey.setAttribute("id", eachKey.drumPadName[1]);
                drumKey.children[0].setAttribute("src", eachKey.src[1]);
                drumKey.children[0].setAttribute("id", eachKey.key.toUpperCase());
            }
            drumKey.addEventListener('click', function () {
                drumKey.children[0].play();
                drumKey.children[0].volume = volume.value / 100;
            })
        })
    });
}


// toggle between Heater Kit and Smooth Piano KIt 
bankCheckBox.addEventListener('change', pianoOrHeater);

function pianoOrHeater() {
    if (bankCheckBox.checked) {
        displayMessage.textContent = "Smooth Piano Kit";
        playSmoothPianoKit()
    } else {

        playHeaterKit();
        displayMessage.textContent = "Heater Kit";
    }
};

//adjust the volume
volume.addEventListener('input', function () {
    displayMessage.textContent = `Volume: ${volume.value}`;
    setTimeout(() => {
        displayMessage.textContent = '';
    }, 1000)
})




// play audio when a key was pressed
document.onkeypress = function keyPad(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode).toUpperCase();
    clip.forEach(audio => {
        if (audio.id === charStr) {
                audio.parentElement.click();
                audio.parentElement.classList.add("button-active");
                setTimeout(() => {
                    audio.parentElement.classList.remove("button-active");
            }, 100)
        }
    })
};

//power on and off
powerCheckedBox.addEventListener('change', power);
function power() {
    if (powerCheckedBox.checked) {

        console.log('checked')
        bankCheckBox.disabled = true;
        volume.disabled = true;

        displayMessage.textContent = "Power Off";
        setTimeout(() => {
            displayMessage.style.display = "none";

        }, 600)
        clip.forEach(audio => {
            audio.muted = true;
           audio.parentElement.classList.remove("button-active");
            audio.parentElement.classList.add('powerOff');
        })


    } else {

        console.log('uncheck');
        bankCheckBox.disabled = false;
        volume.disabled = false;
        clip.forEach(audio => {
            audio.muted = false;
            audio.parentElement.classList.remove('powerOff');
        })
        displayMessage.style.display = "block";
        displayMessage.textContent = "Power On";
        setTimeout(() => {
            displayMessage.textContent = "Heater Kit";

        }, 600)

    }
}

power();
pianoOrHeater();

