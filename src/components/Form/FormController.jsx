import React from "react";
import {
  Form,
  ProgressBar,
  InputGroup,
  FormControl,
  Button,
  Spinner,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import progressbarHandler from "../js/progressbarHandler";
export default function FormController({
  changeHandler,
  values,
  submitHandler,
  errors,
  hideSpinner,
  passwordValidation,
  passwordStrength,
  isDisabled,
}) {
  let { name, password, email } = values;

  let showPasswordStrength = () => {
    let { strengthCounter, progress, type, bgColor } =
      progressbarHandler(passwordStrength);

    return (
      <div>
        {!strengthCounter ? (
          <ProgressBar now={0} variant="danger" />
        ) : (
          <ProgressBar now={progress} variant={bgColor} />
        )}
        {errors && errors.password ? (
          <p className="text-start text-danger m-0 p-0 ">{errors.password}</p>
        ) : (
          <div className="d-flex justify-content-between ">
            {strengthCounter >= 1 && strengthCounter <= 4 ? (
              <p className=" text-start text-danger  p-0 m-0">Bad password</p>
            ) : (
              <p className=" text-start text-danger p-0 m-0 "></p>
            )}
            {strengthCounter >= 1 && (
              <p className={`text-${bgColor} `}>{type}</p>
            )}
          </div>
        )}
      </div>
    );
  };
  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      <Form.Label>User name</Form.Label>
      <InputGroup className="mb-2 p-0">
        <InputGroup.Text id="basic-addon1">
          <FaRegUserCircle />
        </InputGroup.Text>
        <FormControl
          type="text"
          placeholder="user name"
          aria-describedby="basic-addon1"
          onChange={changeHandler}
          value={name}
          name="name"
          // isInvalid={errors && errors.name}
          // isValid={errors && !errors.name}
        />
      </InputGroup>
      <Form.Group style={{ marginBottom: "20px" }}>
        <Form.Label className="mt-3">Work Email</Form.Label>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">
            <MdMarkEmailRead />
          </InputGroup.Text>
          <FormControl
            type="text"
            placeholder="email"
            aria-describedby="basic-addon1"
            onChange={changeHandler}
            value={email}
            name="email"
            // isValid={errors && !errors.email}
          />
        </InputGroup>
        <div style={{ height: "0px" }}>
          {errors && errors.email && (
            <p className=" text-sm-start text-danger p-0 m-0">{errors.email}</p>
          )}
        </div>
      </Form.Group>
      <Form.Group style={{ marginBottom: "30px" }}>
        <Form.Label className="mt-3">Password</Form.Label>

        <OverlayTrigger
          trigger="focus"
          placement="bottom"
          overlay={
            <Popover>
              <Popover.Header as="h3"></Popover.Header>
              <Popover.Body>{passwordValidation}</Popover.Body>
            </Popover>
          }
        >
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <RiLockPasswordFill />
            </InputGroup.Text>
            <FormControl
              type="password"
              placeholder="password must have 8-16 characters "
              aria-describedby="basic-addon1"
              onChange={changeHandler}
              value={password}
              name="password"
              // isInvalid={errors && errors.password}
              // isValid={errors && !errors.password}
            />
          </InputGroup>
        </OverlayTrigger>
        <div style={{ height: "0px" }}>{showPasswordStrength()}</div>
      </Form.Group>
      <Form.Group style={{ marginTop: "30px" }}>
        <div className="d-grid gap-2 p-5  ">
          <Button type="submit" variant="success" disabled={!isDisabled}>
            {!hideSpinner ? <Spinner animation="border" /> : "Sign Up"}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}
