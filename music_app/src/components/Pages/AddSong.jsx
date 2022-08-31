import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import AddArtist from "../AddArtist";

const AddSong = () => {
  const [artists, setArtists] = useState([]);
  const [data, setData] = useState({
    name: "",
    dateOfRelease: "",
    artistId: [],
    cover: null,
  });

  useEffect(() => {
    const arr = [];
    axios({
      method: "GET",
      url: "http://localhost:6001/artists",
    })
      .then((res) => {
        res.data.map((artist) => {
          arr.push({ value: artist._id, label: artist.name });
        });
      })
      .then(() => setArtists(arr));
  }, []);

  const handleselect = (opts) => {
    const ids = [];
    opts.map((opt) => {
      ids.push(opt.value);
    });
    setData({ ...data, artistId: ids });
  };

  const fileChange = (e) => {
    setData({ ...data, cover: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, dateOfRelease, artistId, cover } = data;
    if (!name || !dateOfRelease || !artistId || !cover) {
      alert("All fields are required");
      return;
    }
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }
    axios({
      method: "POST",
      url: "http://localhost:6001/songs/addsong",
      // url: "https://httpbin.org/anything",
      data: formData,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log("error:", err));
  };

  return (
    <Box width='90%' m={"auto"}>
      <Heading>Adding a new song</Heading>
      <Stack mt={5}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={5} width='400px' id='name'>
            <FormLabel>Song Name</FormLabel>
            <Input
              outline={"1px solid rgb(204, 204, 204)"}
              type='text'
              name='name'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={5} width='400px' id='dateOfRelease'>
            <FormLabel>Date Released</FormLabel>
            <Input
              outline={"1px solid rgb(204, 204, 204)"}
              name='dateOfRelease'
              type='text'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={5} id='cover'>
            <FormLabel>Artwork</FormLabel>
            <input type='file' onChange={fileChange} />
          </FormControl>
          <Flex>
            <FormControl mb={5} width='400px' id='artistId'>
              <FormLabel>Artists</FormLabel>
              <Select
                isMulti
                options={artists}
                onChange={(opt) => handleselect(opt)}
              />
            </FormControl>
            <AddArtist />
          </Flex>
          <Input
            outline={"1px solid rgb(204, 204, 204)"}
            type='submit'
            mt={5}
            w={100}
          />
        </form>
      </Stack>
    </Box>
  );
};

export default AddSong;
