// Apply dark theme if user has selected it
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
}

function init() {
}

function checkAnswer(expected, latexAnswer, resultId = "result", answerId = "answer",solutionId) {
    const input = document.getElementById(answerId).value;
    const resultElem = document.getElementById(resultId);

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
    showSolution(solutionId);

    if (window.MathJax && window.MathJax.typeset) {
      MathJax.typeset([resultElem]);
    }
}

function showOpenAnswer(latexAnswer, resultId,solutionId){
  const resultElem = document.getElementById(resultId);
  resultElem.classList.remove("invalid", "correct","correct-anim");
  resultElem.innerHTML = `Odpowiedź: $${latexAnswer}$`;
  resultElem.style.visibility = "visible";
  if (window.MathJax && window.MathJax.typeset) {
    MathJax.typeset([resultElem]);
  }
  resultElem.classList.add("correct-anim");
  showSolution(solutionId);
}

function showSolution(solutionId){
  const solutionElem = document.getElementById(solutionId);
  if(!(solutionElem.getHTML() === "")){
    solutionElem.style.display = "grid";
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

function addOpenQuestion(containerId, questionText, answer,latexAnswer, resultId, inputId, solutionText, solutionId) {
  //replacing single \ with double \\ 
  // cause inner html is treated like a string so first \ escapes the second \ so the
  // latexAnswerReplaced becomes for example \sqrt{3} which is a proper latex represantation
  const latexAnswerReplaced = latexAnswer.replace(/\\/g,"\\\\");
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.className = 'question-block';
  div.innerHTML = `
    <p class="open-question">${questionText}</p>
    <div class="open-question">
      <input type="text" id="${inputId}" />
      <button onclick="checkAnswer('${answer}','${latexAnswerReplaced}', '${resultId}', '${inputId}','${solutionId}')">Submit</button>
      <button class="show-answer-btn" onclick="showOpenAnswer('${latexAnswerReplaced}', '${resultId}','${solutionId}')">Answer</button>
    </div>
    <p class="result" id="${resultId}" style="visibility:hidden;">&nbsp;</p>
    <p class="solution" id="${solutionId}" style="display:none;">${solutionText}</p>
  `;
  container.appendChild(div);
  const inputElem = div.querySelector(`#${inputId}`);
    inputElem.addEventListener('keydown',function(event){
      if(event.key==="Enter"){
        //here we use normal latexAnswer as it is a parameter not a string
        //so the backslashes are not convered 
        checkAnswer(answer,latexAnswer,resultId,inputId,solutionId);
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



