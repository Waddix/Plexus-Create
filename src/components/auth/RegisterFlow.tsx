/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
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
  HStack,
  Text,
} from "@chakra-ui/react"
import React, { Fragment, useContext, useEffect, useState } from "react"
import { UserContext } from '../../context/userContext';
import Name from "./forms/name";
import ImageUpload from "./forms/image";
import Tags from './forms/tags'
import Settings from "./forms/settings";
import { useSession } from "next-auth/client";
import { useCreateProfileForUserMutation } from '../../generated/graphql'
import { withUrqlClient } from 'next-urql';

const RegisterFlow: React.FC<unknown> = () => {
  // Ability to close dialog
  const { newUser, setNewUser } = useContext(UserContext);
  const closeRegisterFlowDialog = () => setNewUser(false)
  const cancelRef = React.useRef(null)

  // Next auth session
  const [session] = useSession();

  // User Profile
  const { userProfile, setUserProfile } = useContext(UserContext)
  const { image: profileImage } = userProfile;

  // Form Fields
  const [name, setName] = useState<string>(userProfile ? userProfile.name : "");
  const [username, setUsername] = useState<string>(userProfile ? userProfile.username : "");
  const [title, setTitle] = useState<string>(
    userProfile ?
      userProfile.title ?
        userProfile.title
        :
        ""
      :
      ""
  );
  const [image, setImage] = useState<string>(
    userProfile ?
      userProfile.image ?
        userProfile.image
        :
        ""
      :
      ""
  );
  const [bio, setBio] = useState<string>(
    userProfile ?
      userProfile.bio ?
        userProfile.bio
        :
        ""
      :
      ""
  );
  const [website, setWebsite] = useState<string>(
    userProfile ?
      userProfile.website ?
        userProfile.website
        :
        ""
      :
      ""
  );
  // const [tags, setTags] = useState([]);
  // const [social, setSocail] = useState({});

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
      <Text>Over the next few pages we will setup your profile.</Text>
      <Text>You can to skip this if you wish.</Text>
    </Fragment>
  )

  // Form control for username. Prevent spaces and starting with @.
  const [containsAt, setContainsAt] = useState<boolean>(false);
  const [containsSpace, setContainsSpace] = useState<boolean>(false);

  // Form control for website.
  const [invalidWebsite, setInvalidWebsite] = useState<boolean>(false);

  useEffect(() => {
    if (website.length === 0) {
      setInvalidWebsite(false);
    }
  }, [website])

  // Is the image uploading
  const [uploading, setUploading] = useState<boolean>(false);

  const pages: Pages = {
    0: {
      header: "Let's create your account",
      body: firstBody(),
      buttons: "skip"
    },
    1: {
      header: "Profile Appearance",
      body: (<Name
        name={name}
        updateName={setName}
        username={username}
        updateUsername={setUsername}
        title={title}
        updateTitle={setTitle}
        bio={bio}
        updateBio={setBio}
        space={containsSpace}
        updateSpace={setContainsSpace}
        at={containsAt}
        updateAt={setContainsAt}
        website={website}
        updateWebsite={setWebsite}
        invalidateWebsite={setInvalidWebsite}
        invalidWebsite={invalidWebsite}
      />),
      buttons: 'normal',
    },
    2: {
      header: "Profile Picture",
      body: (<ImageUpload
        name={name}
        image={image}
        updateImage={setImage}
        uploading={uploading}
        updateUploading={setUploading}
        profileImage={profileImage}
      />),
      buttons: 'submit',
    },
    3: {
      header: "Tags",
      body: (<Tags />),
      buttons: 'normal'
    },
    4: {
      header: "Settings",
      body: (<Settings />),
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
        <HStack
          h={['6rem', '4rem', '4rem', '4rem']}
          position='absolute'
          left='0'
          top='0'
          zIndex='banner'
        >
          <Alert
            d='flex'
            w='100vw'
            h="100%"
            status="error"
            variant="solid"
          >
            <AlertIcon />
            <AlertTitle mr={2}>There was an error submitting your profile data</AlertTitle>
            <AlertDescription>Please try again later</AlertDescription>
            <CloseButton
              position={['unset', "absolute", "absolute", "absolute"]}
              right="2rem"
              my='auto'
              onClick={() => setErrorSubmitting(false)}
            />
          </Alert>
        </HStack>
      }
      <AlertDialog
        motionPreset="scale"
        isOpen={newUser}
        leastDestructiveRef={cancelRef}
        onClose={closeRegisterFlowDialog}
        isCentered
      >
        <AlertDialogOverlay m='auto'>
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
              <Flex mt={2} justifyContent='space-between' w='100%' >
                {pages[page].buttons === 'skip' &&
                  <Fragment>
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('red.200', 'red.700'),
                      }} ref={cancelRef}
                      onClick={closeRegisterFlowDialog}
                      variant="ghost"
                      isDisabled={uploading}
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
                      isDisabled={containsAt || containsSpace || invalidWebsite || uploading}
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
                      isDisabled={uploading}
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
                      isDisabled={containsAt || containsSpace || uploading || invalidWebsite}
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
                      isDisabled={uploading}
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
                      isDisabled={containsAt || containsSpace || invalidWebsite || uploading}
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
  url: 'https://server-seven-blue.vercel.app/graphql',
}))(RegisterFlow);
