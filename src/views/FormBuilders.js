import React, { Component } from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select,
  Modal, Icon, Avatar, Table, Button, Radio, Row, Col, Card
} from 'antd';
const RadioGroup = Radio.Group;
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
class FormBuilders extends React.Component{
  state = {
    title:'',
    tempDataComponent:[
      {title:"Text Input", type:'textInput',placeholder:'Masukkan title',required:1}
    ],
    visibleModalAction:false,
    activeIndex:0,
    activeAction:'',
    value:1,
    idModule:0,
    idForm:0
  };
  componentWillMount =() => {
    var idModule = this.props.match.params.idModule;
    var idForm   = this.props.match.params.idForm;
    this.setState({idModule,idForm})
  }

  tempdataDrag=[]
  dragStatus=false

  onDragOver = (e) => {
    if(this.tempdataDrag.length > 0 && this.dragStatus==true){
      var {dataComponent} = this.props;
      dataComponent=[...dataComponent,this.tempdataDrag[0]]
      this.props.dispatch(dispatchAction(dataComponent,Const.ADD_COMPONENT))
      this.tempdataDrag = [];
      this.dragStatus   = false;
    }
  }
  handleOnDragStart = (e) => {
    this.tempdataDrag.splice(0,1,{idModule:this.state.idModule,idForm:this.state.idForm,title:"Text Input", type:'textInput',placeholder:'Masukkan title',required:1});
    this.dragStatus=true;
  }

  handleOnDrop = (e,text) => {

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
    tempDataComponent[0]    = this.props.dataComponent[index];
    this.setState({tempDataComponent,visibleModalAction:visible,activeIndex:index,activeAction:action})
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

  renderDragDetails = () => {
    var DragDetails = [];
    DragDetails = this.props.dataComponent.map((items, i)=>{
      if (items.idModule==this.state.idModule && items.idForm==this.state.idForm) {
        return (
          <Row key={i} type='flex' justify='left' align='middle'>
            <CommonComponent
              key={i}
              title={items.title}
              value={items.value}
              placeholder={items.placeholder}
              type={"textInput"}
              span={17}
              />
            <Row style={{marginTop: 5,marginLeft: 20}}>
              <Button onClick={()=>this.handleShowModalAction(true,i, "edit")} style={{marginRight: 20}} icon={'edit'}>Edit</Button>
              <Button onClick={()=>this.handleShowModalAction(true, i, "delete")} icon={'delete'}>Delete</Button>
            </Row>
          </Row>
        )
      }
    });
    return DragDetails;
  }

  render() {
    return (
      <Row>
      {this.handleModalAction()}
        <Layout>
          <Header style={{backgroundColor: '#020292'}}>
            <Row type='flex' justify='center'>
              <span style={{color:'#fff'}}></span>
            </Row>
          </Header>
            <Layout>
              <Content style={{backgroundColor: '#fff', margin:15}}>
                <Col type="flex" className="wip"
                     style={{backgroundColor:'#fff',margin:'20px 10px 20px 10px',padding:10}}
                     onDragOver={(e)=>this.onDragOver(e)}
                     onDrop={(e)=>{this.handleOnDrop(e, "wip")}}>
                      {this.props.dataComponent.length> 0 ?
                        this.renderDragDetails()
                        :
                        []
                      }
                    <span className="task-header"></span>
                  </Col>
              </Content>
              <Sider style={{backgroundColor: '#ccc'}}>
                <Col>
                  <Row type='flex' justify='center'
                  style={{padding:15, backgroundColor: '#ccc'}}
                  onDragStart={(e)=>this.handleOnDragStart(e)}
                  draggable
                  >
                    <Button style={{width: '100%',height: 40}} type={'dashed'}>
                      <span style ={{fontWeight:'400',fontSize:17, color:'#999'}} >Text Input</span>
                    </Button>
                  </Row>
                </Col>
              </Sider>
            </Layout>
          <Footer style={{backgroundColor: '#020292'}}>
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
