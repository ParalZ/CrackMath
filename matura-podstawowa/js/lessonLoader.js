console.log("--- SCRIPT LOADER IS RUNNING (Optimized) ---");

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => {
      console.log(`Successfully loaded: ${src}`);
      resolve(script);
    };
    script.onerror = () => {
      console.error(`Failed to load: ${src}`);
      reject(new Error(`Script load error for ${src}`));
    };
    document.body.appendChild(script);
  });
}

const parallelScripts = [
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js',
  'https://cdn.jsdelivr.net/npm/@cortex-js/compute-engine/dist/compute-engine.min.umd.js',
  'https://cdn.jsdelivr.net/npm/mathlive',
  'https://cdn.jsdelivr.net/npm/dompurify@3.0.2/dist/purify.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.11.0/math.min.js',
  "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
  '../../js/utils/buttonAnimation.js',
  '../../js/services/cssLoader.js'
];

const sequentialScripts = [
  '../../js/utils/safeHTML.js',           // Depends on DOMPurify
  '../../js/components/layout.js',             // Creates footer
  '../../js/components/zadaniaSection.js',    // Depends on footer
  '../../js/utils/autoNumberHeadings.js',  // Defines numberZadaniaHeadings
  '../../js/components/multipleChoice.js',   // Depends on safeHTML
  '../../js/components/openQuestions.js',      // Depends on safeHTML, ComputeEngine
  '../../js/services/questionLoader.js'      // Depends on multipleChoice & openQuestions
];


(async function () {
  try {
    await loadDependencies()
    setupLessonConfig()
    await runLessonLogic()
    console.log("--- LESSON IS FULLY LOADED AND RUNNING ---");
  }
  catch (error) {
    console.error("A critical error occurred during lesson load:", error);
  }
  showPage()
})();

function showPage() {
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
  console.log("--- PAGE IS NOW VISIBLE ---");
}

async function loadDependencies() {
  console.log("--- Loading parallel scripts... ---");
  await Promise.all(parallelScripts.map(loadScript));

  console.log("--- Loading sequential scripts... ---");
  for (const scriptPath of sequentialScripts) {
    await loadScript(scriptPath);
  }
}

function setupLessonConfig() {
  if (window.lessonConfig) {
    console.log("Manual config found in HTML. Using that.", window.lessonConfig);
    return;
  }

  console.log("No manual config found. Generating automatically...");
  try {
    const path = window.location.pathname;
    const htmlFile = path.split('/').pop();
    const jsonFile = htmlFile.replace(".html", ".json");

    window.lessonConfig = {
      questionsJson: "questions/" + jsonFile
    };

    console.log("Auto-generated config:", window.lessonConfig);

  }
  catch (e) {
    console.error("Failed to auto-generate lessonConfig:", e);
    throw new Error("Config generation failed. Cannot continue.");
  }
}

async function runLessonLogic() {
  if (window.lessonConfig && window.lessonConfig.questionsJson) {

    console.log(`Loading questions from: ${window.lessonConfig.questionsJson}`);

    await loadQuestions(window.lessonConfig.questionsJson);

    numberZadaniaHeadings();
    console.log("Page logic executed successfully.");

  }
  else {
    throw new Error("Lesson config is missing or invalid. Cannot load questions.");
  }
}