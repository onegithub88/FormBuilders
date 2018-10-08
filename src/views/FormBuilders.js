import React, { Component } from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select, Checkbox,
  Modal, Icon, Avatar, Table, Button, Radio, Row, Col, Card
} from 'antd';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { Option, OptGroup } = Select;
const FormItem = Form.Item;
import {connect} from 'react-redux';
import frFR from 'antd/lib/locale-provider/fr_FR';
import './../assets/common/css/layoutIsat.css';
import moment from 'moment';
import 'moment/locale/fr';
const { Header, Footer, Sider, Content } = Layout;
import {dispatchAction} from './../actions';
import {Const} from './../const/Const';
import CommonComponent from './CommonComponent';

var ALLOWED_DROP_EFFECT = false;
var ALLOWED_DROP        = "move";
var NO_HOVER            = null;
class FormBuilders extends React.Component{
  state = {
    typeInput:'textinput',
    title:'',
    value:'',
    required:1,
    requiredOption:1,
    requiredOption:['required','readonly'],
    visibleModalAddInput:false,
    visibleModalEditInput:false,
    minHeight:window.innerHeight,
    boxColor:'#fff',
    selected:0,
    indexHover:null,
    tempDataComponent:[
      {title:"Text Input", type:'textInput',placeholder:'Masukkan title',required:1,color:'#ededed'}
    ],
    visibleModalAction:false,
    activeIndex:0,
    activeAction:'',
    value:1,
    idModule:0,
    idForm:0
  };

  tempDataT7an =[];

  componentWillMount =() => {
    var idModule = this.props.match.params.idModule;
    var idForm   = this.props.match.params.idForm;
    this.setState({idModule,idForm})
  }

  tempdataDrag=[]
  dragStatus=false

  onDragOver = (e) => {
    if(this.tempdataDrag.length > 0 && this.dragStatus==true){
      var dataComponent = this.props.dataComponent;
      this.props.dispatch(dispatchAction(this.tempdataDrag[0],Const.ADD_COMPONENT))
      this.tempdataDrag = [];
      this.dragStatus   = false;
    }
  }

  handleSetTypeInput = (typeInput) => {
    this.setState({
      typeInput:typeInput,
      title:'',
      value:'',
      requiredOption:1,
      requiredOption:['required','readonly']
    });
  }

  handleChangeRequiredOption = (name,value)=> {
    this.setState({[name]:value})
  }

  handleSaveTextInput = () => {
    var tempdataDrag = [];
    if (this.state.typeInput!='') {
      this.props.dispatch(dispatchAction({idModule:this.state.idModule,idForm:this.state.idForm,title:this.state.typeInput, type:this.state.typeInput,placeholder:'',required:1},Const.ADD_COMPONENT))
      tempdataDrag = [];
      this.handleShowModalAddTextInput(false);
    }
  }

  handleChangeSelectTypeInput = (text) => {
  }

  handleEditTextInput = () =>{
    this.handleShowModalEditTextInput(false);

  }

