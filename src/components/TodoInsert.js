import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState('')

    //useCallback: 한 번 함수를 만들고 재사용 가능하게 
    const onChange = useCallback((e) => {
        setValue(e.target.value)
    },[])

    const onSubmit = useCallback((e) => {
        e.preventDefault()//submit 이벤트의 새로고침 방지 
        onInsert(value)
        setValue('')
    },[onInsert, value])
    
    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input 
            type="text" 
            placeholder="할 일을 입력하세요." 
            onChange={onChange}
            value={value}
            />
            <button type="submit">
                <MdAdd/>
            </button>
        </form>
    );
};

export default TodoInsert;