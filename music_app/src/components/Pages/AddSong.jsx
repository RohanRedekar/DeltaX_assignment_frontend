import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const AddSong = () => {
  const [artists, setArtists] = useState([]);
  const formData = new FormData();
  const [data, setData] = useState({
    name: "",
    dateOfRelease: "",
    formData,
    artistId: [],
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
    if (e.target && e.target.files[0]) {
      formData.append("file", e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:6001/songs/addsong",
      data: data,
    }).then((res) => console.log(res));
  };

  return (
    <Box width='90%' m={"auto"}>
      <Heading>Adding a new song</Heading>
      <Stack mt={5} spacing={18}>
        <form encType='multipart/form-data' onSubmit={handleSubmit}>
          <FormControl width='400px' id='name'>
            <FormLabel>Song Name</FormLabel>
            <Input
              outline={"1px solid rgb(204, 204, 204)"}
              type='text'
              name='name'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl width='400px' id='dateOfRelease'>
            <FormLabel>Date Released</FormLabel>
            <Input
              outline={"1px solid rgb(204, 204, 204)"}
              name='dateOfRelease'
              type='text'
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='cover'>
            <FormLabel>Artwork</FormLabel>
            <input type='file' onChange={fileChange} />
          </FormControl>
          <FormControl width='400px' id='artistId'>
            <FormLabel>Artists</FormLabel>
            <Select
              isMulti
              options={artists}
              onChange={(opt) => handleselect(opt)}
            />
          </FormControl>
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