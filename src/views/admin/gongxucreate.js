import React, { Component } from 'react';
import { Input, Button, Select, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import '../style/style.css'

const { Option } = Select

class gongxucreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
        }    
    }
    
    handleOk=e=>{
        this.formRef.current.validateFields()
                .then(values => {
                    this.formRef.current.resetFields();
                    
                    this.setState({modalAddInfoVisible: false});
                })
                .catch(info=>{
                  console.log('Validate failed:', info);
                })
    }
    
    formRef = React.createRef();

    render() {
        return (
            <div className='creategongxupage'>
                <div className='creategongxutitle'>
                    <span>创建工序</span>
                </div>
                <div className='creategongxuarea'>
                    <div className='creategongxuinput'>  
                        <Form ref={this.formRef} name='input-ref'>
                            <FormItem 
                              name='processnumber'
                              label='工序编号 '
                              rules={[
                                {
                                  required: true,
                                  message: '工序编号不能为空',
                                },
                              ]}
                            >
                            <Input placeholder="请填写"/>
                            </FormItem>
                            <FormItem
                              name='processname'
                              label='工序名称 '
                              rules={[
                                {
                                  required: true,
                                  message: '工序名称不能为空',
                                },
                              ]}
                            >
                            <Input placeholder="请填写"/>
                            </FormItem>
                            <FormItem
                              name='premission'
                              label='报工权限 '
                              rules={[
                                {
                                  required: true,
                                  message: '报工权限必填',
                                },
                              ]}
                            >  
                            <Select
                              mode="multiple"
                              allowClear
                              placeholder="请选择">
                                <Option value="1">1</Option>
                            </Select>
                            </FormItem>
                            <FormItem
                              name='matching'
                              label='报工数配比 '
                              rules={[
                                {
                                  required: true,
                                  message: '报工数配比不能为空',
                                },
                              ]}
                            >  
                            <Input placeholder="请填写"/>
                            </FormItem>  
                            <FormItem
                              name='cipintable'
                              label='次品分类列表 '
                              rules={[
                                {
                                  required: true,
                                  message: '次品分类列表必选',
                                },
                              ]}
                            >  
                            <Select
                              mode="multiple"
                              allowClear
                              placeholder="请选择">
                                <Option value="1">1</Option>
                            </Select>
                            </FormItem>
                        </Form>
                    </div>
                    <div className='createwuliaobutton'>
                        <Button style={{ width: '40%' }} onClick={()=>{this.props.history.push("/admin/gongxu")}}>取消</Button>
                        <Button style={{ width: '40%' }} type='primary' onClick={()=>{this.handleOk.bind(this)}}>保存</Button>
                    </div> 
                </div> 
            </div>
        );
    }
}
 
export default gongxucreate;