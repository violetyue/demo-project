import React, { Component } from 'react';
import { Input, Button, Select, Form } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import '../style/style.css'
import { 
  getProcessList,
  addProcess,
  updateProcess,
  deleteProcess,
  getProcessDetail,
  getUsersList,
  getinferiorQuality
} from '../../api/index'

const { Option } = Select

class gongxucreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            editInfo: {
                code: '',
                name: '',
                productRate: 0,
                fields: [],
                customFieldValues: [],
                operators: [],
                defects: []
            },
            createOrEdit: 'create',
            selectList: [],
            selectDefects: []
        }    
    }
    
    componentDidMount(param) {
      const code = this.props.match.params.code
      console.log(code)
      if (code) {
          this.getData(code)
          this.setState({createOrEdit: 'edit'})
      }
      getUsersList(param).then(res=>{
          const {data} = res
          this.setState({selectList:data})
          console.log(this.state.selectList)
      })
      getinferiorQuality(param).then(res=>{
          const {data} = res
          this.setState({selectDefects:data})
          console.log('defects', this.state.selectDefects)
      })

    }

    getData = (code) => {
      console.log('code', code)
      getProcessDetail(code).then(res=>{
          
          this.setState({
              editInfo: res
          })
          console.log(this.state.editInfo)
          
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
        if (!editInfo.productRate) {
            alert("报工数配比不能为空")
            return
        }
        if (createOrEdit === 'edit') {
            
            this.editMaterial()
        } else {
            this.createMaterial()
        }  
        this.props.history.push("/admin/gongxu")
    }

    createMaterial() {
        const data={}
        data.code=this.state.editInfo.code
        data.name=this.state.editInfo.name
        data.productRate=this.state.editInfo.productRate
        data.fields=this.state.fields
        data.customFieldValues=this.state.customFieldValues
        data.operators=this.state.editInfo.operators
        data.defects=this.state.editInfo.defects
        addProcess(data).then(res=>{
            const { data } = res
            console.log('create', data)
        })
    }

    editMaterial() {
        const data={}
        data.id=this.state.editInfo.id
        data.code=this.state.editInfo.code
        data.name=this.state.editInfo.name
        data.productRate=this.state.editInfo.productRate
        data.fields=this.state.fields
        data.customFieldValues=this.state.customFieldValues
        data.operators=this.state.editInfo.operators
        data.defects=this.state.editInfo.defects
        updateProcess(data).then(res=>{
            const { data } = res
            console.log('update', data)
        })
    }

    handleChange = (value) => {
        console.log(value)
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, operators: value}
        })
        console.log('selectoperators', this.state.editInfo.operators)
    }

    handleSelect = (value) => {
        console.log(value)
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, defects: value}
        })
        console.log('selectdefects', this.state.editInfo.defects)
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
    rateInput(e) {
        const { editInfo } = this.state
        this.setState({
            editInfo: {...editInfo, productRate: e.target.value},
        })
    }

    render() {
        const { editInfo, createOrEdit, selectList, selectDefects } = this.state

        return (
            <div className='creategongxupage'>
                <div className='creategongxutitle'>
                    <span>{createOrEdit === 'create' ? '创建' : '编辑'}工序</span>
                </div>
                <div className='creategongxuarea'>
                    <div className='creategongxuinput'>  
                            <label htmlFor='name'>工序编号 </label>
                            <Input 
                              value={editInfo.code}
                              placeholder="请填写"
                              onChange={this.codeInput.bind(this)}
                            />
                            <label htmlFor='name'>工序名称 </label>
                            <Input 
                              value={editInfo.name}
                              placeholder="请填写"
                              onChange={this.nameInput.bind(this)}
                            />
                            <label htmlFor='name'>报工权限 </label>
                            <Select
                              mode="multiple"
                              allowClear
                              placeholder="请选择"
                              style={{ width: '100%' }}
                              onChange={this.handleChange}>
                                {selectList.map(item=>{
                                    return (<Option key={item.id} value={item.id}>
                                        {item.nickname}
                                    </Option>)
                                })}
                            </Select>
                            <label htmlFor='name'>报工数配比 </label>
                            <Input 
                              value={editInfo.productRate}
                              placeholder="请填写"
                              onChange={this.rateInput.bind(this)}
                            />
                            <label htmlFor='name'>次品项列表 </label>
                            <Select
                              mode="multiple"
                              allowClear
                              placeholder="请选择"
                              style={{ width: '100%' }}
                              onChange={this.handleSelect}>
                                {selectDefects.map(item=>{
                                    return (<Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>)
                                })}
                            </Select>
                            
                    </div>
                    <div className='createwuliaobutton'>
                        <Button 
                          style={{ width: '40%' }} 
                          onClick={()=>{this.props.history.push("/admin/gongxu")}}
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
 
export default gongxucreate;