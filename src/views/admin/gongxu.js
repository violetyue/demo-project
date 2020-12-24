import React, { Component } from 'react';
import { Input, Button, Table, Space } from 'antd';
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import '../style/style.css'
import 'antd/dist/antd.css';
import { 
    getProcessList,
    addProcess,
    updateProcess,
    deleteProcess,
    getProcessDetail
} from '../../api/index'

class gongxu extends Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'sqno',
                key: 'id',
                render: (txt,record,index)=>index + 1
            }, {
                title: '工序编号',
                dataIndex: 'code',
            }, {
                title: '工序名称',
                dataIndex: 'name',
            }, {
                title: '报工权限',
                dataIndex: 'operators',
                render:(text,record,index)=>{
                    const {operators} = record
                    const names = operators.map(item=>item.nickname).join(",")
                    return (
                        <span>{names}</span>
                    )
                }
            }, {
                title: '报工数配比',
                dataIndex: 'productRate',
            }, {
                title: '次品项列表',
                dataIndex: 'defects',
                render:(text,record,index)=>{
                    const {defects} = record
                    const names = defects.map(item=>item.name).join(",")
                    return (
                        <span>{names}</span>
                    )
                }
            }, {
                title: '工序采集数据',
                dataIndex: 'fields',
                render:(text,record,index)=>{
                    const {fields} = record
                    const names = fields.map(item=>item.field).join(",")
                    return (
                        <span>{names}</span>
                    )
                }
            }, {
                title: '操作',
                dataIndex: 'delete',
                key: 'delete',
                render: (text,record,index) => (
                  <Space key={index}>
                    <a
                       data-index={index}
                       onClick={()=>{this.handleEdit(record)}}
                    >编辑</a>  
                    <a 
                        data-index={index} 
                        onClick={()=>{this.handleDelete(record)}}
                    >删除</a>
                  </Space>
                  )
            }],
            data: [
                
            ],
            page: {
                size: 10,
                page: 1,
            },
            searchInfo: {
                searchKey: '',
                searchCode: '',
                searchName: '',
            },
        }
    }

    componentDidMount() {
        this.setData()
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
        getProcessList(param). then(res=>
          {
              const { data, page, size, count } = res
              this.setState({data, page:{page, size}, total: count}, ()=>
              {
                console.log(this.state.page)
              })
              localStorage.setItem('processListInfo', data)
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
        })
    }

    handleDelete = (record) => {
        const id = record.id
        deleteProcess(id).then(res=>{
            this.clearAction()
            this.setData()
        })
    }

    handleEdit = (record) => {
        console.log(record)
        this.props.history.push(`/admin/gongxucreate/${record.code}`)
    }

    searchnameInput(e) {
        const { searchInfo } = this.state
        this.setState({
              searchInfo: {...searchInfo, searchName: e.target.value}
        })
    }
    searchcodeInput(e) {
        const { searchInfo } = this.state
        this.setState({
              searchInfo: {...searchInfo, searchCode: e.target.value}
        })
    }
    

    render() {
        const { data, columns, info, editInfo, searchInfo, modalAddInfoVisible, page, total } = this.state
        const _pagination = { current: page.page, size: page.size, total}
        console.log(page, _pagination)

        return (
            <div>
                <div className='searchgongxu'>
                    <div className='searchcode'>
                        <label htmlFor='name'>工序编号 </label>
                        <Input 
                          value={searchInfo.searchCode}
                          placeholder="请输入工序编号" 
                          style={{ width: '75%' }}
                          onChange={this.searchcodeInput.bind(this)} />
                    </div>
                    <div className='searchname'>
                        <label htmlFor='name'>工序名称 </label>
                        <Input 
                          value={searchInfo.searchName}
                          placeholder="请输入工序名称" 
                          style={{ width: '75%' }}
                          onChange={this.searchnameInput.bind(this)} />
                    </div>
                    <Button 
                      type='primary' 
                      icon={<SearchOutlined />}
                      onClick={this.onQuery}
                    >查询</Button>
                </div>
                <div className='creategongxu'>
                    <Button 
                      type='primary' 
                      icon={<PlusCircleOutlined />}
                      onClick={()=>{this.props.history.push("/admin/gongxucreate")}}
                    >创建工序</Button>
                </div>
                <div className='gongxutable'>
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
 
export default gongxu;