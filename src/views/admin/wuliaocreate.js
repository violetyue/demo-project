import React, { Component } from 'react';
import { Input, Button, Select, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import '../style/style.css'
import {
    getMaterialList, 
    insertMateriel, 
    updateMateriel, 
    deleteMateriel, 
    getMaterialInfo,
    getUnitList
} from '../../api/index'

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
                unitId: 0,
                customFieldValues: [],
                createdAt: '',
                creatorName: '',
                updatedAt: '',
            },
            createOrEdit: 'create',
            selectUnit: []
        }    
    }

    componentDidMount(param) {
        const code = this.props.match.params.code
        console.log(code)
        if (code) {
            this.getData(code)
            this.setState({createOrEdit: 'edit'})
        }
        getUnitList(param).then(res=>{
            const {data} = res
            this.setState({selectUnit:data})
            console.log('unit', this.state.selectUnit)
        })
    }

    getData = (code) => {
        getMaterialInfo({code}).then(res=>{
            const {data} = res
            this.setState({
                editInfo: data
            })
            console.log(this.state.editInfo)
            console.log(this.state.editInfo.unit)
        })
        
    }

    handleOk = e => {
        const { editInfo, createOrEdit } = this.state
        console.log(editInfo)
        if (!editInfo.name) {
          alert("名称不能为空")
          return
        }
        if (!editInfo.code) {
            alert("编号不能为空")
            return
        }
        if (createOrEdit === 'edit') {
            
            this.editMaterial()
        } else {
            this.createMaterial()
        }  
        this.props.history.push("/admin/wuliao")
    }

    editMaterial() {
        
        const data={}
        data.id=this.state.editInfo.id
        data.unit=this.state.editInfo.unit
        data.code=this.state.editInfo.code
        data.name=this.state.editInfo.name
        data.unitId=this.state.editInfo.unitId
        data.specification=this.state.editInfo.specification
        data.customFieldValues=this.state.customFieldValues
        updateMateriel(data).then(res=>{
            const { data } = res
            console.log('edit', data)
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
            console.log('create', data)
        })
    }

    handleSelect = (value) =>{
        console.log(value)
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, unitId: value}
        })
        console.log('selectunit', this.state.editInfo.unitId)
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
        const { editInfo, createOrEdit, selectUnit } = this.state

        return (
            <div className='createwuliaopage'>
                <div className='createwuliaotitle'>
                    <span>{createOrEdit === 'create' ? '创建' : '编辑'}物料</span>
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
                              placeholder="请选择"
                              onChange={this.handleSelect}
                            >
                                {selectUnit.map(item=>{
                                    return (<Option key={item.key} value={item.id}>
                                        {item.name}
                                    </Option>)
                                })}
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