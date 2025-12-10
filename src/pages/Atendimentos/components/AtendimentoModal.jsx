import { Modal, Form, Select, DatePicker, TimePicker, Input, Button } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

function AtendimentoModal({ open, onClose, onSubmit, pacientes = [], editingData }) {
  const [form] = Form.useForm();

  const user = JSON.parse(localStorage.getItem("userLogged"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const isAdmin = user?.tipo === "admin";

  useEffect(() => {
    if (open) {
      if (editingData) {
        form.setFieldsValue({
          paciente: editingData.paciente,
          data: dayjs(editingData.data),
          hora: dayjs(editingData.hora, "HH:mm"),
          profissional: editingData.profissional,
          servico: editingData.servico,
          valor: editingData.valor,
          pagamento: editingData.pagamento, // ✔ CARREGANDO PAGAMENTO
          status: editingData.status,
          obs: editingData.obs,
        });
      } else {
        form.resetFields();

        if (!isAdmin) {
          form.setFieldsValue({ profissional: user.nome });
        }
      }
    }
  }, [open, editingData]);


  const handleFinish = (values) => {
    const payload = {
      ...values,
      data: values.data.format("YYYY-MM-DD"),
      hora: values.hora.format("HH:mm"),
      valor: Number(values.valor),
      profissional: isAdmin ? values.profissional : user.nome,
      key: editingData ? editingData.key : Date.now(),
    };

    onSubmit(payload);
    form.resetFields();
  };

  return (
    <Modal
      title={editingData ? "Editar Atendimento" : "Novo Atendimento"}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>

        {/* PACIENTE */}
        <Form.Item label="Paciente" name="paciente" rules={[{ required: true }]}>
          <Select
            placeholder="Selecione o paciente"
            options={pacientes.map((p) => ({ label: p.nome, value: p.key }))}
          />
        </Form.Item>

        {/* DATA */}
        <Form.Item label="Data" name="data" rules={[{ required: true }]}>
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>

        {/* HORA */}
        <Form.Item label="Hora" name="hora" rules={[{ required: true }]}>
          <TimePicker format="HH:mm" minuteStep={30} style={{ width: "100%" }} />
        </Form.Item>

        {/* PROFISSIONAL */}
        {isAdmin ? (
          <Form.Item label="Profissional" name="profissional" rules={[{ required: true }]}>
            <Select
              placeholder="Selecione o profissional"
              options={usuarios
                .filter((u) => u.tipo === "profissional")
                .map((u) => ({ label: u.nome, value: u.nome }))}
            />
          </Form.Item>
        ) : (
          <Form.Item label="Profissional">
            <Input disabled value={user.nome} />
          </Form.Item>
        )}

        {/* SERVIÇO */}
        <Form.Item
          label="Serviço"
          name="servico"
          rules={[{ required: true, message: "Informe o serviço" }]}
        >
          <Input />
        </Form.Item>

        {/* VALOR */}
        <Form.Item
          label="Valor (R$)"
          name="valor"
          rules={[{ required: true, message: "Informe o valor" }]}
        >
          <Input type="number" min="0" step="0.01" />
        </Form.Item>

        {/* VALOR */}
        <Form.Item
          label="Tipo de Pagamento"
          name="pagamento"
          rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Cartão", value: "cartao" },
              { label: "Pix", value: "pix" },
              { label: "Dinheiro", value: "dinheiro" }
            ]}
          />
        </Form.Item>

        {/* STATUS */}
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Pago", value: "pago" },
              { label: "Pendente", value: "pendente" },
            ]}
          />
        </Form.Item>

        {/* OBSERVAÇÃO */}
        <Form.Item label="Observações" name="obs">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {editingData ? "Salvar Alterações" : "Salvar Atendimento"}
        </Button>
      </Form>
    </Modal>
  );
}

export default AtendimentoModal;
