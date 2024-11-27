import React, { useCallback, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Modal,
  Col,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TASK_STATUSES } from "../constant/enums";

const TaskForm = ({ addTask, isOpen }) => {
  const [errors, setErrors] = useState({});
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

    if (!validateTaskData()) return;

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

  const validateTaskData = useCallback(
    (e) => {
      let isvalid = false;
      let error = { ...errors };

      if (fields.title === "") {
        isvalid = false;
        error["title"] = "Task Title should not be empty.";
      } else {
        isvalid = true;
        error["title"] = null;
      }

      if (!Object.values(error).every((err) => err === null)) {
        isvalid = false;
      }
      setErrors(error);
      return isvalid;
    },
    [fields.title, isOpen]
  );

  return (
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
            invalid={errors["title"] ? true : false}
          />
          {errors["title"] ? (
            <FormFeedback type="invalid" className="error flex-start">
              {errors["title"]}
            </FormFeedback>
          ) : null}
        </Col>
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
  );
};

const TaskFormModal = ({ isOpen, addTask, setModal }) => {
  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={() => setModal(!isOpen)}>
          Create New Task
        </ModalHeader>
        <ModalBody>
          <TaskForm addTask={addTask} isOpen={isOpen} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default TaskFormModal;
