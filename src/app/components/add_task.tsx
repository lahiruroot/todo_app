import React from 'react';

interface TaskProps {
    task: {
        id: number;
        name: string;
        date: string;
        time: string;
        status: string;
    };
    onMove: (id: number, status: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onMove }) => {
    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-bold  text-black	">{task.name}</h3>
            <p className='text-black	'>{task.date} {task.time}</p>
            <div className="flex justify-end space-x-2">
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => onMove(task.id, 'queue')}
                >
                    Queue
                </button>
                <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => onMove(task.id, 'process')}
                >
                    Process
                </button>
                <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => onMove(task.id, 'finish')}
                >
                    Finish
                </button>
            </div>
        </div>
    );
};

export default Task;
