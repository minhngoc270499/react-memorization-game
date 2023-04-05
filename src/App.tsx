import React from 'react';
import {useState,useEffect} from 'react';
import {ChakraProvider, Flex, Box, Text, useToast} from "@chakra-ui/react";
import Card from "./card";
import Score from "./score";

interface Image{
  id: number;
  url: string;
  isChecked: boolean
}

function shuffleCards(cards : Array<Image>): Array<Image> {
  if (cards.length === 0) {
    for (let i = 1; i <= 12; i++) {
      const card: Image = {
        id: i,
        url: `${process.env.PUBLIC_URL}/${i}.jpg`,
        isChecked: false,
      };
      cards.push(card)
    }
  }
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function App() {
  const [cards, setCards] = useState(() => shuffleCards([]));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const highScore = localStorage.getItem('highScore');
    if (highScore) {
      setHighScore(parseInt(highScore));
    }
  }, []);
  const saveHighScore = (score: number) => {
    if (score <= highScore) return;
    localStorage.setItem('highScore', (score).toString());
    setHighScore(score);
  }
  const handleClick = (id : number) => {
    const clickCardID = cards.findIndex(card => card.id === id);
    if (cards[clickCardID].isChecked) {
      setCards(shuffleCards([]));
      saveHighScore(score);
      setScore(0);
      toast({
        position: 'top',
        title: 'Game over!',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    } else {
      cards[clickCardID].isChecked = true;
      setScore(score + 1);
      setCards(shuffleCards(cards));
    }
  }

  return (
    <ChakraProvider>
      <Box maxW='3xl' mx='auto'>
        <Box mb={4} mt={4}>
          <Text fontSize='3xl' align="center" fontWeight="bold">Memorization Game</Text>
          <Flex justifyContent="center" alignItems="center" gap={4} mt={4} mb={4}>
            <Score title={"Score"} score={score}></Score>
            <Score title={"Best Score"} score={highScore}></Score>
          </Flex>
        </Box>
        <Box>
          <Flex
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              gap={2}
          >
            {cards.map((card) => (
                <Card handleOnClick={()=>handleClick(card.id)} card={card}></Card>
            ))}
          </Flex>
        </Box>
        <Text mt={6} align="center">
          Get point by clicking on an image but don't click on any more than once!
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
