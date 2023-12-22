import {
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface Props {
  children: string;
  isSuccess: boolean;
  isOpen: boolean;
}

const MessageModal = ({ children, isSuccess, isOpen }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody justifyContent='center'>
          <HStack>
            {isSuccess ? (
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
