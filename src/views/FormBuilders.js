import React, { Component } from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select, Checkbox, Alert, DatePicker,
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
import {dispatchAction,dispatchActionTab, apiCall, commonDispatch} from './../actions';
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
    idWorkFlow:0,
    idForm:0,
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
    visibleModalRangeDate:false,
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
    idWorkFlow:0
  };

  tempDataT7an =[];

  componentWillMount =() => {
    var idWorkFlow = this.props.match.params.idWorkFlow;
    var idForm   = this.props.match.params.idForm;
    this.setState({idWorkFlow,idForm});
    this.handleLoadDetailForm();
    this.handleClearStatusCheck();
  }

  handleGetLoadDetailForm = (callback,scope) => {
    if (callback.data.data.status=true) {
      var {dataComponent}=scope.props;
      dataComponent=callback.data.data.form ? callback.data.data.form : [];
      scope.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT));
    }else {
      scope.props.dispatch(dispatchAction([],Const.EDIT_COMPONENT));
    }
  }

  handleLoadDetailForm = () =>{
    var api   = `${Const.GET_FORMDETAIL}`;
    var header = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    apiCall.get(api,header,this.handleGetLoadDetailForm,this);
    
  } 

  componentDidMount = () => {
    // var detailsTabs = [];
    // var index = 0;
    // for (var i=0;i < 2;i++) {
    //   index++;
    //   detailsTabs.push({
    //     title:`Tab ${index}`,
    //     value:`Tab ${index}`,
    //     componentTabs:[]
    //   });
    // }
    // var title = '';
    // this.props.dispatch(dispatchAction({
    //   idWorkFlow:this.state.idWorkFlow,
    //   idForm:this.state.idForm,
    //   title:title,
    //   type:'tab',
    //   placeholder:'',
    //   requiredOption:[],
    //   detailsTabs:detailsTabs,
    //   markValue :
    //   {
    //     center: {
    //       lat: -6.175392,
    //       lng: 106.827153
    //     },
    //     mark: {
    //       lat: -6.175392,
    //       lng: 106.827153
    //     },
    //     zoom: 8
    //   },
    //   selectOption:[],
    //   postValue:'',
    //   selectOption:[]
    // },Const.ADD_COMPONENT))
  }

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
      idWorkFlow:this.state.idWorkFlow,
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
          initialdataDrag.selectOption = ['Cancel','Submit'];
          initialdataDrag.color = "primary";
          initialdataDrag.value = "Button";
          initialdataDrag.postValue = "Submit";
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
        case 'rangedate' : 
          initialdataDrag.value = {startDate:"Start Date",endDate:"End Date"};
          initialdataDrag.requiredOption = [];
          initialdataDrag.postValue = [{startDate:new Date().getTime(),endDate:new Date().getTime()}];
          break;
        case 'date' : 
          initialdataDrag.value = "Range Date";
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
          this.setState({tempDataComponent,visibleModalDateTime:visible,activeIndex:index,activeAction:action})
          break;
        case 'rangedate' : 
          tempDataComponent[0] = this.props.dataComponent[index];
          this.setState({tempDataComponent,visibleModalRangeDate:visible,activeIndex:index,activeAction:action})
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
        case 'rangeDate' :
          if (name=="startDate"){
            tempDataComponent[0].value.startDate = value;
          } else {
            tempDataComponent[0].value.endDate = value;
          }
          this.setState({tempDataComponent});
        break;
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
      if (items!=undefined && items.idWorkFlow==this.state.idWorkFlow && items.idForm==this.state.idForm) {
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
    var tempDataRequiredTabValue = [];
    var {tempPostDataComponent} = this.state;
    if (this.state.tempPostDataComponent.length > 0) {
      this.state.tempPostDataComponent.map((obj,i)=>{
        var tempRequired = '';
        if (obj.type!='tab'){
          obj.requiredOption.filter((required)=> { 
            if (required == 'required'){
              tempRequired = required;
            }
          });
          if (tempRequired=='required' && obj.postValue.length==0){
            tempDataRequiredTabValue.push(false);
          }
        }else {
          var tempRequiredTabValue     = true;
          obj.detailsTabs.map((tab,z)=>{
            tab.componentTabs.map((comptab,x)=>{
              var tempRequiredTab = '';
              comptab.requiredOption.filter((requiredTab)=> { 
                if (requiredTab == 'required'){
                  tempRequiredTab = requiredTab;
                }
              });
              if (tempRequiredTab=='required'){
                if (comptab.postValue.length==0){
                  tempDataRequiredTabValue.push(false);
                  tempPostDataComponent[i].detailsTabs[z].componentTabs[x].firstCheck=true;
                  
                } else {
                  if (comptab.type=="email"){
                    var checkEmail = this.handleValidateEmail(comptab.postValue);
                    if (checkEmail==false){
                      tempDataRequiredTabValue.push(false);
                      tempPostDataComponent[i].detailsTabs[z].componentTabs[x].firstCheck=true;
                    }
                  }
                }
              }
            });
          })
        }
      });
    }
    if (tempContinue && tempDataRequiredTabValue.length==0) {
      this.handleSaveForm();
    }
    this.setState({tempPostDataComponent});
  }

  validateDetailsTabs=true

  handleChangeValidateDetailTabs = (value)=> {
    this.validateDetailsTabs = value;
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
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT));
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
    dataComponent[this.state.activeIndex].detailsTabs[this.state.activeIndexTab].componentTabs[this.state.activeIndexTabComponent] =  tempDataComponentTab[0];
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
  
  // add TextArea Tab
  handleShowModalTextAreaTab = (visible) => {
    this.setState({
      visibleModalTextAreaTab:visible
    })
  }

  handleOnChangeTextInputTab = (name,value,typeChange) => {
    var {tempDataComponentTab} = this.state;
    tempDataComponentTab[0][name] = value;
    this.setState({tempDataComponentTab})
  }

  handleEditTextAreaTab = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponentTab}   = this.state;
    dataComponent[this.state.activeIndex].detailsTabs[this.state.activeIndexTab].componentTabs[this.state.activeIndexTabComponent] =  tempDataComponentTab[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalTextAreaTab(false);
  }

  renderModalTextAreaTab = () =>{
    var ModalTextAreaTab =[];
    ModalTextAreaTab = (
      <Modal
        title={`Add TextArea`}
        width={350}
        visible={this.state.visibleModalTextAreaTab}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditTextAreaTab()}
        onCancel={()=>this.handleShowModalTextAreaTab(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].value: ''}
                  onChange={(e)=>this.handleOnChangeTextInputTab("value",e.target.value)}
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
    return  ModalTextAreaTab;
  }

  // add Label Tab
    handleShowModalLabelTab = (visible) => {
    this.setState({
      visibleModalLabelTab:visible
    })
  }
  
  handleEditLabelTab = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponentTab}   = this.state;
    dataComponent[this.state.activeIndex].detailsTabs[this.state.activeIndexTab].componentTabs[this.state.activeIndexTabComponent] =  tempDataComponentTab[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalLabelTab(false);
  }

  renderModalLabelTab = () =>{
    var ModalLabelTab =[];
    ModalLabelTab = (
      <Modal
        title={`Add Label`}
        width={350}
        visible={this.state.visibleModalLabelTab}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditLabelTab()}
        onCancel={()=>this.handleShowModalLabelTab(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].value: ''}
                  onChange={(e)=>this.handleOnChangeTextInputTab("value",e.target.value)}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Modal>
    );
    return  ModalLabelTab;
  }

  // add DropDown Tab
  handleEditDropDownTab = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponentTab}   = this.state;
    dataComponent[this.state.activeIndex].detailsTabs[this.state.activeIndexTab].componentTabs[this.state.activeIndexTabComponent] =  tempDataComponentTab[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalDropDownTab(false);
  }

  handleShowModalDropDownTab = (visible) => {
    this.setState({
      visibleModalDropDownTab:visible
    })
  }
  
  handleDeleteDropDownTab = (index) => {
    var {tempDataComponentTab} =this.state;
    tempDataComponentTab[0].detailsDropDown.splice(index,1);
    this.setState({tempDataComponentTab});
  }

  handleAddDropDownTab = () => {
    var {tempDataComponentTab} =this.state;
    var index = tempDataComponentTab[0].detailsDropDown.length;
    tempDataComponentTab[0].detailsDropDown.push({
      title:`New Select Option ${index++}`,
      value:`New Select Option ${index++}`
    })
    this.setState({tempDataComponentTab});
  }

  handleOnChangeInputDetailsDropDownTab =(name,value,index) =>{
    var {tempDataComponentTab} =this.state;
    tempDataComponentTab[0].detailsDropDown[index][name] = value;
    tempDataComponentTab[0].detailsDropDown[index].title = value;
    this.setState({tempDataComponentTab});
  }

  renderModalEditDropDownTab = () =>{
    var ModalDropDownTab =[];
    ModalDropDownTab = (
      <Modal
        title={`Add DropDown Option`}
        width={420}
        visible={this.state.visibleModalDropDownTab}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditDropDownTab()}
        onCancel={()=>this.handleShowModalDropDownTab(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Title</span>
              </Row>
              <Row style={{marginBottom: 20}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].value : ''}
                  onChange={(e)=>this.handleOnChangeInputTabs("value",e.target.value)}/>
              </Row>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Placeholder</span>
              </Row>
              <Row style={{marginBottom: 20}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].placeholder : ''}
                  onChange={(e)=>this.handleOnChangeInputTabs("placeholder",e.target.value)}/>
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
              <Row/>
                {this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].type=='dropdown' ? this.state.tempDataComponentTab[0].detailsDropDown.length > 0 ? 
                this.state.tempDataComponentTab[0].detailsDropDown.map((items,i)=>{
                  return (
                    <Card key={i} style={{ width: '100%', marginBottom:10}}>
                      <Row>
                        <Col span={4} style={{marginTop:3}}>
                          <span style={{fontSize: 14, fontWeight: '500', color:'#666'}}>Title</span>
                        </Col>
                        <Col span={14} style={{marginBottom: 5,paddingRight:10}}>
                          <Input
                            value={items.value}
                            onChange={(e)=>this.handleOnChangeInputDetailsDropDownTab("value", e.target.value,i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"danger"}
                            icon={"delete"}
                            onClick={()=>this.handleDeleteDropDownTab(i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"primary"}
                            icon={"plus-circle"}
                            onClick={()=>this.handleAddDropDownTab()}
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
                    onClick={()=>this.handleAddDropDownTab()}
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
    return  ModalDropDownTab;
  }

  // add Radio Tab
  handleShowModalRadioButtonTab = (visible) => {
    this.setState({
      visibleModalRadioButtonTab:visible
    })
  }

  handleOnChangeInputDetailsRadioButtonTab =(name,value,index) =>{
    var {tempDataComponentTab} =this.state;
    tempDataComponentTab[0].detailsRadioButton[index][name] = value;
    tempDataComponentTab[0].detailsRadioButton[index].title = value;
    this.setState({tempDataComponentTab});
  }

  handleDeleteRadioButtonTab = (index) => {
    var {tempDataComponentTab} =this.state;
    tempDataComponentTab[0].detailsRadioButton.splice(index,1);
    this.setState({tempDataComponentTab});
  }

  handleAddRadioButtonTab = () => {
    var {tempDataComponentTab} =this.state;
    var index = tempDataComponentTab[0].detailsRadioButton.length;
    tempDataComponentTab[0].detailsRadioButton.push({
      title:`New Option ${index++}`,
      value:`New Option ${index++}`
    })
    this.setState({tempDataComponentTab});
  }

  handleEditRadioButtonTab = () => {
    var {tempDataComponentTab} = this.state;
    var {dataComponent}     = this.props;
    dataComponent[this.state.activeIndex].detailsTabs[this.state.activeIndexTab].componentTabs[this.state.activeIndexTabComponent] = tempDataComponentTab[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalRadioButtonTab(false);
  }

  renderModalEditRadioButtonTab = () =>{
    var ModalRadioButtonTab =[];
    ModalRadioButtonTab = (
      <Modal
        title={`Add RadioButton Option`}
        width={420}
        visible={this.state.visibleModalRadioButtonTab}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditRadioButtonTab()}
        onCancel={()=>this.handleShowModalRadioButtonTab(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Title</span>
              </Row>
              <Row style={{marginBottom: 15}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].title:''}
                  onChange={(e)=>this.handleOnChangeInputTabs("title",e.target.value)}/>
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
              <Row/>
                {this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].type=='radio' ? this.state.tempDataComponentTab[0].detailsRadioButton.length > 0 ? 
                this.state.tempDataComponentTab[0].detailsRadioButton.map((items,i)=>{
                  return (
                    <Card key={i} style={{ width: '100%', marginBottom:10}}>
                      <Row>
                        <Col span={4} style={{marginTop:3}}>
                          <span style={{fontSize: 14, fontWeight: '500', color:'#666'}}>Title</span>
                        </Col>
                        <Col span={14} style={{marginBottom: 5,paddingRight:10}}>
                          <Input
                            value={items.value}
                            onChange={(e)=>this.handleOnChangeInputDetailsRadioButtonTab("value", e.target.value,i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"danger"}
                            icon={"delete"}
                            onClick={()=>this.handleDeleteRadioButtonTab(i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"primary"}
                            icon={"plus-circle"}
                            onClick={()=>this.handleAddRadioButtonTab()}
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
                    onClick={()=>this.handleAddRadioButtonTab()}
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
    return  ModalRadioButtonTab;
  } 

  
  // add Date Tab
  handleShowModalDateTimeTab = (visible) => {
    this.setState({
      visibleModalDateTimeTab:visible
    })
  }

  handleShowModalTableTab=(visible)=>{
    this.setState({
      visibleModalEditTableTab:visible
    })
  }

  handleEditDateTimeTab = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponentTab}   = this.state;
    dataComponent[this.state.activeIndex].detailsTabs[this.state.activeIndexTab].componentTabs[this.state.activeIndexTabComponent] =  tempDataComponentTab[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalDateTime(false);
  }

  renderModalDateTimeTab = () =>{
    var ModalDateTimeTab =[];
    ModalDateTimeTab = (
      <Modal
        title={`Add Date`}
        width={350}
        visible={this.state.visibleModalDateTimeTab}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditDateTimeTab()}
        onCancel={()=>this.handleShowModalDateTimeTab(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Date</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].value: ''}
                  onChange={(e)=>this.handleOnChangeInputTabs("value",e.target.value)}
                />
              </Row>
              {this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].requiredOption ? 
                <Row style={{marginBottom: 15}}>
                  <Col>
                    <CheckboxGroup options={this.state.requiredOption} value ={this.state.tempDataComponentTab[0].requiredOption} onChange={(text)=>this.handleChangeRequiredOption("requiredOption",text)} />
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
    return  ModalDateTimeTab;
  }

  // add checklist Tab
  handleShowModalChecklistTab=(visible)=>{
    this.setState({
      visibleModalChecklistTab:visible
    })
  }

  handleOnChangeInputDetailsChecklistTab =(name,value,index) =>{
    var {tempDataComponentTab} =this.state;
    tempDataComponentTab[0].detailsCheckList[index][name] = value;
    tempDataComponentTab[0].detailsCheckList[index].title = value;
    this.setState({tempDataComponentTab});
  }

  handleDeleteCheckListTab = (index) => {
    var {tempDataComponentTab} =this.state;
    tempDataComponentTab[0].detailsCheckList.splice(index,1);
    this.setState({tempDataComponentTab});
  }

  handleAddCheckListTab = () => {
    var {tempDataComponentTab} =this.state;
    var index = tempDataComponentTab[0].detailsCheckList.length;
    tempDataComponentTab[0].detailsCheckList.push({
      title:`New CheckList ${index++}`,
      value:`New CheckList ${index++}`
    })
    this.setState({tempDataComponentTab});
  }

  handleEditChecklistTab = () => {
    var {tempDataComponentTab} = this.state;
    var {dataComponent}     = this.props;
    dataComponent[this.state.activeIndex].detailsTabs[this.state.activeIndexTab].componentTabs[this.state.activeIndexTabComponent] = tempDataComponentTab[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalChecklistTab(false);
  }

  renderModalEditChecklistTab = () =>{
    var ModalChecklistTab =[];
    ModalChecklistTab = (
      <Modal
        title={`Add CheckList Option`}
        width={420}
        visible={this.state.visibleModalChecklistTab}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditChecklistTab()}
        onCancel={()=>this.handleShowModalChecklistTab(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
              <Row style={{marginBottom: 15}}>
                <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Title</span>
              </Row>
              <Row style={{marginBottom: 20}}>
                <Input
                  value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].value:''}
                  onChange={(e)=>this.handleOnChangeInputTabs("value",e.target.value)}/>
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
              <Row/>
                {this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].type=='checklist' ? this.state.tempDataComponentTab[0].detailsCheckList.length > 0 ? 
                this.state.tempDataComponentTab[0].detailsCheckList.map((items,i)=>{

                  return (
                    <Card key={i} style={{ width: '100%', marginBottom:10}}>
                      <Row>
                        <Col span={4} style={{marginTop:3}}>
                          <span style={{fontSize: 14, fontWeight: '500', color:'#666'}}>Title</span>
                        </Col>
                        <Col span={14} style={{marginBottom: 5,paddingRight:10}}>
                          <Input
                            value={items.value}
                            onChange={(e)=>this.handleOnChangeInputDetailsChecklistTab("value", e.target.value,i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"danger"}
                            icon={"delete"}
                            onClick={()=>this.handleDeleteCheckListTab(i)}
                          />
                        </Col>
                        <Col span={3} style={{marginBottom: 5,paddingRight:10}}>
                          <Button
                            type={"primary"}
                            icon={"plus-circle"}
                            onClick={()=>this.handleAddCheckListTab()}
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
                    onClick={()=>this.handleAddCheckListTab()}
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
    return  ModalChecklistTab;
  } 

  // add upload file Tab
  handleShowFileUploadTab=(visible)=>{
    this.setState({
      visibleModalFileUploadTab:visible
    })
  }
  handleEditFileUploadTab = () => {
    var {tempDataComponentTab} = this.state;
    var {dataComponent}     = this.props;
    dataComponent[this.state.activeIndex].detailsTabs[this.state.activeIndexTab].componentTabs[this.state.activeIndexTabComponent] = tempDataComponentTab[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowFileUploadTab(false);
  }

  handleChangeUploadTab = (info) => {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  
  renderModalEditFileUploadTab = () =>{
    var ModalFileUploadTab =[];
    ModalFileUploadTab = (
      <Modal
        title={`Add FileUpload Option`}
        width={420}
        visible={this.state.visibleModalFileUploadTab}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditFileUploadTab()}
        onCancel={()=>this.handleShowFileUploadTab(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Row style={{marginBottom: 15}}>
              <span style={{fontSize: 16, fontWeight: '600', color:'#666'}}>Set Title File Upload</span>
            </Row>
            <Row style={{marginBottom: 20}}>
              <Input
                value={this.state.tempDataComponentTab[0]!=undefined ? this.state.tempDataComponentTab[0].value:''}
                onChange={(e)=>this.handleOnChangeInputTabs("value",e.target.value)}/>
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
          </Row>
        </Col>
      </Modal>
    );
    return  ModalFileUploadTab;
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
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Button Type</Row>
              <Row style={{marginBottom: 10}}>
                <Select
                  style={{ width: 300}}
                  placeholder="Type (Cancel, Submit)"
                  value ={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].postValue:''}
                  optionFilterProp="children"
                  onChange={(e)=>this.handleSelectColorButton("postValue",e)}
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

  // add RangeDate
  handleShowModalRangeDate = (visible) => {
    this.setState({
      visibleModalRangeDate:visible
    })
  }

  handleEditRangeDate = () => {
    var {dataComponent}       = this.props;
    var {tempDataComponent}   = this.state;
    dataComponent[this.state.activeIndex] =  tempDataComponent[0];
    this.props.dispatch(dispatchAction(dataComponent,Const.EDIT_COMPONENT))
    this.handleShowModalRangeDate(false);
  }

  handleOnChangeRangeDate = (name, value) => {
    var tempDate = moment(value._d).format('YYYY/MM/DD');
    var {tempDataComponent} =this.state;
    tempDataComponent[0].postValue[0][name] = tempDate;
    this.setState({tempDataComponent});
  }
  
  handleDisableDate(current){
    var startDate= this.state.tempDataComponent[0].postValue[0].startDate;
    if (startDate){
      return current && current < moment(startDate);
    } else {
      return current && current < moment().endOf('day');
    }
  }
  
  renderModalRangeDate = () =>{
    var ModalRangeDate =[];
    ModalRangeDate = (
      <Modal
        title={`Add Range Date`}
        width={350}
        visible={this.state.visibleModalRangeDate}
        okText={'Submit'}
        cancelText={'Cancel'}
        onOk={()=>this.handleEditRangeDate()}
        onCancel={()=>this.handleShowModalRangeDate(false)}
        >
        <Col type={'flex'} align={'left'}>
          <Row>
            <Col>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set Start Date Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? typeof(this.state.tempDataComponent[0].value)=="object" ? this.state.tempDataComponent[0].value.startDate: '':''}
                  onChange={(e)=>this.handleOnChangeInputDetails("startDate",e.target.value,"rangeDate")}
                />
              </Row>
              <Row style={{marginBottom: 5, fontSize: 14}}>Set End Date Title</Row>
              <Row style={{marginBottom: 10}}>
                <Input
                  value={this.state.tempDataComponent[0]!=undefined ? typeof(this.state.tempDataComponent[0].value)=="object" ? this.state.tempDataComponent[0].value.endDate: '':''}
                  onChange={(e)=>this.handleOnChangeInputDetails("endDate",e.target.value,"rangeDate")}
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
    return  ModalRangeDate;
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
        idWorkFlow:this.state.idWorkFlow,
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
        idWorkFlow:this.state.idWorkFlow,
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

  handleOnChangeInputTabs = (name,value) => {
    var {tempDataComponentTab} =this.state;
    tempDataComponentTab[0][name] = value;
    this.setState({tempDataComponentTab});
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
          tempDataComponentTab[0] = this.props.dataComponent[mainIndex].detailsTabs[indexTab].componentTabs[index];
          this.setState({tempDataComponentTab,typeInput:'textarea', visibleModalTextAreaTab:visible,
          activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action})
          break;
        case 'label' : 
          tempDataComponentTab[0] = this.props.dataComponent[mainIndex].detailsTabs[indexTab].componentTabs [index];
          this.setState({tempDataComponentTab,typeInput:'label', visibleModalLabelTab:visible,
          activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action})
          break;
        case 'dropdown' : 
          tempDataComponentTab[0] = this.props.dataComponent[mainIndex].detailsTabs[indexTab].componentTabs [index];
          this.setState({tempDataComponentTab,typeInput:'dropdown',visibleModalDropDownTab:visible,
          activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action})
        break;
        case 'radio' : 
          tempDataComponentTab[0] = this.props.dataComponent[mainIndex].detailsTabs[indexTab].componentTabs [index];
          this.setState({tempDataComponentTab,typeInput:'radio', visibleModalRadioButtonTab:visible,
          activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action})
          break;
        case 'date' : 
          tempDataComponentTab[0] = this.props.dataComponent[mainIndex].detailsTabs[indexTab].componentTabs  [index];
          this.setState({tempDataComponentTab,typeInput:'date', visibleModalRadioButtonTab:visible,
          activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action});
          break;
        case 'checklist' : 
          tempDataComponentTab[0] = this.props.dataComponent[mainIndex].detailsTabs[indexTab].componentTabs  [index];
          this.setState({tempDataComponentTab,typeInput:'checklist',visibleModalChecklistTab:visible,
          activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action})
          break;
        case 'file' :
          tempDataComponentTab[0] = this.props.dataComponent[mainIndex].detailsTabs[indexTab].componentTabs  [index];
          this.setState({tempDataComponentTab,typeInput:'file',visibleModalFileUploadTab:visible,
          activeIndexTab:indexTab,activeIndexTabComponent:index,activeActionTab:action})
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
      idWorkFlow:this.state.idWorkFlow,
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
          initialdataDragTab.firstCheck = false;
          initialdataDragTab.postValue  = "";
          initialdataDragTab.placeholder    = "enter text";
          initialdataDragTab.requiredOption = [];
          break;
        case 'number' : 
          initialdataDragTab.title = "Input Number";
          initialdataDragTab.value = "Input Number";
          initialdataDragTab.firstCheck = false;
          initialdataDragTab.postValue  = 0;
          initialdataDragTab.placeholder    = "enter number";
          initialdataDragTab.requiredOption = [];
          break;
        case 'email' : 
          initialdataDragTab.title = "Input Email";
          initialdataDragTab.value = "Input Email";
          initialdataDragTab.firstCheck = false;
          initialdataDragTab.postValue  = '';
          initialdataDragTab.placeholder    = "enter email";
          initialdataDragTab.requiredOption = [];
          break;
        case 'textarea' : 
          initialdataDragTab.title = "TextArea";
          initialdataDragTab.value = "TextArea";
          initialdataDragTab.firstCheck = false;
          initialdataDragTab.postValue  = '';
          initialdataDragTab.placeholder    = "Placeholder";
          initialdataDragTab.requiredOption = [];
          break;
        case 'label' : 
          initialdataDragTab.title = "Label";
          initialdataDragTab.value = "Label";
          initialdataDragTab.postValue  = '';
          initialdataDragTab.firstCheck = false;
          initialdataDragTab.placeholder = "Placeholder";
          initialdataDragTab.requiredOption = [];
          break;
        case 'dropdown' : 
          initialdataDragTab.value       = 'Select Items';
          initialdataDragTab.title       = "Select";
          initialdataDragTab.placeholder = 'Select Option';
          initialdataDragTab.firstCheck = false;
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
          initialdataDragTab.title       = 'Chose Items';
          initialdataDragTab.value       = 'Chose Items';
          initialdataDragTab.firstCheck = false;
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
          initialdataDragTab.value          = "Date";
          initialdataDragTab.title          = "Date";
          initialdataDragTab.requiredOption = [];
          initialdataDragTab.firstCheck = false;
          initialdataDragTab.postValue  = moment();
          break;
        case 'rangedate' : 
          initialdataDragTab.value ='enter title';
          initialdataDragTab.requiredOption = [];
          initialdataDragTab.firstCheck = false;
          initialdataDragTab.postValue = [{startDate:new Date().getTime(),endDate:new Date().getTime()}];
          break;
        case 'checklist' : 
          initialdataDragTab.value = 'List Items';
          initialdataDragTab.title = "List";
          initialdataDragTab.requiredOption = [];
          initialdataDragTab.firstCheck = false;
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
          initialdataDragTab.title = "File";
          initialdataDragTab.requiredOption = [];
          initialdataDragTab.firstCheck = false;
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
              {/* Text Input */}
              <div href="#" id="textINput" type='flex' justify='left'
              style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"Text Input","text")}
              draggable
              >
                <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                  <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >  Text Input</span>
                </div>
              </div>
              {/* Number Input */}
              <div href="#" id="numberInput" type='flex' justify='left'
              style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"Number Input","number")}
              draggable
              >
                <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                  <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >  Number Input</span>
                </div>
              </div>
              {/* Email Input */}
              <div href="#" id="emailInput" type='flex' justify='left'
              style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"Email Input","email")}
              draggable
              >
                <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                  <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >  Email Input</span>
                </div>
              </div>
              {/* TextArea */}
              <div href="#" id="textArea" type='flex' justify='left'
              style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"Text Area","textarea")}
              draggable
              >
                <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                  <Icon type="read" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >  Text Area</span>
                </div>
              </div>
              {/* Lable */}
              <div href="#" id="lable" type='flex' justify='left'
              style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"Lable","label")}
              draggable
              >
                <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                  <Icon type="font-size" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >  Label</span>
                </div>
              </div>
              {/* dropdown */}
              <div href="#" id="dropdown" type='flex' justify='left'
              style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"dropdown","dropdown")}
              draggable
              >
                <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                  <Icon type="align-left" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >  dropdown</span>
                </div>
              </div>
              {/* Radio Button */}
              <div href="#" id="RadioButton" type='flex' justify='left'
              style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"Radio","radio")}
              draggable
              >
                <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                  <Icon type="ordered-list" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >  Radio Button</span>
                </div>
              </div>
              {/* Date */}
              <div href="#" id="Date" type='flex' justify='left'
              style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"Date","date")}
              draggable
              >
                <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                  <Icon type="clock-circle" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >  Date Time</span>
                </div>
              </div>
              {/* CheckList */}
              <div href="#" id="CheckList" type='flex' justify='left'
              style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"Checklist","checklist")}
              draggable
              >
                <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                  <Icon type="ordered-list" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >  CheckList Option</span>
                </div>
              </div>
              {/* Upload FIle */}
              <div href="#" id="File" type='flex' justify='left'
              style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede'}}
              onDragStart={(e)=>this.handleOnDragStartTab(e,"Upload FIle","file")}
              draggable
              >
                <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                  <Icon type="upload" theme="outlined" /><span style ={{fontWeight:'400',fontSize:15, color:'#999'}} >  File Upload</span>
                </div>
              </div>
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
                value={this.state.tempDataComponent[0]!=undefined ? this.state.tempDataComponent[0].title!=undefined ? this.state.tempDataComponent[0].title:'' :''}
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
    this.handleClearStatusCheck();
    var {dataComponent} = this.props;
    this.setState({
      tempPostDataComponent:dataComponent
    },this.setState({visibleModalPreview:visible}));
    
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

  handleChangeDateTime = (value, items, index,typeValue) => {
    var {tempPostDataComponent} = this.state;
    if (items.type=="rangedate"){
      if (typeValue && typeValue=="startDate"){
        tempPostDataComponent[index].postValue[0].startDate=value.valueOf();
        this.setState({tempPostDataComponent});

      }else {
        tempPostDataComponent[index].postValue[0].endDate=value.valueOf();
        this.setState({tempPostDataComponent});
      }
    }else{
      tempPostDataComponent[index].postValue=value;
      this.setState({tempPostDataComponent});
    }
  }

  handleChangeRangeDate = (value, items, index) => {
    var startDate=moment(value[0]._d).format("YYYY/MM/DD");
    var endDate=moment(value[1]._d).format("YYYY/MM/DD");
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue[0].startDate=startDate;
    tempPostDataComponent[index].postValue[0].endDate=endDate;
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

  handleCallbackSaveForm = (callback) => {
    if (callback.data.status==true){
      message.success(callback.data.message);
      this.handleLoadDetailForm();
      this.handleClearDataValue();
      this.handleGotoPreview(false);
    }
  }

  handleSaveForm = () => {
    var api    = `${Const.CREATE_FORMDETAIL}`;
  
    var header = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    var generateDataPayload = {
      "workflow":this.state.idWorkFlow,
      "formid":this.state.idForm,
      "formversionID":this.state.idForm,
      "tickedtid":"ticekt1",
      "system":{"inputdate":moment().format("DD-MM-YYYY"),"inputby":"jaky","submit":"B","customcalculation":["Insert into 123 values(1,2,3)","Insert into 123 values(1,2,3)"]},
      "form":this.state.tempPostDataComponent 
    };
    for (var i=0;i<this.state.tempPostDataComponent.length;i++){
      var elementId ="ID"+Math.random().toString(12).substr(2,4);
      generateDataPayload.form[i].elemenname  = this.state.tempPostDataComponent[i].value;
      generateDataPayload.form[i].elementype  = this.state.tempPostDataComponent[i].type;
      generateDataPayload.form[i].elemenid    = elementId;
      generateDataPayload.form[i].processtype = "input";
      generateDataPayload.form[i].tablename   = "@";
      generateDataPayload.form[i].elemenvalue = "";
    }
    var data   = {
      dataPost:generateDataPayload
    };
    apiCall.post(api, data,this.handleCallbackSaveForm,header);
  }

  handleClearDataValue (){
    var {tempPostDataComponent} = this.state;
    for (var i=0;i < tempPostDataComponent.length;i++){
      switch (tempPostDataComponent[i].type) {
        case 'text' : 
          tempPostDataComponent[i].postValue  = "";
          break;
        case 'number' : 
          tempPostDataComponent[i].postValue  = 0;
          break;
        case 'email' : 
          tempPostDataComponent[i].postValue  = "";
          break;
        case 'textarea' : 
          tempPostDataComponent[i].postValue  = "";
          break;
        case 'label' : 
          tempPostDataComponent[i].postValue  = "";
          break;
        case 'dropdown' : 
          tempPostDataComponent[i].postValue  = "";
          break;
        case 'button' : 
          tempPostDataComponent[i].postValue  = tempPostDataComponent[i].postValue;
          break;
        case 'radio' :
          tempPostDataComponent[i].postValue  = "";
          break;
          break;
        case 'rangedate' : 
          tempPostDataComponent[i].postValue  = [{startDate:new Date().getTime(),endDate:new Date().getTime()}];
          break;
        case 'date' : 
          tempPostDataComponent[i].postValue  = moment(new Date());
          break;
        case 'table' : 
          tempPostDataComponent[i].postValue  = "";
          break;
        case 'tab' : 
          tempPostDataComponent[i].postValue  = [];
          break;
        case 'checklist' : 
          tempPostDataComponent[i].postValue  = [];
          break;
        case 'file' : 
          tempPostDataComponent[i].postValue  = "";
          break;
        case 'map' : 
          tempPostDataComponent[i].postValue  = "";
          break;
          default:
          return 0;
      }
    }
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
    checkRangeDate:false,
    checkListOption:false,
    checkFileUpload:false
  }
  // add InputChange Preview
  handleOnChageInputPreview = (value, items, index) => {
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue=value.target.value;
    this.setState({tempPostDataComponent});
  }

   // add InputChange Tab
   handleOnChageInputPreviewTab = (value, items, mainIndex, indexTab, IndexComponent) => {
    var {tempPostDataComponent} = this.state;
    if (items.type=='dropdown' || items.type=='checklist' || items.type=='date'){
      if (items.type=='date'){
        tempPostDataComponent[mainIndex].detailsTabs[indexTab].componentTabs[IndexComponent].postValue=moment(value._d);
      }else {
        tempPostDataComponent[mainIndex].detailsTabs[indexTab].componentTabs[IndexComponent].postValue=value;
      }
    }else {
      if (items.type=='file'){
        if (value.file.status !== 'uploading') {
        }
        if (value.file.status === 'done') {
          tempPostDataComponent[mainIndex].detailsTabs[indexTab].componentTabs[IndexComponent].postValue=value.file.name;
          this.setState({tempPostDataComponent});
          message.success(`${value.file.name} file uploaded successfully`);
        } else if (value.file.status === 'error') {
          message.error(`${value.file.name} file upload failed.`);
        }
      }else {
        tempPostDataComponent[mainIndex].detailsTabs[indexTab].componentTabs[IndexComponent].postValue=value.target.value;
      }
    }
    tempPostDataComponent[mainIndex].detailsTabs[indexTab].componentTabs[IndexComponent].firstCheck=true;
    this.setState({tempPostDataComponent});
  }

  // add InputChange Tab
  handleOnChageFirstCheckTab = (value, items, mainIndex, indexTab, IndexComponent) => {
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[mainIndex].detailsTabs[indexTab].componentTabs[IndexComponent].firstCheck=value;
    this.setState({tempPostDataComponent});
  }

  handleChangeStatusCheck = (type,value) => {
    this.statusCheck [type] = value;
  }

  handleCancelSubmitForm = (visible) => {
    this.handleClearDataValue();
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
                  if (items!=undefined && items.idWorkFlow==this.state.idWorkFlow && items.idForm==this.state.idForm) {
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
                              handleChangeRangeDate={this.handleChangeRangeDate}
                              handleChangeCheckList={this.handleChangeCheckList}
                              handleChangeUploadPost={this.handleChangeUploadPost}
                              handleGotoPreview={this.handleGotoPreview}
                              handleValidateForm={this.handleValidateForm}
                              disabled={false}
                              items={items}
                              index={i}
                              title={items.title ? items.title :''}
                              value={items.value}
                              color={items.color}
                              placeholder={items.placeholder}
                              type={items.type}
                              span={24}
                              dataErrorMessage={this.state.dataErrorMessage}
                              handleOnChageInputPreview={this.handleOnChageInputPreview}
                              handleOnChageInputPreviewTab={this.handleOnChageInputPreviewTab}
                              handleOnChageFirstCheckTab={this.handleOnChageFirstCheckTab}
                              handleChangeValidateDetailTabs={this.handleChangeValidateDetailTabs}
                          />
                      </Row>
                    )
                  }
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
  handleClearStatusCheck = () => {
    this.statusCheck = {
      checkText:false,
      checkNumber:false,
      checkEmail:false,
      checkTextArea:false,
      checkDropDown:false,
      checkRadio:false,
      checkDateTime:false,
      checkRangeDate:false,
      checkListOption:false,
      checkFileUpload:false
    }
  }
  
  handleShowPreviewCode = (visible) => {
    this.setState({
      visibleModalPreviewPayload:visible
    });
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

  handleGotoDasboard=()=>{
    history.push('/');
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
      {this.renderModalRangeDate()}

      {/* renderModalTab */}
      {this.renderModalTextInputsTab()}
      {this.renderModalNumberInputsTab()}
      {this.renderModalEmailInputsTab()}
      {this.renderModalTextAreaTab()}
      {this.renderModalLabelTab()}
      {this.renderModalEditDropDownTab()}
      {this.renderModalEditRadioButtonTab()}
      {this.renderModalDateTimeTab()}
      {this.renderModalEditChecklistTab()}
      {this.renderModalEditFileUploadTab()}
        <Layout>
          <Header style={{backgroundColor: '#020292'}}>
            <Row type='flex' justify='between'>
              <Col span={15} style={{paddingLeft:25}}>
                <Button
                  style={{
                    marginTop:20,
                    marginRight:20,
                    width:175,
                    height:32,
                    paddingTop:4,
                    paddingBottom:10,
                    borderRadius:4,
                    borderColor:'#ef2f2f',
                    backgroundColor:'#ef2f2f',
                    cursor:'pointer',
                    textAlign:'center',
                    color:'#fff',
                    fontWeight:'500'
                  }}
                  onClick = {() =>this.handleGotoDasboard()}
                  type="dash">
                  <Icon type="arrow-left" />back to Dasboard
                </Button>
              </Col>
              <Col span={4} style={{paddingLeft:25}}>
                <Button
                  onClick = {() =>this.handleShowPreviewCode(true)}
                  type="dash">
                  Preview Payload<Icon type="code" />
                </Button>
              </Col>
              <Col span={4} style={{paddingLeft:25}}>
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
                  {/* Text Input */}
                  <div href="#" id="textINput" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10,marginTop:10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Text Input","text")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Text Input</span>
                    </div>
                  </div>
                  {/* Number Input */}
                  <div href="#" id="numberInput" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Number Input","number")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Number Input</span>
                    </div>
                  </div>
                  {/* Email Input */}
                  <div href="#" id="emailInput" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Email Input","email")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="font-colors" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Email Input</span>
                    </div>
                  </div>
                  {/* Text Area */}
                  <div href="#" id="textArea" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Text area","textarea")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="read" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  TextArea</span>
                    </div>
                  </div>
                  {/* Label */}
                  <div href="#" id="label" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Label","label")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="font-size" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Label</span>
                    </div>
                  </div>
                  {/* DropDown */}
                  <div href="#" id="dropDown" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Dropdown","dropdown")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="align-left" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  DropDown</span>
                    </div>
                  </div>
                  {/* Button */}
                  <div href="#" id="Button" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Button","button","primary")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="link" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Button</span>
                    </div>
                  </div>
                  {/* Radio Buttons */}
                  <div href="#" id="RadioButtons" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Radio","radio")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="ordered-list" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Radio Buttons</span>
                    </div>
                  </div>
                  {/* Date */}
                  <div href="#" id="Date" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Date","date")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="clock-circle" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Date Time</span>
                    </div>
                  </div>
                  {/* Range Date */}
                  <div href="#" id="RangeDate" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"RangeDate","rangedate")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="clock-circle" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Range Date</span>
                    </div>
                  </div>
                  {/* Table */}
                  <div href="#" id="Table" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Table","table")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="table" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Table</span>
                    </div>
                  </div>
                  {/* Tab */}
                  <div href="#" id="Tab" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Tab","tab")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="menu-unfold" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Tab</span>
                    </div>
                  </div>
                  {/* Checklist */}
                  <div href="#" id="Checklist" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Check List","checklist")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="ordered-list" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  Checklist Option</span>
                    </div>
                  </div>
                  {/* File */}
                  <div href="#" id="File" type='flex' justify='left'
                  style={{padding:'10px 10px 0px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"File Upload","file")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="upload" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  File Upload</span>
                    </div>
                  </div>
                  {/* MAP */}
                  <div href="#" id="MAP" type='flex' justify='left'
                  style={{padding:'10px 10px 10px 10px',cursor:'pointer', backgroundColor: '#dedede', marginRight: 10}}
                  onDragStart={(e)=>this.handleOnDragStart(e,"Map","map")}
                  draggable
                  >
                    <div style={{width: '100%',height: 40,textAlign:"left",backgroundColor:'#fff',borderRadius:2,border:1,paddingTop:6,paddingLeft:16}}>
                      <Icon type="environment" theme="outlined" /><span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >  MAP</span>
                    </div>
                  </div>
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
