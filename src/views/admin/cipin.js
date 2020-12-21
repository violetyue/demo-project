import React, { Component } from 'react';
import { Input, Button, Table, Modal, Space } from 'antd';
import 'antd/dist/antd.css';
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import '../style/style.css'
import { getinferiorQuality, insertinferiorQuality, compileferiorQuality, deleteinferiorQuality } from '../../api/index'

class cipin extends Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'sqno',
                key: 'id',
                render: (txt,record,index)=>index + 1
            }, {
                title: '次品项编号',
                dataIndex: 'code',
                key: 'code',
            }, {
                title: '次品项名称',
                dataIndex: 'name',
                key: 'name',
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
                    <a 
                      data-index={index} 
                      onClick={()=>{this.handleDelete(record)}}
                    >删除</a>
                  </Space>
                )
            }],
            data: [],
            modalAddInfoVisible: false,
            editInfo: {
                code: '',
                name: '',
            },
            searchInfo: {
                searchCode: '',
                searchName: '',
            },
            page: {
                size: 10,
                page: 1
            },
            total: 0
        }
    }

    componentDidMount() {
        this.setData()
    }

    clearAction() {
        this.setState({
            editInfo: {
                code: '',
                name: '',
            },
            modalAddInfoVisible: false,
        })
    }

    handleOk = e => {
        const { editInfo } = this.state
        if (!editInfo.code) {
            alert('编号不能为空')
            return
        }
        if (!editInfo.name) {
            alert('名称不能为空')
            return
        }
        this.updateQuality(editInfo)
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
        getinferiorQuality(param).then(res=>
            {
                const { data, page, size, count } = res
                this.setState({data, page:{page, size}, total: count})
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
        this.setData({page:1, size:10})
    }

    updateQuality(quality) {
        if (quality.id) {
            compileferiorQuality(quality).then(res=>{
                this.clearAction()
                this.setData()
            }) 
        } else {
            insertinferiorQuality(quality).then(res=>{
                this.clearAction()
                this.setData()
            })
        }
    }
    
    handleDelete = (record) => {
        const id = record.id
        deleteinferiorQuality(id).then(()=>{
            this.clearAction()
            this.setData()
        })
    }

    codeInput(e) {
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, code: e.target.value}
        })
    }
    nameInput(e) {
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, name: e.target.value}
        })
    }
    searchcodeInput(e) {
        const { searchInfo } = this.state
        this.setState({
            searchInfo: {...searchInfo, searchCode: e.target.value}
        })
    }
    searchnameInput(e) {
        const { searchInfo } = this.state
        this.setState({
            searchInfo: {...searchInfo, searchName: e.target.value}
        })
    }

    render() {
        const { data, columns, editInfo, searchInfo, modalAddInfoVisible, page, total } = this.state
        const _pagination = {current: page.page, size: page.size, total}
        console.log(page, _pagination)

        return (
            <div>
                <div className='searchcipin'>
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
                          value={searchInfo.searchCode} 
                          placeholder="请输入编号" 
                          style={{ width: '85%' }}
                          onChange={this.searchcodeInput.bind(this)} />
                    </div>
                    <Button 
                      type='primary' 
                      icon={<SearchOutlined />}
                      onClick={this.onQuery}>查询</Button>
                </div>
                <div className='createcipin'>
                    <Button 
                      type='primary' 
                      icon={<PlusCircleOutlined />} 
                      onClick={()=>this.setState({modalAddInfoVisible: true})}
                    >创建次品项</Button>
                    <Modal 
                      visible={modalAddInfoVisible} 
                      title={editInfo.id? "编辑次品项":"创建次品项"}
                      cancelText="取消" 
                      onCancel={()=>{this.clearAction()}}
                      okText="确定" 
                      onOk={this.handleOk}
                    >
                        <label htmlFor='code'>次品项编号 </label>
                        <Input 
                          placeholder="请输入"
                          value={editInfo.code}
                          onChange={this.codeInput.bind(this)}/>
                        <label htmlFor='name'>次品项名称 </label>     
                        <Input 
                          placeholder="请输入"
                          value={editInfo.name}
                          onChange={this.nameInput.bind(this)}/>
                               
                    </Modal>
                </div>
                <div className='cipintable'>
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
 
export default cipin;