import { Button,
    Center, 
    Flex, 
    Heading,
    Tab, 
    TabList, 
    TabPanel,
    TabPanels, 
    Tabs, 
    Text, 
    VStack } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import Products from "@/components/Products/Products";
import { initApollo } from "@/lib/apolloClient";
import { PRODUCT_INFO, PRODUCT_NAMES, PRODUCT_NEW } from "@/queries/products";

interface IProductName {
    name: string,
    __typename: string
}

const Product: NextPage = ({ initialApolloState }) => {
    const ref = initialApolloState.ROOT_QUERY.products[0].__ref;
    const product = initialApolloState[ref];

    const { 
        name: productName, 
        price: productPrice, 
        id: productId, 
        category: { name: productCategory },
        description: { text: productDescription }
    } = product;

    return (
        <Layout>
            <Heading 
            as="h3"
            mb={4}
            >
                {productName}
            </Heading>
            <Flex 
            direction={["column", "column", "row"]}
            >
                <Center 
                border="1px solid black"
                flex="1"
                mb={[12, 12, 0]}
                mr={[0, 0, 2]}
                >
                    <Image
                    alt="alt"
                    height={375}
                    src="/img.png"
                    width={300}
                    />
                </Center>
                <Tabs 
                defaultIndex={1}
                flex="1"
                isFitted
                isLazy
                ml={[0, 0, 2]}
                variant="enclosed"
                >
                    <TabList>
                        <Tab>
                            Product Description
                        </Tab>
                        <Tab>
                            Details
                        </Tab>
                        <Tab>
                            Reviews
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <VStack 
                            h="250px"
                            spacing={6}
                            >
                                <Text mb="auto">
                                    {productDescription}
                                </Text>
                                <Text>
                                    £{productPrice}
                                </Text>
                                <Button colorScheme="blue">
                                    Add To Cart
                                </Button>
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <Text>
                                {productCategory}
                            </Text>
                        </TabPanel>
                        <TabPanel>
                            <Text>
                                Reviews
                            </Text>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
            <Heading 
            as="h3"
            size="md"
            mt={12}
            >
                Other Products you might like
            </Heading>
        </Layout>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initApollo();

    const { data: { products }} = await apolloClient.query({
        query: PRODUCT_NAMES
    });

    const paths = products.map((product: IProductName) => ({
        params: { id: product.name.split(" ").join("-")}
    }));

    return { 
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const apolloClient = initApollo();

    if (typeof params?.id === "string") {
            await apolloClient.query({
                query: PRODUCT_INFO,
                variables: { name: params?.id?.split("-").join(" ") }
            });
    }

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 1
    };
};

export default Product;