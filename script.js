const wordList = [];

window.onload=function(e){
  let highscore=localStorage.getItem("highscore")
  __highscore.innerHTML=highscore
}
function generateRandomWord(length) {
  let word = '';

  for (let i = 0; i < length; i++) {
    const characterSet = "abcdefghijklmanopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    // console.log(randomIndex)
    const randomChar = characterSet[randomIndex]; //it will give the random characters form the characterSet
    word += randomChar; // word= word+randomChar 
  }

  return word;
}

// Generate and push  random words into wordList array
for (let i = 0; i < 1000; i++) {
  const randomWord = generateRandomWord(5); 
  wordList.push(randomWord);
}

//calling the addWord function at every 28ms
setInterval(addWord, 2800);
function addWord() {
  let index = Math.floor(Math.random() * wordList.length);
  document.body.append(createSpan(wordList[index]));
}

function createSpan(word) {
  const span = document.createElement("span");
  span.innerHTML = word;
  span.id = word;
  let r = Math.random() * window.innerWidth;
  span.style.position = "absolute";
  span.style.right = r + "px";

  let id = setInterval(drop, 50);
  span.iid = id;
  let top = 70;
  function drop() {
    top++;
    span.style.top = top + "px";
    if (top > window.innerHeight - 58.5) {
      span.remove();
      clearInterval(id);
      alert("Game Over:Your Score is: " + score);
      window.location.reload();
    }
  }
  return span;
}

let typedWord = "";
let score = 0;
let highscore = localStorage.getItem('highscore') || 0; 
let __typeword = document.getElementById("__typedword");
let __score = document.getElementById("__score");
let __highscore = document.getElementById("__highscore");
document.onkeyup = (e) => {
  const InavalidKey = [
    "Escape",
    "Shift",
    "Control",
    "Insert",
    "Alt",
    "Tab",
    "Shift",
    "CapsLock",
    "Meta",
    "PrintScreen"
  ];
  if (InavalidKey.includes(e.key)) return;
  if (e.key == " " || e.key === "Enter") {
    let elem = document.getElementById(typedWord);
    if (elem) {
      clearInterval(elem.iid);
      elem.remove();
      typedWord = "";
      __typeword.innerHTML = typedWord;
      score++;
      __score.innerHTML = score; 
      if (score > highscore) {
        highscore = score;
        localStorage.setItem('highscore', highscore);
        __highscore.innerHTML=highscore
      }
    }
  } else if (e.key === "Backspace" || e.key === "Delete") {
    typedWord = typedWord.substring(0, typedWord.length - 1);
    __typeword.innerHTML = typedWord;
  } else {
    typedWord += e.key;
    __typeword.innerHTML = typedWord;
  }
  
  //   console.log("typeword", typedWord);
  //   console.log(score);
};
