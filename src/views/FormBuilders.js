import React, { Component } from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select, Checkbox, Alert,
  Modal, Icon, Avatar, Table, Button, Radio, Row, Col, Card,Upload, message
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
import CommonPreviewComponent from './CommonPreviewComponent';
import history from './../controllers/History';

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
    visibleModalEditTable:false,
    visibleModalEditInput:false,
    visibleModalTextArea:false,
    visibleModalLabel:false,
    visibleModalDropDown:false,
    visibleModalAddButton:false,
    visibleModalRadioButton:false,
    visibleModalDateTime:false,
    visibleModalAddTable:false,
    visibleModalTabs:false,
    visibleModalEditTabs:false,
    visibleModalChecklist:false,
    visibleModalFileUpload:false,
    visibleModalPreview:false,
    visibleModalPreviewPayload:false,
    dataErrorMessage: [],
    minHeight:window.innerHeight,
    format:'text',
    boxColor:'#fff',
    selected:0,
    indexHover:null,
    tempDataComponent:[
      {
       title:"",
       format:'',
       type:'',
       placeholder:'',
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

 
  // action drag start
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
        case 'textarea' : 
          initialdataDrag.title = "TextArea";
          initialdataDrag.value = "TextArea";
          initialdataDrag.placeholder    = "Placeholder";
          initialdataDrag.requiredOption = [];
          break;
        case 'label' : 
          initialdataDrag.title = "Label";
          initialdataDrag.value = "Label";
          initialdataDrag.placeholder = "Placeholder";
          initialdataDrag.requiredOption = [];
          break;
        case 'dropdown' : 
          initialdataDrag.value       = 'Select Items';
          initialdataDrag.placeholder = 'Select Option';
          initialdataDrag.type        = 'dropdown';
          initialdataDrag.requiredOption = [];
          initialdataDrag.detailsDropDown = [
            {
              title:'Option 1',
              value:'Option 1'
            }
          ];
          break;
        case 'button' : 
          initialdataDrag.selectOption = ['Red','Blue','Green', 'Grey'];
          initialdataDrag.color = "primary";
          initialdataDrag.value = "Button";
          break;
        case 'radio' : 
          initialdataDrag.value       = 'Chose Items';
          initialdataDrag.placeholder = 'Select Option';
          initialdataDrag.requiredOption = [];
          initialdataDrag.detailsRadioButton = [
            {
              title:'Option 1',
              value:'Option 1'
            }
          ];
          break;
          break;
        case 'date' : 
          initialdataDrag.value = "Date";
          initialdataDrag.requiredOption = [];
          break;
        case 'table' : 
          initialdataDrag.value = "Table";
          initialdataDrag.col =1;
          initialdataDrag.row =1;
          initialdataDrag.requiredOption = [];
          this.handleShowModalAddTable(true);
          break;
        case 'tab' : 
          initialdataDrag.value =0;
          this.handleShowModalAddTabs(true);
          break;
        case 'checklist' : 
          initialdataDrag.value = 'List Items';
          initialdataDrag.requiredOption = [];
          initialdataDrag.detailsCheckList = [
            {
              title:'CheckList 1',
              value:'Checklist 1'
            }
          ];
          break;
        case 'file' : 
          initialdataDrag.value = 'File Upload';
          initialdataDrag.requiredOption = [];
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
  handleShowModalAction = (visible,index,action,type,color,format) => {
    var {tempDataComponent} = this.state;
    if (action=="edit") {
      switch (type) {
        case 'textinput': 
          if (format=='text'){
            tempDataComponent[0] = this.props.dataComponent[index];
            this.setState({tempDataComponent,typeInput:'text',visibleModalEditInput:visible,activeIndex:index,activeAction:action})
          } else if (format=='number') {
            tempDataComponent[0] = this.props.dataComponent[index];
            this.setState({tempDataComponent,typeInput:'number',visibleModalEditInput:visible,activeIndex:index,activeAction:action})
          } else if (format=='email') {
            tempDataComponent[0] = this.props.dataComponent[index];
            this.setState({tempDataComponent,typeInput:'email',visibleModalEditInput:visible,activeIndex:index,activeAction:action})
          }
          break;
        case 'textarea' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'textarea', visibleModalTextArea:visible,activeIndex:index,activeAction:action})
          break;
        case 'label' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'label', visibleModalLabel:visible,activeIndex:index,activeAction:action})
          break;
        case 'dropdown' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'dropdown',visibleModalDropDown:visible,activeIndex:index,activeAction:action})
        break;
        case 'button' : 
          tempDataComponent[0]       = this.props.dataComponent[index];
          tempDataComponent[0].color = color;
          this.setState({tempDataComponent,typeInput:'button',visibleModalAddButton:visible,activeIndex:index,activeAction:action})
        break;
        case 'radio' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'radio', visibleModalRadioButton:visible,activeIndex:index,activeAction:action})
          break;
        case 'table' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'table',visibleModalAddTable:visible,activeIndex:index,activeAction:action})
          break;
        case 'date' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,visibleModalRadioButton:visible,activeIndex:index,activeAction:action})
          break;
        case 'tab' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'tab',visibleModalEditTabs:visible,activeIndex:index,activeAction:action})
          break;
        case 'checklist' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'checklist',visibleModalChecklist:visible,activeIndex:index,activeAction:action})
          break;
        case 'file' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'file',visibleModalFileUpload:visible,activeIndex:index,activeAction:action})
          break;
        default:
          return 0
      }
    } else {
      if (this.props.dataComponent.length> 0){
        tempDataComponent[0] = this.props.dataComponent[index];
      }else {
        tempDataComponent[0]       = this.state.tempDataComponent[0];
        tempDataComponent[0].title = "TextInput";
      }
      this.setState({tempDataComponent,typeInput:'',visibleModalAction:visible,activeIndex:index,activeAction:action})
    }
  }

  handleRadioChange = (e) => {
    var value = e.target.value ? e.target.value : 1;
    this.setState({value});
  }
  
  handleShowError = (value) => {
    var {tempDataComponent} = this.state;
    tempDataComponent[0].error = value;
    this.setState({tempDataComponent});
    setTimeout(()=>{
      tempDataComponent[0].error = false;
      this.setState({tempDataComponent});
    },1000);
  }

  handleOnChangeInputDetails = (name,value,typeChange) => {
    var {tempDataComponent} = this.state;
    if (typeChange){
      switch(typeChange) {
        case 'tab':
          if (value > 4) {
            tempDataComponent[0][name] = 0;
            this.setState({tempDataComponent})
            this.handleShowError(true);
          }else {
            tempDataComponent[0][name] = value;
            this.setState({tempDataComponent})
          }
        break;
        default:
        tempDataComponent[0][name] = value;
        this.setState({tempDataComponent})
      }
    } else {
      tempDataComponent[0][name] = value;
      this.setState({tempDataComponent})
    }
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

  // items action drag 
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
              items={items}
              index={i}
              handleChangeInputNumber={this.handleChangeInputNumber.bind(this)}
              title={items.title}
              value={items.value}
              color={items.color}
              placeholder={items.placeholder}
              type={items.type}
              span={20}
              handleChangeUpload={this.handleChangeUpload.bind(this)}
            />
          <Col span={4}>
              <Row style={{padding:'5px 10px 10px 10px'}}>
                <Col span={12}>
                  <Button onClick={()=>this.handleShowModalAction(true,i, "edit",items.type,'',items.format)} style={{marginRight: 20}} icon={'setting'}></Button>
                </Col>
                <Col span={12}>
                  <Button onClick={()=>this.handleShowModalAction(true, i, "delete",'',items.type,items.format)} icon={'delete'}></Button>
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
  // validate metode

  handleValidateEmail = (email) => {
    var regeXEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regeXEmail.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  handleValidateForm = (callback) => {
    var tempContinue = true;
    var tempError    = [];
    if (this.props.dataComponent.length > 0) {
      this.props.dataComponent.map((obj,i)=>{
        var tempRequired = '';
        var checkRequired = obj.requiredOption.filter((required)=> { 
          if (required == 'required'){
            tempRequired = required;
          }
        });
        if (tempRequired=='required'){
          switch (obj.type) {
            case 'textinput': 
              if (obj.format=='text'){
                tempError.push({type:'text',message:"Text input Can't be empty!"});
              } else if (obj.format=='number') {
                tempError.push({type:'number',message:"Number Input Can't be empty!"});
              } else if (obj.format=='email') {
                tempError.push({type:'email',message:"Email Input Can't be empty!"});
              }
              tempContinue = false;
              break;
            case 'textarea' : 
              tempError.push({type:'textarea',message:"textarea Can't be empty!"});
              tempContinue = false;
              break;
            case 'label' : 
              tempError.push({type:'label',message:"label Can't be empty!"});
              tempContinue = false;
              break;
            case 'dropdown' : 
              tempError.push({type:'dropdown',message:"dropdown Can't be empty!"});
              tempContinue = false;
            break;
            case 'radio' : 
              tempError.push({type:'radio',message:"radio Can't be empty!"});
              tempContinue = false;
              break;
            case 'table' : 
              tempError.push({type:'table',message:"radio Can't be empty!"});
              tempContinue = false; 
              break;
            case 'date' : 
              tempError.push({type:'date',message:"radio Can't be empty!"});
              tempContinue = false; 
              break;
            case 'checklist' : 
              tempError.push({type:'checklist',message:"radio Can't be empty!"});
              tempContinue = false; 
              break;
            case 'file' : 
              tempError.push({type:'file',message:"radio Can't be empty!"});
              tempContinue = false; 
              break;
            default:
              return 0
          }
        }
      });
    }
    this.setState({dataErrorMessage:tempError});
    if (tempContinue) {
      this.handleSaveForm();
    }
  }

  // add textinput 
  handleShowModalAddTextInput = (visible)=> {
    this.setState({visibleModalAddInput:visible, typeInput:'textinput',format:'text'});
  }

  handleChangeInputNumber = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }

  handleSetTypeInput = (typeInput) => {
    this.setState({
      typeInput:typeInput,
      title:'',
      value:'',
      requiredOption:['required','readonly']
    });
  }

  handleChangeRequiredOption = (name,value)=> {
    var {tempDataComponent}=this.state;
    tempDataComponent[0][name]=value;
    this.setState({tempDataComponent})
  }

  handleSaveTextInput = () => {
    var {format} = this.state;
    var tempData = {
      idModule:this.state.idModule,
      idForm:this.state.idForm,
      type:this.state.typeInput,
      title:'',
      placeholder:'',
      required:1,
      format:'',
      requiredOption:[],
      selectOption:['text','number','email']
    }
    if (this.state.typeInput=='textinput') {
      var title='';
      switch(format) {
        case 'text' : 
          tempData.title          = "Text Input";
          tempData.placeholder    = "Enter Text Input";
          tempData.format         = "text";
          tempData.requiredOption = [];
          break;
        case 'number' : 
          tempData.title          = "Number Input";
          tempData.placeholder    = "Enter Number Input";
          tempData.format         = "number";
          tempData.requiredOption = [];
          break;
        case 'email' : 
          tempData.title          = "Email Input";
          tempData.placeholder    = "Email Number Input";
          tempData.format         = "email";
          tempData.requiredOption = [];
          break;
        default:
      }
      this.props.dispatch(dispatchAction(tempData,Const.ADD_COMPONENT))
      this.handleShowModalAddTextInput(false);
    }
  }

  handleChangeSelectTypeInput = (name,value) => {
    var {tempDataComponent}    = this.state;
    switch(value) {
      case 'text' : 
        tempDataComponent[0].title          = "Text Input";
        tempDataComponent[0].placeholder    = "Enter Text Input";
        tempDataComponent[0].format         = "text";
        tempDataComponent[0].requiredOption = ['normal','required'];
        break;
      case 'number' : 
        tempDataComponent[0].title          = "Number Input";
        tempDataComponent[0].placeholder    = "Enter Number Input";
        tempDataComponent[0].format         = "number";
        tempDataComponent[0].requiredOption = ['normal','required'];
        break;
      case 'email' : 
        tempDataComponent[0].title          = "Email Input";
        tempDataComponent[0].placeholder    = "Email Number Input";
        tempDataComponent[0].format         = "email";
        tempDataComponent[0].requiredOption = ['normal','required'];
        break;
      default:
    }
    this.setState({tempDataComponent,format:value});
  }

  handleShowModalEditTextInput = (visible)=> {
    this.setState({visibleModalEditInput:visible});
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
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponent[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
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
                   defaultValue={''}
                   value ={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].format : ''}
                   optionFilterProp="children"
                   onChange={(e)=>this.handleChangeSelectTypeInput("format",e)}
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >
                  {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent.length > 0 ? this.state.tempDataComponent[0].selectOption.length > 0 ? 
                  this.renderSelectOption()
                  :[]
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
  
  // add TextArea
  handleShowModalTextArea = (visible) => {
    this.setState({
      visibleModalTextArea:visible
    })
  }
  handleEditTextArea = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    dataComponent[this.state.activeIndex] =  tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalTextArea(false);
  }

  renderModalTextArea = () =>{
    var ModalTextArea =[];
    ModalTextArea = (
      <Modal
        title={`Add TextArea`}
        width={350}
        visible={this.state.visibleModalTextArea}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditTextArea()}
        onCancel={()=>this.handleShowModalTextArea(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value: ''}
                  onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}
                />
              </Row>
              {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].requiredOption ? 
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponent[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
                  </Col>
                </Row>
                :
                []
                :
                []
              }
            </Col>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalTextArea;
  }

    // add Label
    handleShowModalLabel = (visible) => {
      this.setState({
        visibleModalLabel:visible
      })
    }
  
    handleEditLabel = () => {
      var {dataComponent}       = this.props;
      var {tempDataComponent}   = this.state;
      dataComponent[this.state.activeIndex] =  tempDataComponent[0];
      this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
      this.handleShowModalLabel(false);
    }
  
    renderModalLabel = () =>{
      var ModalLabel =[];
      ModalLabel = (
        <Modal
          title={`Add Label`}
          width={350}
          visible={this.state.visibleModalLabel}
          okText={'Submit'}
          cancelText={'Cancel'}
          onOk={()=>this.handleEditLabel()}
          onCancel={()=>this.handleShowModalLabel(false)}
          >
          <Col type={'flex'} align={'left'}>
            <Row>
              <Col>
                <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
                <Row style={{marginBottom: 10}}>
                  <Input
                    value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value: ''}
                    onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}
                  />
                </Row>
                {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].requiredOption ? 
                  <Row style={{marginBottom: 15}}>
                    <Col>
                      <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponent[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
                    </Col>
                  </Row>
                  :
                  []
                  :
                  []
                }
              </Col>
            </Row>
          </Col>
        </Modal>
      );
      return  ModalLabel;
    }

  // add DropDown
  handleEditDropDown = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    dataComponent[this.state.activeIndex] =  tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalDropDown(false);
  }

  handleShowModalDropDown = (visible) => {
    this.setState({
      visibleModalDropDown:visible
    })
  }
  
  handleDeleteDropDown = (index) => {
    var {tempDataComponent} =this.state;
    tempDataComponent[0].detailsDropDown.splice(index,1);
    this.setState({tempDataComponent});
  }

  handleAddDropDown = () => {
    var {tempDataComponent} =this.state;
    var index = tempDataComponent[0].detailsDropDown.length;
    tempDataComponent[0].detailsDropDown.push({
      title:`New Select Option ${index++}`,
      value:`New Select Option ${index++}`
    })
    this.setState({tempDataComponent});
  }

  handleOnChangeInputDetailsDropDown =(name,value,index) =>{
    var {tempDataComponent} =this.state;
    tempDataComponent[0].detailsDropDown[index][name] = value;
    tempDataComponent[0].detailsDropDown[index].title = value;
    this.setState({tempDataComponent});
  }

  renderModalEditDropDown = () =>{
    var ModalDropDown =[];
    ModalDropDown = (
      <Modal
        title={`Add DropDown Option`}
        width={420}
        visible={this.state.visibleModalDropDown}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditDropDown()}
        onCancel={()=>this.handleShowModalDropDown(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Title</span>
              </Row>
              <Row style={{marginBottom: 20}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value : ''}
                  onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}/>
              </Row>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Placeholder</span>
              </Row>
              <Row style={{marginBottom: 20}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].placeholder : ''}
                  onChange={(e)=>this.handleOnChangeInputDetails("placeholder",e.target.value)}/>
              </Row>
              {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].requiredOption ? 
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponent[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
                  </Col>
                </Row>
                :
                []
                :
                []
              }
              <Row/>
                {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].type=='dropdown' ? this.state.tempDataComponent[0].detailsDropDown.length > 0 ? 
                this.state.tempDataComponent[0].detailsDropDown.map((items,i)=>{
                  return (
                    <Card key={i} style={{ width: '100%', marginBottom:10}}>
                      <Row>
                        <Col span={4} style={{marginTop:3}}>
                          <span style={{fontSize: 14, fontWeight: '500', color:'#666'}}>Title</span>
                        </Col>
                        <Col span={14} style={{marginBottom: 5,paddingRight:10}}>
                          <Input
                            value={items.value}
                            onChange={(e)=>this.handleOnChangeInputDetailsDropDown("value", e.target.value,i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"danger"}
                            icon={"delete"}
                            onClick={()=>this.handleDeleteDropDown(i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"primary"}
                            icon={"plus-circle"}
                            onClick={()=>this.handleAddDropDown()}
                          />
                        </Col>
                      </Row>
                    </Card>
                  )
                })
                :
                <Col span={24} align="right" style={{marginBottom: 5,paddingRight:10}}>
                  <span style={{fontSize: 14, fontWeight: '500', color:'#666',marginRight:10}}>Add New Option</span>
                  <Button
                    type={"primary"}
                    icon={"plus-circle"}
                    onClick={()=>this.handleAddDropDown()}
                  />
                </Col>
                :
                []
                :
                []
              }
          </Row>
        </Col>
      </Modal>
    );
    return  ModalDropDown;
  }

  // add Button 
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
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value :''}
                  onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}
                />
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Button Color</Row>
              <Row style={{marginBottom: 10}}>
                <Select
                  style={{ width: 300}}
                  placeholder="Color (Red, Green, Blue, 'Grey')"
                  defaultValue={"Red"}
                  value ={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].color:''}
                  optionFilterProp="children"
                  onChange={(e)=>this.handleSelectColorButton("color",e)}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                 {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent.length > 0 ? this.state.tempDataComponent[0].selectOption.length > 0 ? 
                  this.renderSelectOptionButton()
                  :[]
                  :[]
                  :[]
                  }
                </Select>
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Input Your Code Here</Row>
              <Row style={{marginBottom: 10}}>
                <TextArea
                  rows={4}
                  defaultValue={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].code :''}
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

  // add Radio Button
  handleShowModalRadioButton = (visible) => {
    this.setState({
      visibleModalRadioButton:visible
    })
  }

  handleOnChangeInputDetailsRadioButton =(name,value,index) =>{
    var {tempDataComponent} =this.state;
    tempDataComponent[0].detailsRadioButton[index][name] = value;
    tempDataComponent[0].detailsRadioButton[index].title = value;
    this.setState({tempDataComponent});
  }

  handleDeleteRadioButton = (index) => {
    var {tempDataComponent} =this.state;
    tempDataComponent[0].detailsRadioButton.splice(index,1);
    this.setState({tempDataComponent});
  }

  handleAddRadioButton = () => {
    var {tempDataComponent} =this.state;
    var index = tempDataComponent[0].detailsRadioButton.length;
    tempDataComponent[0].detailsRadioButton.push({
      title:`New Option ${index++}`,
      value:`New Option ${index++}`
    })
    this.setState({tempDataComponent});
  }

  handleEditRadioButton = () => {
    var {tempDataComponent} = this.state;
    var {dataComponent}     = this.props;
    dataComponent[this.state.activeIndex] = tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalRadioButton(false);
  }

  renderModalEditRadioButton = () =>{
    var ModalRadioButton =[];
    ModalRadioButton = (
      <Modal
        title={`Add RadioButton Option`}
        width={420}
        visible={this.state.visibleModalRadioButton}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditRadioButton()}
        onCancel={()=>this.handleShowModalRadioButton(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Title</span>
              </Row>
              <Row style={{marginBottom: 15}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value:''}
                  onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}/>
              </Row>
              {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].requiredOption ? 
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponent[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
                  </Col>
                </Row>
                :
                []
                :
                []
              }
              <Row/>
                {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].type=='radio' ? this.state.tempDataComponent[0].detailsRadioButton.length > 0 ? 
                this.state.tempDataComponent[0].detailsRadioButton.map((items,i)=>{
                  return (
                    <Card key={i} style={{ width: '100%', marginBottom:10}}>
                      <Row>
                        <Col span={4} style={{marginTop:3}}>
                          <span style={{fontSize: 14, fontWeight: '500', color:'#666'}}>Title</span>
                        </Col>
                        <Col span={14} style={{marginBottom: 5,paddingRight:10}}>
                          <Input
                            value={items.value}
                            onChange={(e)=>this.handleOnChangeInputDetailsRadioButton("value", e.target.value,i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"danger"}
                            icon={"delete"}
                            onClick={()=>this.handleDeleteRadioButton(i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"primary"}
                            icon={"plus-circle"}
                            onClick={()=>this.handleAddRadioButton()}
                          />
                        </Col>
                      </Row>
                    </Card>
                  )
                })
                :
                <Col span={24} align="right" style={{marginBottom: 5,paddingRight:10}}>
                  <span style={{fontSize: 14, fontWeight: '500', color:'#666',marginRight:10}}>Add New RadioButton</span>
                  <Button
                    type={"primary"}
                    icon={"plus-circle"}
                    onClick={()=>this.handleAddRadioButton()}
                  />
                </Col>
                :
                []
                :
                []
              }
          </Row>
        </Col>
      </Modal>
    );
    return  ModalRadioButton;
  } 

  // add Date Time
  handleShowModalDateTime = (visible) => {
    this.setState({
      visibleModalDateTime:visible
    })
  }

  handleShowModalTable=(visible)=>{
    this.setState({
      visibleModalEditTable:visible
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
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value: ''}
                  onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}
                />
              </Row>
              {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].requiredOption ? 
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponent[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
                  </Col>
                </Row>
                :
                []
                :
                []
              }
            </Col>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalDateTime;
  }

  // add table
  handleShowModalAddTable=(visible)=>{
    this.setState({
      visibleModalAddTable:visible,
      typeInput:'table'
    })
  }
  handleSaveTable = () => {
    var {tempDataComponent} = this.state;
    var tempColumn  = [];
    var tempRow     = [];
    var indexColumn = 0;
    var indexRows   = 0;

    if(tempDataComponent[0].column > 0 ){
      for (var i=0;i<tempDataComponent[0].column;i++){
        indexColumn++;
        tempColumn.push({
          title: 'Column '+indexColumn,
          dataIndex: 'name',
          key: 'name '+indexColumn,
        });
      }
    }
    if(tempDataComponent[0].row > 0 ){
      for (var i=0;i<tempDataComponent[0].row;i++){
        indexRows++;
        tempRow.push({
          key: indexRows,
          name: 'Value '+indexRows,
          age: 15,
          address: 'Podium Depan'+indexRows
        });
      }
    }

    if (this.state.typeInput!='') {
      var title = 'Table';
      this.props.dispatch(dispatchAction({
        idModule:this.state.idModule,
        idForm:this.state.idForm,
        value:'Table',
        title:title,
        type:'table',
        placeholder:'',
        format:'',
        detailColumn:tempColumn,
        detailRow:tempRow,
        selectOption:['text','number','email']
      },Const.ADD_COMPONENT));
      this.handleShowModalAddTable(false);
    }
  }
  renderModalAddTable = () =>{
    var ModalAddTable =[];
    ModalAddTable = (
      <Modal
        title={`Add Table`}
        width={350}
        visible={this.state.visibleModalAddTable}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleSaveTable()}
        onCancel={()=>this.handleShowModalAddTable(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value: ''}
                  onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}
                />
              </Row>
              {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].requiredOption ? 
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponent[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
                  </Col>
                </Row>
                :
                []
                :
                []
              }
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 14, fontWeight: '500', color:'#666'}}>Insert Column</span>
              </Row>
              <Row span={24} style={{marginBottom: 20}}>
              <Input
                type="number"
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].column : ''}
                onChange={(e)=>this.handleOnChangeInputDetails("column",e.target.value,"tab")}
              />
              </Row>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 14, fontWeight: '500', color:'#666'}}>Insert Row</span>
              </Row>
              <Row span={24} style={{marginBottom: 20}}>
                <Input
                  type="number"
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].row : ''}
                  onChange={(e)=>this.handleOnChangeInputDetails("row",e.target.value,"tab")}
                />
              </Row>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalAddTable;
  }
  renderModalTable = ()=>{
    var ModalTable = [];
    ModalTable = (
      <Modal
        title={`Add Table`}
        width={350}
        visible={this.state.visibleModalEditTable}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditTable()}
        onCancel={()=>this.handleShowModalTable(false)}
        >
          <Col type={'flex'} align={'left'}>
            <Row style={{marginBottom:5,fontSize:14}}>Set Title Table</Row>
            <Row style={{marginBottom:10}}>
              <Input
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value: ''}
                onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}/>
            </Row>
          </Col>
        </Modal>
    );
    return ModalTable;
  }

  // add tabs
  handleShowModalAddTabs=(visible)=>{
    this.setState({
      visibleModalTabs:visible,
      typeInput:'tabs'
    })
  }

  handleShowModalEditTabs=(visible)=>{
    this.setState({
      visibleModalEditTabs:visible
    })
  }

  handleSaveTabs = () => {
    var {tempDataComponent} = this.state;
    var detailsTabs = [];
    var index = 0;
    for (var i=0;i < tempDataComponent[0].value;i++) {
      index++;
      detailsTabs.push(`Tab ${index}`);
    }
    if (this.state.typeInput!='') {
      var title = '';
      this.props.dispatch(dispatchAction({
        idModule:this.state.idModule,
        idForm:this.state.idForm,
        title:title,
        type:'tab',
        placeholder:'',
        format:'',
        detailsTabs:detailsTabs,
        selectOption:[]
      },Const.ADD_COMPONENT))
      this.handleShowModalAddTabs(false);
    }
  }

  renderModalAddTabs = () =>{
    var ModalAddTabs =[];
    ModalAddTabs = (
      <Modal
        title={`Add Tabs`}
        width={350}
        visible={this.state.visibleModalTabs}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleSaveTabs()}
        onCancel={()=>this.handleShowModalAddTabs(false)}
        >
        <Col type={'flex'} align={'center'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 18, fontWeight: '600', color:'#666'}}>Please Insert Tabs Header Values</span>
              </Row>
              <Row span={24} style={{marginBottom: 20}}>
              <Input
                type="number"
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value : ''}
                onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value,"tab")}
              />
              {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].error ?
                <Row span={24} style={{marginTop: 15}}>
                  <Alert message="jumlah tabs tidak boleh lebih dari 4" type="error" showIcon />
                </Row>
                :
                []
                :
                []
              }
              </Row>
            </Col>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalAddTabs;
  }

  handleOnChangeInputDetailsTabs = (value,index) => {
    var {tempDataComponent} =this.state;
    tempDataComponent[0].detailsTabs[index] = value;
    this.setState({tempDataComponent});
  }

  handleEditTabs= ()=> {
    var {tempDataComponent} = this.state;
    var {dataComponent}     = this.props;
    dataComponent[this.state.activeIndex] = tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalEditTabs(false);
  }

  renderModalEditTabs = () =>{
    var ModalEditTabs =[];
    ModalEditTabs = (
      <Modal
        title={`Add Text`}
        width={380}
        visible={this.state.visibleModalEditTabs}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditTabs()}
        onCancel={()=>this.handleShowModalEditTabs(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].type=='tab' ? this.state.tempDataComponent[0].detailsTabs.length > 0 ? 
              this.state.tempDataComponent[0].detailsTabs.map((items,i)=>{
                return (
                  <Col key={i}>
                    <Row style={{marginBottom: 15}}>
                      <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Tab {i} Title</span>
                    </Row>
                    <Row span={24} style={{marginBottom: 20}}>
                      <Input
                        value={items}
                        onChange={(e)=>this.handleOnChangeInputDetailsTabs(e.target.value,i)}
                      />
                    </Row>
                  </Col>
                )
              })
              :
              []
              :
              []
              :
              []
            }
          </Row>
        </Col>
      </Modal>
    );
    return  ModalEditTabs;
  }

