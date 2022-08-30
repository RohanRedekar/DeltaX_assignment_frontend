import {
  Box,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactStars from "react-rating-stars-component";
import "./SongsTable.css"

const SongsDisplayTable = () => {
  const theads = ["Artwork", "Song", "Date of Release", "Artists", "Rate"];
  let [songs, setSongs] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:6001/songs",
    }).then((res) => setSongs(res.data));
  }, []);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <Box margin={"3rem auto"} width='90%'>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {theads.map((h) => (
                <Th key={h} textAlign='center' fontSize='1xl'>
                  {h}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {songs?.map((song) => (
              <Tr key={uuidv4()}>
                {/* <Td textAlign='center'><Image src={song.cover}/></Td> */}
                <Td textAlign='center'>{song.name}</Td>
                <Td textAlign='center'>{song.dateOfRelease}</Td>
                <Td textAlign='center'>
                  {song.artistId.map((artist, i) =>
                    song.artistId.length - 1 == i
                      ? artist.name
                      : `${artist.name}, `
                  )}
                </Td>
                <Td textAlign='center'>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor='#ffd700'
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SongsDisplayTable;