import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import TaskList from "./../components/TaskList";
import TaskFormModal from "./../components/TaskForm";
import {
  axiosDelete,
  axiosGet,
  axiosPatch,
  axiosPost,
} from "../utils/apihelper";
import { toast } from "react-toastify";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await axiosGet("/tasks/list");
      setTasks(res.data);
      localStorage.setItem("allTask", JSON.stringify(res.data));
      return res;
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const res = await axiosPost("/tasks", newTask);
      await fetchTask();
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
    setModal(false);
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      const res = await axiosPatch(`/tasks/update-status/${id}`, {
        status: newStatus,
      });
      await fetchTask();
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axiosDelete(`/tasks/${id}`);
      await fetchTask();
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
  };

  const getFilteredTasks = () => {
    if (filter === "All") return tasks;
    return tasks.filter((task) => task.status === filter);
  };

  return (
    <>
      <Container fluid className="">
        <TaskList
          tasks={getFilteredTasks()}
          getFilteredTasks={getFilteredTasks}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          filter={filter}
          setFilter={setFilter}
          setModal={setModal}
        />

        <TaskFormModal isOpen={modal} addTask={addTask} setModal={setModal} />
      </Container>
    </>
  );
};

export default Home;
