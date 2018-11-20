import React from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select,Checkbox, Radio, DatePicker,Alert,
  Modal, Icon, Avatar, Table, Button, Row, Col, Card, Divider, Tag, Tabs,Upload, message
} from 'antd';
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;
import CommonComponentTabPreview from './CommonComponentTabPreview';
import GoogleMaps from 'google-map-react';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import moment from 'moment';
class CommonPreviewComponent extends React.Component{
  state = {
    value: 1
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
  
  onChange = (date, dateString) => {
  }

  callback=(key) => {
  }
  
  componentWillMount = () =>{
    this.statusCheck = {
      checkText:false
    }
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
        if (checkRequired==true && items.postValue.length==0 && this.props.statusCheck.checkText==true){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"Text input Required!"} type="error" showIcon /></Row>);
        }else {
          if (this.props.statusCheck.checkText==false){
            this.props.handleChangeStatusCheck("checkText",true);
          }
        }
      break;
      case 'number' :
        var checkRequired =false;
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true && items.postValue.length==0 && this.props.statusCheck.checkNumber==true){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"Number input Required!"} type="error" showIcon /></Row>);
        }
        if (this.props.statusCheck.checkNumber==false){
          this.props.handleChangeStatusCheck("checkNumber",true);
        }
      break;
      case 'email' :
        var checkRequired =false;
        var checkEmail = this.handleValidateEmail(items.postValue);
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true && this.props.statusCheck.checkEmail==true){
          if (items.postValue.length==0) {
            return (<Row key={index} style={{marginTop:5}}><Alert message={"Email input Required!"} type="error" showIcon /></Row>);
          }else {
            if (checkRequired==true && items.postValue.length> 0 && checkEmail==false){
              return (<Row key={index} style={{marginTop:5}}><Alert message={"Email Not Valid!"} type="error" showIcon /></Row>);
            }
          }
        }

        if (this.props.statusCheck.checkEmail==false){
          this.props.handleChangeStatusCheck("checkEmail",true);
        }
      break;
      case 'textarea' :
        var checkRequired =false;
        items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
        if (checkRequired==true && items.postValue.length==0 && this.props.statusCheck.checkTextArea==true){
          return (<Row key={index} style={{marginTop:5}}><Alert message={"TextArea input Required!"} type="error" showIcon /></Row>);
        }else {
          if (this.props.statusCheck.checkTextArea==false){
            this.props.handleChangeStatusCheck("checkTextArea",true);
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
            this.props.handleChangeStatusCheck("checkDropDown",true);
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
            this.props.handleChangeStatusCheck("checkRadio",true);
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
            this.props.handleChangeStatusCheck("checkDateTime",true);
          }
        }
      break;
      case 'rangeDate' :
      var checkRequired = false;
      items.requiredOption.map((obj)=>obj.indexOf('required')>-1 ? checkRequired=true : false);
      if (checkRequired==true && items.postValue.length==0 && this.props.statusCheck.checkRangeDate==true){
        return (<Row key={index} style={{marginTop:5}}><Alert message={"Range Date Required!"} type="error" showIcon /></Row>);
      }else {
        if (this.props.statusCheck.checkRangeDate==false){
          this.props.handleChangeStatusCheck("checkRangeDate",true);
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
            this.props.handleChangeStatusCheck("checkListOption",true);
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
            this.props.handleChangeStatusCheck("checkFileUpload",true);
          }
        }
      break;
      default :
      return []
    }
  }
  
  statusCheckTab = {
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

  handleChangeStatusCheckTab = (type,value) => {
    this.statusCheck [type] = value;
  }
  
  render (){
    var title = this.props.title ? this.props.title :'';
    var type  = this.props.type ? this.props.type :'';
    var span  = this.props.span ? this.props.span : 24;
    var value = this.props.value ? this.props.value :'';
    var color = this.props.value ? this.props.color :'primary';
    var items              = this.props.items ? this.props.items : [];
    var index              = this.props.index ? this.props.index : 0; 
    var options            = this.props.options ? this.props.options : [];
    var placeholder        = this.props.placeholder ? this.props.placeholder :'';
    var disabled           = this.props.disabled ? this.props.disabled :false;
    var detailsTabs        = this.props.items.detailsTabs ? this.props.items.detailsTabs : []; 
    var detailsDropDown    = this.props.items.detailsDropDown ? this.props.items.detailsDropDown : []; 
    var detailsCheckList   = this.props.items.detailsCheckList ? this.props.items.detailsCheckList : []; 
    var detailsRadioButton = this.props.items.detailsRadioButton ? this.props.items.detailsRadioButton : []; 
    var handleChangeUpload = this.props.handleChangeUpload ? this.props.handleChangeUpload : () => {}
    var detailColumn       = this.props.items.detailColumn ? this.props.items.detailColumn : [];
    var detailRow          = this.props.items.detailRow ? this.props.items.detailRow : [];
    var dataErrorMessage   = this.props.dataErrorMessage ? this.props.dataErrorMessage : [];
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

    var handleOnChageInputPreview = this.props.handleOnChageInputPreview ? this.props.handleOnChageInputPreview : () => {};
    switch (type) {
        case 'text':
        return (
          <Col span={span} style={{marginBottom: 15}}>
            <Row style={{marginBottom: 10}}>
              {this.props.title ?
                <span>{value}</span>
                :
                []
              }
            </Row>
            <Row>
              <Input
                type={'text'}
                value={this.props.items.postValue}
                onChange={(e)=>handleOnChageInputPreview(e,this.props.items,this.props.index)}
                disabled={disabled}
                placeholder={placeholder}
              />
            </Row>
            {this.renderErrorMessage("text",items,index)}
          </Col>
        )
        break;
        case 'number':
        return (
          <Col span={span} style={{marginBottom: 15}}>
            <Row style={{marginBottom: 10}}>
              {this.props.title ?
                <span>{value}</span>
                :
                []
              }
            </Row>
            <Row>
              <Input
                type={'number'}
                value={this.props.items.postValue}
                onChange={(e)=>handleOnChageInputPreview(e,this.props.items,this.props.index)}
                disabled={disabled}
                placeholder={placeholder}
              />
            </Row>
            {this.renderErrorMessage("number",items,index)}
          </Col>
        )
        break;
        case 'email':
        return (
          <Col span={span} style={{marginBottom: 15}}>
            <Row style={{marginBottom: 10}}>
              {this.props.title ?
                <span>{value}</span>
                :
                []
              }
            </Row>
            <Row>
              <Input
                type={'email'}
                value={this.props.items.postValue}
                onChange={(e)=>handleOnChageInputPreview(e,this.props.items,this.props.index)}
                disabled={disabled}
                placeholder={placeholder}
              />
            </Row>
            {this.renderErrorMessage("email",items,index)}
          </Col>
        )
        break;
      case 'textarea':
        return (
          <Col span={span} style={{marginBottom: 15}}>
            <Row style={{marginBottom: 10}}>
                {this.props.title ?
                <span>{value}</span>
                :
                []
                }
            </Row>
            <Row>
                <TextArea
                disabled={disabled}
                value={this.props.items.postValue}
                onChange={(e)=>handleOnChageInputPreview(e,this.props.items,this.props.index)}
                rows={4}
                placeholder={placeholder}
                />
            </Row>
            {this.renderErrorMessage("textarea",items,index)}
          </Col>
        )
        break;
      case 'label':
        return (
          <Col span={span}>
            <Row>
                {this.props.title ?
                <span style={{fontSize: 16, fontWeight:'600'}}>{value=='' ? title : value}</span>
                :
                []
                }
            </Row>
          </Col>
        )
        break;

      case 'dropdown' :
       return (
         <Col span={span} style={{marginBottom: 15}}>
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
                style={{ width: '100%'}}
                optionFilterProp="children"
                value={this.props.items.postValue}
                onChange={(e)=>this.props.handleChangeDropDown(e,this.props.items,this.props.index)}
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
            {this.renderErrorMessage("dropdown",items,index)}
        </Col>
       )
      break;
      case 'button' :
      var styleCancelButton = {
        marginTop:20,
        marginRight:20,
        width:100,
        height:30,
        paddingTop:4,
        paddingBottom:8,
        borderRadius:4,
        backgroundColor:'#ef2f2f',
        cursor:'pointer',
        textAlign:'center',
        color:'#fff',
        fontWeight:'500'
      }
      var styleSubmitButton = {
        marginTop:20,
        marginRight:20,
        width:100,
        height:30,
        paddingTop:4,
        paddingBottom:8,
        borderRadius:4,
        borderColor:'#1890ff',
        backgroundColor:'#1890ff',
        cursor:'pointer',
        textAlign:'center',
        color:'#fff',
        fontWeight:'500'
      }
      if (items.postValue!='' && items.postValue=="Submit"){
        return (
          <Col span={span} style={{marginBottom: 15, paddingBottom: 10}}>
            <Row type="flex">
              <Col>
                <div onClick={()=>this.props.handleCancelSubmitForm()} style = {styleCancelButton}>Cancel</div>
              </Col>
              <Col>
                <div onClick={()=>this.props.handleValidateForm("visibleTabSetting",true)} style = {styleSubmitButton}>Submit</div>
              </Col>
            </Row>
          </Col>
        )
      }else{
        return (
          <Col span={span} style={{marginBottom: 15, paddingBottom: 10}}>
            <div onClick={()=>this.handleChangeTabNavigate("visibleTabSetting",true)} style = {styleCancelButton}>Cancel</div>
          </Col>
        )
      }
      break;
      case 'radio' :
        return (
          <Col span={span} style={{marginBottom:15}}>
            <Row style={{marginBottom:10}}>
              {this.props.title ?
                <span>{title}</span>
                :
                []
              }
            </Row>
            <Row>
              <RadioGroup style={{width:365}} 
                onChange={(e)=>this.props.handleChangeRadioButton(e,this.props.items,this.props.index)} 
                value={this.props.items.postValue}
              >
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
            {this.renderErrorMessage("radio",items,index)}
          </Col>
        );
      break;
      case 'date' :
        return (
          <Col span={span} style={{marginBottom: 15}}>
            <Row style={{marginBottom:10}}>
              {this.props.title ?
                <span>{title}</span>
                :
                []
              }
            </Row>
            <Row>
              <DatePicker 
              disabled={disabled} 
              style={{width:'100%'}} 
              onChange={(e)=>this.props.handleChangeDateTime(e,this.props.items,this.props.index)} 
              value={this.props.items.postValue}
            />
            </Row>
          </Col>
        );
      break;
      case 'rangedate' :
        var handleDisableDate=(current)=>{
          var startDate= items.postValue[0].startDate;
          if (startDate){
            return current && current < moment(startDate);
          } else {
            return current && current < moment().endOf('day');
          }
        }
        return (
          <Col span={span} style={{marginBottom: 15, paddingBottom: 10,marginTop:20}}>
            <Row>
              <Col style={{marginBottom:10}}>
                <Row style={{marginBottom:10}}>{this.props.value ? this.props.value.startDate : ''}</Row>
                <Row>
                  <DatePicker 
                    style={{width:300}} 
                    value={items.postValue.length > 0 ? moment(items.postValue[0].startDate):moment()}
                    format="YYYY/MM/DD"
                    onChange={(e)=>this.props.handleChangeDateTime(e,this.props.items,this.props.index,"startDate")}
                  />
                </Row>
              </Col>
              <Col>
                <Row style={{marginBottom:10}}>{this.props.value ? this.props.value.endDate : moment()}</Row>
                <Row>
                  <DatePicker 
                    style={{width:300}}
                    disabledDate={handleDisableDate.bind(this)} 
                    value={items.postValue.length > 0 ? moment(items.postValue[0].endDate) :moment()}
                    format="YYYY/MM/DD"
                    onChange={(e)=>this.props.handleChangeDateTime(e,this.props.items,this.props.index,"endDate")}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        );
      break;
      case 'table':
        return(
          <Col span={span} style={{marginBottom:15}}>
            <Row style={{marginBottom:10}}>
              {this.props.title ?
                <span>{title}</span>
                :
                []
              }
            </Row>
            <Row>
              <Table columns={detailColumn} dataSource={detailRow} /> 
            </Row>
            {this.renderErrorMessage("table",items,index)}
          </Col>
        )
      break;
      case 'tab' : 
        return (
          <Col span={span} style={{marginBottom:15}}>
            <Tabs onChange={()=>this.callback()} type="card">
              {detailsTabs.length > 0 ?
                detailsTabs.map((obj,i)=>{
                  return (
                    <TabPane style={{backgroundColor:'#fbfbfb',padding:10,borderRadius:4}} tab={obj.value} key={i}> 
                      <Row span={24}>{
                        obj.componentTabs.map((compTab,t)=>{
                          if (compTab.type!='date'){
                            compTab.postValue = compTab.postValue.length > 0 ? compTab.postValue: '';
                          }
                          return (
                            <Row 
                            data-key={t}
                            style={{backgroundColor:'#fbfbfb',borderWidth:2, padding:5,borderColor:'#fff'}}
                            key={t} type='flex' justify='left' align='middle'>
                              <CommonComponentTabPreview
                                statusCheck={this.statusCheckTab}
                                handleChangeStatusCheckTab={this.handleChangeStatusCheckTab}
                                key={t}
                                items={compTab}
                                index={t}
                                mainIndex={this.props.index}
                                indexTabs={i}
                                title={compTab.title}
                                value={compTab.value}
                                color={compTab.color}
                                placeholder={compTab.placeholder}
                                type={compTab.type}
                                span={20}
                                disabled={false}
                                handleChangeUpload={this.handleChangeUpload}
                                handleChangeValidateDetailTabs={this.props.handleChangeValidateDetailTabs}
                                handleOnChageInputPreviewTab={this.props.handleOnChageInputPreviewTab}
                                handleOnChageFirstCheckTab={this.props.handleOnChageFirstCheckTab}
                              />
                            </Row>
                          )
                        })}
                      </Row>
                    </TabPane>
                  )
                })
                :
                []
              }
            </Tabs>
          </Col>
        )
      break;
      case 'checklist' : 
      return (
        <Col span={span} style={{marginBottom:15}}>
            <Col>
              <Row style={{marginBottom:10}}>
                {this.props.title ?
                  <span style={{fontWeight:'600',fontSize:15}}>{value}</span>
                  :
                  []
                }
              </Row>
            </Col>
           <Checkbox.Group style={{ width: '100%' }}
              onChange={(e)=>this.props.handleChangeCheckList(e,this.props.items,this.props.index)} 
              value={this.props.items.postValue}
           >
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
            {this.renderErrorMessage("checklist",items,index)}
        </Col>
      )
      break;
      case 'file' : 
        const props = {
          
        };
        return (
          <Col span={span} style={{marginBottom:15}}>
              <Col>
                <Row style={{marginBottom:10}}>
                  {this.props.value ?
                    <span style={{fontWeight:'600',fontSize:15}}>{value}</span>
                    :
                    []
                  }
                </Row>
              </Col>
              <Upload 
                name  = 'file'
                action = '//jsonplaceholder.typicode.com/posts/'
                headers = {{
                  authorization: 'authorization-text'
                }}
                onChange = {(e)=>this.props.handleChangeUploadPost(e,this.props.items,this.props.index)}
              >
                <Button disabled={disabled}>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
              {this.renderErrorMessage("file",items,index)}
          </Col>
        )
      break;
      
      case 'map' :  
        const MarkComponent = ({ desc }) => <div><Icon style={{color:'#f22f2f', fontSize:20, fontWeight:'800'}} type="environment" theme="filled" />{desc}</div>;
        return (
          <Col span={span} style={{marginBottom:15,paddingBottom:10}}>
              <Col>
                <Row style={{marginBottom:10}}>
                  {items.title!='' ?
                    <span style={{fontWeight:'600',fontSize:15}}>{title}</span>
                    :
                    []
                  }
                </Row>
                <Row type={'flex'} align={'center'}>
                  <Col span={24}>
                    <div style={{ height: '100vh', width: '100%' }}>
                      <GoogleMaps
                        bootstrapURLKeys={{ key:'AIzaSyBHL-hz-eBvTvpgC4R5E8I4T6RRzC7hTsY'}}
                        defaultCenter={items.markValue.center}
                        defaultZoom={items.markValue.zoom}
                      >
                        <MarkComponent
                          lat={items.markValue.mark.lat}
                          lng={items.markValue.mark.lng}
                          v={''}
                        />
                      </GoogleMaps>
                    </div>
                  </Col>
                </Row>
              </Col>
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
export default CommonPreviewComponent;
