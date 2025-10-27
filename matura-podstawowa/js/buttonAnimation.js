document.addEventListener('click',function(e){
  if(e.target.tagName === 'BUTTON'){
    e.target.classList.remove('button-pop');
    void e.target.offsetWidth; //force reflow
    e.target.classList.add('button-pop');
  }
});