import { Modal, Form, Input, Button } from "antd";
import { useEffect } from "react";

function PacienteModal({ open, onClose, onSubmit, editingData }) {
  const [form] = Form.useForm();

  // Preencher dados ao editar
  useEffect(() => {
    if (open) {
      if (editingData) {
        form.setFieldsValue(editingData);
      } else {
        form.resetFields();
      }
    }
  }, [open, editingData, form]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={editingData ? "Editar Cliente" : "Adicionar Cliente"}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>

        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Digite o nome" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: "Digite o e-mail" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Telefone" name="telefone">
          <Input maxLength={15} />
        </Form.Item>

        <Form.Item
          label="CPF"
          name="cpf"
          rules={[
            { required: true, message: "Digite o CPF" },
            {
              pattern: /^\d{11}$/,
              message: "CPF deve ter 11 números (somente números)",
            },
          ]}
        >
          <Input maxLength={11} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {editingData ? "Salvar Alterações" : "Cadastrar"}
        </Button>

      </Form>
    </Modal>
  );
}

export default PacienteModal;
