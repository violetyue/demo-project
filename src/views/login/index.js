import React, { Component } from 'react';
import './login.css'
import { Form, Input, Button, Checkbox } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import { UserOutlined, LockOutlined, HomeOutlined } from '@ant-design/icons';
import { getUserInfo, login } from '../../api/index'
import JsSha from 'jssha';

export const hashPassword = (password) => {
    const sha = new JsSha('SHA3-224', 'TEXT');
    sha.update(password);
    return sha.getHash('HEX');
};

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: 0,
            userTelephone: '',
            userPassword: '',
            userCode: '',
            userAccount: '',
        }
    }

    componentDidMount() {
        if (localStorage.getItem('auth')) {
            this.props.history.push('/admin/homepage')
        }
    }

    usertelephoneCheck(e) {
        this.setState({
            userTelephone: e.target.value, 
        })
    }
    userpasswordCheck(e) {
        this.setState({
            userPassword: e.target.value,
        })
    }
    usercodeCheck(e) {
        this.setState({
            userCode: e.target.value,
        })
    }
    useraccountCheck(e) {
        this.setState({
            userAccount: e.target.value,
        })
    }

    handleSubmit=e=>{
        this.formRef.current.validateFields()
                .then(values => {
                    this.formRef.current.resetFields();
                    this.goToLink(this);
                })
                .catch(info=>{
                  console.log('Validate failed:', info);
                })
    }

    goToLink() {
        const data={}
        data.type=this.state.type
        data.code=this.state.userCode
        data.username=this.state.userAccount
        data.phone=this.state.userTelephone
        data.password=hashPassword(this.state.userPassword)
        login(data).then(res=>{
            const { data } = res
            localStorage.setItem("auth", data)
            console.log(data)
            this.props.history.push('/admin/homepage')
        })
        getUserInfo().then(res=>{
            console.log(res)
        })
    }

    formRef = React.createRef();

    loginType() {
        if (this.state.type === 0)
        {
            return this.telephoneLogin()
        }
        if (this.state.type === 1)
        {
            return this.accountLogin()
        }
        
    }

    telephoneLogin=()=> {
        return (
            <Form ref={this.formRef}
                      name='normal_login'
                      className='login-area-telephone'
                      initialValues={{
                          remember: true,
                      }}
                    >
                        <FormItem
                            name='telephone'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                            ]}
                        >
                        <Input 
                          prefix={<UserOutlined className='site-form-item-icon' />} 
                          placeholder='手机号'
                          value={this.state.userTelephone}
                          onChange={this.usertelephoneCheck.bind(this)}
                          />
                        </FormItem>
                        <FormItem
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        >
                        <Input 
                          prefix={<LockOutlined className='site-form-item-icon' />} 
                          type='password' 
                          placeholder='密码'
                          value={this.state.userPassword}
                          onChange={this.userpasswordCheck.bind(this)}
                          />
                        </FormItem>
                        <FormItem>
                        <Button type='primary' onClick={this.handleSubmit} className='login-button'>登录</Button>
                        </FormItem>
                        <FormItem name='remember' valuePropName='checked' noStyle>
                            <Checkbox>保持登录</Checkbox>
                        </FormItem>
                    </Form>
        )
    }

    accountLogin=()=> {
        return(
            <Form ref={this.formRef}
                      name='normal_login'
                      className='login-area-account'
                      initialValues={{
                          remember: true,
                      }}
                    >
                        <FormItem
                            name='code'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入工厂代码',
                                },
                            ]}
                        >
                        <Input 
                          prefix={<HomeOutlined className='site-form-item-icon' />} 
                          placeholder='工厂代码'
                          value={this.state.userCode}
                          onChange={this.usercodeCheck.bind(this)}
                          />
                        </FormItem>
                        <FormItem
                            name='account'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入账号',
                                },
                            ]}
                        >
                        <Input 
                          prefix={<UserOutlined className='site-form-item-icon' />} 
                          placeholder='账号'
                          value={this.state.userAccount}
                          onChange={this.useraccountCheck.bind(this)}
                          />
                        </FormItem>
                        <FormItem
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        >
                        <Input 
                          prefix={<LockOutlined className='site-form-item-icon' />} 
                          type='password' 
                          placeholder='密码'
                          value={this.state.userPassword}
                          onChange={this.userpasswordCheck.bind(this)}
                          />
                        </FormItem>
                        <FormItem>
                        <Button type='primary' onClick={this.handleSubmit} className='login-button'>登录</Button>
                        </FormItem>
                        <FormItem name='remember' valuePropName='checked' noStyle>
                            <Checkbox>保持登录</Checkbox>
                        </FormItem>
                    </Form>
        )
    }

    render() {
        return (
            <div className='loginarea'>
                <div className='loginlogo' />
                <div className='login-form'>
                    <div className='login-header'>
                        <div className='login-title'>
                            登录小工单
                        </div>
                    </div>
                    <div className='login-content'>
                        <div className='login-type'>
                            <a 
                              onClick={()=>{this.setState({type: 0})}} 
                              style={this.state.type === 0 ? {color:'blue'}:{}}>
                              手机号登录</a>
                            <a 
                              onClick={()=>{this.setState({type: 1})}}
                              style={this.state.type === 1 ? {color:'blue'}:{}}>
                              工厂账号登录</a>
                        </div>
                        {this.loginType()}
                    </div>
                </div>
                
            </div>

        );
    }
}

export default Login;