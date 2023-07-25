import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import tw from 'twin.macro';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  size?: { width: string; height: string };
};

export default function Modal({ isOpen, children, onClose, size }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.createElement('div');
    root.setAttribute('id', 'modal-root');
    document.body.appendChild(root);
    setModalRoot(root);

    return () => {
      document.body.removeChild(root);
    }
  }, []);

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = isOpen ? (
    <div
      onClick={handleBackgroundClick}
      css={tw`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50`}>
      <div
        css={[
          tw`bg-white p-6 rounded-lg shadow-lg relative`,
          { width: size?.width, height: size?.height },
        ]}>
        {children}
        <button onClick={handleCloseClick} css={tw`absolute top-0 right-0 p-4`}>Close</button>
      </div>
    </div>
  ) : null;

  if (modalRoot) {
    return createPortal(modalContent, modalRoot);
  } else {
    return null;
  }
}
