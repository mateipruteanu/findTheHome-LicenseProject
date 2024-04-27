import { GetUserDTO } from "@/dtos/GetUserDTO";
import useDeleteUser from "@/hooks/useDeleteUser";
import {
  Flex,
  Button,
  Box,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function UserCard({
  user,
  onUserDelete,
}: {
  user: GetUserDTO;
  onUserDelete: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { deleteUser } = useDeleteUser();

  const handleDeleteClick = () => {
    console.log("Deleting user:", user.id);
    deleteUser(user.id);
    onUserDelete();
    onClose();
  };

  return (
    <Box
      w={{ base: "100%", md: "45%" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      m="2"
      p="2"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Text>
          <Text fontSize="sm">{user.email}</Text>
          <Text fontSize="sm">Role: {user.role}</Text>
          <Text fontSize="sm">
            Last Login: {new Date(user.lastLogin).toDateString()}, {new Date(user.lastLogin).toLocaleTimeString()}
          </Text>
        </Box>
        <Box>
          <Button colorScheme="red" onClick={onOpen}>
            Delete
          </Button>
        </Box>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius={"xl"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account "{user.firstName + " " + user.lastName}" forever?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} borderRadius={"full"}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteClick}
                ml={3}
                borderRadius={"full"}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
