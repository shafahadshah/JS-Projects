

let numCon = document.querySelector('.numCon')
let targetVal = document.querySelector('.targetVal')
let scoreVal = document.querySelector('.scoreVal')
 let timerVal = document.querySelector('.timerVal')
 let numCircle = 91
let timer = 20
 let tar;
 function setTime(){
 timer = 20
 timerVal.innerText=timer
 }
restart()
startTimer()
 function startTimer(){
setInterval(()=>{
 if(timer<=0){
    numCon.innerHTML=`
   <div> Game Over</div><br>
    <button onclick=restart()>Restart</button><br>
   <div> Your Score is:${scoreVal.innerText}</div>
   `
     return
 }
     timer--
 timerVal.innerText=timer


 },1000)
 }
 
 function targetGet(){
    tar = Math.ceil(Math.random()*10)
     targetVal.innerText = tar
 }

 function restart(){
 setTime()
 
targetGet()
genaetrenum()
scoreVal.innerText=0
 }
 function genaetrenum(){
    numCon.innerHTML = ''
 for(let i=1 ;i<=numCircle ;i++){
   let divElm=document.createElement('div')
    divElm.className = 'circle'
     let number = Math.ceil(Math.random()*10)
    divElm.innerText = number
     numCon.append(divElm)
    
}
 }function refreshNumbers() {
  let allCircles = document.querySelectorAll('.circle');
  allCircles.forEach(circle => {
    circle.innerText = Math.ceil(Math.random() * 10);
  });
}
numCon.addEventListener('click', (e) => {
  if (e.target.className === 'circle') {
    let num = Number(e.target.innerText);

    if (tar === num) {
      let scoreValue = Number(scoreVal.innerText);
      scoreValue += 10;
      scoreVal.innerText = scoreValue;
    }

  
    targetGet();
    refreshNumbers();
  }
});


