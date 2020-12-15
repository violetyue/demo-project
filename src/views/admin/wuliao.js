import React, { Component } from 'react';
import { Input, Button, Table, Space } from 'antd';
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import '../style/style.css'
import 'antd/dist/antd.css';

class wuliao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'sqno',
            }, {
                title: '编号',
                dataIndex: 'number',
            }, {
                title: '名称',
                dataIndex: 'name',
            }, {
                title: '规格',
                dataIndex: 'specs',
            }, {
                title: '单位',
                dataIndex: 'unit',
            }, {
                title: '创建时间',
                dataIndex: 'createtime',
            }, {
                title: '创建人',
                dataIndex: 'createperson',
            }, {
                title: '最后更新时间',
                dataIndex: 'updatetime',
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
        }
    }
    
    render() { 
        let data = this.state.data
        let columns = this.state.columns

        return (
            <div>
                <div className='searchwuliao'>
                    <div className='searchcode'>
                        <label htmlFor='name'>编号 </label>
                        <Input placeholder="请输入编号" style={{ width: '85%' }} />
                    </div>
                    <div className='searchname'>
                        <label htmlFor='name'>名称 </label>
                        <Input placeholder="请输入名称" style={{ width: '85%' }} />
                    </div>
                    <div className='searchmodel'>
                        <label htmlFor='name'>规格 </label>
                        <Input placeholder="请输入规格" style={{ width: '85%' }} />
                    </div>
                    <Button type='primary' icon={<SearchOutlined />}>查询</Button>
                </div>
                <div className='createwuliao'>
                    <Button 
                      type='primary' 
                      icon={<PlusCircleOutlined />}
                      onClick={()=>{this.props.history.push("/admin/wuliaocreate")}}
                    >创建物料</Button>
                </div>
                <div className='wuliaotable'>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        );
    }
}
 
export default wuliao;