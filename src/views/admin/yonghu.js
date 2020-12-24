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
import Item from 'antd/lib/list/Item';

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
                dataIndex: 'roles',
              //   render:(text,record,index)=>{
              //     const {roles} = record
              //     const names = roles.map(item=>item.desc).join(",")
              //     return (
              //         <span>{names}</span>
              //     )
              // }
            }, {
                title: '虚拟账户',
                dataIndex: 'fake',
                render:(text,record,index)=>{
                  const {fake} = record
                  if (fake === true) {
                    return (
                      <span>是</span>
                    )
                  } else {
                    return (
                      <span>否</span>
                    )
                  }
              }
            }, {
                title: '状态',
                dataIndex: 'active',
                render:(text,record,index)=>{
                  const {active} = record
                  if (active === true) {
                    return (
                      <span>已启用</span>
                    )
                  } else {
                    return (
                      <span>已停用</span>
                    )
                  }
              }
            }, {
                title: '操作',
                dataIndex: 'delete',
                key: 'delete',
                render: (text,record,index) => 
                (
                  <Space key={index}>
                    <a 
                      data-index={index}
                      onClick={()=>{
                          blockUser(record.id).then(res=>{
                          })
                      }
                    }
                    >停用</a>  
                    <a 
                      data-index={index} 
                      onClick={()=>{this.setState({editInfo:record,modalAddInfoVisible:true})}}
                    >编辑</a>
                    <a 
                      data-index={index} 
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
              roleIds: [0],
            },
            searchInfo: {
              name:'',
            },
            page: {
              size: 10,
              page: 1,
            },
            selectList: [],
            total: 0
          }
    }

    componentDidMount(user) {
       this.setData()
       getUserRoles(user).then(res=>{
        const {data} = res
        this.setState({selectList:data})
        console.log(this.state.selectList)
       })
    }
    
    handleOk = e => {
      const { editInfo } = this.state
      console.log('editinfo', editInfo)
      if (!editInfo.username) {
        alert("账号不能为空")
        return
      }
      if (!editInfo.name) {
        alert("姓名不能为空")
        return
      }
      this.updateUser(editInfo)
    }
    
    setData = (newPages={}) => {
      const {page,size} = newPages
      const {searchInfo} = this.state
      
      const param = {
          ...searchInfo,
          page: page || this.state.page.page,
          size: size || this.state.page.size, 
      }
      param.embed='roles'
      param.fake='all'
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
          const id = user.id
          editUser(id, user).then(res=>{
            this.clearAction()
            this.setData()
          })

        } else {
          addUser(user).then(res=>{
            this.clearAction()
            this.setData()
          })
        }
    
    }

    handleChange = (value) => {
        console.log(value)
        const { editInfo } = this.state
        this.setState({
          editInfo: {...editInfo, roleIds: value}
        })
        console.log('roleIds: ', this.state.editInfo.roleIds)
        
    }

    
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
    fakeInput(e){
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, fake: e},
        })
        console.log(e)
    }
    searchnameInput(e) {
      const { searchInfo } = this.state
      this.setState({
        searchInfo: {...searchInfo, name: e.target.value}
      })
    }

    render() { 
      const { data, columns, editInfo, selectList, searchInfo, modalAddInfoVisible, page, total } = this.state
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
                              value={editInfo.roleIds}
                              style={{ width: '100%' }}
                              mode="multiple"
                              allowClear
                              placeholder="请选择"
                              onChange={this.handleChange}
                            >
                                {selectList.map(item=>{
                                    return (<Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>)
                                })}
                            </Select>
                            <label htmlFor='fake'>虚拟用户 </label>
                            <Select 
                               style={{ width: '100%' }}
                               value={editInfo.fake}
                               onChange={this.fakeInput.bind(this)}
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