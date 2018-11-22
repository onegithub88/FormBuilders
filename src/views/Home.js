import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { LocaleProvider, Layout, Form, Radio, Input, Menu, Select, message,
  Modal, Icon, Avatar, Table, Button, Row, Col, Card
} from 'antd';
const RadioGroup = Radio.Group;
const { Option, OptGroup } = Select;
const FormItem = Form.Item;
import {connect} from 'react-redux';
import frFR from 'antd/lib/locale-provider/fr_FR';
import './../assets/common/css/layoutIsat.css';
import moment from 'moment';
import 'moment/locale/fr';
const { Header, Sider, Content,Footer } = Layout;
import {dispatchAction, apiCall, commonDispatch} from './../actions';
import {Const} from './../const/Const';
import {
  Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import history from './../controllers/History';
var index = 0;

class Home extends React.Component{
  index=0;
  state = {
    visibleModalActionWorkFlow:false,
    activeIndexWorkFlow:0,
    selected:0,
    tempDataForm :[
      {key:0,
       keyWorkFlow:0,
       name: "Form 1",
       keterangan: "TEST FORM 1",
      }
    ],
    visibleModalAction :false,
    visibleEditForm:false,
    columns : [{
      title: 'No',
      className: 'no',
      dataIndex: 'no'
    }, {
      title: 'Name',
      className: 'name',
      dataIndex: 'name',
    }, {
      title: 'Keterangan',
      className:'keterangan',
      dataIndex: 'keterangan'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render:(text, record)=>{
          var dataID ={
            idWorkFlow:record.idWorkFlow,
            idForm:record.idForm
          } 
          var textId =JSON.stringify(dataID);
          var encriptCode = Buffer.from(textId,'utf8').toString('base64');
          return (
            <Row type="flex" justify="end" key={record.indexKey}>
              <Link to={{
                pathname:"formviwer",
                search: encriptCode,
                }} 
                target="_blank"
              >
                <Button type="primary" shape="circle" icon="eye" style={{marginRight: 15}} />
              </Link>
              <Button onClick={()=>this.handleShowModalAction(true,record.indexKey, "edit")} type="primary" shape="circle" icon="edit" style={{marginRight: 15}} />
              <Button onClick={()=>this.handleShowModalAction(true,record.indexKey, "delete")} type="primary" shape="circle" icon="delete" style={{marginRight: 25}} />
              <Button onClick={(index)=>this.handleGoToGenerateForm(record.keyWorkFlow,record.idForm)} type="primary" ghost>Generate Form</Button>
            </Row>
          )
        }
      }
    ],
    title:'',
    collapsed: false,
    visibleAddWorkFlow: false,
    visibleAddForm:false,
    activeMenuWorkFlow:0,
    activeSelectWorkFlow:'',
    name:'',
    ket:'',
    dataWorkFlow:{
      key:0,
      nameWorkFlow: '',
      keteranganWorkFlow :'',
    },
    dataForm : {
      key:0,
      keyWorkFlow:0,
      nameForm:'',
      KeteranganForm:''
    }
  };

  handleGoToGenerateForm = (WorkFlowId,FormId) => {
    history.push(`/formbuilder/idWorkFlow${WorkFlowId}/${FormId}`);
  }

  handleGetSaveForm =(callback)=>{
    this.handleLoadForm();
  }

  handleSaveForm () {
    var api    =`${Const.CREATE_FORM}`;
    var header ={
      headers:{
        'Content-Type':'application/json'
      }
    }
    var dataForm = {
      dataPost:[]
    }

    for (var i=0;i<this.props.dataForm.length;i++) {
      dataForm.dataPost.push(this.props.dataForm[i]);
    }
    apiCall.post(api,dataForm,this.handleGetSaveForm,header);
  }
  handleGetLoadWorkFlow =(callback,scope)=>{
    if (callback.data.status==true){
      scope.props.dispatch(dispatchAction(callback.data.data,Const.EDIT_WORKFLOW));
    }
  }

  handleLoadWorkFlow () {
    var api    =`${Const.GET_WORKFLOW}`;
    var header ={
      headers:{
        'Content-Type':'application/json'
      }
    }
    apiCall.get(api,header,this.handleGetLoadWorkFlow,this);
  }
  handleGetSaveWorkFlow =(callback)=>{
    this.handleLoadWorkFlow();
  }

  handleSaveWorkFlow () {
    var api    =`${Const.CREATE_WORKFLOW}`;
    var header ={
      headers:{
        'Content-Type':'application/json'
      }
    }
    var dataWorkFlow = {
      dataPost:[]
    }

    for (var i=0;i<this.props.dataWorkFlow.length;i++) {
      dataWorkFlow.dataPost.push(this.props.dataWorkFlow[i]);
    }
    apiCall.post(api,dataWorkFlow,this.handleGetSaveWorkFlow,header);
  }
  handleGetDeleteForm(callback,scope){
    if (callback.data.status){
      scope.handleLoadForm();
    }else {
      message.error('delete filed');
    }

  }
  handleDeleteForm (index) {
    var idWorkFlow = this.props.dataForm[index].idWorkFlow;
    var idForm     = this.props.dataForm[index].idForm;
    var api    =`${Const.DELETE_FORM}/${idWorkFlow}/${idForm}`;
    var header ={
      headers:{
        'Content-Type':'application/json'
      }
    }
    apiCall.get(api,header,this.handleGetDeleteForm,this);
  } 
 
  handleGetLoadForm =(callback,scope)=>{
    if (callback.data.status==true){
      scope.props.dispatch(dispatchAction(callback.data.data,Const.EDIT_FORM));
    }
  }

  handleLoadForm () {
    var api    =`${Const.GET_FORM}`;
    var header ={
      headers:{
        'Content-Type':'application/json'
      }
    }
    apiCall.get(api,header,this.handleGetLoadForm,this);
  }

  componentWillMount = () => {
    this.handleLoadWorkFlow();
    this.handleLoadForm();
  }

  handleInputChange = (name,text) => {
    var value = text.target.value ? text.target.value : '';
    switch (this.state.activeAction) {
      case 'edit':
        var {tempDataForm} =this.state;
        tempDataForm[0][name]=value;
        this.setState({tempDataForm});
        break;
      case 'tambah':
        this.setState({[name]:value})
        break;
      default:
      this.setState({[name]:value})
    }
  }

  handleShowModalAddWorkFlow = (visible) => {
    this.setState({
      visibleAddWorkFlow: visible,
      title:'WorkFlow',
      activeAction:'tambah'
    });
  }

  handleShowCanceEditForm = (visible) => {
    this.setState({
      visibleEditForm: visible
    });
  }

  handleSaveEditForm = () => {
    var {tempDataForm} = this.state;
    var {dataForm}     = this.props;
    dataForm[this.state.activeIndex]=tempDataForm[0];
    this.props.dispatch(dispatchAction(dataForm,Const.EDIT_FORM));
    setTimeout(()=>{
      this.handleSaveForm();
      this.handleShowCanceEditForm(false);
    },500);
  }

  handleShowModalAddForm = (visible) => {
    if (this.props.dataWorkFlow.length > 0){
      this.setState({
        visibleAddWorkFlow: visible,
        title:'Form',
        activeAction:'tambah',
        activeSelectWorkFlow:this.state.activeSelectWorkFlow,
        activeMenuWorkFlow:this.state.activeMenuWorkFlow
      });
    }else {
      var title   = 'WorkFlow';
      var message = 'Silahkan Tambahkan WorkFlow Terlebih Dahulu';
      this.showAlert('info',title,message);
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleClearFormInput = () => {
    this.setState({name:'',ket:''})
  }

  handleSetActiveWorkFlow = (index) => {
    this.setState({activeMenuWorkFlow:index})
  }
  // action crud
  handleAddGeneral = () => {
    switch (this.state.title) {
      case 'WorkFlow':
        var index = 0;
        var tempContinue = true;
        if (this.props.dataWorkFlow.length> 0) {
          index = this.props.dataWorkFlow.length;
        }
        var payload = {
          key:index,
          name: this.state.name,
          keterangan: this.state.ket,
        }
        this.props.dataWorkFlow.map(workflow=>{
          if (workflow.name==this.state.name){
            tempContinue=false;
            message.error("Nama WorkFlow Sudah Ada");
          }
        })
        if (tempContinue){
          this.props.dispatch(dispatchAction(payload,Const.ADD_WORKFLOW));
          this.handleSetActiveWorkFlow(payload.key);
          setTimeout(()=>{
            this.handleSaveWorkFlow();
          },500)
        }
        break;
      case 'Form':
        var index = 0;
        var tempContinue = true;
        if (this.props.dataForm.length> 0) {
          index = this.props.dataForm.length;
        }
        var CodeForm = 'idForm' + Math.random().toString(36).substr(2, 9);
        var payload = {
          key:CodeForm,
          idForm:CodeForm,
          idWorkFlow:"idWorkFlow"+this.state.activeMenuWorkFlow,
          keyWorkFlow:this.state.activeMenuWorkFlow,
          name: this.state.name,
          keterangan: this.state.ket,
        }
        this.props.dataForm.map(form=>{
          if (form.name==this.state.name){
            tempContinue=false;
            message.error("Nama Form Sudah Ada");
          }
        })
        if (tempContinue){
          this.props.dispatch(dispatchAction(payload,Const.ADD_FORM));
          setTimeout(()=>{
            this.handleSaveForm();
          },500);
        }
        default: ''

    }
    if (tempContinue){
      this.handleShowModalAddWorkFlow(false)
      this.handleClearFormInput();
    }
  }
  handleChangeSelectWorkFlow = (selected) => {
    this.setState({
      activeMenuWorkFlow:selected,
      activeSelectWorkFlow:this.props.dataWorkFlow[selected].name
    })
  }
  renderSelectWorkFlow = () => {
    var SelectWorkFlow = [];
    SelectWorkFlow = this.props.dataWorkFlow.map((items,i)=>{
      return (
        <Option key={i} value={i}>{items.name? items.name :''}</Option>
      )
    });
    return (
      <Select
        defaultValue={this.state.activeSelectWorkFlow}
        style={{ span: 24 }}
        onChange={(e)=>this.handleChangeSelectWorkFlow(e)}
      >
        {SelectWorkFlow}
      </Select>
    );
  }

  renderModalGeneral = () => {
    var ModalGeneral = [];
    ModalGeneral = (
      <Modal
        title={`Add New ${this.state.title}`}
        visible={this.state.visibleAddWorkFlow}
        okText={'Save'}
        cancelText ={'Cancel'}
        onOk={()=>this.handleAddGeneral()}
        onCancel={()=>this.handleShowModalAddWorkFlow(false)}
      >
      <Form layout={"vertical"}>
        {this.state.title=="Form" ?
          (<FormItem
              label={`Select WorkFlow`}
              wrapperCol ={{ span: 24 }}
            >
              {this.renderSelectWorkFlow()}
          </FormItem>
          )
          :
          []
        }
        <FormItem
            label={`Nama ${this.state.title}`}
            wrapperCol ={{ span: 24 }}
          >
            <Input placeholder={`Masukkan Nama ${this.state.title}`}
              value={this.state.name}
              onChange={(text)=>this.handleInputChange("name",text)}
            />
          </FormItem>
          <FormItem
            label="Keterangan"
            wrapperCol ={{ span: 24 }}
          >
            <Input placeholder={`Keterangan ${this.state.title}`}
              value={this.state.ket}
              onChange={(text)=>this.handleInputChange("ket",text)}
            />
          </FormItem>
      </Form>
      </Modal>
    )
    return ModalGeneral;
  }

  showAlert = (type,title,message) => {
    switch (type) {
      case 'info':
        Modal.info({
          title: `${title} Kosong`,
          content:(
            <div>
              <p>{message}</p>
            </div>
          ),
          onOk(){}
        })
        break;
      default:
    }
  }
  //add WorkFlow
  handleShowModalWorkFlow = (visible,index) => {
    this.setState({visibleModalActionWorkFlow:visible,activeIndexWorkFlow:index,activeMenuWorkFlow:0})
  }
  
  handleOnClickItemWorkFlow = (items,i) => {
    this.setState({activeMenuWorkFlow:i, activeSelectWorkFlow:this.props.dataWorkFlow[i].name});
  }
  handleModalActionWorkFlow = () => {
    var ModalActionWorkFlow = [];
    ModalActionWorkFlow = (
          <Modal
            title={`Warning!`}
            visible={this.state.visibleModalActionWorkFlow}
            okText={'Ok'}
            cancelText={'Cancel'}
            onOk={()=>this.handleDeleteWorkFlow(this.state.activeIndexWorkFlow)}
            onCancel={()=>this.handleShowModalWorkFlow(false,this.state.activeIndexWorkFlow)}
            >
            <Col>
              <Row>
                Apakah anda yakin ingin menghapus WorkFlow ini ?
              </Row>
            </Col>
          </Modal>
        )
    return ModalActionWorkFlow;
  }

  handleGetDeleteWorkFlow(callback,scope){
    if (callback.data.status){
      setTimeout(()=>{
        scope.handleLoadWorkFlow();
      },500);
      scope.handleShowModalWorkFlow(false,0);
    }else {
      message.error('delete filed');
    }

  }
  handleDeleteWorkFlow (index) {
    var idWorkFlow =this.props.dataWorkFlow[index].key;
    var api    =`${Const.DELETE_WORKFLOW}/${idWorkFlow}`;
    var header ={
      headers:{
        'Content-Type':'application/json'
      }
    }
    apiCall.get(api,header,this.handleGetDeleteWorkFlow,this);
  } 

  renderDetailsMenuWorkFlow = () => {
    var MenuWorkFlow = []
    MenuWorkFlow = this.props.dataWorkFlow.map((items,i)=>{
      return (
        <Menu.Item key={i} onClick={(event) => this.handleOnClickItemWorkFlow(items,i)}>
          <Icon type="book" />
            <span className="nav-text">
              {items.name? items.name:'-'}
            </span>
            <span onClick={()=>this.handleShowModalWorkFlow(true,i)} style={{float:'right'}}>
              <Icon type="delete" />
            </span>
        </Menu.Item>
      )
    });
    return MenuWorkFlow;
  }

  handleAction = (actionType,index) => {
    var {dataForm} =this.props;
    var {tempDataForm} = this.state;
    if(actionType=='delete'){
      // dataForm.map((obj,i)=>{
      //   if (obj.key==index){
      //     dataForm.splice(i,1);
      //   }
      // })
      // this.props.dispatch(dispatchAction(dataForm,Const.DELETE_FORM));
      setTimeout(()=>{
        this.handleDeleteForm(index);
      },500);
    }else if (actionType=='edit'){
      var tempDataForm = [];
      dataForm.map((obj,i)=>{
        if (obj.key==index){
          dataForm[i]=tempDataForm[0];
        }
      })
      this.props.dispatch(dispatchAction(dataForm,Const.EDIT_FORM));
    }
    this.handleShowModalAction(false,index);
  }

  handleCancelModal = (visible) => {
    this.setState({visibleModalAction:visible})
  }

  handleShowModalAction = (visible,index,action) => {
    var {tempDataForm} = this.state;
    tempDataForm[0]    = this.props.dataForm[index];
    switch (action) {
      case 'edit':
        this.setState({tempDataForm,visibleEditForm:visible,activeIndex:index,activeAction:action})
        break;
      case 'delete':
        this.setState({tempDataForm,visibleModalAction:visible,activeIndex:index,activeAction:action})
        break;
      default:
      this.setState({tempDataForm,activeIndex:index,activeAction:action})
    }
  }

  handleModalAction = () => {
    var ModalAction = [];
    if (this.state.tempDataForm.length > 0) {
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
                Apakah anda yakin ingin men{this.state.activeAction} Form ini ??
              </Row>
            </Col>
          </Modal>
        )
        break;
        case 'edit' :
        ModalAction = (
          <Modal
            title={`Edit ${this.state.title}`}
            visible={this.state.visibleEditForm}
            okText={'Save'}
            cancelText ={'Cancel'}
            onOk={()=>this.handleSaveEditForm()}
            onCancel={()=>this.handleShowCanceEditForm(false)}
          >
          <Form layout={"vertical"}>
            {this.state.title=="Form" ?
              (<FormItem
                  label={`Select WorkFlow`}
                  wrapperCol ={{ span: 24 }}
                >
                  {this.renderSelectWorkFlow()}
              </FormItem>
              )
              :
              []
            }
            <FormItem
                label={`Nama ${this.state.title}`}
                wrapperCol ={{ span: 24 }}
              >
                <Input placeholder={`Masukkan Nama ${this.state.title}`}
                  value={this.state.tempDataForm[0].name}
                  onChange={(text)=>this.handleInputChange("name",text)}
                />
              </FormItem>
              <FormItem
                label="Keterangan"
                wrapperCol ={{ span: 24 }}
              >
                <Input placeholder={`Keterangan ${this.state.title}`}
                  value={this.state.tempDataForm[0].keterangan}
                  onChange={(text)=>this.handleInputChange("keterangan",text)}
                />
              </FormItem>
          </Form>
          </Modal>
        )
        break;
        default:
        return []
    }
    }
    return ModalAction;
  }

  render() {
    var index    = 0;
    var indexKey = 0;
    var data = this.props.dataWorkFlow.length > 0 ? this.props.dataForm.length > 0 ? this.props.dataForm.filter((obj)=>{
      if (obj.keyWorkFlow==this.state.activeMenuWorkFlow) {
        index++;
        obj.no = index;
        obj.indexKey=indexKey;
        indexKey++;
        return obj;
      }

    }) : null  : null;
      var defaultMenuKey = this.props.dataWorkFlow.length> 0 ? `"${(Number(this.state.activeMenuWorkFlow)+Number(1))}"` : '0';

      return (
        <LocaleProvider locale={frFR} >

          <Layout>
            {this.handleModalAction()}
            {this.renderModalGeneral()}
            {this.handleModalActionWorkFlow()}
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {}}
              onCollapse={(collapsed, type) => {}}
            >
              <div className="logo">
                <Avatar icon="user"  />
                <span style={{color:'#fff', fontSize: 12, marginLeft: 10}}>Admin ISAT</span>
              </div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultMenuKey]}>
                { this.props.dataWorkFlow.length > 0 ?
                  this.renderDetailsMenuWorkFlow()
                  :
                  []
                }
              </Menu>
            </Sider>
            <Layout style={{height:'100vh'}}>
              <Header style={{ background: '#fff', padding: 0 }} >
                <Row type="flex" justify="space-between">
                  <Col span={8} offset={1}>
                      <Row type="flex" justify="start">
                      <span style={{fontSize: 24, fontWeight: '800', marginRight: 10, color:'#2223f2'}}>ISAT</span>
                      <span style={{fontSize: 24, fontWeight: '500', color: '#999'}}>Form Builder</span>
                      </Row>
                  </Col>
                  <Col span={4}>
                    <div className="table-operations">
                      <Button
                        onClick={()=>this.handleShowModalAddWorkFlow(true)}
                       >Add WorkFlow<Icon type="plus-circle" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Header>
              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  <Table
                    columns={this.state.columns}
                    locale={{ emptyText: 'Data form kosong, silahkan menambahkan WorkFlow sebelum membuat form !' }}
                    dataSource={data}
                    bordered
                    title={() => (
                      <Row type="flex" justify="space-between">
                        <Col  >
                          <div className="table-operations">
                            <span style={{fontSize: 16, fontWeight: '800',paddingTop: 10}}>{this.props.dataWorkFlow.length > 0 ? this.props.dataWorkFlow[(this.state.activeMenuWorkFlow)].name :''}</span>
                          </div>
                        </Col>
                        <Col >
                          <div className="table-operations">
                            <Button
                              onClick={()=>this.handleShowModalAddForm(true)}
                            >
                            Add Form <Icon type="plus-circle" />
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      )
                    }
                    footer={() => 'Note : -'}
                  />
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                FORM BUILDER ©2018 Created by ISAT Corp
              </Footer>
            </Layout>
          </Layout>
        </LocaleProvider>
      );
	}
}
module.exports = connect(state => ({dataWorkFlow:state.WorkFlows.dataWorkFlow,dataForm:state.Forms.dataForm,dataComponent:state.FormBuilders.dataComponent}), dispatch=>({dispatch:dispatch}))(Home);
