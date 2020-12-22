import React, { Component } from 'react';
import { Input, Button, Select, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import '../style/style.css'
import {getMaterialList, insertMateriel, updateMateriel, deleteMateriel} from '../../api/index'

const { Option } = Select

class wuliaocreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            editInfo: {
                code: '',
                name: '',
                specification: '',
                unitId: 147,
                createdAt: '',
                creatorName: '',
                updatedAt: '',
            }

        }    
    }



    handleOk = e => {
        const { editInfo } = this.state
        console.log(editInfo)
        if (!editInfo.name) {
          alert("名称不能为空")
          return
        }
        if (!editInfo.code) {
            alert("编号不能为空")
            return
        }
        this.createMaterial()
        this.props.history.push("/admin/wuliao")
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

    
    createMaterial() {
        const data={}
        data.code=this.state.editInfo.code
        data.name=this.state.editInfo.name
        data.unitId=this.state.editInfo.unitId
        data.specification=this.state.editInfo.specification
        insertMateriel(data).then(res=>{
            const { data } = res
            localStorage.setItem("createInfo", data)
            console.log(data)
        })
    }

    codeInput(e) {
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, code: e.target.value},
        })
    }
    nameInput(e) {
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, name: e.target.value},
        })
    }
    unitInput(e) {
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, unit: e.target.value},
        })
    }
    specInput(e) {
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, specification: e.target.value},
        })
    }

    render() { 
        const { editInfo } = this.state

        return (
            <div className='createwuliaopage'>
                <div className='createwuliaotitle'>
                    <span>创建/编辑物料</span>
                </div>
                <div className='createwuliaoarea'>
                    <div className='createwuliaoinput'>  
                            <label htmlFor='name'>产品编号 </label>
                            <Input 
                              placeholder="请输入"
                              value={editInfo.code}
                              onChange={this.codeInput.bind(this)}
                            />
                            <label htmlFor='name'>产品名称 </label>
                            <Input 
                              placeholder="请输入"
                              value={editInfo.name}
                              onChange={this.nameInput.bind(this)}
                            />
                            <label htmlFor='name'>库存单位 </label>
                            <Select 
                              style={{ width: '100%' }}

                            >
                                <Option value="1">zzz</Option>
                            </Select>
                            <label htmlFor='name'>产品规格 </label>
                            <Input 
                              placeholder="请输入"
                              value={editInfo.specification}
                              onChange={this.specInput.bind(this)}
                            />
                           
                    </div>
                    <div className='createwuliaobutton'>
                        <Button 
                          style={{ width: '40%' }} 
                          onClick={()=>{this.props.history.push("/admin/wuliao")}}
                        >取消</Button>
                        <Button 
                          style={{ width: '40%' }} 
                          type='primary' onClick={this.handleOk}
                        >保存</Button>
                    </div> 
                </div> 
            </div>
        );
    }
}
 
export default wuliaocreate;