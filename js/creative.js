const pointer= document.getElementById('pointerGroup');
let text= document.getElementById('pointerText');
function changeColor(){
	text.style.color= "grey";
	pointer.style.opacity = 0.5;
}
function changeDefault(){
	text.style.color= "black";
	pointer.style.opacity = 1;

}
pointer.onmouseover = changeColor
pointer.onmouseout = changeDefault