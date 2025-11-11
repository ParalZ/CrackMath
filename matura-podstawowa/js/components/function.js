function addGraph(containerId, boundingBox, functionBodyString) {
    const container = document.getElementById(containerId);
    const div = document.createElement("div");

    div.innerHTML = `
    <div class="controls"></div>
    <div id="box" class="jxgbox" style="width:500px; height:400px;"></div>
    `;

    const boundingBoxString = `[${boundingBox.join(',')}]`;
    const controls  = div.getElementsByClassName("controls");

    const script = document.createElement("script");
    
    const inlineCode =`
        const board = JXG.JSXGraph.initBoard('box', {
            axis: true,
            boundingbox: ${boundingBoxString},
            showCopyright: false,
            showNavigation: false
        });

        // Domyślne wartości współczynników
        let a = 1, b = 0, c = 0;

        // Definicja funkcji kwadratowej
        const f = (x) => ${functionBodyString};

        // Rysujemy wykres
        let curve = board.create('functiongraph', [f], {
            strokeColor: '#0074D9',
            strokeWidth: 2
        });
    `;


    script.textContent = inlineCode;

    div.appendChild(script);
    container.appendChild(div);
}