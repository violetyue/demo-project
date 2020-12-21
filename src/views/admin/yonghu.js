import React, { Component } from 'react';
import { Input, Button, Table, Select, Modal, Form, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import {
    SearchOutlined,
} from '@ant-design/icons';
import '../style/style.css'
import { 
  addUser, 
  getUserInfo, 
  getUserList, 
  editUser, 
  blockUser, 
  enableUser, 
  changePassword, 
  getUserRoles 
} from '../../api/index'

const { Option } = Select

class yonghu extends Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'sqno',
                key: 'id',
                render: (txt,record,index)=>index + 1
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
                  <Space key={index}>
                    <a 
                      data-index={index}
                    >停用</a>  
                    <a 
                      data-index={index} 
                      onClick={()=>{this.setState({editInfo:record,modalAddInfoVisible:true})}}
                    >编辑</a>
                    <a 
                      data-index={index} 
                      // onClick={}
                    >重置密码</a>
                  </Space>
                )
            }],
            data: [],
            modalAddInfoVisible: false,
            editInfo: {
              username: '',
              name: '',
              fake: false,
              phone: '',
              roleIds: [0]
            },
            searchInfo: {
              name:'',
            },
            page: {
              size: 10,
              page: 1,
            },
            total: 0
          }
    }

    componentDidMount() {
       this.setData()
    }
    
    handleOk = e => {
      const { editInfo } = this.state
      if (!editInfo.username) {
        alert("账号不能为空")
        return
      }
      if (!editInfo.name) {
        alert("姓名不能为空")
        return
      }
      if (!editInfo.roleIds) {
        alert("角色不能为空")
        return
      }
      this.updateUser(editInfo)
    }
    
    setData = (newPages={}) => {
      const {page,size} = newPages
      const {searchInfo} = this.state
      const param = {
          ...searchInfo,
          page: {
              page: page || this.state.page.page,
              size: size || this.state.page.size
          }   
      }
      getUserList(param). then(res=>
        {
            const { data, page, size, count } = res
            this.setState({data, page:{page, size}, total: count}, ()=>
            {
              console.log(this.state.page)
            })
            console.log(res)
        })
    }

    onTableChange = (pagination, filters, sorter, extra) => {
      this.setData({
          page: pagination.current,
          pageSize: pagination.pageSize
      })
      console.log(pagination, filters, sorter, extra)
  }

    onQuery = () => {
      this.setData({page: 1, size: 10})
    }

    clearAction() {
      this.setState({
          editInfo: {
              name: '',
              remark: '',
          },
          modalAddInfoVisible: false,
      })
    }
    
    updateUser(user) {
      if (user.id) {
        // editUser(id).then(res=>{
        //   this.clearAction()
        //   this.setData()
        // })
      } else {
        addUser(user).then(res=>{
          this.clearAction()
          this.setData()
        })
      }
    }

    handlePassword(user) {
      

    }

    // addNewuser() {
    //     const data={}
    //     data.username=this.state.username
    //     data.name=this.state.name
    //     data.phone=this.state.phone
    //     data.fake=this.state.fake
    //     data.roleIds=this.state.roleIds
    //     addUser(data).then(res=>{
    //         const { data } = res
    //         localStorage.setItem("auth", data)
    //         console.log(data)
    //     })
    //     getUserInfo().then(res=>{
    //       console.log(res)
    //   })
    // }
    
    

    usernameInput(e) {
      const { editInfo } = this.state
      this.setState({
        editInfo: {...editInfo, username: e.target.value},
      })
    }
    nameInput(e) {
      const { editInfo } = this.state
      this.setState({
        editInfo: {...editInfo, name: e.target.value},
      })
    }
    phoneInput(e) {
      const { editInfo } = this.state
      this.setState({
        editInfo: {...editInfo, phone: e.target.value},
      })
    }
    // fakeSelect(e) {
    //   this.setState({
    //     fake: e.target.value,
    //   })
    // }
    searchnameInput(e) {
      const { searchInfo } = this.state
      this.setState({
        searchInfo: {...searchInfo, name: e.target.value}
      })
    }

    render() { 
      const { data, columns, editInfo, searchInfo, modalAddInfoVisible, page, total } = this.state
      const _pagination = { current: page.page, size: page.size, total}
      console.log(page, _pagination)

        return (
            <div>
                <div className='searchyonghu'>
                    <div className='searchname'>
                        <label htmlFor='name'>姓名 </label>
                        <Input 
                          value={searchInfo.name}
                          placeholder="请输入名称" 
                          style={{ width: '85%' }}
                          onChange={this.searchnameInput.bind(this)} />
                    </div>
                    <div className='selectstatus'>
                        <label htmlFor='name'>状态 </label>
                        <Select defaultValue="all" style={{ width: 182 }}>
                            <Option value="all">全部</Option>
                            <Option value="start">启用中</Option>
                            <Option value="stop">停用中</Option>
                        </Select>
                    </div>
                    <Button 
                      type='primary' 
                      icon={<SearchOutlined />}
                      onClick={this.onQuery}
                    >查询</Button>
                </div>
                <div className='createyonghu'>
                    <Button 
                      type='primary' 
                      onClick={()=>this.setState({modalAddInfoVisible: true})} 
                    >新增用户</Button>
                    <Modal 
                      visible={modalAddInfoVisible} 
                      title={editInfo.id? "编辑用户":"新建用户"} 
                      cancelText="取消" 
                      onCancel={()=>{this.clearAction()}}
                      okText="确定" 
                      onOk={this.handleOk}
                    >
                            <label htmlFor='username'>账号 </label>
                            <Input 
                              placeholder="请填写"
                              value={editInfo.username}
                              onChange={this.usernameInput.bind(this)} />
                            <label htmlFor='name'>姓名 </label>
                            <Input 
                              placeholder="请填写"
                              value={editInfo.name}
                              onChange={this.nameInput.bind(this)}/>
                            <label htmlFor='phone'>手机号 </label>
                            <Input 
                              placeholder="请填写"
                              value={editInfo.phone}
                              onChange={this.phoneInput.bind(this)}/>
                            <label htmlFor='role'>角色 </label>
                            <Select
                              mode="multiple"
                              allowClear
                              placeholder="请选择"
                              value={editInfo.roleIds}
                            >
                                <Option value="1">轻量-管理员</Option>
                                <Option value="2">轻量-计划员</Option>
                                <Option value="3">轻量-生产人员</Option>
                                <Option value="4">用户账号管理员</Option>
                            </Select>
                            <label htmlFor='fake'>虚拟用户 </label>
                            <Select 
                               value={editInfo.fake}
                            >
                                <Option value={true}>是</Option>
                                <Option value={false}>否</Option>
                            </Select>
                               
                    </Modal>
                </div>
                <div className='yonghutable'>
                    <Table 
                      columns={columns} 
                      dataSource={data} 
                      pagination={_pagination} 
                      onChange={this.onTableChange}
                    />
                </div>
            </div>
        );
    }
}
 
export default yonghu;