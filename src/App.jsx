import { useEffect, useState } from 'react';
import { TodoContextProvider } from './contexts';
import { TodoForm, TodoItem } from './components';

function App() {
	const [todos, setTodos] = useState([]);

	const addTodo = (todo) => {
		setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
	};

	const updateTodo = (updatedTodo) => {
		setTodos((prev) =>
			prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
		);
	};

	const deleteTodo = (id) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	const toggleComplete = (id) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	// Fetching todos from local storgage when App component is mounted
	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem('todos'));
		if (todos && todos.length > 0) {
			setTodos(todos);
		}
	}, []);

	// Updating local storage when todos array is updated
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<TodoContextProvider
			value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
		>
			<div className='bg-[#091d3b] min-h-screen py-4'>
				<div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-2 text-white'>
					<h1 className='text-4xl font-bold text-center mt-4 mb-6'>
						Task Manager
					</h1>

					<div className='mb-4'>
						<TodoForm />
					</div>

					<div className='flex flex-wrap gap-y-3'>
						{todos.map((todo) => (
							<div key={todo.id} className='w-full'>
								<TodoItem todo={todo} />
							</div>
						))}
					</div>
				</div>
			</div>
		</TodoContextProvider>
	);
}

export default App;
