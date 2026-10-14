"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Team } from "@/types/team";

interface DeleteTeamModalProps {
  team: Team | null;
  isDeleting: boolean;
  hasError: boolean;
  onCancel: () => void;
  onConfirm: (team: Team) => void;
}

const DeleteTeamModal = ({
  team,
  isDeleting,
  hasError,
  onCancel,
  onConfirm,
}: DeleteTeamModalProps) => {
  return (
    <Modal
      isOpen={Boolean(team)}
      onOpenChange={(isOpen) => !isOpen && onCancel()}
      placement="center"
      className="bg-[#121326] text-white"
    >
      <ModalContent>
        <ModalHeader className="font-bold">Excluir time</ModalHeader>
        <ModalBody>
          <p className="text-base">
            Tem certeza que quer excluir <strong>{team?.name}</strong>? Essa
            ação não pode ser desfeita.
          </p>
          {hasError && (
            <p className="text-sm text-red-400" role="alert">
              Não foi possível excluir o time. Tente novamente.
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onCancel}>
            Cancelar
          </Button>
          <Button
            color="danger"
            isLoading={isDeleting}
            onPress={() => team && onConfirm(team)}
          >
            Excluir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteTeamModal;
