// select dem elm 
const startBtn = document.querySelector(".start_btn_elm button");

const quizContainer = document.querySelector(".quiz_container");
const quizMain = quizContainer.querySelector(".quiz_container main");
let TotalQueElm = quizContainer.querySelector("footer .total_que");
let nextBtn = quizContainer.querySelector("footer .next_btn");
let timerElm;
let options;
const musicOn = quizContainer.querySelector(".music .music_on");
const musicOff = quizContainer.querySelector(".music .music_off");
const bgMusicElm = quizContainer.querySelector(".background_music audio");
let rightAnsSound;
let wrongAnsSound;

const resultContainer = document.querySelector(".result_container");
const quitBtn = resultContainer.querySelector(".buttons .quit");
const restartBtn = resultContainer.querySelector(".buttons .restart");

let count = 0;
let rightAns = 0;
let wrongAns = 0;
let time = 18;
let intervalId1 = 0;

// start quiz button
startBtn.onclick = ()=>{
     quizContainer.classList.remove("hide");
     nextBtn.classList.add("hide");
     showQuiz(count);
     timerFunc(time);
}

restartBtn.onclick = function(){
     count = 0;
     rightAns = 0;
     wrongAns = 0;
     quizContainer.classList.remove("hide");
     nextBtn.classList.add("hide");
     resultContainer.classList.add("hide");
     showQuiz(count);
     clearInterval(intervalId1);
     timerFunc(time);
     removeBgColor();
};
quitBtn.onclick = ()=>{
     window.location.reload();
};

// jump next question button 
nextBtn.onclick = ()=>{
     if(count < questions.length-1){
          count++;
          showQuiz(count);
          clearInterval(intervalId1);
          timerFunc(time);
          removeBgColor();
     }else {
          resultContainer.classList.remove("hide");
          quizContainer.classList.add("hide");
          showResult();
          clearInterval(intervalId1);
          bgMusicElm.pause();
     };
     nextBtn.classList.add("hide");
};

// Quiz Show Function
function showQuiz(idx){
     let quizMainContent = `
          <div class="que_elm">
               <h4 class="question">${questions[idx].numb}. ${questions[idx].question}</h4>
               <div class="timer">00:18</div>
          </div>
          <div class="sound_elm">
               <audio src="img/right-ans.mp3"></audio>
               <audio src="img/wrong-ans.mp3"></audio>
               <audio class="time_end" src="img/bell.mp3"></audio>
          </div>
          <div class="options">
               <button class="option">
                    <span>${questions[idx].options[0]}</span>
               </button>
               <button class="option">
                    <span>${questions[idx].options[1]}</span>
               </button>
               <button class="option">
                    <span>${questions[idx].options[2]}</span>
               </button>
               <button class="option">
                    <span>${questions[idx].options[3]}</span>
               </button>
          </div>
     `;
     let totalQueContent = `<p><span>${questions[idx].numb}</span> of <span>${questions.length}</span> Questions </p>`;

     quizMain.innerHTML = quizMainContent;
     TotalQueElm.innerHTML = totalQueContent;

     timerElm = quizContainer.querySelector(".timer");
     rightAnsSound = quizContainer.querySelector(".sound_elm audio");
     wrongAnsSound = quizContainer.querySelector(".sound_elm audio+audio"); 
     timeEndSound = quizContainer.querySelector(".sound_elm .time_end"); 
     options = quizContainer.querySelectorAll(".options .option");
     
     options.forEach((option)=>{
          option.setAttribute("onclick", "selectOption(this)");
     });

};

// add background music function 
musicOn.onclick = ()=>{
     bgMusicElm.play();
     musicOff.classList.remove("hide");
     musicOn.classList.add("hide");
};
musicOff.onclick = ()=>{
     bgMusicElm.pause();
     musicOff.classList.add("hide");
     musicOn.classList.remove("hide");
};

// option select function 
let tickElm = `<i class=" tick">✓</i>`;
let crossElm = `<i class=" cross">✗</i>`;

