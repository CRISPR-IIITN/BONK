import {
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MessageModal = ({ children }: { children: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody justifyContent='center'>
          <HStack>
            {(children === "Signed up successfully!" ||
            children === "Logged in successfully!") ? (
              <FaCheckCircle color='green' />
            ) : (
              <FaTimesCircle color='red' />
            )}
            <Text>{children}</Text>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
