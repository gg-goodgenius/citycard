
import { Button, Form, Input, message } from 'antd';
import styles from './Login.module.scss'
import { Typography } from 'antd'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../api/login';
import { setUser } from '../../store/features/user/slice';
import { isErrored } from 'stream';
import { useNavigate } from 'react-router-dom';


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage({ duration: 5 });
	const navigate = useNavigate();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Вход прошел успешно',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'При попытке входа произошла ошибка. Проверьте правильность почты и пароля',
        });
    };

    const onFinish = async (values: any) => {
        console.log('Login values:', values);
        console.log(styles);

        setLoading(true);
        // const { data, isError } = await fetchLogin(values);
        const role: 'operator' | 'partner' = 'operator'
        const data =
        {
            user: {
                username: 'Иваанов Иван',
                email: 'ivenov@gov.ru',
                role: role
            },
            detail: '',
            access_token: '1',
            refresh_token: '2',
        }
        const isError = false

        if (isError) {
            console.error(data?.detail);
            error();
            setLoading(false);
            return;
        }

        dispatch(setUser(data.user));
        success();
        navigate('/');
        setLoading(false);
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);

        console.log('Success login:', data);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <Typography.Title level={3} style={{ textAlign: 'center', margin: '32px' }}>
                    Портал партнеров ЕКЖ
                </Typography.Title>
                <Form
                    name='login'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600, margin: 'auto' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    {contextHolder}
                    <Form.Item
                        label='Почта'
                        name='username'
                        rules={[{ required: true, message: 'Пожалуйста, укажите адрес почты' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label='Пароль' name='password' rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}>
                        <Input type='password' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit' loading={loading}>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>)
}
export default Login