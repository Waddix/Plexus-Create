
import { Container, SimpleGrid, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import React, { SetStateAction } from 'react'
import { formatDonation } from '../../utils/formatDonation'
import {GiPayMoney} from 'react-icons/gi'


export const CustomDonationInput: React.FC = ()  => {
  const [value, setValue] = React.useState(0)
  const handleChange = (value:number | string | SetStateAction<number>) => setValue(value)
  return (
  <Container>
      <Box>
      <NumberInput maxW="100px" mr="2rem" value={value} onChange={handleChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
        <Slider aria-label="slider-ex-4" defaultValue={value} onChange={handleChange} size="sm" step={5} focusThumbOnChange={false}>
          <SliderTrack bg="gray.300">
            <SliderFilledTrack bg="purple" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="orange" as={GiPayMoney} />
          </SliderThumb>
        </Slider>
      </Box>
    </Container>

  );
}
