import React, { Component } from 'react';
import { Input, Button, Table, Space } from 'antd';
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import '../style/style.css'
import 'antd/dist/antd.css';
import {getMaterialList, insertMateriel, updateMateriel, deleteMateriel} from '../../api/index'

class wuliao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'sqno',
                key: 'id',
                render: (txt,record,index)=>index + 1
            }, {
                title: '编号',
                dataIndex: 'code',
            }, {
                title: '名称',
                dataIndex: 'name',
            }, {
                title: '规格',
                dataIndex: 'specification',
            }, {
                title: '单位',
                dataIndex: 'unitId',
            }, {
                title: '创建时间',
                dataIndex: 'createdAt',
            }, {
                title: '创建人',
                dataIndex: 'creatorName',
            }, {
                title: '最后更新时间',
                dataIndex: 'updateAt',
            }, {
                title: '操作',
                dataIndex: 'delete',
                key: 'delete',
                render: (text,record,index) => 
                (
                  <Space key={index}>
                    <a 
                      data-index={index}
                    //   onClick={()=>{this.props.history.push(`/admin/wuliaocreate/${record.code}`)}}
                      onClick={()=>{this.handleEdit(record)}}
                    >编辑</a>  
                    <a 
                      data-index={index} 
                      onClick={()=>{this.handleDelete(record)}}
                    >删除</a>
                  </Space>
                )
            }],
            data: [],
            page: {
                size: 10,
                page: 1,
            },
            total: 0,
            info: {
                code: '',
                name: '',
                specification: '',
                unitId: 147,
                createdAt: '',
                creatorName: '',
                updatedAt: '',
            },
            searchInfo: {
                materialCode: '',
                materialName: '',
                materialSpecification: '',
            }
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
                page: page || this.state.page.page,
                size: size || this.state.page.size
  
        }
        getMaterialList(param). then(res=>
          {
              const { data, page, size, count } = res
              this.setState({data, page:{page, size}, total: count}, ()=>
              {
                console.log(this.state.page)
              })
              localStorage.setItem('materialInfo', data)
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

    handleEdit = (record) => {
        // localStorage.setItem('editMaterialItem', record)
        console.log(record)
        // const code = record.code
        this.props.history.push(`/admin/wuliaocreate/${record.code}`)
        console.log(record.code)
    }

    handleDelete = (record) => {
        const id = record.id
        deleteMateriel(id).then(res=>{
            this.clearAction()
            this.setData()
        })
    }


    searchnameInput(e) {
        const { searchInfo } = this.state
        this.setState({
              searchInfo: {...searchInfo, materialName: e.target.value}
        })
    }
    searchcodeInput(e) {
        const { searchInfo } = this.state
        this.setState({
              searchInfo: {...searchInfo, materialCode: e.target.value}
        })
    }
    searchspecInput(e) {
        const { searchInfo } = this.state
        this.setState({
              searchInfo: {...searchInfo, materialSpecification: e.target.value}
        })
    }
    
    render() { 
        const { data, columns, info, editInfo, searchInfo, page, total } = this.state
        const _pagination = { current: page.page, size: page.size, total}
        console.log(page, _pagination)

        return (
            <div>
                <div className='searchwuliao'>
                    <div className='searchcode'>
                        <label htmlFor='name'>编号 </label>
                        <Input 
                          value={searchInfo.materialCode}
                          placeholder="请输入编号" 
                          style={{ width: '85%' }}
                          onChange={this.searchcodeInput.bind(this)} />
                    </div>
                    <div className='searchname'>
                        <label htmlFor='name'>名称 </label>
                        <Input 
                          value={searchInfo.materialName}
                          placeholder="请输入名称" 
                          style={{ width: '85%' }}
                          onChange={this.searchnameInput.bind(this)} />
                    </div>
                    <div className='searchmodel'>
                        <label htmlFor='name'>规格 </label>
                        <Input 
                          value={searchInfo.materialSpecification}
                          placeholder="请输入规格" 
                          style={{ width: '85%' }}
                          onChange={this.searchspecInput.bind(this)} />
                    </div>
                    <Button 
                      type='primary' 
                      icon={<SearchOutlined />}
                      onClick={this.onQuery}
                    >查询</Button>
                </div>
                <div className='createwuliao'>
                    <Button 
                      type='primary' 
                      icon={<PlusCircleOutlined />}
                      onClick={()=>{this.props.history.push("/admin/wuliaocreate")}}
                      
                    >创建物料</Button>
                </div>
                <div className='wuliaotable'>
                    <Table 
                      columns={columns} 
                      dataSource={data}
                      pagination={_pagination}
                      onChange={this.onTableChange} />
                </div>
            </div>
        );
    }
}
 
export default wuliao;