// add checklist button
  handleShowModalChecklist=(visible)=>{
    this.setState({
      visibleModalChecklist:visible
    })
  }

  handleOnChangeInputDetailsChecklist =(name,value,index) =>{
    var {tempDataComponent} =this.state;
    tempDataComponent[0].detailsCheckList[index][name] = value;
    tempDataComponent[0].detailsCheckList[index].title = value;
    this.setState({tempDataComponent});
  }

  handleDeleteCheckList = (index) => {
    var {tempDataComponent} =this.state;
    tempDataComponent[0].detailsCheckList.splice(index,1);
    this.setState({tempDataComponent});
  }

  handleAddCheckList = () => {
    var {tempDataComponent} =this.state;
    var index = tempDataComponent[0].detailsCheckList.length;
    tempDataComponent[0].detailsCheckList.push({
      title:`New CheckList ${index++}`,
      value:`New CheckList ${index++}`
    })
    this.setState({tempDataComponent});
  }

  handleEditChecklist = () => {
    var {tempDataComponent} = this.state;
    var {dataComponent}     = this.props;
    dataComponent[this.state.activeIndex] = tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalChecklist(false);
  }

  renderModalEditChecklist = () =>{
    var ModalChecklist =[];
    ModalChecklist = (
      <Modal
        title={`Add CheckList Option`}
        width={420}
        visible={this.state.visibleModalChecklist}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditChecklist()}
        onCancel={()=>this.handleShowModalChecklist(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Title</span>
              </Row>
              <Row style={{marginBottom: 20}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value:''}
                  onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}/>
              </Row>
              {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].requiredOption ? 
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponent[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
                  </Col>
                </Row>
                :
                []
                :
                []
              }
              <Row/>
                {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].type=='checklist' ? this.state.tempDataComponent[0].detailsCheckList.length > 0 ? 
                this.state.tempDataComponent[0].detailsCheckList.map((items,i)=>{
                  return (
                    <Card key={i} style={{ width: '100%', marginBottom:10}}>
                      <Row>
                        <Col span={4} style={{marginTop:3}}>
                          <span style={{fontSize: 14, fontWeight: '500', color:'#666'}}>Title</span>
                        </Col>
                        <Col span={14} style={{marginBottom: 5,paddingRight:10}}>
                          <Input
                            value={items.value}
                            onChange={(e)=>this.handleOnChangeInputDetailsChecklist("value", e.target.value,i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"danger"}
                            icon={"delete"}
                            onClick={()=>this.handleDeleteCheckList(i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"primary"}
                            icon={"plus-circle"}
                            onClick={()=>this.handleAddCheckList()}
                          />
                        </Col>
                      </Row>
                    </Card>
                  )
                })
                :
                <Col span={24} align="right" style={{marginBottom: 5,paddingRight:10}}>
                  <span style={{fontSize: 14, fontWeight: '500', color:'#666',marginRight:10}}>Add New CheckList</span>
                  <Button
                    type={"primary"}
                    icon={"plus-circle"}
                    onClick={()=>this.handleAddCheckList()}
                  />
                </Col>
                :
                []
                :
                []
              }
          </Row>
        </Col>
      </Modal>
    );
    return  ModalChecklist;
  } 

  // add upload file
  handleShowFileUpload=(visible)=>{
    this.setState({
      visibleModalFileUpload:visible
    })
  }
  handleEditFileUpload = () => {
    var {tempDataComponent} = this.state;
    var {dataComponent}     = this.props;
    dataComponent[this.state.activeIndex] = tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowFileUpload(false);
  }

  handleChangeUpload = (info) => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  
  renderModalEditFileUpload = () =>{
    var ModalFileUpload =[];
    ModalFileUpload = (
      <Modal
        title={`Add FileUpload Option`}
        width={420}
        visible={this.state.visibleModalFileUpload}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditFileUpload()}
        onCancel={()=>this.handleShowFileUpload(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Row style={{marginBottom: 15}}>
              <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Title File Upload</span>
            </Row>
            {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].requiredOption ? 
              <Row style={{marginBottom: 15}}>
                <Col>
                  <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponent[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
                </Col>
              </Row>
              :
              []
              :
              []
            }
            <Row style={{marginBottom: 20}}>
              <Input
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value:''}
                onChange={(e)=>this.handleOnChangeInputDetails("value",e.target.value)}/>
            </Row>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalFileUpload;
  } 
  // show Preview
  handleGotoPreview =(visible) => {
    this.setState({
      visibleModalPreview:visible
    })
  }

  handleSaveForm = () => {
    this.handleGotoPreview(false);
  }

  renderModalPreview = () =>{
    var ModalPreview =[];
    ModalPreview = (
      <Modal
        title={`Form Preview`}
        width={600}
        visible={this.state.visibleModalPreview}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleValidateForm()}
        onCancel={()=>this.handleGotoPreview(false)}
        >
          <Col type={'flex'} align={'left'}>
            <Card>
              { this.props.dataComponent.length > 0 ? 
                this.props.dataComponent.map((items,i)=>{
                  return (
                    <Row
                        data-key={i}
                        style={{paddingTop: 5}}
                        key={i} type='flex' justify='left' align='middle'>
                        <CommonPreviewComponent
                            key={i}
                            disabled={false}
                            items={items}
                            index={i}
                            title={items.title}
                            value={items.value}
                            color={items.color}
                            placeholder={items.placeholder}
                            type={items.type}
                            span={24}
                            dataErrorMessage={this.state.dataErrorMessage}
                        />
                    </Row>
                  )
              })
              :
              <Row type="flex" justify="center">
                <Col span={13}>
                  <span style={{marginLeft:40,fontSize: 16, color:'red',fontWeight:'600',textAlign:'center'}}>  {"Empty Component!"}</span>
                </Col>
              </Row>
            } 
            </Card>
          </Col>
      </Modal>
    );
    return  ModalPreview;
  }
  
  handleShowPreviewCode = (visible) => {
    this.setState({
      visibleModalPreviewPayload:visible
    })
  }

  renderModalPreviewCode = () =>{
    var ModalPreviewCode =[];
    ModalPreviewCode = (
      <Modal
        title={`Form Preview Payload`}
        width={600}
        visible={this.state.visibleModalPreviewPayload}
        okText={'Ok'}
        cancelText={'Cancel'}
        onOk={()=>this.handleShowPreviewCode(false)}
        onCancel={()=>this.handleShowPreviewCode(false)}
        >
          <Col type={'flex'} align={'left'}>
            <Card>
              { this.props.dataComponent.length > 0 ? 
                <pre><code>{JSON.stringify(this.props.dataComponent)}</code></pre>
              :
              <Row type="flex" justify="center">
                <Col span={13}>
                  <span style={{marginLeft:40,fontSize: 16, color:'red',fontWeight:'600',textAlign:'center'}}>  {"Empty Component!"}</span>
                </Col>
              </Row>
            } 
            </Card>
          </Col>
      </Modal>
    );
    return  ModalPreviewCode;
  }

  render() {
    return (
      <Row>
      {this.renderModalPreview()}
      {this.renderModalPreviewCode()}
      {this.handleModalAction()}
      {this.renderModalEditTextInput()}
      {this.renderModalAddTextInput()}
      {this.renderModalTextArea()}
      {this.renderModalLabel()}
      {this.renderModalEditDropDown()}
      {this.renderModalAddButton()}
      {this.renderModalEditRadioButton()}
      {this.renderModalDateTime()}
      {this.renderModalTable()}
      {this.renderModalAddTable()}
      {this.renderModalAddTabs()}
      {this.renderModalEditTabs()}
      {this.renderModalEditChecklist()}
      {this.renderModalEditFileUpload()}
        <Layout>
          <Header style={{backgroundColor: '#020292'}}>
            <Row type='flex' justify='end'>
             <Col span={4} style={{paddingLeft:25}}>
                <Button
                  onClick = {() =>this.handleShowPreviewCode(true)}
                  type="dash">
                  Preview Payload<Icon type="code" />
                </Button>
              </Col>
              <Col span={6} style={{paddingLeft:25}}>
                <Button
                  onClick = {() =>this.handleGotoPreview(true)}
                  type="primary">
                  Form Preview<Icon type="right" />
                </Button>
              </Col>
              <span style={{color:'#fff'}}></span>
            </Row>
          </Header>
            <Layout>
            <Col span={18} offset={3}>
              <Row style={{backgroundColor: '#ededed',
              }}>
                <Col span={16}>
                  <Row span ={12} style={{backgroundColor: '#ededed',
                    backgroundColor:'#dedede',minHeight:450, margin:'10px',padding:'10px 10px 20px 10px',
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
                  <Row type='flex' justify='left'
                  style={{padding:'10px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Text input","textinput")}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                     <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Text Input</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='left'
                  style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Text area","textarea")}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="read" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Text Area</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='left'
                    style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Label","label")}
                    draggable
                  >
                    <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="font-size" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Label</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='left'
                    style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Dropdown","dropdown")}
                    draggable
                  >
                    <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="align-left" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >DropDown</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='left'
                    style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Button","button","primary")}
                    draggable
                  >
                    <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="link" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Button</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='left'
                    style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Radio","radio")}
                    draggable
                  >
                    <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                       <Icon type="ordered-list" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Radio Buttons</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='left'
                    style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede',marginRight: 10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Date","date")}
                    draggable
                  >
                    <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="clock-circle" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Date Time</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='left'
                    style={{padding:'0px 10px 10px 10px',backgroundColor:'#dedede',marginRight:10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Table","table")}
                    draggable>
                    <Button style={{width:'100%',height:40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="table" theme="outlined" /><span style={{fontWeight:'400',fontSize:17,color:'#999'}}>Table</span>
                    </Button>                  
                  </Row>
                  <Row type='flex' justify='left'
                    style={{padding:'0px 10px 10px 10px',backgroundColor:'#dedede',marginRight:10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Tab","tab")}
                    draggable>
                    <Button style={{width:'100%',height:40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="menu-unfold" theme="outlined" /><span style={{fontWeight:'400',fontSize:17,color:'#999'}}>Tab</span>
                    </Button>                  
                  </Row>
                  <Row type='flex' justify='left'
                    style={{padding:'0px 10px 10px 10px',backgroundColor:'#dedede',marginRight:10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Check List","checklist")}
                    draggable>
                    <Button style={{width:'100%',height:40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="ordered-list" theme="outlined" /><span style={{fontWeight:'400',fontSize:17,color:'#999'}}>Checklist Option</span>
                    </Button>                  
                  </Row>
                  <Row type='flex' justify='left'
                    style={{padding:'0px 10px 10px 10px',backgroundColor:'#dedede',marginRight:10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"File Upload","file")}
                    draggable>
                    <Button style={{width:'100%',height:40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="upload" theme="outlined" /><span style={{fontWeight:'400',fontSize:17,color:'#999'}}>File Upload</span>
                    </Button>                  
                  </Row>
                </Col>
              </Row>
            </Col>
          </Layout>
          <Footer style={{backgroundColor: '#020292',height: '120px'}}>
            <Row style={{ textAlign: 'center', color:'#dedede', fontWeight:'600', fontSize:16 }}>
              FORM BUILDER ©2018 Created by ISAT Corp
            </Row>
          </Footer>
        </Layout>
      </Row>
    );
	}
}
module.exports = connect(state => ({dataModule:state.Modules.dataModule,dataForm:state.Forms.dataForm,dataComponent:state.FormBuilders.dataComponent}), dispatch=>({dispatch:dispatch}))(FormBuilders);
