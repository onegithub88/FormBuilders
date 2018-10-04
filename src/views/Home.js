import React, { Component } from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select,
  Modal, Icon, Avatar, Table, Button, Row, Col, Card
} from 'antd';
const { Option, OptGroup } = Select;
const FormItem = Form.Item;
import {connect} from 'react-redux';
import frFR from 'antd/lib/locale-provider/fr_FR';
import './../assets/common/css/layoutIsat.css';
import moment from 'moment';
import 'moment/locale/fr';
const { Header, Sider, Content,Footer } = Layout;
import {dispatchAction} from './../actions';
import {Const} from './../const/Const';
import history from './../controllers/History';
var index = 0;
class Home extends React.Component{
  index=0;
  state = {
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
          this.index++;
          console.log("Name Form",record);
          console.log(this.state);
          return (
            <Row type="flex" justify="end">
              <Button type="primary" shape="circle" icon="edit" style={{marginRight: 15}} />
              <Button type="primary" shape="circle" icon="delete" style={{marginRight: 25}} />
              <Button onClick={(index)=>this.handleGoToGenerateForm(record.keyModule,record.key)} type="primary" ghost>Generate Form</Button>
            </Row>
          )
        }
      }
    ],
    title:'',
    collapsed: false,
    visibleAddModule: false,
    visibleAddForm:false,
    activeMenuModule:0,
    activeSelectModule:'',
    name:'',
    ket:'',
    dataModule:{
      key:0,
      nameModule: '',
      keteranganModule :'',
    },
    dataForm : {
      key:0,
      keyModule:0,
      nameForm:'',
      KeteranganForm:''
    }
  };

  handleGoToGenerateForm = (moduleId,FormId) => {
    history.push(`/formbuilder/module${moduleId}/formId${FormId}`);
  }

  componentWillMount = () => {
    var modules = {
      key:0,
      name: "Module 1",
      keterangan: "test Module 1"
    }

    var form = {
      key:0,
      keyModule:0,
      name: "Form 1",
      keterangan: "TEST FORM 1",
    }
    if (this.props.dataForm.length==0 && this.props.dataModule.length==0) {
      this.props.dispatch(dispatchAction(modules,Const.ADD_MODULE));
      setTimeout(()=>{
        this.props.dispatch(dispatchAction(form,Const.ADD_FORM));
      },500);
    }

  }

  handleInputChange = (name,text) => {
    var value = text.target.value ? text.target.value : '';
    this.setState({[name]:value});
  }

  handleShowModalAddModule = (visible) => {
    this.setState({
      visibleAddModule: visible,
      title:'Module'
    });
  }

  handleShowModalAddForm = (visible) => {
    if (this.props.dataModule.length > 0){
      this.setState({
        visibleAddModule: visible,
        title:'Form',
        activeSelectModule:this.state.activeSelectModule,
        activeMenuModule:this.state.activeMenuModule
      });
    }else {
      var title   = 'Module';
      var message = 'Silahkan Tambahkan Module Terlebih Dahulu';
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

  handleSetActiveModule = (index) => {
    this.setState({activeMenuModule:index})
  }

  handleAddGeneral = () => {
    switch (this.state.title) {
      case 'Module':
        var index = 0;
        if (this.props.dataModule.length> 0) {
          index = this.props.dataModule.length;
        }
        var payload = {
          key:index,
          name: this.state.name,
          keterangan: this.state.ket,
        }
        this.props.dispatch(dispatchAction(payload,Const.ADD_MODULE));
        this.handleSetActiveModule(payload.key);
        break;
      case 'Form':
        var index = 0;
        if (this.props.dataForm.length> 0) {
          index = this.props.dataForm.length;
        }
        var payload = {
          key:index,
          keyModule:this.state.activeMenuModule,
          name: this.state.name,
          keterangan: this.state.ket,
        }
        this.props.dispatch(dispatchAction(payload,Const.ADD_FORM));
        default: ''

    }
    this.handleShowModalAddModule(false)
    this.handleClearFormInput();
  }
  handleChangeSelectModule = (selected) => {
    this.setState({
      activeMenuModule:selected,
      activeSelectModule:this.props.dataModule[selected].name
    })
  }
  renderSelectModule = () => {
    var SelectModule = [];
    SelectModule = this.props.dataModule.map((items,i)=>{
      return (
        <Option key={i} value={i}>{items.name}</Option>
      )
    });
    return (
      <Select
        defaultValue={this.state.activeSelectModule}
        style={{ span: 24 }}
        onChange={(e)=>this.handleChangeSelectModule(e)}
      >
        {SelectModule}
      </Select>
    );
  }

  renderModalGeneral = () => {
    var ModalGeneral = [];
    ModalGeneral = (
      <Modal
        title={`Add New ${this.state.title}`}
        visible={this.state.visibleAddModule}
        okText={'Save'}
        cancelText ={'Cancel'}
        onOk={()=>this.handleAddGeneral()}
        onCancel={()=>this.handleShowModalAddModule(false)}
      >
      <Form layout={"vertical"}>
        {this.state.title=="Form" ?
          (<FormItem
              label={`Select Module`}
              wrapperCol ={{ span: 24 }}
            >
              {this.renderSelectModule()}
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

  handleOnClickItemModule = (items,i) => {
    this.setState({activeMenuModule:i, activeSelectModule:this.props.dataModule[i].name});
  }

  renderDetailsMenuModule = () => {
    var MenuModule = []
    MenuModule = this.props.dataModule.map((items,i)=>{
      return (
        <Menu.Item key={i}>
          <Icon type="book" />
            <span className="nav-text" onClick={(event) => this.handleOnClickItemModule(items,i)}>
              {items.name}
            </span>
        </Menu.Item>
      )
    });
    return MenuModule;
  }

  render() {
    var index = 0;
    var data = this.props.dataModule.length > 0 ? this.props.dataForm.length > 0 ? this.props.dataForm.filter((obj)=>{
      if (obj.keyModule==this.state.activeMenuModule) {
        index++;
        obj.no = index;
        return obj;
      }

    }) : null  : null;
      var defaultMenuKey = this.props.dataModule.length> 0 ? `"${(Number(this.state.activeMenuModule)+Number(1))}"` : '0';
      return (
        <LocaleProvider locale={frFR} >
          <Layout>
            {this.renderModalGeneral()}
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {}}
              onCollapse={(collapsed, type) => {}}
            >
              <div className="logo">
                <Avatar icon="user"  />
                <span style={{color:'#fff', fontSize: 12, marginLeft: 10}}>Wawan Cyber88</span>
              </div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultMenuKey]}>
                { this.props.dataModule.length > 0 ?
                  this.renderDetailsMenuModule()
                  :
                  []
                }
              </Menu>
            </Sider>
            <Layout>
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
                        onClick={()=>this.handleShowModalAddModule(true)}
                       >Add Module<Icon type="plus-circle" />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Header>
              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  <Table
                    columns={this.state.columns}
                    locale={{ emptyText: 'Data form kosong, silahkan menambahkan module sebelum membuat form !' }}
                    dataSource={data}
                    bordered
                    title={() => (
                      <Row type="flex" justify="space-between">
                        <Col  >
                          <div className="table-operations">
                            <span style={{fontSize: 16, fontWeight: '800',paddingTop: 10}}>{this.props.dataModule.length > 0 ? this.props.dataModule[(this.state.activeMenuModule)].name :''}</span>
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
module.exports = connect(state => ({dataModule:state.Modules.dataModule,dataForm:state.Forms.dataForm}), dispatch=>({dispatch:dispatch}))(Home);
