import React from "react";
import "./reset.css";
import "./app.css";
import 'antd/dist/antd.css';
import { Form, InputNumber, Typography, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons'

const { Title } = Typography;

export default class App extends React.Component {
  formRef = React.createRef();

  constructor() {
    super();

    this.state = {
      calVelocity: '',
      calPower: ''
    };
  }

  render() {

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };
  
    const validateMessages = {
      types: {
        number: '请输入合法的数字'
      }
    };
  
    const valueChange = (val, allVal) => {
      const { diameter, projectileWeight, velocity } = allVal;

      const calVelocity = 0.5*(projectileWeight/1000)*(velocity*velocity);

      this.setState({
        calVelocity,
        calPower: calVelocity/(((diameter/2)/10)*((diameter/2)/10)*Math.PI)
      });
    };

    const resetForm = () => {
      this.formRef.current.resetFields();
      this.setState({
        calVelocity: '',
        calPower: ''
      })
    };
  
    return (
      <div className="app">
        <Title
          className="title"
          level={3}
        >动能计算器by Double-Bird</Title>
  
        <Form
          { ...layout }
          ref={this.formRef}
          className="cal-form"
          validateMessages={validateMessages}
          onValuesChange={valueChange}
        >
          <Form.Item
            label="弹径(mm)"
            name="diameter"
            rules={[{ type: 'number' }]}
          >
            <InputNumber step={0.1} />
          </Form.Item>
  
          <Form.Item
            label="弹重(g)"
            name="projectileWeight"
            rules={[{ type: 'number' }]}
          >
            <InputNumber step={0.1} />
          </Form.Item>
  
          <Form.Item
            label="初速(m/s)"
            name="velocity"
            rules={[{ type: 'number' }]}
          >
            <InputNumber step={0.1} />
          </Form.Item>
  
          <Form.Item label="焦耳数(J)">
            { this.state.calVelocity }
          </Form.Item>

          <Form.Item label="动能比(J/cm²)">
            { this.state.calPower }
          </Form.Item>
        </Form>

        <div style={{'textAlign': 'center'}}>
          <Button
            type="primary"
            onClick={ resetForm }
            icon={<ReloadOutlined />}
          >清空</Button>
        </div>
  
      </div>
    );
  }
}
