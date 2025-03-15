import { useState } from 'react'
import './App.css';
import Box from './component/Box';



//1. 박스 2개 (타이틀, 사진정보, 결과값)
//2. 가위 바위 보 버튼이 있다 
//3. 버튼을 클릭하면 클릭한 값이 박스에 보임 
//4. 컴퓨터는 랜덤하게 아이템 선택이 된다 
//5. 3번 4번의 결과를 가지고 누가 이겼는지 승패를 따진다 
// 테두리색 바뀜 : 이기면 초록, 지면 빨강, 비기면 검정 
//6. 승패 결과에 따라 테두리 색이 바뀐다 (이기면-초록, 지면-빨강, 비기면 -검은색)


//사진과 이름을 저장하고 있는 객체 아이템 만들기 
const choice = {
  rock: {
    name: 'rock',
    img: 'https://cdn.stocksnap.io/img-thumbs/960w/rock-surface_UYABOO5HI7.jpg'
  },
  scissors: {
    name: 'scissors',
    img: 'https://images.unsplash.com/photo-1634225109865-7a7b6e4ef85c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNjaXNzb3JzfGVufDB8fDB8fHwy'
  },
  paper: {
    name: 'paper',
    img: 'https://images.unsplash.com/photo-1520004434532-668416a08753?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcGVyfGVufDB8fDB8fHwy'
  },
}


function App() {

  const [userSelect, setUserSelect] = useState(null)
  const [computerSelect, setComputerSelect] = useState(null)
  const [result, setResult] = useState("")
  const [isAnimating, setIsAnimating] = useState(true); // 기본적으로 애니메이션 실행 중

  const play = (userChoice) => {
    // console.log("선택됨!", userChoice);
    setUserSelect(choice[userChoice]);

    let computerChoice = randomChoice()
    setComputerSelect(computerChoice)

    setResult(judgement(choice[userChoice], computerChoice));
    setIsAnimating((prev) => !prev);
  };

  const judgement = (user, computer) => {
    console.log("user", user, "computer", computer);
    //user === computer tie
    // user == rock, computer = "scissors" user 이긴거지
    // user == rock, computer = "paper" user 진거지
    // user == scissors computer ="paper" user 이긴거지 
    // user == scissors computer ="rock" user 긴거지 
    //user == paper computer rock user 이긴거지
    //user == paper computer scissors user 긴거지

    if (user.name === computer.name) {
      return "tie"
    } else if (user.name === "rock")
      return computer.name === "scissors" ? "win" : "lose";
    else if (user.name === "scissors")
      return computer.name === "paper" ? "win" : "lose";
    else if (user.name === "paper")
      return computer.name === "rock" ? "win" : "lose"

  }
  const randomChoice = () => {
    let itemArray = Object.keys(choice); //객체에 키값만 뽑아서 어레이로 만들어 줌 (Object.keys 함수 ) 
    console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log("random value", randomItem)
    let final = itemArray[randomItem];
    console.log("final", final);

    return choice[final];
  }

  const reset = () => {
    setUserSelect(null);  // 사용자 선택 초기화
    setComputerSelect(null);  // 컴퓨터 선택 초기화
    setResult("");  // 결과 초기화
    setIsAnimating(true);
  }
  return (
    <div className="background">
      <div className="background-blur"></div>
        <div className="container">
          <h1 className={`headline ${isAnimating ? "running" : "paused"}`}>Game on!</h1>
          <div className="main">
            <Box title="You" item={userSelect} result={result} />
            <Box title="Computer" item={computerSelect} result={result} />
          </div>
          <div className='main'>
            <button className="custom-button" onClick={() => { play("scissors"); setIsAnimating(!isAnimating); }}><i class="fa-solid fa-scissors"> 가위</i></button>
            <button className="custom-button" onClick={() => { play("rock"); setIsAnimating(!isAnimating); }}><i class="fa-solid fa-hand-back-fist"> 바위</i></button>
            <button className="custom-button" onClick={() => { play("paper"); setIsAnimating(!isAnimating); }}><i class="fa-solid fa-hand"> 보</i></button>
          </div>
          <div className='reset'>
            <button className="reset-button" onClick={() => reset()}> RESET</button>
          </div>
        </div>

    </div>
  );
}

export default App;
