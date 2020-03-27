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
        .catch(error => console.error(error))
}


//play Heater Kit
async function playSound() {
    const data$ = await getData();
    drumPad.forEach(el => {
        data$.forEach(element => {
            if (element.key.toUpperCase() === el.textContent) {
                el.setAttribute("id", element.drumPadName[0]);
                el.children[0].setAttribute("src", element.src[0]);
                el.children[0].setAttribute("id", element.key.toUpperCase());
            }
            el.addEventListener('click', function () {
                el.children[0].play();
                displayMessage.textContent = el.id;
            })


        })
    });
}

//play Smooth Piano Kit
async function playSound2() {
    const data$ = await getData();
    drumPad.forEach(el => {

        data$.forEach(element => {
            if (element.key.toUpperCase() === el.textContent) {
                el.setAttribute("id", element.drumPadName[1]);
                el.children[0].setAttribute("src", element.src[1]);
                el.children[0].setAttribute("id", element.key.toUpperCase());

            }
            el.addEventListener('click', function () {
                el.children[0].play();
            })


        })
    });
}


// toggle between Heater Kit and Smooth Piano KIt 
bankCheckBox.addEventListener('change', pianoOrHeater);

function pianoOrHeater() {
    if (mode.checked) {
        displayMessage.textContent = "Smooth Piano Kit";
        playSound2()
    } else {

        playSound()
        displayMessage.textContent = "Heater Kit";
    }
};

//adjust the volume
volume.addEventListener('input', function () {
    displayMessage.innerHTML = `<p> Volume: ${volume.value} </p>`;
    setTimeout(() => {
        displayMessage.children[0].style.display = 'none';
    }, 1000)
})




// play audio when a key was pressed
document.onkeypress = function (evt) {
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
powerCheckedBox.addEventListener('input', power);
function power() {
    if (!this.checked) {
        pianoOrHeater();
        console.log('unchecked')
    } else {
        console.log('checked')
        bankCheckBox.disabled = true;
        volume.disabled = true;
        clip.forEach( audio => {
            audio.currentTime = 0;
            audio.pause();
           
        });
        displayMessage.textContent = "";
        
    }
}

power();
