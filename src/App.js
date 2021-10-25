import { useCallback, useRef, useState } from "react";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },

    {
      id: 3,
      text: '리덕스 리액트에 적용하기',
      checked: false,
    },
  ])

  const nextId = useRef(4)

  //일정 추가
  const onInsert = useCallback((text) => {
        const todo = {
          id: nextId.current,
          text,
          checked: false,
        }
        setTodos(todos.concat(todo))
        nextId.current += 1
  },[todos])

  //일정 삭제
  const onRemove = useCallback((id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  },[todos])

  //일정 수정
  const onToggle = useCallback((id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo))
  },[todos])

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;
