import React from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select,Checkbox, Radio, DatePicker,
  Modal, Icon, Avatar, Table, Button, Row, Col, Card, Divider, Tag, Tabs,Upload, message
} from 'antd';
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

const RadioGroup = Radio.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class CommonPreviewComponent extends React.Component{
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
  
  render (){
    var title = this.props.title ? this.props.title :'';
    var type  = this.props.type ? this.props.type :'';
    var span  = this.props.span ? this.props.span : 24;
    var value = this.props.value ? this.props.value :'';
    var color = this.props.value ? this.props.color :'primary';
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

    var handleChangeInputNumber = this.props.handleChangeInputNumber ? this.props.handleChangeInputNumber : () => {};
    switch (type) {
      case 'textinput':
        return (
          <Col span={span} style={{marginBottom: 15}}>
            <Row style={{marginBottom: 10}}>
                {this.props.title ?
                <span>{title}</span>
                :
                []
                }
            </Row>
            <Row>
                <Input
                onChange={()=>handleChangeInputNumber(e)}
                disabled={disabled}
                defaultValue={value}
                placeholder={placeholder}
                />
            </Row>
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
                rows={4}
                defaultValue={value}
                placeholder={"test brow"}
                />
            </Row>
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
      case 'button' :
        var backgrounColor = '#22ff22 !important';
        return (
          <Col span={span} style={{marginBottom: 15}}>
            <div>
              <Button color={'#22ff22'} style={{paddingLeft:10, paddingRight:10, marginTop: 20, backgrounColor:backgrounColor}}  type={color}>{value}</Button>
            </div>
          </Col>
        )
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
          <Col span={span} style={{marginBottom: 15}}>
            <Row style={{marginBottom:10}}>
              {this.props.title ?
                <span>{title}</span>
                :
                []
              }
            </Row>
            <Row>
              <DatePicker disabled={disabled} style={{width:'100%'}} onChange={()=>this.onChange()} />
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
                    <TabPane tab={obj} key={i}>{obj}</TabPane>
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
              <Upload {...props}>
                <Button disabled={disabled}>
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
export default CommonPreviewComponent;
