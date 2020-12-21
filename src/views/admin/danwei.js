import React, { Component } from 'react';
import { Input, Button, Table, Modal, Space } from 'antd';
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
                dataIndex: 'remark'
            }, {
                title: '操作',
                dataIndex: 'delete',
                key: 'delete',
                render: (text,record,index) => 
                (
                  <Space key={index}>
                    <a 
                      data-index={index}
                      onClick={()=>{this.setState({editInfo:record,modalAddInfoVisible:true})}}
                      >编辑</a> 
                     
                    <a data-index={index} 
                       onClick={()=>{this.handleDelete(record)}}
                    >删除</a>
                  </Space>
                )
            }],
            data: [],
            modalAddInfoVisible: false,
            editInfo: {
              name: '',
              remark: '',
            },
            searchInfo: {
              searchName: '',
              searchRemark: '',
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
      if (!editInfo.name) {
        alert("名称不能为空")
        return
      }
      this.updateUnit(editInfo)
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
        getUnitList(param). then(res=>
          {
              const { data, page, size, count } = res
              this.setState({data, page:{page, size}, total: count}, ()=>
              {
                console.log(this.state.page)
              })
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

    updateUnit(unit) {
        if (unit.id) {
            compileUnit(unit).then(res=>{
                this.clearAction()
                this.setData()
            })
        } else{
            insertUnit(unit).then(res=>{
                this.clearAction()
                this.setData()
            })
        }
    }

    handleDelete = (record) => {
        const id = record.id
        deleteUnit(id).then(res=>{
            this.clearAction()
            this.setData()
        })
    }

    nameInput(e) {
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, name: e.target.value},
        })
    }
    remarkInput(e) {
        const { editInfo } = this.state
        this.setState({
            editInfo:{...editInfo, remark: e.target.value},
        })
    }
    searchnameInput(e) {
        const { searchInfo } = this.state
        this.setState({
              searchInfo: {...searchInfo, searchName: e.target.value}
        })
    }
    searchremarkInput(e) {
        const { searchInfo } = this.state
        this.setState({
              searchInfo: {...searchInfo, searchRemark: e.target.value}
        })
    }

    render() { 
        const { data, columns, editInfo, searchInfo, modalAddInfoVisible, page, total } = this.state
        const _pagination = { current: page.page, size: page.size, total}
        console.log(page, _pagination)

        return (
            <div>
                <div className='searchdanwei'>
                    <div className='searchname'>
                        <label htmlFor='name'>名称 </label>
                        <Input 
                          value={searchInfo.searchName} 
                          placeholder="请输入名称" 
                          style={{ width: '85%' }}
                          onChange={this.searchnameInput.bind(this)} />
                    </div>
                    <div className='searchcode'>
                        <label htmlFor='name'>备注 </label>
                        <Input 
                          value={searchInfo.searchRemark} 
                          placeholder="请输入编号" 
                          style={{ width: '85%' }}
                          onChange={this.searchremarkInput.bind(this)} />
                    </div>
                    <Button 
                      type='primary' 
                      icon={<SearchOutlined />}
                      onClick={this.onQuery} >查询</Button>
                </div>
                <div className='createdanwei'>
                    <Button 
                      type='primary' 
                      icon={<PlusCircleOutlined />} 
                      onClick={()=>this.setState({modalAddInfoVisible: true})}
                    >创建单位</Button>
                    <Modal 
                      visible={modalAddInfoVisible} 
                      title={editInfo.id? "编辑单位":"创建单位"} 
                      cancelText="取消" 
                      onCancel={()=>{this.clearAction()}}
                      okText="确定" 
                      onOk={this.handleOk}
                    >
                        <label htmlFor='name'>名称 </label>
                        <Input 
                            placeholder="请输入"
                            value={editInfo.name}
                            onChange={this.nameInput.bind(this)}
                        />
                        <label htmlFor='name'>备注 </label>
                        <TextArea 
                            row={4}
                            value={editInfo.remark}
                            onChange={this.remarkInput.bind(this)}  
                        />    
                    </Modal>
                </div>
                <div className='danweitable'>
                    <Table 
                      columns={columns} 
                      dataSource={data} 
                      pagination={_pagination} 
                      onChange={this.onTableChange}/>
                </div>
            </div>
        );
    }
}
 
export default danwei;