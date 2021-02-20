import { 
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Link,
    List,
    ListItem, 
    Text,
    useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { BiShoppingBag } from "react-icons/bi";
import { BsArrowBarLeft } from "react-icons/bs";

import RemoveButton from "@/components/Cart/RemoveButton/RemoveButton";
import DrawerTemplate from "@/components/DrawerTemplate/DrawerTemplate";
import { useStore, useStoreUpdate } from "@/hooks/useStorage";
import { generateItemKey } from "@/utils/generateItemKey";

const paths = ["/checkout", "/checkout/shipping", "/checkout/payment"];

const CartDrawer = (): React.ReactElement => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    const { cartStorage } = useStore()!;
    const { removeCartValue } = useStoreUpdate()!;

    const mapProductsToDom = (): React.ReactNode => {
        if (cartStorage?.length) {
            return cartStorage.map((product) => 
                <ListItem 
                id={product.id}
                key={generateItemKey(product.id)}
                >
                    <Box 
                    m="auto"
                    w="100%"
                    >
                        <Image 
                        alt={product.name}
                        height={100}
                        src={`/${product.image}`}
                        width={100} 
                        />
                    </Box>
                    <Flex 
                    justify="space-between"
                    mt={2}
                    >
                        <Box as="article" mr={4}>
                            <Heading 
                            as="h5"
                            fontSize="sm"
                            mb={2}
                            >
                                {product.name}
                            </Heading>
                            <Text fontSize="xs">
                                {product.category}
                            </Text>
                        </Box>
                        <RemoveButton 
                        callback={(event) => removeCartValue(event)}/>
                    </Flex>
                    <Divider 
                    bg="pink.100"
                    my={8} 
                    variant="solid"
                    />
                </ListItem>
            );
        } else {
            return <Text fontSize="sm" color="pink.200">Empty Cart</Text>;
        }
    };

    return (
        <>
        {!paths.includes(router.pathname) ? 
        <Button 
        leftIcon={<BsArrowBarLeft />}
        onClick={onOpen}
        w="5rem"
        ml="auto"
        mr={8}
        variant="ghost"
        >
            Cart
        </Button> : null}
        <DrawerTemplate
        header="What's in your bag"
        footer="Next.js e-commerce"
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        size="xs"
        >
            <NextLink 
            href="/cart"
            passHref
            >
                <Link 
                alignItems="center"
                display="flex"
                py={2}
                w="max-content"
                _hover={{
                    color: "pink.300"
                }}
                >
                    <Box 
                    alignSelf="center"
                    bgGradient="linear(45deg, blue.100, pink.100)"
                    display="inline-flex"
                    mr={2}
                    p={1}
                    >
                          <BiShoppingBag style={{ color: "black" }} />
                    </Box>
                   To the cart
                </Link>
            </NextLink>
            <Divider my={4} />
            <List>
                {mapProductsToDom()}
            </List>
        </DrawerTemplate>
        </>
    );
};

export default CartDrawer;