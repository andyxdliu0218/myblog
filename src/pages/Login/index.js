import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'



const Login = () =>{

    return (
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt="" />
                <Form>
                    <Form.Item>
                        <Input size='large' placeholder='please enter your username'/>
                    </Form.Item>
                    <Form.Item>
                        <Input size='large' placeholder='please enter your password'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' size='large' block>
                            login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default Login;