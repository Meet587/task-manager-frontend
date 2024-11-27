import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
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
  const localtion = useLocation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, [localtion.pathname]);

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
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    },
    [fields]
  );

  return (
    <>
      <Container className="mt-3 mt-md-5 pt-5">
        <Card style={{ maxWidth: 300 }}>
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
                />
                <Label for="cpassword">Confirm Password</Label>
              </FormGroup>
              <Button disabled={loading} color="primary" className="w-50">
                Register
              </Button>
            </Form>
          </CardBody>
          <CardFooter>
            Alredy Have an account <Link to={"/"}>Go to login</Link>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export default Register;
