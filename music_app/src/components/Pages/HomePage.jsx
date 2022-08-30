import React from "react";
import {
  Heading,
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Button,
  Input,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import SongsDisplayTable from "../SongsTable";
import ArtistsDisplayTable from "../ArtistsTable";

const HomePage = () => {
  return (
    <Box>
      <Flex
        borderBottom={"1px solid #dee2e6"}
        height={"4rem"}
        alignItems='center'
        justifyContent='space-around'
      >
        <Heading fontSize={"2xl"}>Top 10 songs</Heading>
        <InputGroup w={300}>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' mt={-2} />}
          />
          <Input size='sm' type='tel' variant='outline' placeholder='Search' />
        </InputGroup>
        <Button leftIcon={<AddIcon />} colorScheme='gray' variant='solid'>
          Add Song
        </Button>
      </Flex>
      <SongsDisplayTable />
      <ArtistsDisplayTable/>
    </Box>
  );
};

export default HomePage;
