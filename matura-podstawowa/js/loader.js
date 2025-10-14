const questionHandlers = {
  open :function(q){
    addOpenQuestion(q.containerId,q.question, q.answerForEvaluation, q.latexAnswer, q.explanation);
  }
};


// Generic function to load questions from JSON for a page
function loadQuestions(jsonPath) {
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      data.forEach(q => {
        const handler = questionHandlers[q.type];
        if(handler)
          handler(q);
        else{
          console.warn("No handler defined for type: ", q.type);
        }
      });
      // Re-render MathJax after questions are added
      if (window.MathJax) {
        MathJax.typesetPromise();
      }
    })
    .catch(err => console.error("Error loading questions:", err));
}
