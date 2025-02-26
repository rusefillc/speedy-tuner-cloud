import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import {
  AppState,
  TuneDataState,
} from '../types/state';
import Loader from '../components/Loader';

const { Item } = Form;
const rowProps = { gutter: 10 };
const colProps = { span: 24, sm: 12 };

const mapStateToProps = (state: AppState) => ({
  tuneData: state.tuneData,
});

const Info = ({ tuneData }: { tuneData: TuneDataState }) => {
  if (!tuneData.details) {
    return <Loader />;
  }

  return (
    <div className="small-container">
      <Divider>Details</Divider>
      <Form>
        <Row {...rowProps}>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.make!} addonBefore="Make" />
            </Item>
          </Col>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.model!} addonBefore="Model" />
            </Item>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.year!} addonBefore="Year" style={{ width: '100%' }} />
            </Item>
          </Col>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.displacement!} addonBefore="Displacement" addonAfter="l" />
            </Item>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.hp!} addonBefore="HP" style={{ width: '100%' }} />
            </Item>
          </Col>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.stockHp!} addonBefore="Stock HP" style={{ width: '100%' }} />
            </Item>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.engineCode!} addonBefore="Engine code" />
            </Item>
          </Col>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.cylindersCount!} addonBefore="No of cylinders" style={{ width: '100%' }} />
            </Item>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col {...colProps}>
            <Item>
              <Select placeholder="Aspiration" style={{ width: '100%' }} value={tuneData.details.aspiration}>
                <Select.Option value="na">Naturally aspirated</Select.Option>
                <Select.Option value="turbocharger">Turbocharged</Select.Option>
                <Select.Option value="supercharger">Supercharged</Select.Option>
              </Select>
            </Item>
          </Col>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.fuel!} addonBefore="Fuel" />
            </Item>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.injectorsSize!} addonBefore="Injectors size" addonAfter="cc" />
            </Item>
          </Col>
          <Col {...colProps}>
            <Item>
              <Input value={tuneData.details.coils!} addonBefore="Coils" />
            </Item>
          </Col>
        </Row>
      </Form>
      <Divider>README</Divider>
      <div className="markdown-preview" style={{ height: '100%' }}>
        {tuneData.details?.readme && <ReactMarkdown>
          {`${tuneData.details?.readme}`}
        </ReactMarkdown>}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Info);
