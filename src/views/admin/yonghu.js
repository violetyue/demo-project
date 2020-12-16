import React, { Component } from 'react';
import { Input, Button, Table, Select, Modal, Form, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import {
    SearchOutlined,
} from '@ant-design/icons';
import '../style/style.css'
import { addUser, getUserInfo } from '../../api/index'

const { Option } = Select

class yonghu extends Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'sqno',
            }, {
                title: '账号',
                dataIndex: 'username',
            }, {
                title: '姓名',
                dataIndex: 'name',
            }, {
                title: '手机号',
                dataIndex: 'phone',
            }, {
                title: '角色',
                dataIndex: 'role',
            }, {
                title: '虚拟账户',
                dataIndex: 'fake',
            }, {
                title: '状态',
                dataIndex: 'status',
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
            username: '',
            name: '',
            phone: '',
            fake: false,
            roleIds: [0],
        }
    }

    
    openModalAddInfo = (type)=>{
        this.setState({modalAddInfoVisible: true})
    }

    handleOk=e=>{
        this.formRef.current.validateFields()
                .then(values => {
                    this.formRef.current.resetFields();
                    this.addNewuser(this);
                    this.setState({modalAddInfoVisible: false});
                })
                .catch(info=>{
                  console.log('Validate failed:', info);
                })
    }

    componentDidMount() {
        
    }

    

    addNewuser() {
        const data={}
        data.username=this.state.username
        data.name=this.state.name
        data.phone=this.state.phone
        data.fake=this.state.fake
        data.roleIds=this.state.roleIds
        addUser(data).then(res=>{
            const { data } = res
            localStorage.setItem("auth", data)
            console.log(data)
        })
    }
    
    formRef = React.createRef();

    usernameInput(e) {
      this.setState({
        username: e.target.value,
      })
    }
    nameInput(e) {
      this.setState({
        name: e.target.value,
      })
    }
    phoneInput(e) {
      this.setState({
        phone: e.target.value,
      })
    }
    // fakeSelect(e) {
    //   this.setState({
    //     fake: e.target.value,
    //   })
    // }

    render() { 
        let data = this.state.data
        let columns = this.state.columns

        return (
            <div>
                <div className='searchyonghu'>
                    <div className='searchname'>
                        <label htmlFor='name'>姓名 </label>
                        <Input placeholder="请输入名称" style={{ width: '85%' }} />
                    </div>
                    <div className='selectstatus'>
                        <label htmlFor='name'>状态 </label>
                        <Select defaultValue="all" style={{ width: 182 }}>
                            <Option value="all">全部</Option>
                            <Option value="start">启用中</Option>
                            <Option value="stop">停用中</Option>
                        </Select>
                    </div>
                    <Button type='primary' icon={<SearchOutlined />}>查询</Button>
                </div>
                <div className='createyonghu'>
                    <Button type='primary' onClick={()=>this.openModalAddInfo("modalAddInfo")} >新增用户</Button>
                    <Modal 
                      visible={this.state.modalAddInfoVisible} 
                      title="新增用户" 
                      cancelText="取消" 
                      onCancel={()=>{this.setState({modalAddInfoVisible: false})}}
                      okText="确定" 
                      onOk={this.handleOk}
                    >
                        <Form ref={this.formRef} name='input-ref'>
                            <FormItem 
                              name='yonghuaccount'
                              label='账号 '
                              rules={[
                                {
                                  required: true,
                                  message: '请输入账号',
                                },
                              ]}
                            >
                            <Input 
                              placeholder="请填写"
                              value={this.state.username}
                              onChange={this.usernameInput.bind(this)} />
                            </FormItem>
                            <FormItem
                              name='yonghuname'
                              label='姓名 '
                              rules={[
                                {
                                  required: true,
                                  message: '请输入姓名',
                                },
                              ]}
                            >
                            <Input 
                              placeholder="请填写"
                              value={this.state.name}
                              onChange={this.nameInput.bind(this)}/>
                            </FormItem>
                            <FormItem
                              name='yonghutelephone'
                              label='手机号 '
                            >  
                            <Input 
                              placeholder="请填写"
                              value={this.state.phone}
                              onChange={this.phoneInput.bind(this)}/>
                            </FormItem>
                            <FormItem
                              name='yonnghurole'
                              label='角色 '
                              rules={[
                                {
                                  required: true,
                                  message: '角色不能为空',
                                },
                              ]}
                            >  
                            <Select
                              mode="multiple"
                              allowClear
                              placeholder="请选择"
                              // value={this.state.roleIds}
                            >
                                <Option value="1">轻量-管理员</Option>
                                <Option value="2">轻量-计划员</Option>
                                <Option value="3">轻量-生产人员</Option>
                                <Option value="4">用户账号管理员</Option>
                            </Select>
                            </FormItem>
                            <FormItem
                              name='yonghuvirtual'
                              label='虚拟用户 '
                            >  
                            <Select 
                              // value={this.state.fake}
                              // onChange={this.fakeSelect.bind(this)}
                            >
                                <Option value={true}>是</Option>
                                <Option value={false}>否</Option>
                            </Select>
                            </FormItem>
                        </Form>    
                    </Modal>
                </div>
                <div className='yonghutable'>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        );
    }
}
 
export default yonghu;