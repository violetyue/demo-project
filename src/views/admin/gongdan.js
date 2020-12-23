import React, { Component } from 'react';
import { Table, Space } from 'antd';
import '../style/style.css'
import 'antd/dist/antd.css';
import { getWorkOrderList } from '../../api/index'

class gongdan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: '序号',
                dataIndex: 'sqno',
                key: 'id',
                render: (txt,record,index)=>index + 1
            }, {
                title: '工单编号',
                dataIndex: 'projectCode',
            }, {
                title: '产品编号',
                dataIndex: 'materialCode',
            }, {
                title: '产品名称',
                dataIndex: 'matericalName',
            }, {
                title: '单位',
                dataIndex: 'materialUnit',
            }, {
                title: '状态',
                dataIndex: 'status',
            }, {
                title: '计划开始时间',
                dataIndex: 'startTimePlanned',
            }, {
                title: '计划结束时间',
                dataIndex: 'endTimePlanned',
            }, {
                title: '计划数',
                dataIndex: 'amountPlanned',
            }, {
                title: '实际数',
                dataIndex: 'amountReal',
            },{
                title: '良品数',
                dataIndex: 'productAmount',
            }, {
                title: '不良品数',
                dataIndex: 'defectAmount',
            }, {
                title: '创建人',
                dataIndex: 'creatorNickname',
            }, {
                title: '修改人',
                dataIndex: 'modifierNickname',
            }, {
                title: '实际开始时间',
                dataIndex: 'startTimeReal',
            }, {
                title: '实际结束时间',
                dataIndex: 'endTimeReal',
            }, {
                title: '备注',
                dataIndex: 'remark',
            },{
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                fixed: 'right',
                width: 100,
                render: (text,record,index) => 
                (
                  <Space key={index}>
                    <a data-index={index}>开始</a>  
                    <a data-index={index}>撤回</a> 
                    <a data-index={index}>结束</a> 
                    <a data-index={index}>打印</a> 
                    <a data-index={index}>取消</a> 
                  </Space>
                )
            }],
            data: [
                
            ],
            
            page: {
                size: 10,
                page: 1,
            },
            total: 0,
            
        }
    }

    componentDidMount() {
        this.setData()
    }

    setData = (newPages={}) => {
        const {page,size} = newPages
        
        const param = {
            
            page: {
                page: page || this.state.page.page,
                size: size || this.state.page.size
            }
        }
        getWorkOrderList(param). then(res=>
          {
              console.log('project', res)
              const { data, project, page, size, count } = res
              this.setState({data, page:{page, size}, total: count}, ()=>
              {
                console.log(this.state.page)
              })
              
          })
    }

    render() { 
        const { data, columns, info, page, total } = this.state
        const _pagination = { current: page.page, size: page.size, total}
        console.log(page, _pagination)

        return (
            <div>
                <div className='projecttable'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={_pagination}
                        scroll={{ x: 1300 }}
                    />
                </div>
            </div>
        );
    }
}
 
export default gongdan;