import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
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

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    fetchTask();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const fetchTask = async () => {
    try {
      const res = await axiosGet("/tasks/list");
      setTasks(res.data);
      return res;
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
  };

  // Add new task
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

  // Update task status
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

  // Delete task
  const deleteTask = async (id) => {
    try {
      const res = await axiosDelete(`/tasks/${id}`);
      await fetchTask();
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
  };

  // Filter tasks
  const getFilteredTasks = () => {
    if (filter === "All") return tasks;
    return tasks.filter((task) => task.status === filter);
  };

  return (
    <>
      <Container>
        <Row>
          <Button onClick={() => setModal(!modal)}>Add Task</Button>
          <Col>
            <TaskList
              tasks={getFilteredTasks()}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
              filter={filter}
              setFilter={setFilter}
            />
          </Col>
        </Row>
        <TaskFormModal isOpen={modal} addTask={addTask} />
      </Container>
    </>
  );
};

export default Home;
