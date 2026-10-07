import { useForm } from "react-hook-form";
import { Card, Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import {
    loginStart,
    loginSuccess,
    loginFailure,
} from "../../features/auth/authSlice";

import { loginUser } from "../../services/authServices";

export default function Login() {
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        dispatch(loginStart());

        try {
            const response = await loginUser(data);

            dispatch(
                loginSuccess({
                    user: response.user,
                    accessToken: response.accessToken,
                })
            );
        } catch (error) {
            dispatch(loginFailure(error.message));
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="p-4 shadow">
                        <Card.Title className="text-center mb-4">
                            BapuBus Login
                        </Card.Title>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>

                                <Form.Control
                                    type="email"
                                    placeholder="Please enter email"
                                    {...register("email", {
                                        required: "Please enter email",
                                    })}
                                    isInvalid={!!errors.email}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>

                                <Form.Control
                                    type="password"
                                    placeholder="Please enter password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must contain at least 8 characters",
                                        },
                                    })}
                                    isInvalid={!!errors.password}
                                />

                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            className="me-2"
                                        />
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}