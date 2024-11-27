import React, { memo } from "react";
import {
  Card,
  CardBody,
  ListGroup,
  Badge,
  Button,
  ListGroupItem,
  Input,
  Col,
  Row,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TASK_ENUM, TASK_STATUSES } from "../constant/enums";
import style from "./task.module.css";

const TaskCard = memo(({ task, updateTaskStatus, deleteTask }) => {
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
    <ListGroupItem className="rounded my-1">
      <Row>
        <Col>
          <span className="d-flex">
            <Badge pill color={getStatusColor()}>
              {task.status}
            </Badge>
          </span>
        </Col>
        <Col>
          <div className="d-flex justify-content-end gap-3">
            <Input
              style={{ maxWidth: 130 }}
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
            <Button
              color="danger"
              size="sm"
              onClick={() => deleteTask(task._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <h5 className="mb-1 text-start">{task.title}</h5>
        {task.description && (
          <p
            className="text-muted text-start small mb-1"
            style={{ minWidth: 150, maxWidth: "70%" }}
          >
            {task.description}
          </p>
        )}
      </Row>
    </ListGroupItem>
  );
});

const TaskList = ({
  tasks,
  updateTaskStatus,
  deleteTask,
  filter,
  setModal,
  setFilter,
}) => {
  return (
    <Card className={style.taskCard}>
      <CardBody className="">
        <div
          className={`${style.task_card_hearder} style.task_card_hearder} mb-4`}
        >
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
            <ListGroup>
              <Row>
                {tasks.map((task) => (
                  <Col md={12} key={task._id}>
                    <TaskCard
                      task={task}
                      updateTaskStatus={updateTaskStatus}
                      deleteTask={deleteTask}
                    />
                  </Col>
                ))}
              </Row>
            </ListGroup>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default memo(TaskList);
