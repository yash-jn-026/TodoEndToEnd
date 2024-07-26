import React, { useState } from 'react';

function CreateTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleAddTodo = async () => {
        if (!title || !description) {
            setError('Title and description are required');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:3000/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            if (!response.ok) {
                throw new Error('Failed to add todo');
            }

            const data = await response.json();
            alert('Todo Added');
            setTitle('');
            setDescription('');
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                style={{
                    padding: '10px',
                    marginBottom: '10px',
                    width: '200px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    outline: 'none',
                }}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                style={{
                    padding: '10px',
                    marginBottom: '10px',
                    width: '200px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    outline: 'none',
                }}
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                type="button"
                onClick={handleAddTodo}
            >
                Add a ToDo
            </button>
        </div>
    );
}

export default CreateTodo;
