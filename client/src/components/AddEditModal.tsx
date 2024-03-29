import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ListingModalForm from "./ListingModalForm";
import { useState } from "react";
import { Listing } from "@/entities/Listing";
import { CreateListingDTO } from "@/dtos/CreateListingDTO";
import copyListingToDTO from "@/utils/copyListingtoDTO";
import useAddListing from "@/hooks/useAddListing";
import useUpdateListing from "@/hooks/useUpdateListing";

export default function AddEditModal({
  mode,
  isOpen,
  OnClose,
  listing,
}: {
  mode: "add" | "edit";
  isOpen: boolean;
  OnClose: () => void;
  listing?: Listing;
}) {
  const emptyListing: CreateListingDTO = {
    title: "",
    description: "",
    price: 0,
    address: {
      country: "",
      city: "",
      street: "",
      postalCode: "",
    },
    image: "",
    homeType: "HOUSE",
    listingType: "RENT",
    numOfBaths: 0,
    numOfBeds: 0,
    numOfMeterSquared: 0,
  };
  let initialListing: CreateListingDTO;
  if (listing) {
    initialListing = copyListingToDTO(listing);
  } else {
    initialListing = emptyListing;
  }

  const [listingDetails, setListingDetails] = useState(initialListing);
  const {
    addListing,
    isLoading: isAdding,
    error: addingError,
  } = useAddListing();
  const {
    updateListing,
    isLoading: isUpdating,
    error: updatingError,
  } = useUpdateListing();

  const handleAddSaveButtonClick = async () => {
    if (mode === "add") {
      await addListing(listingDetails);
      if (!isAdding && !addingError) {
        OnClose();
        setListingDetails(emptyListing);
      }
    } else {
      await updateListing(listing?.id || "", listingDetails);
      if (!isUpdating && !updatingError) {
        OnClose();
        setListingDetails(emptyListing);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={OnClose}
      size={"xl"}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {mode === "add" ? "Add Listing" : "Edit Listing"}
        </ModalHeader>
        <ModalBody>
          <ListingModalForm
            listingDetails={listingDetails}
            setListingDetails={setListingDetails}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            onClick={OnClose}
            variant={"ghost"}
            borderRadius={"full"}
          >
            Close
          </Button>
          <Button
            variant="solid"
            colorScheme="green"
            borderRadius={"full"}
            onClick={handleAddSaveButtonClick}
          >
            {mode === "add" ? "Add Listing" : "Save Listing"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
