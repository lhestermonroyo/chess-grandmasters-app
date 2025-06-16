import { Col, Row } from 'antd';

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Row justify="center" align="middle">
      <Col flex="1000px">{children}</Col>
    </Row>
  );
};

export default Main;
