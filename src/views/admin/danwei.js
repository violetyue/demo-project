import React, { Component } from 'react';
import { Input, Button, Table, Modal, Form, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import '../style/style.css'
import { insertUnit, deleteUnit, getUnitList, compileUnit } from '../../api/index'

const { TextArea } = Input

class danwei extends Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'sqno',
                key: 'id',
                render: (txt,record,index)=>index + 1

            }, {
                title: '名称',
                dataIndex: 'name',
            }, {
                title: '备注',
                dataIndex: 'comment'
            }, {
                title: '操作',
                dataIndex: 'delete',
                key: 'delete',
                render: (text,record,index) => 
                (
                  <Space>
                    <a data-index={index}>编辑</a>  
                    <a data-index={index} onClick={this.handleDelete.bind(this,text,record,index)}>Delete</a>
                  </Space>
                )
            }],
            data: [],
            modalAddInfoVisible: false,
            name: '',
            remark: '',
            page: 1,
            size: 10,
        }
    }

    openModalAddInfo = (type)=>{
        this.setState({modalAddInfoVisible: true})
    }

    handleOk=e=>{
        this.formRef.current.validateFields()
                .then(values => {
                    this.formRef.current.resetFields();
                    this.insertNewUnit(this)
                    this.setState({modalAddInfoVisible: false});
                })
                .catch(info=>{
                  console.log('Validate failed:', info);
                })
    }

    setData() {
      // const data ={}
      // data.name=this.state.name
      // data.remark=this.state.remark
      getUnitList({}).then(res=>
        {
          const { data } = res
          this.setState({data:data})
          console.log(res)
        })
      // getUnitList({}).then(res=>{
      //     console.log(res)
      //   })
    }

    

    insertNewUnit() {
        const data={}
        data.name=this.state.name
        data.remark=this.state.remark
        insertUnit(data).then(res=>{
            const { data } = res
            localStorage.setItem("auth", data)
            console.log(data)
        })
    }

    handleDelete = (text,record,index) => {
        const data={}
        data.name=this.state.name
        data.remark=this.state.remark
        deleteUnit(record.id).then(res=>{
            const{ data } = res

        })
    }

    
    
    formRef = React.createRef();

    nameInput(e) {
        this.setState({
          name: e.target.value,
        })
      }
      remarkInput(e) {
        this.setState({
          remark: e.target.value,
        })
      }

    render() { 
        let data = this.state.data
        let columns = this.state.columns

        return (
            <div>
                <div className='searchdanwei'>
                    <div className='searchname'>
                        <label htmlFor='name'>名称 </label>
                        <Input placeholder="请输入名称" style={{ width: '85%' }} />
                    </div>
                    <div className='searchcode'>
                        <label htmlFor='name'>备注 </label>
                        <Input placeholder="请输入编号" style={{ width: '85%' }} />
                    </div>
                    <Button 
                      type='primary' 
                      icon={<SearchOutlined />}
                      onClick={this.setData} >查询</Button>
                </div>
                <div className='createdanwei'>
                    <Button type='primary' icon={<PlusCircleOutlined />} onClick={()=>this.openModalAddInfo("modalAddInfo")}>创建单位</Button>
                    <Modal 
                      visible={this.state.modalAddInfoVisible} 
                      title="创建单位" 
                      cancelText="取消" 
                      onCancel={()=>{this.setState({modalAddInfoVisible: false})}}
                      okText="确定" 
                      onOk={this.handleOk}
                    >
                        <Form ref={this.formRef} name='input-ref'>
                            <FormItem 
                              name='danweiname'
                              label='名称 '
                              rules={[
                                {
                                  required: true,
                                  message: '请输入名称',
                                },
                              ]}
                            >
                            <Input 
                              placeholder="请输入"
                              value={this.state.name}
                              onChange={this.nameInput.bind(this)}/>
                            </FormItem>
                            <FormItem
                              name='danweibeizhu'
                              label='备注 '
                            >
                            <TextArea 
                              rows={4}
                              value={this.state.remark}
                              onChange={this.remarkInput.bind(this)} />
                            </FormItem>
                        </Form>    
                    </Modal>
                </div>
                <div className='danweitable'>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        );
    }
}
 
export default danwei;