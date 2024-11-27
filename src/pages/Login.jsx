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
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import { axiosAuth } from "./../utils/apihelper";
import { EMAIL_REGEX } from "../constant/regx";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const localtion = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
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
    } else {
      isvalid = true;
      error["password"] = null;
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
        const res = await axiosAuth("/auth/login", {
          email: fields.email,
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
      <Container fluid className="mt-3 mt-md-5 pt-5">
        <Card style={{ maxWidth: 300 }}>
          <CardHeader>Welcome Back !</CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
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
                  <FormFeedback type="invalid" className="error flex-start">
                    {errors["email"]}
                  </FormFeedback>
                ) : null}
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter password."
                    type={showPassword ? "text" : "password"}
                    value={fields.password}
                    onChange={handleChange}
                    invalid={errors["password"] ? true : false}
                    disabled={loading}
                  />
                  <InputGroupText>
                    <Button
                      color="link"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      style={{ textDecoration: "none" }}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </Button>
                  </InputGroupText>
                </InputGroup>
                <Label htmlFor="password" className="d-none"></Label>
                {errors["password"] ? (
                  <FormFeedback type="invalid" className="error">
                    {errors["password"]}
                  </FormFeedback>
                ) : null}
              </FormGroup>
              <Button color="primary" className="w-50" disabled={loading}>
                Login
              </Button>
            </Form>
          </CardBody>
          <CardFooter>
            Don't have an account <Link to={"/register"}>Go to register</Link>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export default Login;
