import React from 'react';
import {Input, Select,Checkbox, Radio, DatePicker,Alert,
  Icon, Button, Row, Col, Tabs, Upload
} from 'antd';
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

const RadioGroup = Radio.Group;
const Option = Select.Option;
class CommonComponent extends React.Component{
  state = {
    value: 1,
  }
  renderDetailsOption = ()=> {
    var DetailsOption = [];
    DetailsOption     = this.props.options.map((obj,i)=>{
      return (
        <Option value={i}>{obj.title}</Option>
      )
    });
    return DetailsOption;
  }
  handleChangeDropDown = () => {

  }
  onChange = (date, dateString) => {
  }

  callback=(key) => {
  }

  handleValidateEmail = (email) => {
    var regeXEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regeXEmail.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  
  // error render
  renderErrorMessage = (name,items,index) => {
    switch (name){
      case 'text' :
        var checkRequired =false;
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true && items.postValue.length==0){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"Text input Required!"} type="error" showIcon /></Row>);
        }else {
          if (this.props.statusCheck.checkText==false){
            this.props.handleChangeStatusCheckTab("checkText",true);
          }
        }
      break;
      case 'number' :
        var checkRequired =false;
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);

        if (checkRequired==true && items.postValue.length==0){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"Number input Required!"} type="error" showIcon /></Row>);
        }
        if (this.props.statusCheck.checkNumber==false){
          this.props.handleChangeStatusCheckTab("checkNumber",true);
        }
      break;
      case 'email' :
        var checkRequired =false;
        var checkEmail = this.handleValidateEmail(items.postValue);
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true){
          if (items.postValue.length==0) {
            return (<Row key={index} style={{marginTop:5}}><Alert message={"Email input Required!"} type="error" showIcon /></Row>);
          }else {
            if (checkRequired==true && items.postValue.length> 0 && checkEmail==false){
              return (<Row key={index} style={{marginTop:5}}><Alert message={"Email Not Valid!"} type="error" showIcon /></Row>);
            }
          }
        }

        if (this.props.statusCheck.checkEmail==false){
          this.props.handleChangeStatusCheckTab("checkEmail",true);
        }
      break;
      case 'textarea' :
        var checkRequired =false;
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true && items.postValue.length==0){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"TextArea input Required!"} type="error" showIcon /></Row>);
        }else {
          if (this.props.statusCheck.checkTextArea==false){
            this.props.handleChangeStatusCheckTab("checkTextArea",true);
          }
        }
      break;
      case 'dropdown' :
        var checkRequired =false;
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true && items.postValue.length==0 && this.props.statusCheck.checkDropDown==true){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"Select Option Required!"} type="error" showIcon /></Row>);
        }else {
          if (this.props.statusCheck.checkDropDown==false){
            this.props.handleChangeStatusCheckTab("checkDropDown",true);
          }
        }
      break;
      case 'radio' :
        var checkRequired =false;
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true && items.postValue.length==0 && this.props.statusCheck.checkRadio==true){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"Choise Radio Option Required!"} type="error" showIcon /></Row>);
        }else {
          if (this.props.statusCheck.checkRadio==false){
            this.props.handleChangeStatusCheckTab("checkRadio",true);
          }
        }
      break;
      case 'date' :
        var checkRequired =false;
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true && items.postValue.length==0 && this.props.statusCheck.checkDateTime==true){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"Date Required!"} type="error" showIcon /></Row>);
        }else {
          if (this.props.statusCheck.checkDateTime==false){
            this.props.handleChangeStatusCheckTab("checkDateTime",true);
          }
        }
      break;
      case 'checklist' :
        var checkRequired =false;
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true && items.postValue.length==0 && this.props.statusCheck.checkListOption==true){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"Select checkList Option Required!"} type="error" showIcon /></Row>);
        }else {
          if (this.props.statusCheck.checkListOption==false){
            this.props.handleChangeStatusCheckTab("checkListOption",true);
          }
        }
      break;
      case 'file' :
        var checkRequired =false;
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true && items.postValue.length==0 && this.props.statusCheck.checkFileUpload==true){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"File Upload Required!"} type="error" showIcon /></Row>);
        }else {
          if (this.props.statusCheck.checkFileUpload==false){
            this.props.handleChangeStatusCheckTab("checkFileUpload",true);
          }
        }
      break;
      default :
      return []
    }
  }
  
  render (){
    var title = this.props.title ? this.props.title :'';
    var type  = this.props.type ? this.props.type :'';
    var span  = this.props.span ? this.props.span : 24;
    var value = this.props.value ? this.props.value :'';
    var items = this.props.items ? this.props.items : []; 
    var index              = this.props.index ? this.props.index : 0;
    var placeholder        = this.props.placeholder ? this.props.placeholder :'';
    var disabled           = this.props.disabled ? this.props.disabled :false;
    var detailsDropDown    = this.props.items.detailsDropDown ? this.props.items.detailsDropDown : []; 
    var detailsCheckList   = this.props.items.detailsCheckList ? this.props.items.detailsCheckList : []; 
    var detailsRadioButton = this.props.items.detailsRadioButton ? this.props.items.detailsRadioButton : []; 
    var handleChangeUpload = this.props.handleChangeUpload ? this.props.handleChangeUpload : () => {}
    var handleOnChageInputPreviewTab = this.props.handleOnChageInputPreviewTab ? this.props.handleOnChageInputPreviewTab : () => {};
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const columns = [{
      title: 'Column1',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Column2',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Column3',
      dataIndex: 'address',
      key: 'address',
    },];
    
    const data = [{
      key: '1',
      name: 'Value 1',
      age: 15,
      address: 'Podium Depan',
    }, {
      key: '2',
      name: 'Value 2',
      age: 15,
      address: 'Podium Tengah',
    }, {
      key: '3',
      name: 'Value 3',
      age: 15,
      address: 'Podium Belakang',

    }];

    switch (type) {
      case 'textinput':
        return (
          <Col span={span} style={{marginBottom: 15,paddingBottom: 10}}>
            <Row style={{marginBottom: 10}}>
              {this.props.title ?
                <span style={{marginBottom: 15}}>{title}</span>
                :
                []
              }
            </Row>
            <Row>
              <Input
                disabled={disabled}
                defaultValue={value}
                placeholder={placeholder}
              />
            </Row>
          </Col>
        )
        break;
      case 'text':
      return (
        <Col span={span} style={{marginBottom: 15,paddingBottom: 10}}>
          <Row style={{marginBottom: 10}}>
            {this.props.title ?
              <span style={{marginBottom: 15}}>{value}</span>
              :
              []
            }
          </Row>
          <Row>
            <Input
              type={'text'}
              disabled={disabled}
              placeholder={placeholder}
              value={this.props.items.postValue}
              onChange={(e)=>handleOnChageInputPreviewTab(e,this.props.items,this.props.mainIndex,this.props.indexTabs,this.props.index)}
              
            />
          </Row>
          {this.renderErrorMessage("text",items,index)}
        </Col>
      )
      break;
      case 'number':
      return (
        <Col span={span} style={{marginBottom: 15,paddingBottom: 10}}>
          <Row style={{marginBottom: 10}}>
            {this.props.title ?
              <span style={{marginBottom: 15}}>{value}</span>
              :
              []
            }
          </Row>
          <Row>
            <Input
              type={'number'}
              disabled={disabled}
              placeholder={placeholder}
              value={this.props.items.postValue}
              onChange={(e)=>handleOnChageInputPreviewTab(e,this.props.items,this.props.mainIndex,this.props.indexTabs,this.props.index)}
            />
          </Row>
          {this.renderErrorMessage("number",items,index)}
        </Col>
      )
      break;
      case 'email':
      return (
        <Col span={span} style={{marginBottom: 15,paddingBottom: 10}}>
          <Row style={{marginBottom: 10}}>
            {this.props.title ?
              <span style={{marginBottom: 15}}>{value}</span>
              :
              []
            }
          </Row>
          <Row>
            <Input
              type={'email'}
              disabled={disabled}
              placeholder={placeholder}
              value={this.props.items.postValue}
              onChange={(e)=>handleOnChageInputPreviewTab(e,this.props.items,this.props.mainIndex,this.props.indexTabs,this.props.index)}
            />
          </Row>
          {this.renderErrorMessage("email",items,index)}
        </Col>
      )
      break;
      case 'textarea':
        return (
          <Col span={span} style={{marginBottom: 15, paddingBottom: 10}}>
            {this.props.title ?
              <span style={{marginBottom: 10}}>{value}</span>
              :
              []
            }
            <TextArea
              disabled={disabled}
              rows={4}
              placeholder={placeholder}
              value={this.props.items.postValue}
              onChange={(e)=>handleOnChageInputPreviewTab(e,this.props.items,this.props.mainIndex,this.props.indexTabs,this.props.index)}
            />
            {this.renderErrorMessage("textarea",items,index)}
          </Col>
        )
        break;
      case 'label':
        return (
          <Col span={span} style={{marginBottom: 15, paddingBottom: 10}}>
            {this.props.title ?
              <span style={{marginBottom: 10,fontSize: 16, fontWeight: 18}}>{value=='' ? title : value}</span>
              :
              []
            }
          </Col>
        )
        break;

      case 'dropdown' :
       return (
         <Col span={span} style={{marginBottom: 15, paddingBottom: 10}}>
            <Row style={{marginBottom:10}}>
              {this.props.value ?
                <Row>
                  {this.props.title ?
                    <span style={{fontWeight:'600',fontSize:15}}>{value}</span>
                    :
                    []
                  }
                </Row>
                :
                []
              }
            </Row>
            <Row>
              <Select
                disabled={disabled}
                showSearch
                style={{ width: 300}}
                placeholder={placeholder}
                optionFilterProp="children"
                onChange={()=>this.handleChangeDropDown()}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                { detailsDropDown.length > 0 ? 
                  detailsDropDown.map((obj,i)=>{
                    return (
                      <Option key={i} value={obj.value}>{obj.title}</Option>
                    )
                  })
                  :
                  []
                }
              </Select>
            </Row>
        </Col>
       )
      break;
      case 'radio' :
        return (
          <Col span={span} style={{marginBottom:15,paddingBottom:10}}>
            <Row style={{marginBottom:10}}>
              {this.props.title ?
                <span style={{marginBottom: 10}}>{title}</span>
                :
                []
              }
            </Row>
            <Row>
              <RadioGroup style={{width:365}} onChange={this.onChange} value={this.state.value}>
                {detailsRadioButton.length > 0 ?
                  detailsRadioButton.map((obj,i)=>{
                    return (
                      <Col key={i} span={8}><Radio style={{fontWeight:'500', fontSize:14}} value={obj.value}>{obj.value}</Radio></Col>
                    )
                  })
                  :
                  []
                }
              </RadioGroup>
            </Row>
          </Col>
        );
      break;
      case 'date' :
        return (
          <Col span={span} style={{marginBottom: 15, paddingBottom: 10,marginTop:20}}>
            <Row style={{marginBottom:10}}>
              {this.props.title ?
                <span style={{marginBottom: 10}}>{title}</span>
                :
                []
              }
            </Row>
            <Row>
              <DatePicker disabled={true} style={{width:300}} onChange={()=>this.onChange()} />
            </Row>
          </Col>
        );
      break;
      case 'checklist' : 
      return (
        <Col span={span} style={{marginBottom:15,paddingBottom:10,marginTop:20}}>
            <Col>
              <Row style={{marginBottom:10}}>
                {this.props.title ?
                  <span style={{marginBottom: 10, fontWeight:'600',fontSize:15}}>{value}</span>
                  :
                  []
                }
              </Row>
            </Col>
           <Checkbox.Group style={{ width: '100%' }}>
            {detailsCheckList.length > 0 ?
                detailsCheckList.map((obj,i)=>{
                  return (
                    <Col key={i} span={8}><Checkbox style={{fontWeight:'500', fontSize:14}} value={obj.value}>{obj.value}</Checkbox></Col>
                  )
                })
                :
                []
              }
            </Checkbox.Group>
        </Col>
      )
      break;
      case 'file' : 
        const props = {
          name: 'file',
          action: '//jsonplaceholder.typicode.com/posts/',
          headers: {
            authorization: 'authorization-text',
          },
          handleChangeUpload
        };
        return (
          <Col span={span} style={{marginBottom:15,paddingBottom:10,marginTop:20}}>
              <Col>
                <Row style={{marginBottom:10}}>
                  {this.props.value ?
                    <span style={{marginBottom: 10, fontWeight:'600',fontSize:15}}>{value}</span>
                    :
                    []
                  }
                </Row>
              </Col>
              <Upload {...props}>
                <Button disabled={true}>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
          </Col>
        )
      break;
      default:
        return(
          <div>
          <span  style={{color:'red', fontSize: 14, fontWeight: '500'}}>Component ini belum dibuat !</span>
          </div>
        )
    }
  }
}
export default CommonComponent;