  renderModalEditTextInput = () =>{
    var ModalEditTextInput =[];
    ModalEditTextInput = (
      <Modal
        title={`Edit Text!`}
        visible={this.state.visibleModalEditInput}
        okText={'Ok'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditTextInput()}
        onCancel={()=>this.handleShowModalEditTextInput(false)}
        >
        <Col>
          <Row>
            <Col>
              <Row style={{marginBottom: 8}}>
                <span style={{fontSize: 15, fontWeight: '500', color:'#666'}}>Set Title</span>
              </Row>
              <Row style={{marginBottom: 15}}>
                <Input
                  placeholder="value title"
                  value={this.state.title}
                  onChange={(e)=>this.handleOnChangeInputDetails("title",e.target.value)}
                  />
              </Row>
              <Row style={{marginBottom: 8}}>
                <span style={{fontSize: 15, fontWeight: '500', color:'#666'}}>Set Placeholder</span>
              </Row>
              <Row style={{marginBottom: 15}}>
                <Input
                  placeholder="value placeholder"
                  value={this.state.title}
                  onChange={(e)=>this.handleOnChangeInputDetails("placeholder",e.target.value)}
                  />
              </Row>
              <Row style={{marginBottom: 15}}>
                <Col>
                  <CheckboxGroup options={this.state.requiredOption} defaultValue={['required']} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text.target.value)} />
                </Col>
              </Row>
              <Row style={{marginBottom: 8}}>
                <span style={{fontSize: 15, fontWeight: '500', color:'#666'}}>Change Type</span>
              </Row>
              <Row style={{marginBottom: 8}}>
                It will erase the current value
              </Row>
              <Row style={{marginBottom: 10}}>
                <Select
                 style={{ width: 200 }}
                 placeholder="Text"
                 optionFilterProp="children"
                 onChange={()=>this.handleChangeSelectTypeInput()}
                 filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
               >
                 <Option value="jack">Text</Option>
                 <Option value="lucy">Number</Option>
                 <Option value="tom">Email</Option>
               </Select>
              </Row>
            </Col>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalEditTextInput;
  }

  renderModalAddTextInput = () =>{
    var ModalAddTextInput =[];
    ModalAddTextInput = (
      <Modal
        title={`Add Text`}
        visible={this.state.visibleModalAddInput}
        okText={'Ok'}
        cancelText={'Cancel'}
        onOk={()=>this.handleSaveTextInput()}
        onCancel={()=>this.handleShowModalAddTextInput(false)}
        >
        <Col>
          <Row>
            <Col>
              <Row style={{marginBottom: 8}}>
                <span style={{fontSize: 15, fontWeight: '500', color:'#666'}}>Please select your type input</span>
              </Row>
              <Row span={24} style={{marginBottom: 10}}>
                <Select
                 style={{ width: 200 }}
                 placeholder="Text"
                 optionFilterProp="children"
                 onChange={()=>this.handleChangeSelectTypeInput()}
                 filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
               >
                 <Option value="jack">Text</Option>
                 <Option value="lucy">Number</Option>
                 <Option value="tom">Email</Option>
               </Select>
              </Row>
            </Col>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalAddTextInput;
  }

  handleShowModalAddTextInput = (visible)=> {
    this.setState({visibleModalAddInput:visible});
  }

  handleShowModalEditTextInput = (visible)=> {
    this.setState({visibleModalEditInput:visible});
  }
  handleOnDragStart = (e,title,componentType) => {
    if (componentType=='textinput'){
        this.handleShowModalAddTextInput(true);
    }else {
      this.tempdataDrag.splice(0,1,{idModule:this.state.idModule,idForm:this.state.idForm,title:title, type:componentType,placeholder:'',required:1});
      this.dragStatus=true;
    }
  }

  handleAction = (actionType,index) => {
    var {dataComponent} =this.props;
    if(actionType=='delete'){
      dataComponent.splice(index,1);
      this.props.dispatch(dispatchAction(dataComponent,Const.DELETE_MODULE));
    }else if (actionType=='edit'){
      dataComponent[index]=this.state.tempDataComponent[0];
      this.props.dispatch(dispatchAction(dataComponent,Const.DELETE_MODULE));
    }
    this.handleShowModalAction(false,index);
  }

  handleCancelModal = (visible) => {
    this.setState({visibleModalAction:visible})
  }

  handleShowModalAction = (visible,index,action) => {
    var {tempDataComponent} = this.state;
    if (
      action=="edit" && (
        this.state.typeInput=="textinput" ||
        this.state.typeInput=="number" ||
        this.state.typeInput=="email"
      )
    ){
      tempDataComponent[0]    = this.props.dataComponent[index];
      this.setState({tempDataComponent,visibleModalEditInput:visible,activeIndex:index,activeAction:action})
    }else {
      tempDataComponent[0]    = this.props.dataComponent[index];
      this.setState({tempDataComponent,visibleModalAction:visible,activeIndex:index,activeAction:action})
    }
  }

  handleRadioChange = (e) => {
    var value = e.target.value ? e.target.value : 1;
    this.setState({value});
  }

  handleOnChangeInputDetails = (name,value) => {
    var {tempDataComponent} = this.state;
    tempDataComponent[0][name] = value;
    this.setState({tempDataComponent})
  }

  handleModalAction = () => {
    var ModalAction = [];

    if (this.state.tempDataComponent.length > 0) {
      switch (this.state.activeAction) {
        case 'delete':
        ModalAction = (
          <Modal
            title={`Warning!`}
            visible={this.state.visibleModalAction}
            okText={'Ok'}
            cancelText={'Cancel'}
            onOk={()=>this.handleAction(this.state.activeAction,this.state.activeIndex)}
            onCancel={()=>this.handleCancelModal(false)}
            >
            <Col>
              <Row>
                Apakah anda yakin ingin men{this.state.activeAction} Component ini ??
              </Row>
            </Col>
          </Modal>
        )
        break;
        case 'edit' :
        ModalAction = (
          <Modal
            title={`Edit!`}
            visible={this.state.visibleModalAction}
            okText={'Ok'}
            cancelText={'Cancel'}
            onOk={()=>this.handleAction(this.state.activeAction,this.state.activeIndex)}
            onCancel={()=>this.handleCancelModal(false)}
            >
            <Col>
              <Col style={{marginBottom: 10}}>
                <Row style={{marginBottom: 5, fontSize: 14}}>Title</Row>
                <Row>
                  <Input
                    value={this.state.tempDataComponent[0].title}
                    onChange={(e)=>this.handleOnChangeInputDetails("title",e.target.value)}
                    />
                </Row>
              </Col>
              <Col style={{marginBottom: 10}}>
                <Row style={{marginBottom: 5, fontSize: 14}}>Place Holder</Row>
                <Row>
                  <Input
                    value={this.state.tempDataComponent[0].placeholder}
                    onChange={(e)=>this.handleOnChangeInputDetails("placeholder",e.target.value)}
                    />
                </Row>
              </Col>
              <Col style={{marginBottom: 10}}>
                <Row style={{marginBottom: 5, fontSize: 14}}>Attribut</Row>
                <Row>
                  <RadioGroup onChange={(e)=>this.handleOnChangeInputDetails("required",e.target.value)} defaultValue={1} value={this.state.tempDataComponent[0].required}>
                    <Radio value={1} >Normal</Radio>
                    <Radio value={2}> Required </Radio>
                  </RadioGroup>
                </Row>
              </Col>
            </Col>
          </Modal>
        )
        break;
        default:
        return []
    }
    }
    return ModalAction;
  }

  onMouseOverDetails = () => {
    this.setState({boxColor:'#fefefe'})
  }

  onMouseOutDetails = () => {
    this.setState({boxColor:'#ededed'})
  }

  onDragStartItems = (e) => {
    var selectedIndex   = parseInt(e.currentTarget.dataset.key);
    var {dataComponent} = this.props;
    e.dataTransfer.effectAllowed = ALLOWED_DROP_EFFECT;
    e.dataTransfer.setData("drag_drop_content_type",JSON.stringify(dataComponent[selectedIndex]));
    this.setState({selected:selectedIndex});
  }

  containerAcceptsDropData = (transferTypes) => {
    return Array.prototype.indexOf.call(transferTypes, "drag_drop_content_type") !== -1;
  }

  onDragOverDetais = (e) => {
    if(this.containerAcceptsDropData(e.dataTransfer.types)) {
      e.preventDefault();
    }
    var over = parseInt(e.currentTarget.dataset.key);
    if(over !== this.state.indexHover) {
      this.setState({ indexHover: over });
    }
  }

  onDragEndItems = () =>{

  }

  renderDragDetails = () => {
    var DragDetails = [];
    DragDetails = this.props.dataComponent.map((items, i)=>{
      if (items.idModule==this.state.idModule && items.idForm==this.state.idForm) {
        return (
          <Row
            data-key={i}
            onDragStart ={(e)=>this.onDragStartItems(e)}
            onDragOver  ={(e)=>this.onDragOverDetais(e)}
            draggable   ={true}
            style={{cursor:'move',backgroundColor:'#ededed',paddingLeft: 15,paddingTop: 10,paddingBottom: 5,marginBottom: 15}}
            key={i} type='flex' justify='left' align='middle'>
            <CommonComponent
              key={i}
              title={items.title}
              value={items.value}
              placeholder={items.placeholder}
              type={items.type}
              span={15}
            />
          <Col span={9}>
              <Row style={{padding:'5px 10px 10px 10px'}}>
                <Col span={12}>
                  <Button onClick={()=>this.handleShowModalAction(true,i, "edit")} style={{marginRight: 20}} icon={'edit'}>Edit</Button>
                </Col>
                <Col span={12}>
                  <Button onClick={()=>this.handleShowModalAction(true, i, "delete")} icon={'delete'}>Delete</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )
      }
    });
    return DragDetails;
  }

  onDrop = (e) => {
    var data   = JSON.parse(e.dataTransfer.getData("drag_drop_content_type"));
    var dataComponent =this.props.dataComponent;
    this.tempDataT7an = dataComponent[this.state.indexHover];
    if(this.state.indexHover !== this.state.selected) {
      dataComponent[this.state.indexHover] = data;
      dataComponent[this.state.selected]  = this.tempDataT7an;
      this.props.dispatch(dispatchAction(dataComponent,Const.MOVE_COMPONENT))
    }
  }

  render() {
    return (
      <Row>
      {this.handleModalAction()}
      {this.renderModalEditTextInput()}
      {this.renderModalAddTextInput()}
        <Layout>
          <Header style={{backgroundColor: '#020292'}}>
            <Row type='flex' justify='center'>
              <span style={{color:'#fff'}}></span>
            </Row>
          </Header>
            <Layout>
            <Col span={18} offset={3}>
              <Row style={{backgroundColor: '#ededed',
              }}>
                <Col span={16}>
                  <Row span ={12} style={{backgroundColor: '#ededed',
                    backgroundColor:'#dedede',minHeight: this.state.minHeight-172, margin:'10px',padding:'10px 10px 20px 10px',
                    }}
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e)}
                  >
                    {this.props.dataComponent.length> 0 ?
                        this.renderDragDetails()
                        :
                        []
                    }
                  </Row>
                </Col>
                <Col span={8} style={{paddingTop: 10}}>
                  <Row type='flex' justify='center'
                  style={{padding:'10px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Text Input","textinput")}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40}} type={'dashed'}>
                      <span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Text Input</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='center'
                  style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Text Area","textarea")}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40}} type={'dashed'}>
                      <span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Text Area</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='center'
                  style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Label","label")}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40}} type={'dashed'}>
                      <span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Label</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='center'
                  style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Drop Down","dropdown")}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40}} type={'dashed'}>
                      <span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >DropDown</span>
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Layout>
          <Footer style={{backgroundColor: '#020292',height: '120px'}}>
            <Row type='flex' justify='center'>
              <span style={{color:'#fff'}}></span>
            </Row>
          </Footer>
        </Layout>
      </Row>
    );
	}
}
module.exports = connect(state => ({dataModule:state.Modules.dataModule,dataForm:state.Forms.dataForm,dataComponent:state.FormBuilders.dataComponent}), dispatch=>({dispatch:dispatch}))(FormBuilders);
