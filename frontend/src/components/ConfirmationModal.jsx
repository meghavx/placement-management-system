/*
========================================
Component: ConfirmationModal

Purpose:
Reusable confirmation dialog used for Delete, Publish, Apply,
Deactivate, and Logout actions across the whole application.

Current Features:
- Title + message + Cancel/Confirm buttons built on top of Modal
- Confirm button variant configurable (e.g. danger for delete)

Future:
- None; keep this the single ConfirmationModal implementation.
========================================
*/

import Modal from './Modal'
import Button from './Button'

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  confirmVariant = 'primary',
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-gray-600">{message}</p>
    </Modal>
  )
}
