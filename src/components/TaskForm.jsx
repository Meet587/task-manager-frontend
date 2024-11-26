import React, { useCallback, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle,
  FormFeedback,
  Modal,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TASK_STATUSES } from "../constant/enums";

const TaskForm = ({ addTask }) => {

  const [fields, setFields] = useState({
    title: "",
    description: "",
    status: TASK_STATUSES[0],
  });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFields((prev) => ({ ...prev, [name]: value }));
    },
    [fields]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fields.title.trim()) return;

    const newTask = {
      title: fields.title.trim(),
      description: fields.description.trim(),
      status: fields.status,
    };

    addTask(newTask);

    setFields({
      title: "",
      description: "",
      status: TASK_STATUSES[0],
    });
  };

  return (
    <Card className="">
      <CardBody>
        <CardTitle tag="h3" className="text-center mb-4">
          Create New Task
        </CardTitle>
        <Form onSubmit={handleSubmit} noValidate>
          <FormGroup row>
            <Label htmlFor="title" sm={3}>
              Title
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="title"
                id="title"
                value={fields.title}
                onChange={handleChange}
                placeholder="Enter task title"
              />
            </Col>
            <FormFeedback>Title is required</FormFeedback>
          </FormGroup>

          <FormGroup row>
            <Label htmlFor="description" sm={3}>
              Description
            </Label>
            <Col sm={9}>
              <Input
                id="description"
                name="description"
                type="textarea"
                value={fields.description}
                onChange={handleChange}
                placeholder="Optional task description"
                rows={3}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label htmlFor="status" sm={3}>
              Status
            </Label>
            <Col sm={9}>
              <Input
                type="select"
                name="status"
                id="status"
                value={fields.status}
                onChange={handleChange}
              >
                {TASK_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>

          <Button color="primary" block type="submit" className="mt-3">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add Task
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

const TaskFormModal = ({ isOpen, addTask }) => {
  return (
    <>
      <Modal isOpen={isOpen}>
        <TaskForm addTask={addTask} />
      </Modal>
    </>
  );
};

export default TaskFormModal;
