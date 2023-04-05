import {Box, Text} from '@chakra-ui/react'
import React from "react";
const Score = ({title, score} : any) => {
    return(
        <Box
            border="2px solid white"
            width='150px'
            borderRadius="lg"
        >
            <Text fontSize='2xl' align="center">
                {title}
            </Text>
            <Text fontSize='2xl' fontWeight="bold" align="center">
                {score}
            </Text>
        </Box>
    );
}
export default Score;
