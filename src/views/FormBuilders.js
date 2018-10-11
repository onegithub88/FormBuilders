import React, { Component } from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select, Checkbox,
  Modal, Icon, Avatar, Table, Button, Radio, Row, Col, Card
} from 'antd';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { Option, OptGroup } = Select;
const {TextArea} = Input;
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
    visibleModalAddButton:false,
    visibleModalRadioButton:false,
    visibleModalDateTime:false,
    minHeight:window.innerHeight,
    boxColor:'#fff',
    selected:0,
    indexHover:null,
    tempDataComponent:[
      {
       title:"Text Input",
       format:'text',
       type:'textinput',
       placeholder:'Enter value',
       required:1,
       color:'#ededed',
       requiredOption:[],
       selectOption:['text','number','email']
      }
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
    var {tempDataComponent}=this.state;
    tempDataComponent[0][name]=value;
    this.setState({tempDataComponent})
  }

  handleSaveTextInput = () => {
    var {tempDataComponent} = this.state;
    if (this.state.typeInput!='') {
      var title='';
      title = tempDataComponent[0].format!= '' ? `${tempDataComponent[0].title} ${tempDataComponent[0].format}` : tempDataComponent[0].title;
      this.props.dispatch(dispatchAction({
        idModule:this.state.idModule,
        idForm:this.state.idForm,
        title:title,
        type:this.state.typeInput,
        placeholder:tempDataComponent[0].placeholder,
        required:1,
        format:tempDataComponent[0].format,
        requiredOption:tempDataComponent[0].requiredOption,
        selectOption:['text','number','email']
      },Const.ADD_COMPONENT))
      this.handleShowModalAddTextInput(false);
    }
  }

  handleChangeSelectTypeInput = (name,value) => {
    var {tempDataComponent} = this.state;
    tempDataComponent[0][name]          = value;
    tempDataComponent[0]['title']       = '';
    tempDataComponent[0]['placeholder'] = '';
    this.setState({tempDataComponent});
  }

  handleEditTextInput = () =>{
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    var title = '';
    dataComponent[this.state.activeIndex] =  tempDataComponent[0];
    if (dataComponent[this.state.activeIndex].type=='textinput' &&  dataComponent[this.state.activeIndex].format != '') {
      title = dataComponent[this.state.activeIndex].title;
      dataComponent[this.state.activeIndex].title = title;
      
    }

    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalEditTextInput(false);

  }

  renderSelectOption = () => {
    var SelectOption = [];
    SelectOption =this.state.tempDataComponent[0].selectOption.map((obj,i)=>{
      return (
        <Option key={i} value={obj}>{obj}</Option>
      )
    })
    return SelectOption;
  }

  renderModalEditTextInput = () =>{
    var ModalEditTextInput =[];
    if (this.state.tempDataComponent[0]!=undefined && this.state.tempDataComponent.length > 0) {
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
                  <span style={{fontSize: 15, fontWeight: '500', color:'#666'}}>Set value</span>
                </Row>
                <Row style={{marginBottom: 15}}>
                  <Input
                    placeholder="value title"
                    value={this.state.title}
                    value={this.state.tempDataComponent[0].title}
                    onChange={(e)=>this.handleOnChangeInputDetails("title",e.target.value)}
                    />
                </Row>
                <Row style={{marginBottom: 8}}>
                  <span style={{fontSize: 15, fontWeight: '500', color:'#666'}}>Set Placeholder</span>
                </Row>
                <Row style={{marginBottom: 15}}>
                  <Input
                    placeholder="value placeholder"
                    value={this.state.tempDataComponent[0].placeholder}
                    onChange={(e)=>this.handleOnChangeInputDetails("placeholder",e.target.value)}
                    />
                </Row>
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} defaultValue={this.state.tempDataComponent.requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
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
                   defaultValue={"text"}
                   value ={this.state.tempDataComponent[0].format}
                   optionFilterProp="children"
                   onChange={(e)=>this.handleChangeSelectTypeInput("format",e)}
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >
                  {this.state.tempDataComponent.length > 0 ? this.state.tempDataComponent[0].selectOption.length > 0 ? 
                  this.renderSelectOption()
                  :[]
                  :[]
                  }
                 </Select>
                </Row>
              </Col>
            </Row>
          </Col>
        </Modal>
      );
    }
    
    return  ModalEditTextInput;
  }

  renderModalAddTextInput = () =>{
    var ModalAddTextInput =[];
    ModalAddTextInput = (
      <Modal
        title={`Add Text`}
        width={350}
        visible={this.state.visibleModalAddInput}
        okText={'Ok'}
        cancelText={'Cancel'}
        onOk={()=>this.handleSaveTextInput()}
        onCancel={()=>this.handleShowModalAddTextInput(false)}
        >
        <Col type={'flex'} align={'center'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 18, fontWeight: '600', color:'#666'}}>Please select your type input</span>
              </Row>
              <Row span={24} style={{marginBottom: 20}}>
                <Select
                 style={{ width: 300 }}
                 placeholder="Text"
                 optionFilterProp="children"
                 onChange={(e)=>this.handleChangeSelectTypeInput("format",e)}
                 filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
               >
                 <Option value="text">Text</Option>
                 <Option value="number">Number</Option>
                 <Option value="email">Email</Option>
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
  handleOnDragStart = (e,title,componentType,format) => {
    var initialdataDrag = {
      idModule:this.state.idModule,
      idForm:this.state.idForm,
      title:title,
      type:componentType,
      placeholder:'',
      required:1,
      format:format,
      requiredOption:[],
      selectOption:['text','number','email']
    }
    this.tempdataDrag.splice(0,1,initialdataDrag);
      switch (componentType) {
        case 'textinput' : 
          this.handleShowModalAddTextInput(true);
          break;
        case 'button' : 
          initialdataDrag.selectOption = ['Red','Blue','Green', 'Grey'];
          initialdataDrag.color = "primary";
          initialdataDrag.value = "Button";
          break;
        case 'radio' : 
          initialdataDrag.requiredOption = ['Required','Display Horizontal'];
          initialdataDrag.value = "Radio";
          break;
        case 'date' : 
          initialdataDrag.value = "Date";
          break;
          default:
          this.dragStatus=true;
      }
    if (componentType=='textinput'){
        this.handleShowModalAddTextInput(true);
    }else {
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
  // metode crud
  handleShowModalAction = (visible,index,action,type,color) => {
   
    var {tempDataComponent} = this.state;
    if (action=="edit") {
      switch (type) {
        case 'button' : 
          tempDataComponent[0]       = this.props.dataComponent[index];
          tempDataComponent[0].color = color;
          this.setState({tempDataComponent,visibleModalAddButton:visible,activeIndex:index,activeAction:action})
          break;
          case 'textinput' || 'number' || 'email' : 
          tempDataComponent[0]    = this.props.dataComponent[index];
          this.setState({tempDataComponent,visibleModalEditInput:visible,activeIndex:index,activeAction:action})
        break;
        case 'radio' : 
          tempDataComponent[0]       = this.props.dataComponent[index];
          tempDataComponent[0].requiredOption = ['Required','Display Horizontal'];
          this.setState({tempDataComponent,visibleModalRadioButton:visible,activeIndex:index,activeAction:action})
          break;
        case 'date' : 
          tempDataComponent[0]       = this.props.dataComponent[index];
          tempDataComponent[0].requiredOption = ['Required','Display Horizontal'];
          this.setState({tempDataComponent,visibleModalRadioButton:visible,activeIndex:index,activeAction:action})
          break;
        default:
          return 0
      }
    } else {
      if (this.props.dataComponent.length> 0){
        tempDataComponent[0]    = this.props.dataComponent[index];
      }else {
        tempDataComponent[0]       = this.state.tempDataComponent[0];
        tempDataComponent[0].title = "TextInput";
      }
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
              handleChangeInputNumber={this.handleChangeInputNumber.bind(this)}
              title={items.title}
              value={items.value}
              color={items.color}
              placeholder={items.placeholder}
              type={items.type}
              span={15}
            />
          <Col span={9}>
              <Row style={{padding:'5px 10px 10px 10px'}}>
                <Col span={12}>
                  <Button onClick={()=>this.handleShowModalAction(true,i, "edit",items.type)} style={{marginRight: 20}} icon={'edit'}>Edit</Button>
                </Col>
                <Col span={12}>
                  <Button onClick={()=>this.handleShowModalAction(true, i, "delete",items.type)} icon={'delete'}>Delete</Button>
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

  handleChangeInputNumber = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }

  //add Button //
  handleShowModalAddButton = (visible) => {
    this.setState({
      visibleModalAddButton:visible
    })
  }

  renderSelectOptionButton = () => {
    var SelectOption = [];
    SelectOption =this.state.tempDataComponent[0].selectOption.map((obj,i)=>{
      return (
        <Option key={i} value={obj}>{obj}</Option>
      )
    })
    return SelectOption;
  }

  handleSelectColorButton = (name,value) => {
    var {tempDataComponent}    = this.state;
    tempDataComponent[0][name] = value;
    this.setState({tempDataComponent});
  }

  handleEditButton = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    dataComponent[this.state.activeIndex] =  tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalAddButton(false);
  }

  renderModalAddButton = () =>{
    var ModalAddButton =[];
    ModalAddButton = (
      <Modal
        title={`Add Button`}
        width={350}
        visible={this.state.visibleModalAddButton}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditButton()}
        onCancel={()=>this.handleShowModalAddButton(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Button Text</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0].value}
                  onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}
                />
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Button Color</Row>
              <Row style={{marginBottom: 10}}>
                <Select
                  style={{ width: 300}}
                  placeholder="Color (Red, Green, Blue, 'Grey')"
                  defaultValue={"Red"}
                  value ={this.state.tempDataComponent[0].color}
                  optionFilterProp="children"
                  onChange={(e)=>this.handleSelectColorButton("color",e)}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                 {this.state.tempDataComponent.length > 0 ? this.state.tempDataComponent[0].selectOption.length > 0 ? 
                  this.renderSelectOptionButton()
                  :[]
                  :[]
                  }
                </Select>
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Input Your Code Here</Row>
              <Row style={{marginBottom: 10}}>
                <TextArea
                  rows={4}
                  defaultValue={this.state.tempDataComponent[0].code}
                  placeholder={""}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalAddButton;
  }

  //add Radio Button
  handleShowModalRadioButton = (visible) => {
    this.setState({
      visibleModalRadioButton:visible
    })
  }

  handleEditRadioButton = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    dataComponent[this.state.activeIndex] =  tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalRadioButton(false);
  }

  renderModalRadioButton = () =>{
    var ModalRadioButton =[];
    ModalRadioButton = (
      <Modal
        title={`Add Radio Button`}
        width={350}
        visible={this.state.visibleModalRadioButton}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditRadioButton()}
        onCancel={()=>this.handleShowModalRadioButton(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0].value}
                  onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalRadioButton;
  }

  //add Date Time
  handleShowModalDateTime = (visible) => {
    this.setState({
      visibleModalDateTime:visible
    })
  }

  handleEditDateTime = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    dataComponent[this.state.activeIndex] =  tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalDateTime(false);
  }

  renderModalDateTime = () =>{
    var ModalDateTime =[];
    ModalDateTime = (
      <Modal
        title={`Add Date`}
        width={350}
        visible={this.state.visibleModalDateTime}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditDateTime()}
        onCancel={()=>this.handleShowModalDateTime(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Date</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0].value}
                  onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalDateTime;
  }

  render() {
    return (
      <Row>
      {this.handleModalAction()}
      {this.renderModalEditTextInput()}
      {this.renderModalAddTextInput()}
      {this.renderModalAddButton()}
      {this.renderModalRadioButton()}
      {this.renderModalDateTime()}
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
                  onDragStart={(e)=>this.handleOnDragStart(e,"Text input","textinput")}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40}} type={'dashed'}>
                      <span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Text Input</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='center'
                  style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Text area","textarea")}
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
                    onDragStart={(e)=>this.handleOnDragStart(e,"Dropdown","dropdown")}
                    draggable
                  >
                    <Button style={{width: '100%',height: 40}} type={'dashed'}>
                      <span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >DropDown</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='center'
                    style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Button","button","primary")}
                    draggable
                  >
                    <Button style={{width: '100%',height: 40}} type={'dashed'}>
                      <span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Button</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='center'
                    style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Radio","radio")}
                    draggable
                  >
                    <Button style={{width: '100%',height: 40}} type={'dashed'}>
                      <span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Radio Buttons</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='center'
                    style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Date","date")}
                    draggable
                  >
                    <Button style={{width: '100%',height: 40}} type={'dashed'}>
                      <span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Date Time</span>
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
