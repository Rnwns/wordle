const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임 종료";
    div.style =
      "display:flex; justify-contents:center; align-items:center; position:absolute; top:40vh; left:45vw;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts++;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const handleEnterKey = () => {
    //정답확인
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = answer[i];
      if (입력한_글자 === 정답_글자) {
        block.style.background = "#6aaa64";
        맞은_갯수++;
      } else if (answer.includes(입력한_글자)) {
        block.style.background = "#c9b458";
      } else {
        block.style.background = "#787c7e";
      }
      block.style.color = "white";
      //   console.log("입력한글자:", 입력한_글자, "정답 글자:", 정답_글자);
    }
    if (맞은_갯수 === 5) {
      gameover();
    } else {
      nextLine();
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }

    if (index !== 0) index -= 1;
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (keyCode === 8) handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const startTimer = () => {
    const 시작시간 = new Date();

    function setTime() {
      const 현재시간 = new Date();
      const 흐른시간 = new Date(현재시간 - 시작시간);
      const min = 흐른시간.getMinutes().toString().padStart(2, "0");
      const sec = 흐른시간.getSeconds().toString().padStart(2, "0");
      const $timer = document.querySelector("#timer");
      $timer.innerText = `${min}:${sec}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
