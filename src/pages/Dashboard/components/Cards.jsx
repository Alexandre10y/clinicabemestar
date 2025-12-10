import { Card, Col, Row } from "antd";

function Cards({ totalPacientes, totalAtendimentosMes, receitaRecebida, receitaPendente }) {
  return (
    <Row gutter={16}>
      <Col span={6}><Card title="Pacientes">{totalPacientes}</Card></Col>
      <Col span={6}><Card title="Atendimentos no mês">{totalAtendimentosMes}</Card></Col>
      <Col span={6}><Card title="Receita recebida">R$ {receitaRecebida}</Card></Col>
      <Col span={6}><Card title="Receita pendente">R$ {receitaPendente}</Card></Col>
      
    </Row>
  );
}

export default Cards;
