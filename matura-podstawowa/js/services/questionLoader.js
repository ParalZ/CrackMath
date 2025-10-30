console.log("--- LOADER IS RUNNING ---");
const questionHandlers = {
  open :function(q){
    addOpenQuestion(q.containerId,q.question, q.latexAnswer, q.explanation,q.maturaInfo);
  },
  multipleChoice :function(q){
    if(!(q.containerId && q.question && q.latexAnswer && q.A && q.B && q.C && q.D && q.correctLetter)){
      console.warn("Some fields are incorrect");
      return;
    }
    addMultipleChoiceQuestion(q.containerId, q.question,q.latexAnswer,q.A,q.B,q.C,q.D,q.correctLetter)
  }
};


// Generic function to load questions from JSON for a page
function loadQuestions(jsonPath) {
  return fetch(jsonPath)
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
