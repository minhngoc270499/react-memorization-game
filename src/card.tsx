import {Box, Image} from '@chakra-ui/react'
const Card = ({card, handleOnClick} : any) => {
    return(
        <Box
            key={card.id}
            width="150px"
            height="150px"
            borderWidth='xl'
            borderRadius='xl'
            overflow='hidden'
            shadow='md'
            cursor= 'pointer'
            onClick={handleOnClick}
            _hover={{boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)', transform: 'scale(1.1)'}}
            transition="transform 0.2s"
        >
            <Image src={card.url}></Image>
        </Box>
    );
}
export default Card;
