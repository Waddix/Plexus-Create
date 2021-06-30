import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useColorModeValue,
  Flex,
  Spacer,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Box
} from "@chakra-ui/react"
import React, { Fragment, useContext, useEffect, useState } from "react"
import { UserContext } from '../../context/userContext';
import Name from "./forms/name";
import ImageUpload from "./forms/image";
import Tags from './forms/tags'
import Settings from "./forms/settings";
import { session, useSession } from "next-auth/client";
import { useCreateProfileForUserMutation } from '../../generated/graphql'
import { withUrqlClient } from 'next-urql';

const RegisterFlow: React.FC<{}> = ({ }) => {
  // Ability to close dialog
  const { newUser, setNewUser } = useContext(UserContext);
  const closeRegisterFlowDialog = () => setNewUser(false)
  const cancelRef = React.useRef(null)

  // Next auth session
  const [session] = useSession();

  // User Profile
  const { userProfile, setUserProfile } = useContext(UserContext)

  // Form Fields
  const [name, setName] = useState(userProfile.name);
  const [username, setUsername] = useState(userProfile.username);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [tags, setTags] = useState([]);
  const [social, setSocail] = useState({});

  // Set fields when a session is created
  useEffect(() => {
    if (session) {
      setName(userProfile.name)
      setUsername(userProfile.username.split('@')[1])
      if (userProfile.image) {
        setImage(userProfile.image)
      }
    }
  }, [userProfile])

  const [page, setPage] = useState(0);

  type Pages = {
    [key: number]: {
      header: string,
      body: JSX.Element | string,
      buttons: 'skip' | 'normal' | 'submit'
    }
  }

  const firstBody = (): JSX.Element => (
    <Fragment>
      <p>Over the next few pages we will setup your profile.</p>
      <p>You can to skip this if you wish.</p>
    </Fragment>
  )

  const pages: Pages = {
    0: {
      header: "Let's create your account",
      body: firstBody(),
      buttons: "skip"
    },
    1: {
      header: "Profile Appearance",
      body: <Name
        name={name}
        updateName={setName}
        username={username}
        updateUsername={setUsername}
        updateTitle={setTitle}
        updateBio={setBio}
      />,
      buttons: 'normal',
    },
    2: {
      header: "Profile Picture",
      body: <ImageUpload
        updateImage={setImage}
      />,
      buttons: 'normal',
    },
    3: {
      header: "Tags",
      body: <Tags />,
      buttons: 'normal'
    },
    4: {
      header: "Settings",
      body: <Settings />,
      buttons: 'submit'
    },
  }

  const handleNext = (): void => {
    setPage(page + 1);
  }

  const handlePrev = (): void => {
    setPage(page - 1);
  }

  // Create profile mutation
  const [, createProfile] = useCreateProfileForUserMutation();

  // Is form submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Was there an error submitting the form
  const [errorSubmitting, setErrorSubmitting] = useState(false);

  const handleSubmit = () => {
    const values = {
      id: parseInt(userProfile.id),
      user_id: userProfile.user_id,
      name: name,
      username: '@' + username,
      email: userProfile.email,
      image: image,
      title: title,
      bio: bio,
      website: website,
    }
    createProfile({ input: values })
      .then(() => {
        setIsSubmitting(false)
        setUserProfile(values);
        closeRegisterFlowDialog()
      })
  }

  return (
    <Fragment>
      {errorSubmitting &&
        <Box width='100vw' position='absolute' left='0' top='0'>
          <Alert status="error" variant="solid" height="5rem" >
            <AlertIcon />
            <AlertTitle mr={2}>There was an error submitting your profile data</AlertTitle>
            <AlertDescription>Please try again later</AlertDescription>
            <CloseButton onClick={() => setErrorSubmitting(false)} position="absolute" right="8px" top="8px" />
          </Alert>
        </Box>
      }
      <AlertDialog
        motionPreset="scale"
        isOpen={newUser}
        leastDestructiveRef={cancelRef}
        onClose={closeRegisterFlowDialog}
        isCentered
      >
        <AlertDialogOverlay margin='auto'>
          <AlertDialogContent>
            <AlertDialogHeader textAlign='center' fontSize="lg" fontWeight="bold">
              {pages[page].header}
            </AlertDialogHeader>

            <AlertDialogBody mt={2}>
              <form onSubmit={handleSubmit}>
                {pages[page].body}
              </form>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Flex mt={2} justifyContent='space-between' width='100%' >
                {pages[page].buttons === 'skip' &&
                  <Fragment>
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('red.200', 'red.700'),
                      }} ref={cancelRef}
                      onClick={closeRegisterFlowDialog}
                      variant="ghost"
                    >
                      Skip
                    </Button>
                    <Spacer />
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('orange.200', 'orange.700'),
                      }} ref={cancelRef}
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </Fragment>
                }
                {pages[page].buttons === 'normal' &&
                  <Fragment>
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('orange.200', 'orange.700'),
                      }} ref={cancelRef}
                      onClick={handlePrev}
                    >
                      Back
                    </Button>
                    <Spacer />
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('orange.200', 'orange.700'),
                      }} ref={cancelRef}
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </Fragment>
                }
                {pages[page].buttons === 'submit' &&
                  <Fragment>
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('orange.200', 'orange.700'),
                      }} ref={cancelRef}
                      onClick={handlePrev}
                    >
                      Back
                    </Button>
                    <Spacer />
                    <Button
                      isLoading={isSubmitting}
                      loadingText="Submitting changes"
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('orange.200', 'orange.700'),
                      }}
                      bg={useColorModeValue('green.200', 'green.700')}
                      onClick={() => {
                        handleSubmit();
                        setIsSubmitting(true);
                      }}
                    >
                      Submit
                    </Button>
                  </Fragment>
                }
              </Flex>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment >
  )
}

export default withUrqlClient(() => ({
  // ...add your Client options here
  url: 'http://localhost:8080/graphql',
}))(RegisterFlow);
