function addMultipleChoiceQuestion(containerId, questionText,latexAnswer,A,B,C,D,correctLetter) {
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.className = 'question-block';
  div.innerHTML = `
    <h2 style="display:none;"></h2>
    <p class="choice-question">${questionText}</p>
    <div class="choice-question">
      <button data-letter="A">A. ${A}</button>
      <button data-letter="B">B. ${B}</button>
      <button data-letter="C">C. ${C}</button>
      <button data-letter="D">D. ${D}</button>
      <button class="show-answer-btn">Answer</button>
    </div>
    <p class="result" style="visibility:hidden;">&nbsp;</p>
  `;
  container.appendChild(div);

  div.querySelectorAll('button[data-letter]').forEach(btn => {
    btn.addEventListener('click', function() {
      const resultElem = div.querySelector(".result");
      resultElem.classList.remove("invalid","correct","correct-anim");
      void resultElem.offsetWidth; //force reflow

      if(btn.getAttribute('data-letter')===correctLetter){
        setSafeHTML(resultElem, `✅ Dobrze! Odpowiedź to: $${latexAnswer}$`);
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
    const resultElem = div.querySelector(".result");
    resultElem.classList.remove("invalid","correct","correct-anim");
    void resultElem.offsetWidth; //force reflow
    setSafeHTML(resultElem, `Odpowiedź to: $${latexAnswer}$`);
    resultElem.classList.add("correct-anim");
    resultElem.style.visibility = "visible";
    if (window.MathJax && window.MathJax.typeset) {
      MathJax.typeset([resultElem]);
    }
  });
}

function showMultipleChoiceAnswer(latexAnswer, resultId){
  const resultElem = document.getElementById(resultId);
  resultElem.classList.remove("invalid", "correct","correct-anim");
  setSafeHTML(resultElem, `Odpowiedź: $${latexAnswer}$`);
  resultElem.style.visibility = "visible";
  if (window.MathJax && window.MathJax.typeset) {
    MathJax.typeset([resultElem]);
  }
  resultElem.classList.add("correct-anim");
}