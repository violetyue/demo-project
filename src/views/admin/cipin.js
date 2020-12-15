import React, { Component } from 'react';
import { Input, Button, Table, Modal, Form, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import '../style/style.css'

class cipin extends Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'sqno',
            }, {
                title: '次品项编号',
                dataIndex: 'code',
            }, {
                title: '次品项名称',
                dataIndex: 'name'
            }, {
                title: '操作',
                dataIndex: 'delete',
                key: 'delete',
                render: (text,record,index) => 
                (
                  <Space>
                    <a data-index={index}>编辑</a>  
                    <a data-index={index} onClick={this.deleteItem.bind(this,text,record,index)}>Delete</a>
                  </Space>
                )
            }],
            data: [],
            modalAddInfoVisible: false,
        }
    }

    openModalAddInfo = (type)=>{
        this.setState({modalAddInfoVisible: true})
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
        let data = this.state.data
        let columns = this.state.columns

        return (
            <div>
                <div className='searchcipin'>
                    <div className='searchname'>
                        <label htmlFor='name'>名称 </label>
                        <Input placeholder="请输入名称" style={{ width: '85%' }} />
                    </div>
                    <div className='searchcode'>
                        <label htmlFor='name'>备注 </label>
                        <Input placeholder="请输入编号" style={{ width: '85%' }} />
                    </div>
                    <Button type='primary' icon={<SearchOutlined />}>查询</Button>
                </div>
                <div className='createcipin'>
                    <Button type='primary' icon={<PlusCircleOutlined />} onClick={()=>this.openModalAddInfo("modalAddInfo")}>创建次品项</Button>
                    <Modal 
                      visible={this.state.modalAddInfoVisible} 
                      title="创建次品项" 
                      cancelText="取消" 
                      onCancel={()=>{this.setState({modalAddInfoVisible: false})}}
                      okText="确定" 
                      onOk={this.handleOk}
                    >
                        <Form ref={this.formRef} name='input-ref'>
                            <FormItem 
                              name='cipincode'
                              label='次品项编号 '
                              rules={[
                                {
                                  required: true,
                                  message: '请输入次品项编号',
                                },
                              ]}
                            >
                            <Input placeholder="请输入"/>
                            </FormItem>
                            <FormItem
                              name='cipinname'
                              label='次品项名称 '
                              rules={[
                                {
                                  required: true,
                                  message: '请输入次品项名称',
                                },
                              ]}
                            >
                            <Input placeholder="请输入"/>
                            </FormItem>
                        </Form>    
                    </Modal>
                </div>
                <div className='cipintable'>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        );
    }
}
 
export default cipin;