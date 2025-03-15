import React from 'react'

const Box = (props) => {

    // console.log("props", props.item);
    //숙제 1: 유저와 컴퓨터 결과 반대로 보여주기 
    let result="";
    if (props.title =="Computer" && props.result !="tie" && props.result!=""){
        result= props.result === "win" ? "lose": "win"
    }else 
        result = props.result; 

    return (
        //숙제 2: 결과에 따른 테두리 색 보여주기 
        <div className={`box ${result}`}>
            <h1>{props.title}</h1>
            <img className="item-img" src={props.item ? props.item.img : "https://images.unsplash.com/photo-1608496601160-f86d19a44f9f?q=80&w=2761&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}  />
            <h2> {result!="" ? result:"Start"}</h2>
        </div>
    )
}

export default Box
