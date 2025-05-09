import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./editInfo.css";

type EditInfoModalProps = {
  showModal: boolean;
  handleClose: () => void;
  handleSubmit: (updatedInfo: {
    displayName: string;
    phone: string;
    address: string;
  }) => void;
  initialInfo?: {
    displayName: string | undefined;
    phone: string | undefined;
    address: string | undefined;
  };
};

const EditInfoModal: React.FC<EditInfoModalProps> = ({
  showModal,
  handleClose,
  handleSubmit,
  initialInfo = { displayName: "", phone: "", address: "" },
}) => {
  const [displayName, setName] = useState(initialInfo.displayName);
  const [phone, setPhone] = useState(initialInfo.phone);
  const [address, setAddress] = useState(initialInfo.address);

  useEffect(() => {
    // Cập nhật lại state nếu initialInfo thay đổi
    setName(initialInfo.displayName);
    setAddress(initialInfo.address);
  }, [initialInfo]);

  const onSubmit = () => {
    if (!displayName || !address || !phone) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    handleSubmit({ displayName, phone, address });
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose} dialogClassName="my-form">
      <Modal.Header closeButton>
        <Modal.Title className="text-center fw-bold">
          Chỉnh sửa thông tin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editName" className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập họ tên"
              value={displayName}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="editPhone" className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="editAddress" className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditInfoModal;
