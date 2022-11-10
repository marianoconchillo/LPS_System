import * as React from 'react'
import { render, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm, Props } from '../components/LoginForm';

describe("Login Component tests", () => {

    const renderLoginForm = (props: Partial<Props> = {}) => {
        const defaultProps: Props = {
            handleSubmit() {
                return;
            },
            onChange() {
                return;
            },
            form: { email: "", password: "" },
            error: false
        };
        return render(<LoginForm {...defaultProps} {...props} />);
    }

    test("Debería mostrar un formulario login con los campos vacíos", async () => {
        const { findByTestId } = renderLoginForm();
        const loginForm = await findByTestId("login-form");

        expect(loginForm).toHaveFormValues({
            email: "",
            password: ""
        });
    });

    test("Credenciales correctas", async () => {
        const handleSubmit = jest.fn(e => e.preventDefault());
        const onChange = jest.fn();
        const error = false;
        const form = { email: "email", password: "password" };

        const { findByTestId } = render(<LoginForm handleSubmit={handleSubmit} onChange={onChange} error={error} form={form} />);

        const button = await findByTestId("submit-button");

        fireEvent.click(button);

        expect(handleSubmit).toBeCalled();
    });

    test("Credenciales incorrectas", async () => {
        const handleSubmit = jest.fn(e => e.preventDefault());
        const onChange = jest.fn();
        const error = true;
        const form = { email: "email", password: "password" };

        const { findByTestId } = render(<LoginForm handleSubmit={handleSubmit} onChange={onChange} error={error} form={form} />);

        const button = await findByTestId("submit-button");

        fireEvent.click(button);

        const statusLabel = await waitFor(() => findByTestId("label"));
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Error de credenciales, intente nuevamente.');
    });

});

global.React = React;