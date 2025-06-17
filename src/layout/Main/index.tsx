import { Col, Row } from 'antd';
import Header from '../../components/Header';

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Row className="main" justify="center" align="middle">
      <Col flex="1000px">
        <Header />
        {children}
      </Col>
    </Row>
  );
};

export default Main;
