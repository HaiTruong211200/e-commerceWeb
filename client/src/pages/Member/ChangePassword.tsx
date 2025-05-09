import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

type ChangePasswordModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (passwords: {
    currentPassword: string;
    password: string;
    passwordConfirm: string;
  }) => void;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  show,
  handleClose,
  handleSubmit,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    empty: false,
    length: false,
    mismatch: false,
  });

  const onSubmit = () => {
    const newErrors = {
      empty: !currentPassword || !password || !passwordConfirm,
      length: password.length < 8,
      mismatch: password !== passwordConfirm,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    handleSubmit({ currentPassword, password, passwordConfirm });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thay đổi mật khẩu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu hiện tại</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu cũ"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              isInvalid={errors.empty && !currentPassword}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              isInvalid={
                (errors.empty && !password) ||
                (errors.length && password.length < 8)
              }
            />
            {errors.length && (
              <Form.Text className="text-danger">
                Mật khẩu phải có ít nhất 8 ký tự.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={passwordConfirm}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={(errors.empty && !passwordConfirm) || errors.mismatch}
            />
            {errors.mismatch && (
              <Form.Text className="text-danger">
                Mật khẩu xác nhận không khớp.
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
