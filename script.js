const randomizeColor = () => {
  const hexArr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
  const randDigit = () => Math.floor(Math.random()*hexArr.length);
  let randColor = ['#'];
  while(randColor.length<7) {
    randColor.push(hexArr[randDigit()])
  } 
  document.querySelector(':root').style.setProperty('--randomColor',randColor.join(''));
}

let currentKeys = [];

function playSound(e) {
  e.preventDefault(); // prevents the default behaviour of the 'tab' key
  const dataKey = e.keyCode || e.target.getAttribute('data-key');
  const audio = document.querySelector(`audio[data-key="${dataKey}"]`) //select corresponding audio
  if (!audio) return; //if an invalid key has been pressed, exit func
  const key = document.querySelector(`div[data-key="${dataKey}"]`) //select corresponding piano key div
  if (currentKeys.includes(key)) return;
  currentKeys.push(key);
  randomizeColor();
  audio.currentTime = 0; //reset current audio to allow repeated play if pressed consecutively
  audio.play();
  key.classList[0] === 'w-keys__key' ? key.classList.add('w-keys__key--playing') : key.classList.add('b-keys__key--playing')
}

function keyRelease(e) {
  const dataKey = e.keyCode || e.target.getAttribute('data-key');
  const key = document.querySelector(`div[data-key="${dataKey}"]`)
  if (!key) return;
  currentKeys = currentKeys.filter(i => i !==key);
  key.classList[0] === 'w-keys__key' ? key.classList.remove('w-keys__key--playing') : key.classList.remove('b-keys__key--playing')
}

window.addEventListener('keydown',playSound)
window.addEventListener('mousedown',playSound)
window.addEventListener('keyup',keyRelease)
window.addEventListener('mouseup',keyRelease)
const allKeys = document.querySelectorAll('div[data-key')
allKeys.forEach(key => key.addEventListener('mouseenter',randomizeColor))