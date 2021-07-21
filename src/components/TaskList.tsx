import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

import { randomUuid } from "../utils";
import { TaskItem } from "shared/types";

import { useForm } from "react-hook-form";

export function TaskList() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const handleCreateNewTask = (data) => {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    setTasks([
      ...tasks,
      { title: data.task, id: randomUuid(), isComplete: false },
    ]);
  };

  function handleToggleTaskCompletion(id: string) {
    const taskComple = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    );

    setTasks(taskComple);
  }

  function handleRemoveTask(id: string) {
    const newTaks = tasks.filter((task) => task.id !== id);

    setTasks(newTaks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <form
          onSubmit={handleSubmit(handleCreateNewTask)}
          className="input-group"
        >
          <input
            type="text"
            placeholder="Adicionar novo todo"
            {...register("task", { required: true })}
          />
          <button type="submit" data-testid="add-task-button">
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </form>
      </header>

      <main>
        <ul>
          {tasks?.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
