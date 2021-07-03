
import { Container, SimpleGrid, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Button } from '@chakra-ui/react'
import Link from 'next/link'
import React, { SetStateAction } from 'react'
import {GiPayMoney} from 'react-icons/gi'
import { useCreateCheckoutSessionQuery } from '../../generated/graphql'
interface DonationProps {
  id: string,
}
export const CustomDonationInput = ({id} : DonationProps) : JSX.Element  => {
  const [value, setValue] = React.useState(0)
  const handleChange = (value:number | string | SetStateAction<number>) => setValue(value);
  const idToInt = typeof id === 'string' ? parseInt(id) : 0
//   const [{data, fetching, error}] = useCreateCheckoutSessionQuery({
//     pause: idToInt === 0, 
//     variables:  {
//     amount: value,
//     id: idToInt,
//   }
// // });
// if(error){
//   console.error(error);
// }
//  else {
    
    // const url = new URL(data?.createCheckoutSession);
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
        <Link href={"https://checkout.stripe.com/pay/cs_test_a1BF4948yW72R6QKMcjkCC420ZbNSamSXISbhCshKDeyvil8J3a2t4LsvK#fidkdWxOYHwnPyd1blpxYHZxWjA0Tz1BVDFNdXByVDNVQV1qTlViQmtySk1Sd09rPH1gMFI8SHdiU29CcT01VnRhVj0zSk5jf0p9UTxdMHYxQU1yRmduPFdMSWhBVFQzVUNHbklUPX9BYTNRNTV%2FT0JoMT1VdScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"} passHref={true}>
        <Button></Button>
        </Link>
      </Box>
    </Container>

  );
// }
}
