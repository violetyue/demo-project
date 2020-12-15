import React, { Component } from 'react';
import { Input, Button, Table, Space } from 'antd';
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import '../style/style.css'
import 'antd/dist/antd.css';

class gongxu extends Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'sqno',
            }, {
                title: '工序编号',
                dataIndex: 'number',
            }, {
                title: '工序名称',
                dataIndex: 'name',
            }, {
                title: '报工权限',
                dataIndex: 'premission',
            }, {
                title: '报工数配比',
                dataIndex: 'matching',
            }, {
                title: '次品项列表',
                dataIndex: 'cipintable',
            }, {
                title: '工序采集数据',
                dataIndex: 'collectdata',
            }, {
                title: '操作',
                dataIndex: 'delete',
                key: 'delete',
                render: (text,record,index) => (
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
                <div className='searchgongxu'>
                    <div className='searchcode'>
                        <label htmlFor='name'>工序编号 </label>
                        <Input placeholder="请输入工序编号" style={{ width: '75%' }} />
                    </div>
                    <div className='searchname'>
                        <label htmlFor='name'>工序名称 </label>
                        <Input placeholder="请输入工序名称" style={{ width: '75%' }} />
                    </div>
                    <Button type='primary' icon={<SearchOutlined />}>查询</Button>
                </div>
                <div className='creategongxu'>
                    <Button 
                      type='primary' 
                      icon={<PlusCircleOutlined />}
                      onClick={()=>{this.props.history.push("/admin/gongxucreate")}}
                    >创建工序</Button>
                </div>
                <div className='gongxutable'>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        );
    }
}
 
export default gongxu;