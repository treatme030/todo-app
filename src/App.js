import { useCallback, useRef, useState } from "react";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

//많은 데이터 생성하기
const createBulkTodos = () => {
  const array = []
  for(let i = 1; i <= 2500; i++){
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    })
  }
  return array
}

//성능 최적화를 위한 reducer 사용하기 
// const todoReducer = (todos, action) => {
//   switch(action.type){
//     case 'INSERT':
//       return todos.concat(action.todo)
//     case 'REMOVE':
//       return todos.filter(todo => todo.id !== action.id)
//     case 'TOGGLE':
//       return todos.map(todo => 
//         todo.id === action.id ? {...todo, checked: !todo.checked} : todo)
//     default:
//       return todos;
//   }
// }

function App() {
  const [todos, setTodos] = useState(createBulkTodos)

  const nextId = useRef(2501)

  //일정 추가
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    }
    //성능 최적화를 위한 함수형 업데이트 
    setTodos(todos => todos.concat(todo))
    nextId.current += 1
  },[])

  //일정 삭제
  const onRemove = useCallback((id) => {
    //성능 최적화를 위한 함수형 업데이트 
    setTodos(todos => todos.filter(todo => todo.id !== id))
  },[])

  //일정 수정
  const onToggle = useCallback((id) => {
    //성능 최적화를 위한 함수형 업데이트 
    setTodos(todos => todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo))
  },[])

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;
