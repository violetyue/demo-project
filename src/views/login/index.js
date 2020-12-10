import React, { Component } from 'react';
import './login.css'
import { Form, Input, Button, Checkbox } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


class login extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: 0,
        }
    }

    handleSubmit=e=>{
        this.formRef.current.validateFields()
                .then(values => {
                    this.formRef.current.resetFields();
                    
                    
                })
                .catch(info=>{
                  console.log('Validate failed:', info);
                })
    }

    loginType() {
        if (this.type === 0)
        {
            this.telephoneLogin()
        }
        if (this.type === 1)
        {
            this.accountLogin()
        }
    }

    telephoneLogin=()=> {
        return (
            <Form ref={this.formRef}
                      name='normal_login'
                      className='login-area'
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
                        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='手机号'/>
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
                        <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='密码'/>
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
                      className='login-area'
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
                        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='工厂代码'/>
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
                        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='账号'/>
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
                        <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='密码'/>
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
                            <div 
                              onClick={()=>{this.setState({type: 0})}} 
                              style={this.type === 0 ? {color:'blue'}:{}}>
                              手机号登录</div>
                            <div 
                              onClick={()=>{this.setState({type: 1})}}
                              style={this.type === 1 ? {color:'blue'}:{}}>
                              工厂账号登录</div>
                        </div>
                        {this.loginType()}
                    </div>
                </div>
                
            </div>

        );
    }
}

export default login;