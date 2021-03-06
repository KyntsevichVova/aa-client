import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actions, selectors } from '../../../redux';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

function SignUpPage() {
    const authorized = useSelector(selectors.status.selectAuthorized);
    const dispatch = useDispatch();

    const onSignUp = React.useCallback((values) => {
        const { email, password } = values;
        dispatch(actions.auth.setAuth({
            auth: {
                email,
                password,
            },
        }));
        dispatch(actions.auth.signUp());
    }, [dispatch]);

    const error = useSelector(selectors.auth.selectError);
    if (error) {
        message.error(error);
        dispatch(actions.auth.setError({ error: '' }));
    }

    return (
        <>
            {authorized && (<Redirect to="/"/>)}
            <Form
                {...layout}
                name="basic"
                onFinish={onSignUp}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default SignUpPage;