function selectOption(opElm){
     if(opElm.innerText === questions[count].answer){
          opElm.classList.add("correct");
          opElm.insertAdjacentHTML("beforeend", tickElm)
          rightAns++;
          rightAnsSound.play(); 
     }else {
          opElm.classList.add("incorrect");
          opElm.insertAdjacentHTML("beforeend", crossElm);
          wrongAns++;
          wrongAnsSound.play();
          options.forEach((opt)=>{
               if(opt.innerText === questions[count].answer){
                    opt.classList.add("correct");
                    opt.insertAdjacentHTML("beforeend", tickElm);
               };
          });
     };
     options.forEach((opt)=>{
          opt.disabled = true;
          opt.classList.add("disable");
     });
     nextBtn.classList.remove("hide");
     clearInterval(intervalId1);
};

// Timer Function
function timerFunc(time){
     intervalId1 = setInterval(timer, 1000);
     function timer(){
          time--;
          timerElm.innerText = "00:"+time;
          if(time < 10){
               timerElm.innerText = "00:0"+time;
          }
          if(time < 0){
               timerElm.innerText = "00:00";
               clearInterval(intervalId1);
               options.forEach((opt)=>{
                    opt.disabled = true;
                    opt.classList.add("disable");
                    if(opt.innerText === questions[count].answer){
                         opt.classList.add("correct");
                         opt.insertAdjacentHTML("beforeend", tickElm)
                    };
               });
               wrongAns++;
               nextBtn.classList.remove("hide");
               timeEndSound.play();
          }
          if(time < 12){
               quizContainer.classList.add("quiz_container_bg1");
               timerElm.classList.add("timer_bg1");
               nextBtn.classList.add("next_btn_c1");
          }
          if(time < 6){
               quizContainer.classList.add("quiz_container_bg2");
               timerElm.classList.add("timer_bg2");
               nextBtn.classList.add("next_btn_c2");
          }
     };
};

function removeBgColor(){
     quizContainer.classList.remove("quiz_container_bg1");
     timerElm.classList.remove("timer_bg1");
     nextBtn.classList.remove("next_btn_c1");
     quizContainer.classList.remove("quiz_container_bg2");
     timerElm.classList.remove("timer_bg2");
     nextBtn.classList.remove("next_btn_c2");
};

// show result function 
function showResult(){
     let rPercentage = resultContainer.querySelector("main .pr_w .r_percentage_w");
     let wPercentage = resultContainer.querySelector("main .pr_w .w_percentage_w");
     const prElm = resultContainer.querySelector(".pr_elm");
     const scoreTextElm = resultContainer.querySelector(".score_text")

     let rightAnsPr = rightAns/questions.length*100;
     let wrongAnsPr = wrongAns/questions.length*100;

     rPercentage.style.width = rightAnsPr+"%";
     wPercentage.style.width = wrongAnsPr+"%";

     let prElmContent = `
          <span class="r_pr">${rightAnsPr}%</span>
          <span>${rightAns}/${questions.length}</span>
          <span class="w_pr">${wrongAnsPr}%</span>
     `;

     let scoreTextContent = ``;
     if(rightAnsPr > 80){
          scoreTextContent = `<p>Congrats! and Keep Learning</p>`;
          scoreTextElm.innerHTML = scoreTextContent;
          scoreTextElm.style.color = "#007bff";
     }else if(rightAnsPr > 75 && rightAnsPr < 80){
          scoreTextContent = `<p>Nine! and Keep Learning</p>`;
          scoreTextElm.innerHTML = scoreTextContent;
          scoreTextElm.style.color = "#009006";
     }else if(rightAnsPr > 45 && rightAnsPr < 75){
          scoreTextContent = `<p>Good! and You can Try Again</p>`;
          scoreTextElm.innerHTML = scoreTextContent;
          scoreTextElm.style.color = "#7035bd";
     }else {
          scoreTextContent = `<p>Sorry! and You Need to Learn</p>`;
          scoreTextElm.innerHTML = scoreTextContent;
          scoreTextElm.style.color = "#EB4545";
     };
     prElm.innerHTML = prElmContent;
};