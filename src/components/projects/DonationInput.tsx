import {
  Container,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import React, { SetStateAction } from "react";
import { FcDonate } from "react-icons/fc";
import { GiPayMoney } from "react-icons/gi";
import { useCreateCheckoutSessionQuery } from "../../generated/graphql";
interface DonationProps {
  id: string | string[] | undefined;
}
export const CustomDonationInput = ({ id }: DonationProps): JSX.Element => {
  const [value, setValue] = React.useState(0);
  const handleChange = (value: SetStateAction<number | string>) =>
    setValue(value);
  const idToInt = typeof id === "string" ? parseInt(id) : 0;
  const [{ data, fetching, error }] = useCreateCheckoutSessionQuery({
    pause: idToInt === 0,
    variables: {
      amount: value,
      id: idToInt,
    },
  });
  return (
    <Container>
      <Box>
        <NumberInput
          maxW="100px"
          mr="2rem"
          value={value}
          onChange={handleChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          aria-label="slider-ex-4"
          defaultValue={value}
          onChange={handleChange}
          size="sm"
          step={5}
          focusThumbOnChange={false}
        >
          <SliderTrack bg="gray.300">
            <SliderFilledTrack bg="purple" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="orange" as={GiPayMoney} />
          </SliderThumb>
        </Slider>
        <Link href={data?.createCheckoutSession} isExternal>
          <Button leftIcon={<FcDonate />} colorScheme="purple" variant="solid">
            Contribute
          </Button>
        </Link>
      </Box>
    </Container>
  );
};
