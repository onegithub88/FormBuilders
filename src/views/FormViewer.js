import React, { Component } from 'react';
import {Layout,
 Icon, Button, Row, Col, Card, message,
} from 'antd';
import {connect} from 'react-redux';
import './../assets/common/css/layoutIsat.css';
import moment from 'moment';
import 'moment/locale/fr';
const { Header, Footer} = Layout;
import {dispatchAction, apiCall} from './../actions';
import {Const} from './../const/Const';
import CommonComponent from './CommonComponent';
import CommonComponentTab from './CommonComponentTab';
import ComponentViewer from './ComponentViewer';
import history from './../controllers/History';
class FormViewer extends React.Component{
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
    var dataID      = this.props.location.search ? this.props.location.search.substr(1) : '';
    var decodeID    = Buffer.from(dataID,'base64').toString('utf8');
    var dataJsonID  = JSON.parse(decodeID);
    var idWorkFlow  = dataJsonID.idWorkFlow;
    var idForm      = dataJsonID.idForm;
    this.setState({idWorkFlow,idForm});
    this.handleLoadDetailForm();
    this.handleClearStatusCheck();
  }

  handleGetLoadDetailForm = (callback,scope) => {
    if (callback.data.data.status=true) {
      var {dataComponentViewer}=scope.props;
      var {tempPostDataComponent}=scope.state;
      dataComponentViewer=callback.data.data.form ? callback.data.data.form : [];
      for(var i=0;i<dataComponentViewer.length;i++){
        switch (dataComponentViewer[i].type) {
            case 'text' : 
              dataComponentViewer[i].postValue  = "";
              break;
            case 'number' : 
              dataComponentViewer[i].postValue  = 0;
              break;
            case 'email' : 
              dataComponentViewer[i].postValue  = "";
              break;
            case 'textarea' : 
              dataComponentViewer[i].postValue  = "";
              break;
            case 'label' : 
              dataComponentViewer[i].postValue  = "";
              break;
            case 'dropdown' : 
              dataComponentViewer[i].postValue  = "";
              break;
            case 'button' : 
              dataComponentViewer[i].postValue  = dataComponentViewer[i].postValue;
              break;
            case 'radio' :
              dataComponentViewer[i].postValue  = "";
              break;
              break;
            case 'rangedate' : 
              dataComponentViewer[i].postValue  = [{startDate:new Date().getTime(),endDate:new Date().getTime()}];
              break;
            case 'date' : 
              dataComponentViewer[i].postValue  = moment(new Date());
              break;
            case 'table' : 
              dataComponentViewer[i].postValue  = "";
              break;
            case 'tab' : 
              dataComponentViewer[i].postValue  = [];
              break;
            case 'checklist' : 
              dataComponentViewer[i].postValue  = [];
              break;
            case 'file' : 
              dataComponentViewer[i].postValue  = "";
              break;
            case 'map' : 
              dataComponentViewer[i].postValue  = "";
              break;
              default:
              return 0;
        }
      }
      tempPostDataComponent = dataComponentViewer;
      scope.props.dispatch(dispatchAction(dataComponentViewer,Const.EDIT_COMPONENT_VIEWER));
      setTimeout(()=>{
        this.setState({tempPostDataComponent});
      },300);
    }else {
      scope.props.dispatch(dispatchAction([],Const.EDIT_COMPONENT_VIEWER));
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
    this.setState({tempPostDataComponent})
  }

  handleCallbackSaveForm = (callback) => {
    if (callback.data.status==true){
      message.success(callback.data.message);
    }
    this.handleClearDataValue();
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

  //use metode
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

  validateDetailsTabs=true
  handleChangeValidateDetailTabs = (value)=> {
    this.validateDetailsTabs = value;
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

  handleCancelSubmitForm = (visible) => {
    this.handleClearDataValue();
    history.push('/');
  }

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

  handleGotoPreview =(visible) => {
    this.handleClearStatusCheck();
    var {dataComponentViewer} = this.props;
    this.setState({
      tempPostDataComponent:dataComponentViewer
    },this.setState({visibleModalPreview:visible}));
    
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
  
  handleChangeCheckList = (value, items, index) => {
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue=value;
    this.setState({tempPostDataComponent});
  }

  handleChangeRangeDate = (value, items, index) => {
    var startDate=moment(value[0]._d).format("YYYY/MM/DD");
    var endDate=moment(value[1]._d).format("YYYY/MM/DD");
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue[0].startDate=startDate;
    tempPostDataComponent[index].postValue[0].endDate=endDate;
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
  
  handleChangeRadioButton = (value, items, index) => {
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue=value.target.value;
    this.setState({tempPostDataComponent});
  }

  handleChangeDropDown = (value, items, index) => {
    var {tempPostDataComponent} = this.state;
    tempPostDataComponent[index].postValue=value;
    this.setState({tempPostDataComponent});
  }

  renderModalPreview = () =>{
    var ModalPreview =[];
    ModalPreview = (
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
                        <ComponentViewer
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
                            handleCancelSubmitForm={this.handleCancelSubmitForm}
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
 
  handleGotoDasboard=()=>{
    history.push('/');
  }

  handleChangeStatusCheck = (type,value) => {
    this.statusCheck [type] = value;
  }

  render() {
    return (
      <Row>
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
                            {this.props.dataComponentViewer.length> 0 ?
                                this.renderModalPreview()
                                :
                                []
                            }
                        </Row>
                        </Col>
                    </Row>
                </Col>
          </Layout>
          <Footer style={{backgroundColor: '#020292',height: '120px'}}>
            <Row style={{ textAlign: 'center', color:'#dedede', fontWeight:'600', fontSize:16 }}>
              FORM VIEWER ©2018 Created by ISAT Corp
            </Row>
          </Footer>
        </Layout>
      </Row>
    );
  }
}
module.exports = connect(state => ({dataWorkFlow:state.WorkFlows.dataWorkFlow,dataForm:state.Forms.dataForm,dataComponentViewer:state.ComponentViewer.dataComponentViewer}), dispatch=>({dispatch:dispatch}))(FormViewer);
