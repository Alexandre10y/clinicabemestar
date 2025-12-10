import { Modal, Form, Input, Button, Select } from "antd";
import { useEffect } from "react";

function UsuarioModal({ open, onClose, onSubmit, editingData }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingData) {
      form.setFieldsValue(editingData);
    } else {
      form.resetFields();
    }
  }, [editingData]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={editingData ? "Editar Usuário" : "Novo Usuário"}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>

        <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="E-mail" name="email" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Tipo de Usuário"
          name="tipo"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "Administrador", value: "admin" },
              { label: "Profissional", value: "profissional" }
            ]}
            placeholder="Selecione o tipo"
          />
        </Form.Item>

        <Form.Item label="Telefone" name="telefone">
          <Input />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="senha"
          rules={[{ required: true, message: "Informe uma senha" }]}
        >
          <Input.Password />
        </Form.Item>


        <Button type="primary" htmlType="submit" block>
          {editingData ? "Salvar alterações" : "Cadastrar"}
        </Button>
      </Form>
    </Modal>
  );
}

export default UsuarioModal;
