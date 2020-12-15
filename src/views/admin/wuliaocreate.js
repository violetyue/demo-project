import React, { Component } from 'react';
import { Input, Button, Select, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import '../style/style.css'

const { Option } = Select

class wuliaocreate extends Component {
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
            <div className='createwuliaopage'>
                <div className='createwuliaotitle'>
                    <span>创建物料</span>
                </div>
                <div className='createwuliaoarea'>
                    <div className='createwuliaoinput'>  
                        <Form ref={this.formRef} name='input-ref'>
                            <FormItem 
                              name='productno'
                              label='产品编号 '
                              rules={[
                                {
                                  required: true,
                                  message: '产品编号不能为空',
                                },
                              ]}
                            >
                            <Input placeholder="请输入"/>
                            </FormItem>
                            <FormItem
                              name='productname'
                              label='产品名称 '
                              rules={[
                                {
                                  required: true,
                                  message: '产品名称不能为空',
                                },
                              ]}
                            >
                            <Input placeholder="请输入"/>
                            </FormItem>
                            <FormItem
                              name='sku'
                              label='库存单位 '
                              rules={[
                                {
                                  required: true,
                                  message: '库存单位不能为空',
                                },
                              ]}
                            >  
                            <Select>
                                <Option value="1">1</Option>
                            </Select>
                            </FormItem>
                            <FormItem
                              name='productspecs'
                              label='产品规格 '
                            >  
                            <Input placeholder="请输入"/>
                            </FormItem>  
                        </Form>
                    </div>
                    <div className='createwuliaobutton'>
                        <Button style={{ width: '40%' }} onClick={()=>{this.props.history.push("/admin/wuliao")}}>取消</Button>
                        <Button style={{ width: '40%' }} type='primary' onClick={()=>{this.handleOk.bind(this)}}>保存</Button>
                    </div> 
                </div> 
            </div>
        );
    }
}
 
export default wuliaocreate;