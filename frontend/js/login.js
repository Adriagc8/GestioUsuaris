var e = document.getElementById("student"),
      d = document.getElementById("teacher"),
      switcher = document.querySelector('.b'),
      t = document.getElementById("switcher"),
      togglecont = document.querySelector('.toggle');
var num = 0;

/*--------EVENT LISTERNERS-----------------------*/
    togglecont.addEventListener("click", ()=>{
      switchToggle();
    })
    e.addEventListener("click", function () {
      if(num ===2){
        switchToggle();}
    });

    d.addEventListener("click", function () {
      if(num ===0 || num === 1){
        switchToggle();}
    });

/*
THIS FUNCTION CHANGED THE STATE OF THE CHECKABLE INPUT THAT GIVES
THE INFO ABOUT IF THE USER IS A STUDENT OR A TEACHER
IT ALSO CHANGES THE COLOR OF THE LLETTERS AND MOVE TO SWITCHER
SEE THE CSS TO UNDERSTAND THE MOVEMENT OF THE SWITCHER
*/
function switchToggle(){
    console.log(num);
    if(num === 1){
      t.checked = true;
      e.style.color = "slategray";
      d.style.color = "#0f70d7";
      switcher.classList.remove("b-left");
      switcher.classList.add("b-right");
      num = 2;
    }else if(num === 0){
      t.checked = true;
      switcher.classList.remove("b-init");
      switcher.classList.add("b-right");
      e.style.color = "slategray";
      d.style.color = "#0f70d7";
      num = 2;
    }else if(num === 2){
      t.checked = false;
      e.style.color = "#0f70d7";
      d.style.color = "slategray";
      switcher.classList.remove("b-right");
      switcher.classList.add("b-left");
      num = 1;
    }
}