import React, { memo } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  Badge,
  Button,
  ListGroupItem,
  InputGroupText,
  InputGroup,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheckCircle,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { TASK_ENUM, TASK_STATUSES } from "../constant/enums";

const TaskItem = memo(({ task, updateTaskStatus, deleteTask }) => {
  const getStatusColor = () => {
    switch (task.status) {
      case TASK_ENUM.TO_DO:
        return "secondary";
      case TASK_ENUM.IN_PROGRESS:
        return "warning";
      case TASK_ENUM.COMPLETED:
        return "success";
      default:
        return "secondary";
    }
  };

  const getNextStatus = () => {
    switch (task.status) {
      case TASK_ENUM.TO_DO:
        return TASK_ENUM.IN_PROGRESS;
      case TASK_ENUM.IN_PROGRESS:
        return TASK_ENUM.COMPLETED;
      case TASK_ENUM.COMPLETED:
        return TASK_ENUM.TO_DO;
      default:
        return TASK_ENUM.TO_DO;
    }
  };

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div style={{ maxWidth: 250 }}>
        <h5 className="mb-1 text-start">{task.title}</h5>
        {task.description && (
          <p className="text-muted text-start small mb-1">{task.description}</p>
        )}
        <Badge color={getStatusColor()} pill className="text-start">
          {task.status}
        </Badge>
      </div>
      <div>
        <Button
          color="success"
          size="sm"
          className="me-2"
          onClick={() => updateTaskStatus(task._id, getNextStatus())}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
        <Button color="danger" size="sm" onClick={() => deleteTask(task._id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </ListGroupItem>
  );
});

const TaskList = ({
  tasks,
  updateTaskStatus,
  deleteTask,
  filter,
  setFilter,
}) => {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardBody className="border-top">
          <CardTitle tag="h4" className="text-center mb-3">
            <FontAwesomeIcon icon={faFilter} className="me-2" />
            Filter Tasks
          </CardTitle>
          <InputGroup>
            <InputGroupText>Show</InputGroupText>
            <Input
              type="select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Tasks</option>
              {TASK_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s} Tasks
                </option>
              ))}
            </Input>
          </InputGroup>
        </CardBody>
        <CardBody className="text-center">
          <h4>No Tasks Found</h4>
          <p>Create a new task to get started!</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="border-top">
        <CardTitle tag="h4" className="text-center mb-3">
          <FontAwesomeIcon icon={faFilter} className="me-2" />
          Filter Tasks
        </CardTitle>
        <InputGroup>
          <InputGroupText>Show</InputGroupText>
          <Input
            type="select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Tasks</option>
            {TASK_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s} Tasks
              </option>
            ))}
          </Input>
        </InputGroup>
      </CardBody>
      <CardBody>
        <CardTitle tag="h3" className="text-center mb-4">
          Task List
        </CardTitle>
        <ListGroup>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default memo(TaskList);
