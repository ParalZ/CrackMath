// Apply dark theme if user has selected it
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

function init() {
}

function checkAnswer(expected, latexAnswer,div) {
    const input = div.querySelector("input").value;
    const resultElem = div.querySelector(".result");

    resultElem.classList.remove("invalid", "correct","correct-anim");
    void resultElem.offsetWidth; // Force reflow to reset the animation 
    // (for the DOM to remove the class and then add it again, 
    // as for optimizations it could not do it if we do it in one call without forced reflow)
    try {
      const evaluated = math.evaluate(input);
      const expectedValue = math.evaluate(expected);
      if (Math.abs(evaluated - expectedValue) < 0.001) {
        resultElem.innerHTML = `✅ Dobrze! Odpowiedź to: $${latexAnswer}$`;
        resultElem.style.background = "";
        resultElem.style.color = "";
        resultElem.classList.add("correct-anim","correct");
        //konfetti
        if(window.confetti) confetti();
      } else {
        resultElem.innerText = "❌ Spróbuj jeszcze raz.";
        resultElem.classList.add("invalid");
      }
    } catch {
      resultElem.innerText = "⚠️ Niewłaściwe wyrażenie.";
      resultElem.classList.add("invalid");
    }
    resultElem.style.visibility = "visible";
    showSolution(div);

    if (window.MathJax && window.MathJax.typeset) {
      MathJax.typeset([resultElem]);
    }
}

function showOpenAnswer(latexAnswer,div){
  const resultElem = div.querySelector(".result");
  resultElem.classList.remove("invalid", "correct","correct-anim");
  resultElem.innerHTML = `Odpowiedź: $${latexAnswer}$`;
  resultElem.style.visibility = "visible";
  if (window.MathJax && window.MathJax.typeset) {
    MathJax.typeset([resultElem]);
  }
  resultElem.classList.add("correct-anim");
  showSolution(div);
}

function showSolution(div){
  const solutionElem = div.querySelector(".solution");
  if(!(solutionElem.getHTML() === "")){
    solutionElem.style.display = "grid";
  }
}

function showHeading(div){
  const heading = div.querySelector("h2");
  if(!(heading.getHTML() === "")){
    heading.style.display = "grid";
  }
}

function showMultipleChoiceAnswer(latexAnswer, resultId){
  const resultElem = document.getElementById(resultId);
  resultElem.classList.remove("invalid", "correct","correct-anim");
  resultElem.innerHTML = `Odpowiedź: $${latexAnswer}$`;
  resultElem.style.visibility = "visible";
  if (window.MathJax && window.MathJax.typeset) {
    MathJax.typeset([resultElem]);
  }
  resultElem.classList.add("correct-anim");
}

function addOpenQuestion(containerId, questionText, answer,latexAnswer, solutionText) {
  //replacing single \ with double \\ 
  // cause inner html is treated like a string so first \ escapes the second \ so the
  // latexAnswerReplaced becomes for example \sqrt{3} which is a proper latex represantation
  const latexAnswerReplaced = latexAnswer.replace(/\\/g,"\\\\");
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.className = 'question-block';
  div.innerHTML = `
    <h2 style="display:none;"></h2>
    <p class="open-question">${questionText}</p>
    <div class="open-question">
      <input type="text"/>
      <button onclick="checkAnswer('${answer}','${latexAnswerReplaced}',this.closest('.question-block'))">Submit</button>
      <button class="show-answer-btn" onclick="showOpenAnswer('${latexAnswerReplaced}',this.closest('.question-block'))">Answer</button>
    </div>
    <p class="result" style="visibility:hidden;">&nbsp;</p>
    <p class="solution" style="display:none;">${solutionText}</p>
  `;
  container.appendChild(div);
  showHeading(div);

  const inputElem = div.querySelector("input");
    inputElem.addEventListener('keydown',function(event){
      if(event.key==="Enter"){
        //here we use normal latexAnswer as it is a parameter not a string
        //so the backslashes are not convered 
        checkAnswer(answer,latexAnswer,div);
      }
    });
}

function addMultipleChoiceQuestion(containerId, questionText,latexAnswer, resultId,A,B,C,D,correctLetter) {
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.className = 'question-block';
  div.innerHTML = `
    <p class="choice-question">${questionText}</p>
    <div class="choice-question">
      <button data-letter="A">A. ${A}</button>
      <button data-letter="B">B. ${B}</button>
      <button data-letter="C">C. ${C}</button>
      <button data-letter="D">D. ${D}</button>
      <button class="show-answer-btn">Answer</button>
    </div>
    <p class="result" id="${resultId}" style="visibility:hidden;">&nbsp;</p>
  `;
  container.appendChild(div);

  div.querySelectorAll('button[data-letter]').forEach(btn => {
    btn.addEventListener('click', function() {
      const resultElem = div.querySelector(`#${resultId}`);
      resultElem.classList.remove("invalid","correct","correct-anim");
      void resultElem.offsetWidth; //force reflow

      if(btn.getAttribute('data-letter')===correctLetter){
        resultElem.innerHTML = `✅ Dobrze! Odpowiedź to: $${latexAnswer}$`;
        resultElem.classList.add("correct-anim","correct");
        //konfetti
        if(window.confetti) confetti();
      }
      else{
        resultElem.innerText = "❌ Spróbuj jeszcze raz.";
        resultElem.classList.add("invalid");
      }
      resultElem.style.visibility = "visible";
      if (window.MathJax && window.MathJax.typeset) {
        MathJax.typeset([resultElem]);
      }
    });
  });

  div.querySelector('.show-answer-btn').addEventListener('click',function(){
    const resultElem = div.querySelector(`#${resultId}`);
    resultElem.classList.remove("invalid","correct","correct-anim");
    void resultElem.offsetWidth; //force reflow
    resultElem.innerHTML = `Odpowiedź to: $${latexAnswer}$`;
    resultElem.classList.add("correct-anim");
    resultElem.style.visibility = "visible";
    if (window.MathJax && window.MathJax.typeset) {
      MathJax.typeset([resultElem]);
    }
  });
}

document.addEventListener('click',function(e){
  if(e.target.tagName === 'BUTTON'){
    e.target.classList.remove('button-pop');
    void e.target.offsetWidth; //force reflow
    e.target.classList.add('button-pop');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let count = 0;

  // Select all h2 elements
  document.querySelectorAll("h2").forEach(h2 => {
    const text = h2.textContent.trim(); // get pure text to match

    if (text === "Definicja") {
      count++;
      h2.textContent = `Definicja ${count}`;
    }

    if (text === "Przykład") {
      count++;
      h2.textContent = `Przykład ${count}`;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let counter = 0;
  // Select all h2 elements
  document.getElementById("zadania").querySelectorAll("h2").forEach(h2 => {
    counter++;
    h2.textContent = `Zadanie ${counter}`;
    h2.style.display = "grid";
  });
});



