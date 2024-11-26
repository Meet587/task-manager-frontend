import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { axiosAuth } from "../utils/apihelper";
import { toast } from "react-toastify";
import { EMAIL_REGEX } from "../constant/regx";

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [fields]
  );

  const validateInputData = useCallback(() => {
    let isvalid = false;
    let error = { ...errors };

    if (EMAIL_REGEX.test(fields["email"])) {
      error["email"] = null;
      isvalid = true;
    } else {
      isvalid = false;
      error["email"] = "Enter correct email address.";
    }

    if (fields.password === "") {
      isvalid = false;
      error["password"] = "Password should not be empty.";
    } else if (fields.password !== fields.cpassword) {
      isvalid = false;
      error["password"] = "Confirm Password is not matching.";
    } else {
      isvalid = true;
      error["password"] = null;
    }

    if (fields.name !== "") {
      error["name"] = null;
      isvalid = true;
    } else {
      isvalid = false;
      error["name"] = "Name should not be empty.";
    }

    if (!Object.values(error).every((err) => err === null)) {
      isvalid = false;
    }
    setErrors(error);
    return isvalid;
  }, [fields, errors]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (!validateInputData()) return null;

        const res = await axiosAuth("/auth/register", {
          email: fields.email,
          name: fields.name,
          password: fields.password,
        });
        const data = res?.data;
        localStorage.setItem("token", JSON.stringify(data?.token));
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data?._id,
            email: data?.email,
            name: data?.name,
          })
        );
        navigate("/home");
      } catch (error) {
        toast.error(error?.message);
        console.log(error);
      }
    },
    [fields]
  );

  return (
    <>
      <Container>
        <div>
          <Card>
            <CardHeader>Register Your Self !</CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup floating>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter you full name."
                    type="text"
                    value={fields.name}
                    onChange={handleChange}
                    invalid={errors["name"] ? true : false}
                  />
                  <Label for="name">Name</Label>
                  {errors["name"] ? (
                    <FormFeedback type="invalid" className="error flex-start">
                      {errors["name"]}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
                <FormGroup floating>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email."
                    type="email"
                    value={fields.email}
                    onChange={handleChange}
                    invalid={errors["email"] ? true : false}
                  />
                  <Label for="email">Email</Label>
                  {errors["email"] ? (
                    <FormFeedback type="invalid" className="error">
                      {errors["email"]}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
                <FormGroup floating>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter password."
                    type="password"
                    value={fields.password}
                    onChange={handleChange}
                    invalid={errors["password"] ? true : false}
                  />
                  <Label for="password">Password</Label>
                  {errors["password"] ? (
                    <FormFeedback type="invalid" className="error">
                      {errors["password"]}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
                <FormGroup floating>
                  <Input
                    id="cpassword"
                    name="cpassword"
                    placeholder="Enter password."
                    type="text"
                    value={fields.cpassword}
                    onChange={handleChange}
                  />
                  <Label for="cpassword">Confirm Password</Label>
                </FormGroup>
                <Button>Register</Button>
              </Form>
            </CardBody>
            <CardFooter>
              Alredy Have an account <Link to={"/"}>Go to login</Link>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Register;
