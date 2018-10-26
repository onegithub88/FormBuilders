import React, { Component } from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select, Checkbox, Alert,
  Modal, Icon, Avatar, Table, Button, Radio, Row, Col, Card,Upload, message, Tabs,
} from 'antd';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const { Option, OptGroup } = Select;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import {connect} from 'react-redux';
import frFR from 'antd/lib/locale-provider/fr_FR';
import './../assets/common/css/layoutIsat.css';
import moment from 'moment';
import 'moment/locale/fr';
const { Header, Footer, Sider, Content } = Layout;
import {dispatchAction,dispatchActionTab} from './../actions';
import {Const} from './../const/Const';
import CommonComponent from './CommonComponent';
import CommonComponentTab from './CommonComponentTab';
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
    tempContinue:true,
    visibleModalActionTab:false,
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
    visibleModalTextInputs:false,
    visibleModalNumberInputs:false,
    visibleModalEmailInputs:false,
    visibleTabSetting:true,
    visibleTabComponent:false,
    visibleModalEditMap:false,
    visibleModalAddMap:false,
    //tab state
    tempDataComponentTab:[
      {
       title:"",
       type:'',
       placeholder:'',
       required:1,
       color:'#ededed',
       requiredOption:[],
       selectOption:['text','number','email'],
       markValue :
        {
          center: {
            lat: -6.175392,
            lng: 106.827153
          },
          mark: {
            lat: -6.175392,
            lng: 106.827153
          },
          zoom: 8
        }
      }
    ],
    typeInputTab:'',
    activeIndexTab:0,
    activeIndexTabComponent:0,
    activeActionTab:'',
    activeActionTab:0,
    visibleModalAddInputTab:false,
    visibleModalEditTableTab:false,
    visibleModalEditInputTab:false,
    visibleModalTextAreaTab:false,
    visibleModalLabelTab:false,
    visibleModalDropDownTab:false,
    visibleModalAddButtonTab:false,
    visibleModalRadioButtonTab:false,
    visibleModalDateTimeTab:false,
    visibleModalAddTableTab:false,
    visibleModalChecklistTab:false,
    visibleModalFileUploadTab:false,
    visibleModalTextInputsTab:false,
    visibleModalNumberInputsTab:false,
    visibleModalEmailInputsTab:false,
    visibleModalEditMapTab:false,
    visibleModalAddMapTab:false,
    dataErrorMessage: [],
    tempPostDataComponent:[],
    minHeight:window.innerHeight,
    boxColor:'#fff',
    selected:0,
    indexHover:null,
    tempDataComponent:[
      {
       title:"",
       type:'',
       placeholder:'',
       required:1,
       color:'#ededed',
       requiredOption:[],
       selectOption:['text','number','email'],
       markValue :
        {
          center: {
            lat: -6.175392,
            lng: 106.827153
          },
          mark: {
            lat: -6.175392,
            lng: 106.827153
          },
          zoom: 8
        }
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

  // componentDidMount = () => {
  //   var detailsTabs = [];
  //   var index = 0;
  //   for (var i=0;i < 2;i++) {
  //     index++;
  //     detailsTabs.push({
  //       title:`Tab ${index}`,
  //       value:`Tab ${index}`,
  //       componentTabs:[]
  //     });
  //   }
  //   var title = '';
  //   this.props.dispatch(dispatchAction({
  //     idModule:this.state.idModule,
  //     idForm:this.state.idForm,
  //     title:title,
  //     type:'tab',
  //     placeholder:'',
  //     detailsTabs:detailsTabs,
  //     postValue:'',
  //     selectOption:[]
  //   },Const.ADD_COMPONENT))
  // }

  tempdataDrag=[]
  tempdataDragTabs=[]
  dragStatus=false
  dragStatusTabs=false

  onDragOver = (e) => {
    if(this.tempdataDrag.length > 0 && this.dragStatus==true){
      var dataComponent = this.props.dataComponent;
      this.props.dispatch(dispatchAction(this.tempdataDrag[0],Const.ADD_COMPONENT))
      this.tempdataDrag = [];
      this.dragStatus   = false;
    }
  }

 
  // action drag start
  handleOnDragStart = (e,title,componentType) => {
    var initialdataDrag = {
      idModule:this.state.idModule,
      idForm:this.state.idForm,
      title:title,
      type:componentType,
      placeholder:'',
      required:1,
      requiredOption:[],
      detailsTabs:[],
      selectOption:['text','number','email'],
      markValue :
      {
        center: {
          lat: -6.175392,
          lng: 106.827153
        },
        mark: {
          lat: -6.175392,
          lng: 106.827153
        },
        zoom: 8
      }
    }
    this.tempdataDrag.splice(0,1,initialdataDrag);
      switch (componentType) {
        case 'text' : 
          initialdataDrag.title = "Text";
          initialdataDrag.value = "Text";
          initialdataDrag.postValue = "";
          initialdataDrag.placeholder    = "enter text";
          initialdataDrag.requiredOption = [];
          break;
        case 'number' : 
          initialdataDrag.title = "Input Number";
          initialdataDrag.value = "Input Number";
          initialdataDrag.postValue = 0;
          initialdataDrag.placeholder    = "enter number";
          initialdataDrag.requiredOption = [];
          break;
        case 'email' : 
          initialdataDrag.title = "Input Email";
          initialdataDrag.value = "Input Email";
          initialdataDrag.postValue = '';
          initialdataDrag.placeholder    = "enter email";
          initialdataDrag.requiredOption = [];
          break;
        case 'textarea' : 
          initialdataDrag.title = "TextArea";
          initialdataDrag.value = "TextArea";
          initialdataDrag.postValue = '';
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
          initialdataDrag.postValue = '';
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
          initialdataDrag.postValue = '';
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
          initialdataDrag.postValue = moment(new Date());
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
          initialdataDrag.value = 'List Items';
          initialdataDrag.requiredOption = [];
          initialdataDrag.postValue =[];
          initialdataDrag.detailsTabs = [{
            title:`Tab 1`,
            value:`Tab 1`,
            componentTabs:[]
          }];
          break;
        case 'checklist' : 
          initialdataDrag.value = 'List Items';
          initialdataDrag.requiredOption = [];
          initialdataDrag.postValue =[];
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
          initialdataDrag.postValue = '';
          break;

        case 'map' : 
          var {tempDataComponent} = this.state;
          initialdataDrag.title = 'Map';
          initialdataDrag.type = 'map';
          initialdataDrag.markValue = {
            center: {
              lat: -6.175392,
              lng: 106.827153
            },
            mark: {
              lat: -6.175392,
              lng: 106.827153
            },
            zoom: 8
          };
          initialdataDrag.requiredOption = [];
          initialdataDrag.postValue = '';
          tempDataComponent[0]=initialdataDrag;
          this.setState({tempDataComponent})
          this.handleShowAddMap(true);
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
        case 'text' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'text', visibleModalTextInputs:visible,activeIndex:index,activeAction:action})
          break;
        case 'number' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'number', visibleModalNumberInputs:visible,activeIndex:index,activeAction:action})
          break;
        case 'email' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'email', visibleModalEmailInputs:visible,activeIndex:index,activeAction:action})
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
        case 'map' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          tempDataComponent[0].title = "map";
          this.setState({tempDataComponent,typeInput:'map',visibleModalEditMap:visible,activeIndex:index,activeAction:action})
          break;
        default:
          return 0
      }
    } else {
      if (this.props.dataComponent.length> 0){
        tempDataComponent[0] = this.props.dataComponent[index];
      }else {
        tempDataComponent[0]       = this.state.tempDataComponent[0];
      }
      this.setState({tempDataComponent,typeInput:'',visibleModalAction:visible,activeIndex:index,activeAction:action})
    }
  }

  handleChangeRequiredOption = (name,value)=> {
    var {tempDataComponent}=this.state;
    tempDataComponent[0][name]=value;
    this.setState({tempDataComponent})
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
      if (items!=undefined && items.idModule==this.state.idModule && items.idForm==this.state.idForm) {
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
              title={items.title}
              value={items.value}
              color={items.color}
              placeholder={items.placeholder}
              type={items.type}
              span={20}
              handleChangeUpload={this.handleChangeUpload}
            />
          <Col span={4}>
              <Row style={{padding:'5px 10px 10px 10px'}}>
                <Col span={12}>
                  <Button onClick={()=>this.handleShowModalAction(true,i, "edit",items.type,'')} style={{marginRight: 20}} icon={'setting'}></Button>
                </Col>
                <Col span={12}>
                  <Button onClick={()=>this.handleShowModalAction(true, i, "delete",'',items.type)} icon={'delete'}></Button>
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

  handleValidateNumber = (value) => {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      return true;
    }else {
      return false;
    }
  }

  handleValidateForm = (callback) => {
    var tempContinue = true;
    var tempError    = [];
    if (this.state.tempPostDataComponent.length > 0) {
      this.state.tempPostDataComponent.map((obj,i)=>{
        var tempRequired = '';
        if (obj.type!='tab'){
          obj.requiredOption.filter((required)=> { 
            if (required == 'required'){
              tempRequired = required;
            }
          });
        }
        if (tempRequired=='required' && obj.postValue.length==0){
            tempContinue=false;
        }
      });
    }
    this.setState({tempContinue});
    if (tempContinue) {
      this.handleSaveForm();
    }
  }
  // edit tab component
  handleChangeRequiredOptionTab = (name,value)=> {
    var {tempDataComponentTab}=this.state;
    tempDataComponentTab[0][name]=value;
    this.setState({tempDataComponentTab})
  }
  // add Text Tab
  handleShowModalTextInputsTab = (visible) => {
    this.setState({
      visibleModalTextInputsTab:visible
    })
  }

  handleOnChangeTextInputTab = (name,value,typeChange) => {
    var {tempDataComponentTab} = this.state;
    tempDataComponentTab[0][name] = value;
    this.setState({tempDataComponentTab})
  }

  handleEditTextInputsTab = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponentTab}   = this.state;
    dataComponent[this.state.activeIndex].detailsTabs[this.state.activeIndexTab].componentTabs[this.state.activeIndexTabComponent] =  tempDataComponentTab[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalTextInputsTab(false);
  }

  renderModalTextInputsTab = () =>{
    var ModalTextInputsTab =[];
    ModalTextInputsTab = (
      <Modal
        title={`Add Text Input`}
        width={350}
        visible={this.state.visibleModalTextInputsTab}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditTextInputsTab()}
        onCancel={()=>this.handleShowModalTextInputsTab(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].value: ''}
                  onChange={(e)=>this.handleOnChangeTextInputTab("value",e.target.value,"text")}
                />
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Placeholder</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].placeholder: ''}
                  onChange={(e)=>this.handleOnChangeTextInputTab("placeholder",e.target.value,"text")}
                />
              </Row>
              {this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].requiredOption ? 
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponentTab[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOptionTab("requiredOption",text)} />
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
    return  ModalTextInputsTab;
  }
  
  // add Number Tab
  handleShowModalNumberInputsTab = (visible) => {
    this.setState({
      visibleModalNumberInputsTab:visible
    })
  }

  handleEditNumberInputsTab = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponentTab}   = this.state;
    dataComponent[this.state.activeIndex].detailsTabs[this.state.activeIndexTab].componentTabs[this.state.activeIndexTabComponent] =  tempDataComponentTab[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalNumberInputsTab(false);
  }

  renderModalNumberInputsTab = () =>{
    var ModalNumberInputsTab =[];
    ModalNumberInputsTab = (
      <Modal
        title={`Add Text Input`}
        width={350}
        visible={this.state.visibleModalNumberInputsTab}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditNumberInputsTab()}
        onCancel={()=>this.handleShowModalNumberInputsTab(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].value: ''}
                  onChange={(e)=>this.handleOnChangeTextInputTab("value",e.target.value,"text")}
                />
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Placeholder</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].placeholder: ''}
                  onChange={(e)=>this.handleOnChangeTextInputTab("placeholder",e.target.value,"text")}
                />
              </Row>
              {this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].requiredOption ? 
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponentTab[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOptionTab("requiredOption",text)} />
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
    return  ModalNumberInputsTab;
  }

  
  // add Email Tab
  handleShowModalEmailInputsTab = (visible) => {
    this.setState({
      visibleModalEmailInputsTab:visible
    })
  }

  handleOnChangeTextInputTab = (name,value,typeChange) => {
    var {tempDataComponentTab} = this.state;
    tempDataComponentTab[0][name] = value;
    this.setState({tempDataComponentTab})
  }

  handleEditEmailInputsTab = () => {
    var {dataComponent}          = this.props;
    var {tempDataComponentTab}   = this.state;
    dataComponent[this.state.activeIndex] =  tempDataComponentTab[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalEmailInputsTab(false);
  }

  renderModalEmailInputsTab = () =>{
    var ModalEmailInputsTab =[];
    ModalEmailInputsTab = (
      <Modal
        title={`Add Text Input`}
        width={350}
        visible={this.state.visibleModalEmailInputsTab}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditEmailInputsTab()}
        onCancel={()=>this.handleShowModalEmailInputsTab(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].value: ''}
                  onChange={(e)=>this.handleOnChangeTextInputTab("value",e.target.value,"text")}
                />
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Placeholder</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].placeholder: ''}
                  onChange={(e)=>this.handleOnChangeTextInputTab("placeholder",e.target.value,"text")}
                />
              </Row>
              {this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].requiredOption ? 
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponentTab[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOptionTab("requiredOption",text)} />
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
    return  ModalEmailInputsTab;
  }

  // add Text Input
  handleShowModalTextInputs = (visible) => {
    this.setState({
      visibleModalTextInputs:visible
    })
  }

  handleOnChangeTextInput = (name,value,typeChange) => {
    var {tempDataComponent} = this.state;
    tempDataComponent[0][name] = value;
    this.setState({tempDataComponent})
  }

  handleEditTextInputs = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    dataComponent[this.state.activeIndex] =  tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalTextInputs(false);
  }

  renderModalTextInputs = () =>{
    var ModalTextInputs =[];
    ModalTextInputs = (
      <Modal
        title={`Add Text Input`}
        width={350}
        visible={this.state.visibleModalTextInputs}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditTextInputs()}
        onCancel={()=>this.handleShowModalTextInputs(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value: ''}
                  onChange={(e)=>this.handleOnChangeTextInput("value",e.target.value,"text")}
                />
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Placeholder</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].placeholder: ''}
                  onChange={(e)=>this.handleOnChangeTextInput("placeholder",e.target.value,"text")}
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
    return  ModalTextInputs;
  }

  // add Number Input
  handleShowModalNumberInputs = (visible) => {
    this.setState({
      visibleModalNumberInputs:visible
    })
  }

  handleOnChangeTextInput = (name,value,typeChange) => {
    var {tempDataComponent} = this.state;
    tempDataComponent[0][name] = value;
    this.setState({tempDataComponent})
  }

  handleEditNumberInputs = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    dataComponent[this.state.activeIndex] =  tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalNumberInputs(false);
  }

  renderModalNumberInputs = () =>{
    var ModalNumberInputs =[];
    ModalNumberInputs = (
      <Modal
        title={`Add Text Input`}
        width={350}
        visible={this.state.visibleModalNumberInputs}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditNumberInputs()}
        onCancel={()=>this.handleShowModalNumberInputs(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value: ''}
                  onChange={(e)=>this.handleOnChangeTextInput("value",e.target.value,"text")}
                />
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Placeholder</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].placeholder: ''}
                  onChange={(e)=>this.handleOnChangeTextInput("placeholder",e.target.value,"text")}
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
    return  ModalNumberInputs;
  }

  // add Email Input
  handleShowModalEmailInputs = (visible) => {
    this.setState({
      visibleModalEmailInputs:visible
    })
  }

  handleOnChangeTextInput = (name,value,typeChange) => {
    var {tempDataComponent} = this.state;
    tempDataComponent[0][name] = value;
    this.setState({tempDataComponent})
  }

  handleEditEmailInputs = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    dataComponent[this.state.activeIndex] =  tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalEmailInputs(false);
  }

  renderModalEmailInputs = () =>{
    var ModalEmailInputs =[];
    ModalEmailInputs = (
      <Modal
        title={`Add Text Input`}
        width={350}
        visible={this.state.visibleModalEmailInputs}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditEmailInputs()}
        onCancel={()=>this.handleShowModalEmailInputs(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].value: ''}
                  onChange={(e)=>this.handleOnChangeTextInput("value",e.target.value,"text")}
                />
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Placeholder</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].placeholder: ''}
                  onChange={(e)=>this.handleOnChangeTextInput("placeholder",e.target.value,"text")}
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
    return  ModalEmailInputs;
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
      detailsTabs.push({
        title:`Tab ${index}`,
        value:`Tab ${index}`,
        componentTabs:[]
      });
    }
    if (this.state.typeInput!='') {
      var title = '';
      this.props.dispatch(dispatchAction({
        idModule:this.state.idModule,
        idForm:this.state.idForm,
        title:title,
        type:'tab',
        placeholder:'',
        detailsTabs:detailsTabs,
        selectOption:[],
        markValue :
        {
          center: {
            lat: -6.175392,
            lng: 106.827153
          },
          mark: {
            lat: -6.175392,
            lng: 106.827153
          },
          zoom: 8
        }
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
    tempDataComponent[0].detailsTabs[index].value = value;
    this.setState({tempDataComponent});
  }

  handleEditTabs= ()=> {
    var {tempDataComponent} = this.state;
    var {dataComponent}     = this.props;
    dataComponent[this.state.activeIndex] = tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalEditTabs(false);
  }
  // view tabs setting
  handleChangeTabNavigate = (role,value) => {
    if (role=="visibleTabSetting") {
      this.setState({[role]:value,visibleTabComponent:false})
    } else if (role=="visibleTabComponent") {
      this.setState({[role]:value,visibleTabSetting:false})
    }
  }
  //tab Komponent
  callback=(key) => {
  }

  handleActionTab = (actionType,indexTabs,indexComponent) => {
    var {tempDataComponent} =this.state;
    if(actionType=='delete'){
      tempDataComponent[0].detailsTabs[indexTabs].componentTabs.splice(indexComponent,1);
      this.setState({tempDataComponent});
    }else if (actionType=='edit'){
    }
    this.handleShowModalActionTab(false,indexTabs,indexComponent);
  }

  handleCancelModalTab = (visible) => {
    this.setState({visibleModalActionTab:visible})
  }
  handleModalActionTab = () => {
    var ModalActionTab = [];

    if (this.state.tempDataComponent.length > 0) {
      switch (this.state.activeActionTab) {
        case 'delete':
        ModalActionTab = (
          <Modal
            title={`Warning!`}
            visible={this.state.visibleModalActionTab}
            okText={'Ok'}
            cancelText={'Cancel'}
            onOk={()=>this.handleActionTab(this.state.activeActionTab,this.state.activeIndexTab,this.state.activeIndexTabComponent)}
            onCancel={()=>this.handleCancelModalTab(false)}
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
        ModalActionTab = (
          <Modal
            title={`Edit!`}
            visible={this.state.visibleModalActionTab}
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
    return ModalActionTab;
  }

  // metode crud Tab
  handleShowModalActionTab = (visible,indexTab,index,action,type,color) => {
    var {tempDataComponentTab} = this.state;
    if (action=="edit") {
      var mainIndex = this.state.activeIndex;
      switch (type) {
        case 'text' : 
          tempDataComponentTab[0] = this.props.dataComponent[mainIndex].detailsTabs[indexTab].componentTabs[index];
          this.setState({tempDataComponentTab,typeInputTab:'text', visibleModalTextInputsTab:visible,
          activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action})
          break;
        case 'number' : 
          tempDataComponentTab[0] = this.props.dataComponent[mainIndex].detailsTabs[indexTab].componentTabs[index];
          this.setState({tempDataComponentTab,typeInput:'number', visibleModalNumberInputsTab:visible,
          activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action})
          break;
        case 'email' : 
          tempDataComponentTab[0] = this.props.dataComponent[mainIndex].detailsTabs[indexTab].componentTabs[index];
          this.setState({tempDataComponentTab,typeInput:'email', visibleModalEmailInputsTab:visible,
          activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action})
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
        case 'radio' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,typeInput:'radio', visibleModalRadioButton:visible,activeIndex:index,activeAction:action})
          break;
        case 'date' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,visibleModalRadioButton:visible,activeIndex:index,activeAction:action})
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
      this.setState({tempDataComponentTab,typeInput:'',visibleModalActionTab:visible,activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action})
    }
  }

  // action drag Tab
  handleOnDragStartTab = (e,title,componentType) => {
    var initialdataDragTab = {
      idModule:this.state.idModule,
      idForm:this.state.idForm,
      title:title,
      type:componentType,
      placeholder:'',
      required:1,
      requiredOption:[],
      selectOption:['text','number','email']
    }
    this.tempdataDragTabs.splice(0,1,initialdataDragTab);
      switch (componentType) {
        case 'text' : 
          initialdataDragTab.title = "Text";
          initialdataDragTab.value = "Text";
          initialdataDragTab.postValue = "";
          initialdataDragTab.placeholder    = "enter text";
          initialdataDragTab.requiredOption = [];
          break;
        case 'number' : 
          initialdataDragTab.title = "Input Number";
          initialdataDragTab.value = "Input Number";
          initialdataDragTab.postValue = 0;
          initialdataDragTab.placeholder    = "enter number";
          initialdataDragTab.requiredOption = [];
          break;
        case 'email' : 
          initialdataDragTab.title = "Input Email";
          initialdataDragTab.value = "Input Email";
          initialdataDragTab.postValue = '';
          initialdataDragTab.placeholder    = "enter email";
          initialdataDragTab.requiredOption = [];
          break;
        case 'textarea' : 
          initialdataDragTab.title = "TextArea";
          initialdataDragTab.value = "TextArea";
          initialdataDragTab.postValue = '';
          initialdataDragTab.placeholder    = "Placeholder";
          initialdataDragTab.requiredOption = [];
          break;
        case 'label' : 
          initialdataDragTab.title = "Label";
          initialdataDragTab.value = "Label";
          initialdataDragTab.placeholder = "Placeholder";
          initialdataDragTab.requiredOption = [];
          break;
        case 'dropdown' : 
          initialdataDragTab.value       = 'Select Items';
          initialdataDragTab.placeholder = 'Select Option';
          initialdataDragTab.type        = 'dropdown';
          initialdataDragTab.postValue = '';
          initialdataDragTab.requiredOption = [];
          initialdataDragTab.detailsDropDown = [
            {
              title:'Option 1',
              value:'Option 1'
            }
          ];
          break;
        case 'radio' : 
          initialdataDragTab.value       = 'Chose Items';
          initialdataDragTab.placeholder = 'Select Option';
          initialdataDragTab.postValue = '';
          initialdataDragTab.requiredOption = [];
          initialdataDragTab.detailsRadioButton = [
            {
              title:'Option 1',
              value:'Option 1'
            }
          ];
          break;
        case 'date' : 
          initialdataDragTab.value = "Date";
          initialdataDragTab.requiredOption = [];
          initialdataDragTab.postValue = moment(new Date());
          break;
        case 'checklist' : 
          initialdataDragTab.value = 'List Items';
          initialdataDragTab.requiredOption = [];
          initialdataDragTab.postValue =[];
          initialdataDragTab.detailsCheckList = [
            {
              title:'CheckList 1',
              value:'Checklist 1'
            }
          ];
          break;
        case 'file' : 
          initialdataDragTab.value = 'File Upload';
          initialdataDragTab.requiredOption = [];
          initialdataDragTab.postValue = '';
          break;

          default:
          this.dragStatusTabs=true;
      }
      this.dragStatusTabs=true;
  }

  handleDragComponentTab = (index) => {
    if(this.tempdataDragTabs.length > 0 && this.dragStatusTabs==true){
      var tempDataComponent = this.state.tempDataComponent;
      tempDataComponent[0].detailsTabs[index].componentTabs.push(this.tempdataDragTabs[0]);
      
      this.setState({tempDataComponent});
      this.tempdataDragTabs = [];
      this.dragStatusTabs   = false;
    }
  } 
  //render component tab
  renderTabComponent = () => {
    var TabComponent = [];
    TabComponent = (
      <Row type={"flex"} align={'start'}>
        <Col span={16} style={{marginTop:25,height:400}}>
          {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].detailsTabs!=undefined ? this.state.tempDataComponent[0].detailsTabs.length > 0 ? 
            <Tabs onChange={()=>this.callback()} type="card">{
              this.state.tempDataComponent[0].detailsTabs.map((obj,i)=>{
                return (
                  <TabPane 
                    key={i}
                    style={{backgroundColor:'#fafafa',height:345,overflowY:'scroll',borderTopLeftRadius:2,borderBottomLeftRadius:2, borderColor:'#fafafa',border:'2px solid #fafafa'}} tab={obj.value} key={i}> 
                    <Row 
                      onDragOver={()=>this.handleDragComponentTab(i)}
                      span={24} style={{zbackgroundColor:'#fafafa',height:345,paddingTop:10, paddingLeft:15}}>{
                      obj.componentTabs.map((compTab,t)=>{
                        return (
                          <Row
                          type={'flex'}
                          align={'left'}
                          span={24}
                          data-key={t}
                          style={{backgroundColor:'#ededed', marginRight: 15, paddingLeft: 15,paddingTop: 10,paddingBottom: 5,marginBottom: 15}}
                          key={t} type='flex' justify='left' align='middle'>
                            <CommonComponentTab
                              key={t}
                              items={compTab}
                              index={t}
                              title={compTab.title}
                              value={compTab.value}
                              color={compTab.color}
                              placeholder={compTab.placeholder}
                              type={compTab.type}
                              span={18}
                              handleChangeUpload={this.handleChangeUpload}
                            />
                            <Col span={6}>
                              <Row style={{padding:'15px 10px 10px 10px'}}>
                                <Col span={12}>
                                  <Button onClick={()=>this.handleShowModalActionTab(true,i,t, "edit",compTab.type,'')} style={{marginRight: 20}} icon={'setting'}></Button>
                                </Col>
                                <Col span={12}>
                                  <Button onClick={()=>this.handleShowModalActionTab(true,i, t, "delete",compTab.type,'')} icon={'delete'}></Button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        )
                      })}
                    </Row>
                  </TabPane>
                )
              })
            }
          </Tabs>
          :
          <Row span={24} type={'flex'} align={'end'}>
            <Col span={9}>
              <div onClick={()=>this.handleChangeTabNavigate("visibleTabSetting",true)} style={{
              marginTop:20,
              marginRight:20,
              width:100,
              height:30,
              paddingTop:4,
              paddingBottom:8,
              borderRadius:5,
              backgroundColor:'#ef2f2f',
              cursor:'pointer',
              textAlign:'center',
              color:'#fff',
              fontWeight:'500'
              }}>
                Add Tab First
              </div>
            </Col>
          </Row>
          :[]
          :
          []
          }
        </Col>
        {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].detailsTabs!=undefined ? this.state.tempDataComponent[0].detailsTabs.length > 0 ?
          <Col 
            style={{backgroundColor:'#fafafa',height:345,marginTop:30,borderRadius:3,borderBottomLeftRadius:0,paddingTop:5,paddingLeft:5,paddingRight:5,overflowY:'scroll'}} span={8}>
              <Row type='flex' justify='left'
                style={{padding:'10px 10px 10px 10px', backgroundColor: '#dedede'}}
                onDragStart={(e)=>this.handleOnDragStartTab(e,"Text Input","text")}
                draggable
                >
                  <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                    <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >Text Input</span>
                  </Button>
              </Row>
              <Row type='flex' justify='left'
              style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"Number Input","number")}
              draggable
              >
                <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                  <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >Number Input</span>
                </Button>
              </Row>
              <Row type='flex' justify='left'
                style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede'}}
                onDragStart={(e)=>this.handleOnDragStartTab(e,"Email Input","email")}
                draggable
                >
                <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                  <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >Email Input</span>
                </Button>
              </Row>
              <Row type='flex' justify='left'
                style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede'}}
                onDragStart={(e)=>this.handleOnDragStartTab(e,"Text Area","textarea")}
                draggable
                >
                <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                  <Icon type="read" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >Text Area</span>
                </Button>
              </Row>
              <Row type='flex' justify='left'
                style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede'}}
                onDragStart={(e)=>this.handleOnDragStartTab(e,"Lable","label")}
                draggable
                >
                <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                  <Icon type="font-size" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >Label</span>
                </Button>
              </Row>
              <Row type='flex' justify='left'
                style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede'}}
                onDragStart={(e)=>this.handleOnDragStartTab(e,"dropdown","dropdown")}
                draggable
                >
                <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                  <Icon type="align-left" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >dropdown</span>
                </Button>
              </Row>
              <Row type='flex' justify='left'
                style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede'}}
                onDragStart={(e)=>this.handleOnDragStartTab(e,"Radio","radio")}
                draggable
                >
                <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                  <Icon type="ordered-list" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >Radio Button</span>
                </Button>
              </Row>
              <Row type='flex' justify='left'
                style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede'}}
                onDragStart={(e)=>this.handleOnDragStartTab(e,"Date","date")}
                draggable
                >
                <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                  <Icon type="clock-circle" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >Date Time</span>
                </Button>
              </Row>
              <Row type='flex' justify='left'
                style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede'}}
                onDragStart={(e)=>this.handleOnDragStartTab(e,"Checklist","checklist")}
                draggable
                >
                <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                  <Icon type="ordered-list" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >CheckList Option</span>
                </Button>
              </Row>
              <Row type='flex' justify='left'
                style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede'}}
                onDragStart={(e)=>this.handleOnDragStartTab(e,"Upload FIle","file")}
                draggable
                >
                <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                  <Icon type="upload" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >File Upload</span>
                </Button>
              </Row>
          </Col>
          :
          []
          :
          []
          :
          []
        }
      </Row>
    )
    return TabComponent;
  }
  
  handleDeletTab = (index) => {
    var {tempDataComponent} =this.state;
    tempDataComponent[0].detailsTabs.splice(index,1);
    this.setState({tempDataComponent});
  }
  handleAddTabs = () => {
    var {tempDataComponent} =this.state;
    var index = tempDataComponent[0].detailsTabs.length;
    tempDataComponent[0].detailsTabs.push({
      title:`Tab ${index++}`,
      value:`Tab ${index++}`,
      componentTabs:[]
    })
    this.setState({tempDataComponent});
  }

  //tab Setting
  renderTabSetting = () => {
    var TabSetting = [];
    TabSetting = (
      <Row type={"flex"} align={'start'}>
        <Col span={12} style={{marginTop:20, padding:5}}>
          {this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].type=='tab' ? this.state.tempDataComponent[0].detailsTabs.length > 0 ? 
            this.state.tempDataComponent[0].detailsTabs.map((items,i)=>{
              return (
                <Col key={i}>
                  <Row style={{marginBottom: 15}}>
                    <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Tab {i+Number(1)} Title</span>
                  </Row>
                  <Row span={24} style={{marginBottom: 20}} type={'flex'} align={'space-start'}>
                    <Col span={18}>
                      <Input
                        value={items.value}
                        onChange={(e)=>this.handleOnChangeInputDetailsTabs(e.target.value,i)}
                      />
                    </Col>
                    <Col span={3} onClick={()=>this.handleDeletTab(i)} style={{
                      marginLeft:10,
                      width:34,
                      height:29,
                      paddingTop:4,
                      paddingBottom:8,
                      borderRadius:5,
                      backgroundColor:'#ed3f3f',
                      cursor:'pointer',
                      alignItems:'center',
                      marginTop:2
                    }}>
                      <div style={{color:'#fff', fontSize:14,textAlign:'center'}}>X</div>
                    </Col>
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
          <Row span={24} type={'flex'} align={'end'}>
            <Col span={8}>
              <div onClick={()=>this.handleAddTabs()} style={{
               width:75,
               height:30,
               paddingTop:4,
               paddingBottom:8,
               borderRadius:5,
               backgroundColor:'#2faf2f',
               cursor:'pointer',
               textAlign:'center',
               color:'#fff',
               fontWeight:'500'
              }}>
                Add Tab
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
        
        </Col>
      </Row>
    )
    return TabSetting;
  }
  //render Body Tabs
  renderBodyTabs = () => {
    var BodyTabs = [];
    BodyTabs = (
      <Row type={"flex"} align={'start'}>
        <Col span={24}>
          {this.state.visibleTabSetting ? this.renderTabSetting() : this.renderTabComponent()}
        </Col>
      </Row>
    )
    return BodyTabs;
  }

  renderModalEditTabs = () =>{
    var ModalEditTabs =[];
    ModalEditTabs = (
      <Modal
        title={``}
        width={750}
        bodyStyle={{backgroundColor:'#ededed' }}
        visible={this.state.visibleModalEditTabs}
        okText={'Submit'}
        cancelText={'Cancel'}
        background
        onOk={()=>this.handleEditTabs()}
        style={{backgroundColor:'#ccc',top:20}}
        onCancel={()=>this.handleShowModalEditTabs(false)}
        >
        <Col type={'flex'} align={'left'} 
        >
          <Row>
            {/* Header Tab */}
            <Col>
              <Row type={'flex'} align={'center'} style={{marginTop:15}}>
                <Col span ={7} style={{backgroundColor:'#ededed',padding:4,borderRadius:10}}>
                  <Col span={23} style={{position:'absolute', backgroundColor:'#fff',
                    height:10,
                    top:12,
                    borderRadius:2
                  }}>
                  </Col>
                  <Row type={'flex'} align={'space-between'}>
                    <Col onClick={()=>this.handleChangeTabNavigate("visibleTabSetting",true)} style={{
                      zIndex:10,
                      width:26,
                      height:26,
                      padding:6,
                      borderRadius:13,
                      backgroundColor:'#fff',
                      cursor:'pointer'
                    }}>
                      <Col style={{
                        zIndex:11,
                        width:14,
                        height:14,
                        borderRadius:7,
                        backgroundColor:this.state.visibleTabSetting ? '#4f4fef' :'#ededed'
                      }}>
                      </Col>
                    </Col>
                    <Col onClick={()=>this.handleChangeTabNavigate("visibleTabComponent",true)} style={{
                      zIndex:10,
                      width:26,
                      height:26,
                      padding:6,
                      borderRadius:13,
                      backgroundColor:'#fff',
                      cursor:'pointer'
                    }}>
                      <Col style={{
                        zIndex:11,
                        width:14,
                        height:14,
                        borderRadius:7,
                        backgroundColor:this.state.visibleTabComponent ? '#4f4fef' :'#ededed'
                      }}>
                      </Col>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row type={'flex'} align={'center'} style={{marginTop:6}}>
                <Col span ={8}>
                  <Row type={'flex'} align={'space-between'}>
                    <Col>Tab Setting</Col>
                    <Col>Tab Component</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            {/* Body Tab Setting */}
            <Col>
              {this.renderBodyTabs()}
            </Col>
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

  // add Map
  handleShowAddMap=(visible)=>{
    this.setState({
      visibleModalAddMap:visible
    })
  }
  handleShowEditMap=(visible)=>{
    this.setState({
      visibleModalEditMap:visible
    })
  }
  
  handleAddMap = () =>{
    var tempContinue = true;
    var {tempDataComponent}= this.state;
    var templat = Number(tempDataComponent[0].markValue.mark.lat);
    var templng = Number(tempDataComponent[0].markValue.mark.lng);
    
    if (isNaN(templat) || isNaN(templng)){
      tempContinue=false;
      Modal.error({
        title: 'Error !',
        content: (
          <div>
            <p>Please Enter Valid Latitude and Longiude Value</p>
          </div>
        ),
        onOk() {},
      });
    }

    if (tempContinue) {
      var koordinat = {
        lat:templat,
        lng:templng
      }

      tempDataComponent[0].markValue.mark=koordinat;
      tempDataComponent[0].markValue.center=koordinat;
      this.props.dispatch(dispatchAction(tempDataComponent[0],Const.ADD_COMPONENT))
      this.handleShowAddMap(false);
    }

  }

  handleEditMap = () =>{
    var tempContinue = true;
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    var templat = Number(tempDataComponent[0].markValue.mark.lat);
    var templng = Number(tempDataComponent[0].markValue.mark.lng);
    if (isNaN(templat) || isNaN(templng)){
      tempContinue=false;
      Modal.error({
        title: 'Error !',
        content: (
          <div>
            <p>Please Enter Valid Latitude and Longiude Value</p>
          </div>
        ),
        onOk() {},
      });
    }
    if (tempContinue) {
      var koordinat = {
        lat:templat,
        lng:templng
      }

      tempDataComponent[0].markValue.mark=koordinat;
      tempDataComponent[0].markValue.center=koordinat;
      dataComponent[this.state.activeIndex] =  tempDataComponent[0];
      this.props.dispatch(dispatchAction(tempDataComponent,Const.EDIT_COMPONENT))
      this.handleShowEditMap(false);
    }    
  }

  handleOnChangeInputDetailsMap = (name, value) =>{
    var {tempDataComponent} = this.state;
    tempDataComponent[0]['type'] = 'map';
    if (name=='title'){
      tempDataComponent[0][name] = value;
    }else {
      tempDataComponent[0]['title']  = tempDataComponent[0].title;
      tempDataComponent[0]['markValue']['mark'][name]   = value;
      tempDataComponent[0]['markValue']['center'][name] = value;
    }
    this.setState({tempDataComponent});
  }

  renderModalAddMap = () =>{
    var ModalAddMap =[];
    ModalAddMap = (
      <Modal
        title={`Add Map Option`}
        width={420}
        visible={this.state.visibleModalAddMap}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleAddMap()}
        onCancel={()=>this.handleShowAddMap(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Row style={{marginBottom: 15}}>
              <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Title Map</span>
            </Row>
            <Row style={{marginBottom: 20}}>
              <Input
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].markValue!=undefined ? this.state.tempDataComponent[0].title:'' :''}
                onChange={(e)=>this.handleOnChangeInputDetailsMap("title",e.target.value)}/>
            </Row>
            <Row style={{marginBottom: 15}}>
              <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Latitude</span>
            </Row>
            <Row style={{marginBottom: 20}}>
              <Input
                type="text"
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].markValue!=undefined ? this.state.tempDataComponent[0].markValue.mark.lat:'' :''}
                onChange={(e)=>this.handleOnChangeInputDetailsMap("lat",e.target.value)}/>
            </Row>
            <Row style={{marginBottom: 15}}>
              <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Longitude</span>
            </Row>
            <Row style={{marginBottom: 20}}>
              <Input
                type="text"
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].markValue.mark.lng:''}
                onChange={(e)=>this.handleOnChangeInputDetailsMap("lng",e.target.value)}/>
            </Row>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalAddMap;
  } 

  renderModalEditMap = () =>{
    var ModalEditMap =[];
    ModalEditMap = (
      <Modal
        title={`Add Map Option`}
        width={420}
        visible={this.state.visibleModalEditMap}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditMap()}
        onCancel={()=>this.handleShowEditMap(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Row style={{marginBottom: 15}}>
              <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Title Map</span>
            </Row>
            <Row style={{marginBottom: 20}}>
              <Input
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].title:''}
                onChange={(e)=>this.handleOnChangeInputDetailsMap("title",e.target.value)}/>
            </Row>
            <Row style={{marginBottom: 15}}>
              <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Latitude</span>
            </Row>
            <Row style={{marginBottom: 20}}>
              <Input
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].markValue!=undefined ? this.state.tempDataComponent[0].markValue.mark.lat:'':''}
                onChange={(e)=>this.handleOnChangeInputDetailsMap("lat",e.target.value)}/>
            </Row>
            <Row style={{marginBottom: 15}}>
              <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Longitude</span>
            </Row>
            <Row style={{marginBottom: 20}}>
              <Input
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].markValue!=undefined ? this.state.tempDataComponent[0].markValue.mark.lng:'' :''}
                onChange={(e)=>this.handleOnChangeInputDetailsMap("lng",e.target.value)}/>
            </Row>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalEditMap;
  }

  // show Preview
  handleGotoPreview =(visible) => {
    var {dataComponent} = this.props;
    this.setState({
      tempPostDataComponent:dataComponent
    },this.setState({visibleModalPreview:visible}))
    
  }

  handleChangeDropDown = (value, items, index) => {
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue=value;
    this.setState({tempPostDataComponent});
  }

  handleChangeRadioButton = (value, items, index) => {
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue=value.target.value;
    this.setState({tempPostDataComponent});
  }

  handleChangeDateTime = (value, items, index) => {
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue=value.target.value;
    this.setState({tempPostDataComponent});
  }

  handleChangeCheckList = (value, items, index) => {
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue=value;
    this.setState({tempPostDataComponent});
  }

  handleChangeUploadPost = (info,items,index) => {
    var {tempPostDataComponent} = this.state;
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      tempPostDataComponent[index].postValue=info.file.name;
      this.setState({tempPostDataComponent});
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleSaveForm = () => {
    this.handleGotoPreview(false);
  }

  renderPushError= () => {

  }

  statusCheck = {
    checkText:false,
    checkNumber:false,
    checkEmail:false,
    checkTextArea:false,
    checkDropDown:false,
    checkRadio:false,
    checkDateTime:false,
    checkListOption:false,
    checkFileUpload:false


  }
  // add InputChange Preview
  handleOnChageInputPreview = (value, items, index) => {
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue=value.target.value;
    this.setState({tempPostDataComponent});
  }

  handleChangeStatusCheck = (type,value) => {
    this.statusCheck [type] = value;
  }

  handleCancelSubmitForm = (visible) => {
    this.setState({visibleModalPreview:visible,statusCheck:{
      checkText:false
    }});
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
        onCancel={()=>this.handleCancelSubmitForm(false)}
        >
          <Col type={'flex'} align={'left'}>
            <Card>
              {this.state.tempPostDataComponent.length > 0 ? 
                this.state.tempPostDataComponent.map((items,i)=>{
                  return (
                    <Row
                        data-key={i}
                        style={{paddingTop: 5}}
                        key={i} type='flex' justify='left' align='middle'>
                        <CommonPreviewComponent
                            key={i}
                            statusCheck={this.statusCheck}
                            handleChangeStatusCheck={this.handleChangeStatusCheck}
                            handleChangeDropDown={this.handleChangeDropDown}
                            handleChangeRadioButton={this.handleChangeRadioButton}
                            handleChangeDateTime={this.handleChangeDateTime}
                            handleChangeCheckList={this.handleChangeCheckList}
                            handleChangeUploadPost={this.handleChangeUploadPost}
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
                            handleOnChageInputPreview={this.handleOnChageInputPreview}
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
      {this.renderModalTextInputs()}
      {this.renderModalNumberInputs()}
      {this.renderModalEmailInputs()}
      {this.renderModalPreview()}
      {this.renderModalPreviewCode()}
      {this.handleModalAction()}
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
      {this.handleModalActionTab()}
      {this.renderModalAddMap()}
      {this.renderModalEditMap()}
      
      {/* renderModalTab */}
      {this.renderModalTextInputsTab()}
      {this.renderModalNumberInputsTab()}
      {this.renderModalEmailInputsTab()}
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
                  style={{padding:'10px 10px 10px 10px', backgroundColor: '#dedede', marginRight: 10,marginTop:10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Text Input","text")}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Text Input</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='left'
                  style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Number Input","number")}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Number Input</span>
                    </Button>
                  </Row>
                  <Row type='flex' justify='left'
                  style={{padding:'0px 10px 10px 10px', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Email Input","email")}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Email Input</span>
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
                  <Row type='flex' justify='left'
                    style={{padding:'0px 10px 10px 10px',backgroundColor:'#dedede',marginRight:10}}
                    onDragStart={(e)=>this.handleOnDragStart(e,"Map","map")}
                    draggable>
                    <Button style={{width:'100%',height:40,textAlign:"left"}} type={'dashed'}>
                      <Icon type="environment" theme="outlined" /><span style={{fontWeight:'400',fontSize:17,color:'#999'}}>MAP</span>
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
