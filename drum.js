// click to play
const drumPad = document.querySelectorAll('.drum-pad');
const clip = document.querySelectorAll('.clip');
const mode = document.querySelector('#mode');
const displayMessage = document.querySelector('#display');
const volume = document.querySelector('#volume');


//get data from json file
function getData() {
    return fetch('drum.json').then((response) => response.json())
        .then((data) => data)
        .catch(error => console.error(error))
}

// async function test() {
    
//     data$.forEach(element => {
//         console.log(element)
//         drumPad.forEach(el => {
//             console.log(el)

//             el.addEventListener('click', function () {
//                 el.id = element.drumPadName[0];
//                 el.children[0].src = element.src[0];
//                 el.children.play();
//             })
//         });
//     });
// };
// test()


async function playSound(){
    const data$ = await getData();
    drumPad.forEach( el => {
        
            data$.forEach( element => {
                if(element.key.toUpperCase() === el.textContent){
                    el.setAttribute("id" ,element.drumPadName[0]);
                    el.children[0].setAttribute("src", element.src[0]);
                    el.children[0].setAttribute("id", element.key.toUpperCase());
                }
        el.addEventListener('click', function(){
            el.children[0].play();
            displayMessage.textContent = el.id;
        })
        
        
    })
    });
}

async function playSound2(){
    const data$ = await getData();
    drumPad.forEach( el => {
        
            data$.forEach( element => {
                if(element.key.toUpperCase() === el.textContent){
                    el.setAttribute("id" ,element.drumPadName[1]);
                    el.children[0].setAttribute("src", element.src[1]);
                    el.children[0].setAttribute("id", element.key.toUpperCase());

                }
        el.addEventListener('click', function(){
            el.children[0].play();
        })
        
        
    })
    });
}



//value of toggle


mode.addEventListener('change', test);

function  test() {
    if (mode.checked) {
        displayMessage.textContent = "Smooth Piano Kit";
     playSound2()
    } else {
        
      playSound()
      displayMessage.textContent = "Heater Kit";
    }
  };

  volume.addEventListener('input', function ( value) {
     
        displayMessage.textContent = `Volume ${volume.value}`
  })
  test();
   playSound()
   playSound2()