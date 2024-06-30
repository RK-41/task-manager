/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTodo } from '../contexts';

function TodoItem({ todo }) {
	const [todoEditable, setTodoEditable] = useState(false);
	const [todoMessage, setTodoMessage] = useState(todo.todo);

	const { updateTodo, deleteTodo, toggleComplete } = useTodo();

	const editTodo = () => {
		updateTodo({ ...todo, todo: todoMessage });
		setTodoEditable(false);
	};

	const toggleCompleted = () => {
		toggleComplete(todo.id);
	};

	return (
		<div
			className={`w-full flex border border-black/10 rounded-lg px-2 py-1.5 gap-x-2 shadow-sm shadow-white/50 duration-300 text-white ${
				todo.completed ? 'bg-[#04ff81]' : 'bg-[#020200]'
			}`}
		>
			<input
				type='checkbox'
				name='completed'
				className='cursor-pointer w-6 text-black'
				checked={todo.completed}
				onChange={toggleCompleted}
			/>

			<input
				type='text'
				className={`outline-none w-full bg-transparent rounded-lg px-1 ${
					todoEditable ? 'border border-white/50' : 'bg-transparent'
				} ${todo.completed ? 'text-black' : 'text-white'}`}
				value={todoMessage}
				onChange={(e) => setTodoMessage(e.target.value)}
				readOnly={!todoEditable}
			/>

			<button
				className='inline-flex w-8 h-8 rounded-md text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-300 shrink-0 disabled:opacity-50'
				onClick={() => {
					if (todo.completed) return;

					if (todoEditable) {
						editTodo();
					} else {
						setTodoEditable((prev) => !prev);
					}
				}}
				disabled={todo.completed}
			>
				{todoEditable ? '📂' : '🖋️'}
			</button>

			<button
				className='inline-flex w-8 h-8 rounded-md text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-300 shrink-0 disabled:opacity-50'
				onClick={() => deleteTodo(todo.id)}
			>
				❌
			</button>
		</div>
	);
}

export default TodoItem;
