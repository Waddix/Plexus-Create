import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useColorModeValue,
} from "@chakra-ui/react"
import React, { Fragment, useContext } from "react"
import { UserContext } from '../../context/userContext';

export default function RegisterFlow(): JSX.Element {
  // Ability to close dialog
  const {newUser} = useContext(UserContext);
  const closeRegisterFlowDialog = () => setNewUser(false)
  const cancelRef = React.useRef(null)

  return (
    <Fragment>
      <Fragment>
        <AlertDialog
          isOpen={newUser}
          leastDestructiveRef={cancelRef}
          onClose={closeRegisterFlowDialog}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Let's create your account
              </AlertDialogHeader>

              <AlertDialogBody>
                {'Over the next few pages we will setup your profile. You can choose to skip this if you wish.\n\n Register forms here!!'}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('orange.200', 'orange.700'),
                  }} ref={cancelRef}
                  onClick={closeRegisterFlowDialog}
                >
                  Skip
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Fragment>
    </Fragment >
  )
}