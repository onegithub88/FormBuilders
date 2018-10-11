import React from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select,Checkbox, Radio, DatePicker,
  Modal, Icon, Avatar, Table, Button, Row, Col, Card
} from 'antd';
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
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
  
  render (){
    var title = this.props.title ? this.props.title :'';
    var type  = this.props.type ? this.props.type :'';
    var span  = this.props.span ? this.props.span : 24;
    var value = this.props.value ? this.props.value :'';
    var color = this.props.value ? this.props.color :'primary';
    var options      = this.props.options ? this.props.options : [];
    var placeholder  = this.props.placeholder ? this.props.placeholder :'';
    var disabled     = this.props.disabled ? this.props.disabled :true;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    var handleChangeInputNumber = this.props.handleChangeInputNumber ? this.props.handleChangeInputNumber : () => {};
    switch (type) {
      case 'textinput':
        return (
          <Col span={span} style={{marginBottom: 15,paddingBottom: 10}}>
            {this.props.title ?
              <span style={{marginBottom: 10}}>{title}</span>
              :
              []
            }
            <Input
              onChange={()=>handleChangeInputNumber(e)}
              disabled={disabled}
              defaultValue={value}
              placeholder={placeholder}
            />
          </Col>
        )
        break;
      case 'textarea':
        return (
          <Col span={span} style={{marginBottom: 15, paddingBottom: 10}}>
            {this.props.title ?
              <span style={{marginBottom: 10}}>{title}</span>
              :
              []
            }
            <TextArea
              disabled={disabled}
              rows={4}
              defaultValue={value}
              placeholder={"test brow"}
            />
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
           <Select
             disabled={disabled}
             showSearch
             style={{ width: 300 ,marginTop: 20}}
             placeholder="Select a person"
             optionFilterProp="children"
             onChange={()=>this.handleChangeDropDown()}
             filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
           >
             <Option value="jack">Jack</Option>
             <Option value="lucy">Lucy</Option>
             <Option value="tom">Tom</Option>
           </Select>
        </Col>
       )
      break;
      case 'button' :
        var backgrounColor = '#22ff22 !important';
        return (
          <Col span={span} style={{marginBottom: 15, paddingBottom: 10}}>
          <div>
            <Button color={'#22ff22'} style={{paddingLeft:10, paddingRight:10, marginTop: 20, backgrounColor:backgrounColor}}  type={color}>{value}</Button>
          </div>
        </Col>
        )
      break;
      case 'radio' :
        return (
          <RadioGroup style={{width:365}} onChange={this.onChange} value={this.state.value}>
            <Radio style={radioStyle} value={1}>Option 1</Radio>
            <Radio style={radioStyle} value={2}>Option 2</Radio>
            <Radio style={radioStyle} value={3}>Option 3</Radio>
          </RadioGroup>
        );
      break;
      case 'date' :
        return (
          <Col span={span} style={{marginBottom: 15, paddingBottom: 10,marginTop:20}}>
              <DatePicker  style={{width:300}} onChange={()=>this.onChange()} />
          </Col>
        );
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
