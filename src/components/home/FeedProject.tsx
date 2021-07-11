// import React from "react";
// import { chakra, Box, Flex, useColorModeValue, Link, Image, VStack } from "@chakra-ui/react";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// import { FeedProjectPost } from "./FeedProjectPost";


// interface Owner {
//   name: string,
//   username: string,
//   image: string
// }
// interface ProjectPosts {
//   createdAt: Date,
//   updatedAt: Date,
//   id: number,
//   ownerId: number,
//   projectId: number,
//   text: string
// }
// interface FeedProjectProps {
//   project: {
//     createdAt: Date,
//     updatedAt: Date,
//     id: number,
//     title: string,
//     description: string,
//     ownerId: number,
//     owner: Owner
//     posts: Array<ProjectPosts>,
//   }

// }

// export const FeedProject: React.FC<FeedProjectProps> = ({ project }) => {
//   const { createdAt, updatedAt, id, title, description, ownerId, owner, posts } = project;
//   const { name, username, image: ownerImage } = owner;


//   dayjs.extend(relativeTime);
//   const postedAt = dayjs().to(dayjs(createdAt))

//   return (
//     <VStack>
//       <Flex
//         bg={useColorModeValue("#F9FAFB", "gray.600")}
//         p={50}
//         w="full"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Box
//           bg={useColorModeValue("white", "gray.800")}
//           mx={{ lg: 8 }}
//           display={{ lg: "flex" }}
//           maxW={{ lg: "5xl" }}
//           shadow={{ lg: "lg" }}
//           rounded={{ lg: "lg" }}
//         >
//           <Box w={{ lg: "50%" }}>
//             <Box
//               h={{ base: 64, lg: "full" }}
//               rounded={{ lg: "lg" }}
//               bgSize="cover"
//               style={{
//                 backgroundImage:
//                   "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')",
//               }}
//             ></Box>
//           </Box>

//           <Box py={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
//             <chakra.h2
//               fontSize={{ base: "2xl", md: "3xl" }}
//               color={useColorModeValue("gray.800", "white")}
//               fontWeight="bold"
//             >
//               {title}
//             </chakra.h2>
//             <chakra.p mt={4} color={useColorModeValue("gray.600", "gray.400")}>
//               {description}
//             </chakra.p>
//             <Box mt={4}>
//               <Flex alignItems="center">
//                 <Flex alignItems="center">
//                   <Image
//                     h={10}
//                     fit="cover"
//                     rounded="full"
//                     src={ownerImage}
//                     alt="Avatar"
//                   />
//                   <Link
//                     href={`/profile/${ownerId}`}
//                     mx={2}
//                     fontWeight="bold"
//                     color={useColorModeValue("gray.700", "gray.200")}

//                   >
//                     {name}
//                   </Link>
//                 </Flex>
//                 <chakra.span
//                   mx={1}
//                   fontSize="sm"
//                   color={useColorModeValue("gray.600", "gray.300")}
//                 >
//                   {postedAt}
//                 </chakra.span>
//               </Flex>
//             </Box>

//             {/* <Box mt={8}>
//             <Link

//               bg="gray.900"
//               color="gray.100"
//               px={5}
//               py={3}
//               fontWeight="semibold"
//               rounded="lg"
//               _hover={{ bg: "gray.800" }}
//             >
//               Start Now
//             </Link>
//           </Box> */}

//           </Box>
//         </Box>
//       </Flex>
//       <VStack
//         alignContent="end"
//       >
//         {
//           posts.map(post => (
//             <FeedProjectPost key={post.id} post={post} />
//           ))
//         }

//       </VStack>
//     </VStack>
//   );
// };

export{}; 
