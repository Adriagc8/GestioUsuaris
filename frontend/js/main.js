const menuLeft = document.getElementById("menu-left");
const body = document.querySelector(".main");

//Event Listerners Declaration
body.addEventListener("click", ()=>{
    closeSlideMenu();
})

//Functions declaration
function closeSlideMenu(){
    console.log("close");
    menuLeft.style.display = "none";
}
function openSlideMenu(){
    console.log("open");
    menuLeft.style.display = "block";
}