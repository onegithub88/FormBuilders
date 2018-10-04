import React from 'react';
import { LocaleProvider, Layout, Form, Input, Menu, Select,
  Modal, Icon, Avatar, Table, Button, Row, Col, Card
} from 'antd';
class CommonComponent extends React.Component{
  render (){
    var type  = this.props.type ? this.props.type :'';
    var span  = this.props.span ? this.props.span : 24;
    var value = this.props.value ? this.props.value :'';
    var placeholder = this.props.placeholder ? this.props.placeholder :'';
    switch (type) {
      case 'textInput':
        return (
          <Col span={span} style={{marginBottom: 15}}>
            {this.props.title ?
              <span style={{marginBottom: 10}}>{this.props.title}</span>
              :
              []
            }
            <Input
              defaultValue={value}
              placeholder={placeholder}
            />
          </Col>
        )
        break;
      case 'textInput':
        return (
          <Input />
        )
        break;
      default:
        return(
          <div>
          <span></span>
          </div>
        )
    }
  }
}
export default CommonComponent;
