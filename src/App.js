import React, { Component } from 'react'
import { Form, InputNumber, Row, Col, Button, } from 'antd'

const FormItem = Form.Item

class RegistrationForm extends Component {
  state = {
    finalAtk: 0
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.calculateDamage(values)
      }
    })
  }

  calculateDamage = ({ frontatk, weapon, weaponlv, refined, str }) => {
    let increasing
    switch (weaponlv) {
      case 1:
        increasing = 2
        break;
      case 2:
        increasing = 3
        break;
      case 3:
        increasing = 5
        break;
      case 4:
        increasing = 7
        break;
      default:
        increasing = 1
        break;
    }
    let Atk = Number(frontatk) * 2
    let totalRefined = refined === 0 ? 0 : Number(refined) * Number(increasing)
    let strBonus = Number(str / 2)
    let dmg = Atk + Number(weapon) + totalRefined + strBonus + 10
    this.setState({
      finalAtk: dmg
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }

    return (
      <Row type='flex' justify='center' align='middle' style={{ height: '100vh' }}>
        <Col span={8}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="Front ATK"
            >
              {getFieldDecorator('frontatk', {
                rules: [{
                  type: 'number', message: 'Number is not valid!',
                }, {
                  required: true, message: 'Please input your Front Atk!',
                }],
              })(
                <InputNumber style={{ width: 300 }} placeholder='fill your front atk' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Weapon ATK"
            >
              {getFieldDecorator('weapon', {
                rules: [{
                  type: 'number', message: 'Number is not valid!',
                }, {
                  required: true, message: 'Please input your Weapon Atk!',
                }],
              })(
                <InputNumber style={{ width: 300 }} placeholder='fill your weapon atk' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Weapon Level"
            >
              {getFieldDecorator('weaponlv', {
                rules: [{
                  type: 'number', message: 'Number is not valid!',
                }, {
                  required: true, message: 'Please input your Weapon Level!',
                }],
              })(
                <InputNumber style={{ width: 300 }} placeholder='fill your weapon level' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Weapon Refined"
            >
              {getFieldDecorator('refined', {
                rules: [{
                  type: 'number', message: 'Number is not valid!',
                }, {
                  required: true, message: 'Please input your Weapon Refined!',
                }],
              })(
                <InputNumber style={{ width: 300 }} placeholder='fill your weapon refined' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Charector Str"
            >
              {getFieldDecorator('str', {
                rules: [{
                  type: 'number', message: 'Number is not valid!',
                }, {
                  required: true, message: 'Please input your Charector Str!',
                }],
              })(
                <InputNumber style={{ width: 300 }} placeholder='fill your strange' />
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{ width: 300 }}>Calculate</Button>
            </FormItem>
          </Form>
          {this.state.finalAtk !== 0 ? <div style={{ textAlign: 'center' }}><h1>Final Atk is {this.state.finalAtk}</h1></div> : false}
        </Col>
      </Row>
    )
  }
}

const App = Form.create()(RegistrationForm)

export default App
