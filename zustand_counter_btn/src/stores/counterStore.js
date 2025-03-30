import {create} from 'zustand'

//콜백함수는 괄호로 감싸줘야함. 
const counterStore = create((set)=>({
    count:1,
    increase:()=>set((state)=>({count: state.count+1})),
    decreaseBy1:()=>set((state)=>({count: state.count-1})),
    decreaseByValue:(value)=>set((state)=>({count: state.count-value}))

}));

export default counterStore;