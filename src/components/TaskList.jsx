import React, { memo } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  Badge,
  Button,
  ListGroupItem,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TASK_ENUM, TASK_STATUSES } from "../constant/enums";
import style from "./task.module.css";

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

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div style={{ maxWidth: 250 }}>
        <h5 className="d-flex">
          <Badge color={getStatusColor()} className="text-start">
            {task.status}
          </Badge>
        </h5>

        <h5 className="mb-1 text-start">{task.title}</h5>
        {task.description && (
          <p className="text-muted text-start small mb-1">{task.description}</p>
        )}
      </div>
      <div className="d-flex gap-3">
        <Input
          type="select"
          value={task.status}
          onChange={(e) => updateTaskStatus(task._id, e.target.value)}
        >
          {TASK_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Input>
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
  setModal
}) => {
  return (
    <Card className={style.taskCard}>
      <CardBody className="">
        <div className={style.task_card_hearder}>
          <Button color="primary" onClick={() => setModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>

          <Input
            type="select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ maxWidth: 130 }}
          >
            <option value="All">All Tasks</option>
            {TASK_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Input>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center">
            <h4>No Tasks Found</h4>
            <p>Create a new task to get started!</p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default memo(TaskList);
