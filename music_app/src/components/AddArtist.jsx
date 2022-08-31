import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, memo } from "react";
import axios from "axios";

const AddArtist = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({
    name: "",
    dob: "",
    bio: "",
  });

  const handleDate = (e) => {
    const inpDate = e.target.value;
    const dateArr = inpDate.split("-");
    const [year, _, firstDate] = dateArr;
    let date = new Date(inpDate);
    let longMonth = date.toLocaleString("en-us", { month: "long" });
    const newDate = `${longMonth} ${firstDate}, ${year}`;
    setData({ ...data, dob: newDate });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    const { name, dob, bio } = data;
    if (!name || !dob || !bio) {
      alert("All fields are required");
      return;
    }
    axios({
      method: "POST",
      url: "http://localhost:6001/artists/addartist",
      data: data,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button
        style={{ transform: `translate(${30}px, ${28}px)` }}
        onClick={onOpen}
      >
        <span
          style={{ fontSize: "23px", transform: `translate(${-3}px, ${-1}px)` }}
        >
          +
        </span>{" "}
        Add Artist
      </Button>
      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Artist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex mb={7}>
              <Box width={"170px"}>
                <Text>Artist Name</Text>
              </Box>
              <Input
                name='name'
                onChange={handleChange}
                outline={"1px solid rgb(204, 204, 204)"}
                type={"text"}
              />
            </Flex>
            <Flex mb={7}>
              <Box width={"170px"}>
                <Text>Date of Birth</Text>
              </Box>
              <Input
                outline={"1px solid rgb(204, 204, 204)"}
                placeholder='Select Date and Time'
                type='date'
                onChange={handleDate}
              />
            </Flex>
            <Flex mb={7}>
              <Box width={"170px"}>
                <Text>Bio</Text>
              </Box>
              <Textarea
                onChange={handleChange}
                name='bio'
                outline={"1px solid rgb(204, 204, 204)"}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant='ghost'>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(AddArtist);
