import {
  Box,
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
            {artists?.map(({ _id, name, dob, songs }) => (
              <Tr key={_id}>
                <Td textAlign='center'>{name}</Td>
                <Td textAlign='center'>{dob}</Td>
                <Td textAlign='center'>
                  {songs.map((song, i) =>
                    songs.length === 0
                      ? "No songs yet"
                      : songs.length - 1 === i
                      ? song.name
                      : `${song.name}, `
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
