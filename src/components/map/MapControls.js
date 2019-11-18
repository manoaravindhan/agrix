import React, { useState, useEffect } from "react";
import { Icon, Modal, Steps, Button, Divider, Result, Table, Form, Select, DatePicker, notification, Checkbox, Tooltip, Typography, Row, Col } from 'antd';
import propTypes from "prop-types";
import ApexCharts from 'apexcharts';

const { Option } = Select;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const { Title } = Typography;
const pieOption = {
  chart: {
    type: 'pie'
  },
  series: [324947.05, 718969.0104, 703248.9567, 102469.5138, 100839.6755,
    96475.91474, 90429.74025, 87590.66701, 76286.94947, 76076.64775, 616657.2229],
  chartOptions: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
  },
  legend: {
    show: false
  },
  colors: ['#800080', '#FF0000', '#FF00FF', '#000080', '#0000FF', '#008000', '#00FF00', '#ffa500', '#654321', '#d3d3d3', '#FF8C00']
}
const rangeOption = {
  chart: {
    type: 'rangeBar'
  },
  series: [{
    data: [{
      x: '1',
      y: [0, 324947.05]
    }, {
      x: '2',
      y: [0, 718969.0104]
    }, {
      x: '3',
      y: [0, 703248.9567]
    }, {
      x: '4',
      y: [0, 102469.5138]
    }, {
      x: '5',
      y: [0, 100839.6755]
    }, {
      x: '6',
      y: [0, 96475.91474]
    }, {
      x: '7',
      y: [0, 90429.74025]
    }, {
      x: '8',
      y: [0, 87590.66701]
    }, {
      x: '9',
      y: [0, 76286.94947]
    }, {
      x: '10',
      y: [0, 76076.64775]
    }, {
      x: '11',
      y: [0, 616657.2229]
    }
    ]
  }]
}
const data = [
  {
    no: '1',
    area: '4795580512',
    perimeter: '12131424121',
    blockId: 2,
    blocks: 1,
    blockName: 'Karaikudi'
  },
  {
    no: '2',
    area: '95580512',
    perimeter: '12131424121',
    blockId: 2,
    blocks: 1,
    blockName: 'Orathanadu'
  },
  {
    no: '3',
    area: '5580512',
    perimeter: '12131424121',
    blockId: 2,
    blocks: 1,
    blockName: 'Manapparai'
  }
];
const plainOptions = ['Crop Type', 'Date of Sowing', 'Crop yield', 'Crop profile'];
const defaultCheckedList = ['Crop Type', 'Date of Sowing'];
const notifications = ['Email', 'Push Notification', 'Whatsapp'];
const defaultNotifications = ['Email'];
const { confirm } = Modal
const blocks = [
  {
    no: '1',
    area: '4895580512',
    perimeter: '12131424121',
    blockId: 21,
    blocks: 4,
    blockName: 'Viralimalai'
  },
  {
    no: '2',
    area: '5795580512',
    perimeter: '12231424121',
    blockId: 22,
    blocks: 3,
    blockName: 'Keeranur'
  }, {
    no: '3',
    area: '3795580512',
    perimeter: '121424121',
    blockId: 23,
    blocks: 11,
    blockName: 'Buppur'
  },
  {
    no: '4',
    area: '8580512',
    perimeter: '424121',
    blockId: 24,
    blocks: 19,
    blockName: 'Ponnamaravathi'
  },
  {
    no: '5',
    area: '195580512',
    perimeter: '831424121',
    blockId: 25,
    blocks: 13,
    blockName: 'Arimalam'
  },
  {
    no: '6',
    area: '5495580512',
    perimeter: '43131424121',
    blockId: 26,
    blocks: 31,
    blockName: 'Reserved Forest'
  },
  {
    no: '7',
    area: '3215580512',
    perimeter: '631424121',
    blockId: 27,
    blocks: 21,
    blockName: 'Aranthangi'
  },
  {
    no: '8',
    area: '4795872',
    perimeter: '1221',
    blockId: 28,
    blocks: 41,
    blockName: 'Alangudi'
  },
  {
    no: '9',
    area: '780512',
    perimeter: '424121',
    blockId: 29,
    blocks: 4,
    blockName: 'Pudhukottai'
  },
  {
    no: '10',
    area: '780512',
    perimeter: '424121',
    blockId: 99,
    blocks: 4,
    blockName: 'Other districts'
  },
];
const columns = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    width: '7%'
  },
  {
    title: 'Area',
    dataIndex: 'area',
    key: 'area',
    width: '15%'
  },
  {
    title: 'Perimeter',
    dataIndex: 'perimeter',
    key: 'perimeter',
    width: '15%'
  },
  {
    title: 'Blocks',
    dataIndex: 'blocks',
    key: 'blocks',
    width: '10%'
  },
  {
    title: 'Block Name',
    dataIndex: 'blockName',
    key: 'blockName'
  }
];
const { Step } = Steps;
const steps = [
  {
    title: 'Confirm'
  },
  {
    title: 'Choose Blocks'
  },
  {
    title: 'Additional Info'
  },
  {
    title: 'Output'
  },
  {
    title: 'Notifications'
  }
];
const stepStyle = {
  marginTop: 2,
  border: '1px dashed #e9e9e9',
  borderRadius: 6,
  minHeight: 375,
  textAlign: 'center'
}
const MapControls = ({ editAction, submit, clearDraw, handleSubmit, draw }) => {
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState('');
  const [current, setCurrent] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([...Array(blocks.length).keys()]);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedNList, setCheckedNList] = useState(defaultNotifications);
  const [indeterminateN, setIndeterminateN] = useState(true);
  const [checkAllN, setCheckAllN] = useState(false);
  const [stats, showStats] = useState(false);
  const onStats = () => {
    showStats(!stats);
  }
  const onChange = checkedList => {
    setCheckedList(checkedList);
    setIndeterminate(!!checkedList.length && checkedList.length < plainOptions.length);
    setCheckAll(checkedList.length === plainOptions.length);
  };
  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const onChangeN = checkedNList => {
    setCheckedNList(checkedNList);
    setIndeterminateN(!!checkedNList.length && checkedNList.length < notifications.length);
    setCheckAllN(checkedNList.length === notifications.length);
  };
  const onCheckAllChangeN = e => {
    setCheckedNList(e.target.checked ? notifications : []);
    setIndeterminateN(false);
    setCheckAllN(e.target.checked);
  };
  const next = () => {
    setCurrent(current + 1);
  }
  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const prev = () => {
    setCurrent(current - 1);
  }
  const onEdit = () => {
    editAction(true);
    setEdit(true);
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleDone = () => {
    notification.success({
      message: 'Success',
      description:
        'Job successfully added to queue. You will receive a notification once it is completed.',
    });
    handleClose();
  }
  const handleClose = () => {
    setCurrent(0);
    setOpenModal('');
    editAction(false);
    handleSubmit(false);
    clearDraw();
    setEdit(false);
  }
  const clear = () => {
    confirm({
      title: 'Reset',
      content: 'Are you sure to clear the selection?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setOpenModal('');
        setEdit(false);
        editAction(false);
        clearDraw();
        handleSubmit(false);
      },
    });
  }
  useEffect(() => {
    setTimeout(() => {
      const rangeBar = new ApexCharts(document.getElementById("chart"), rangeOption);
      rangeBar.render();
      const pieBar = new ApexCharts(document.getElementById("pie"), pieOption);
      pieBar.render();
    }, 1000);
  }, [stats])
  return (
    <>
      {!draw && <div className='zoom ol-control' style={{ position: 'absolute', right: '4%', bottom: '33%' }} >
        <Tooltip placement="left" title='Draw'><button onClick={onEdit} style={{ backgroundColor: `${edit ? '#004590' : ''}` }}><Icon type="edit" /></button>{/* //#004590 */}</Tooltip>
        <Tooltip placement="left" title='Submit'><button onClick={() => setOpenModal('analysis')}><Icon type="check-circle" theme="filled" style={{ color: submit && '#52C41A' }} /></button>{/* //#004590 */}</Tooltip>
        <Tooltip placement="left" title='Reset'><button onClick={clear}><Icon type="close-circle" theme="filled" style={{ color: submit && '#F5222D' }} /></button>{/* //#004590 */}</Tooltip>
      </div>}
      {draw && <div className='zoom ol-control' style={{ position: 'absolute', right: '4%', bottom: '33%' }} >
        <Tooltip placement="left" title='Statistics'><button style={{ backgroundColor: `${edit ? '#004590' : ''}` }} onClick={onStats}><Icon type="area-chart" /></button>{/* //#004590 */}</Tooltip>
      </div>}
      <Modal
        title="Statistics"
        visible={stats}
        footer={null}
        centered
        width='80%'
      >
        <div style={{ height: 200 }}>
          <Row>
            <Col span={6}>
              <div id="chart"></div>
            </Col>
            <Col span={6}>
              <div id='pie'></div>
            </Col>
          </Row>
        </div>
      </Modal>
      <Modal
        title="Analyse"
        visible={openModal === 'analysis'}
        footer={null}
        centered
        width='80%'
        onCancel={handleClose}
      >
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ ...stepStyle, ...([2, 3, 4].indexOf(current) !== -1 && { backgroundColor: '#fafafa' }) }}>
          {current === 0 && <Result
            status="warning"
            title="The below listed blocks will not be accessible. Do you wish to continue?"
            style={{ height: 110, padding: 10 }}
          />}
          {current === 0 && <div style={{ height: 270, overflowY: 'auto' }}><Table
            columns={columns}
            dataSource={data}
            bordered
            pagination={false}
          /></div>}
          {
            current === 1 && <Table
              columns={columns}
              dataSource={blocks}
              scroll={{ y: 240 }}
              rowSelection={rowSelection}
              bordered
              pagination={false}
              title={() => 'Available Blocks'}
            />
          }
          {
            current === 2 && <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} style={{ marginTop: 64 }}>
              <Form.Item label="Crop Type">
                <Select
                  placeholder="Select a type">
                  <Option value="male">Rice</Option>
                  <Option value="female">Wheat</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Date Range">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          }
          {
            current === 3 && <div>
              <div>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  style={{ float: 'left', padding: '30px' }}
                  checked={checkAll}>Select all</Checkbox>
              </div>
              <Divider />
              <CheckboxGroup
                style={{ float: 'left', paddingLeft: '30px' }}
                options={plainOptions}
                value={checkedList}
                onChange={onChange}
              />
            </div>
          }
          {
            current === 4 && <div>
              <div>
                <Checkbox
                  indeterminate={indeterminateN}
                  onChange={onCheckAllChangeN}
                  style={{ float: 'left', padding: '30px' }}
                  checked={checkAllN}>Select all</Checkbox>
              </div>
              <Divider />
              <CheckboxGroup
                style={{ float: 'left', paddingLeft: '30px' }}
                options={notifications}
                value={checkedNList}
                onChange={onChangeN}
              />
            </div>
          }
        </div>
        <Divider />
        <div>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              {current === 0 ? 'Accept' : 'Next'}
            </Button>
          )}
          {current === 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => { setOpenModal('') }}>
              Draw Again
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleDone}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
}
MapControls.propTypes = {
  classes: propTypes.object
};
export default MapControls;