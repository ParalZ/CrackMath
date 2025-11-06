function addOpenQuestion(containerId, questionText,latexAnswer, solutionText="", maturaInfo="") {
  //replacing single \ with double \\ 
  // cause inner html is treated like a string so first \ escapes the second \ so the
  // latexAnswerReplaced becomes for example \sqrt{3} which is a proper latex represantation
  const latexAnswerReplaced = latexAnswer.replace(/\\/g,"\\\\");
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.className = 'question-block';
  div.innerHTML = `
    <h2 style="display:none;" class="zadanie-heading">
        <span class="zadanie-number"></span>
        <span class="matura-info">${maturaInfo}</span>
    </h2>
    <p class="open-question">${questionText}</p>
    <div class="open-question">
      <math-field aria-label="Wpisz odpowiedź matematyczną"></math-field>
      <button class="submit-btn" onclick="checkAnswer('${latexAnswerReplaced}',this.closest('.question-block'))">Sprawdź</button>
      <button class="show-answer-btn" onclick="showOpenAnswer('${latexAnswerReplaced}',this.closest('.question-block'))">Odpowiedź</button>
    </div>
    <p class="result" style="visibility:hidden;">&nbsp;</p>
    <p class="solution" style="display:none;">${solutionText}</p>
  `;
  container.appendChild(div);

  const inputElem = div.querySelector("math-field");
    inputElem.addEventListener('keydown',function(event){
      if(event.key==="Enter"){
        //here we use normal latexAnswer as it is a parameter not a string
        //so the backslashes are not convered 
        checkAnswer(latexAnswer,div);
      }
    });

}

function checkAnswer(latexAnswer, div) {
  console.log("check activated");
  const ce = new ComputeEngine.ComputeEngine();

  const expr1test = ce.parse("\\frac{2}{4}");
  const expr2test = ce.parse("\\frac{1}{2}");

    const mf = div.querySelector("math-field");
    const resultElem = div.querySelector(".result");

    resultElem.classList.remove("invalid", "correct","correct-anim");
    void resultElem.offsetWidth; // Force reflow to reset the animation 
    // (for the DOM to remove the class and then add it again, 
    // as for optimizations it could not do it if we do it in one call without forced reflow)
    try {
      const expr1 = ce.parse(latexAnswer).simplify();
      const expr2 = ce.parse(mf.getValue("latex")).simplify();
      console.log(latexAnswer)
      console.log(mf.getValue("latex"))
      if (expr1.isSame(expr2)) {
        setSafeHTML(resultElem, `✅ Dobrze! Odpowiedź to: \\(${latexAnswer}\\)`);
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
  setSafeHTML(resultElem, `Odpowiedź: \\(${latexAnswer}\\)`);
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