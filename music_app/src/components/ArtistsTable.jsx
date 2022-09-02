import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ArtistsDisplayTable = () => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:6001/artists",
    }).then((res) => setArtists(res.data));
  }, []);

  return (
    <Box margin={"3rem auto"} width='90%'>
      <Heading textAlign={"center"} fontSize={"2xl"} mb={7}>
        Top 10 Artist
      </Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th textAlign='center'>Artists</Th>
              <Th textAlign='center'>Date of Birth</Th>
              <Th textAlign='center'>Songs</Th>
            </Tr>
          </Thead>
          <Tbody>
            {artists?.map(({ _id, name, dob, songsArr }) => (
              <Tr key={_id}>
                <Td textAlign='center'>{name}</Td>
                <Td textAlign='center'>{dob}</Td>
                <Td textAlign='center'>
                  {!songsArr.length ? (
                    <p style={{ opacity: "50%" }}>No songs yet</p>
                  ) : (
                    songsArr.map((song, i) => song.name)
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ArtistsDisplayTable;
