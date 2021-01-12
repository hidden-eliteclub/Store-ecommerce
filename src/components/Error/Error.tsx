import { Alert, 
    AlertDescription,
    AlertIcon, 
    AlertTitle, 
    CloseButton } from "@chakra-ui/react";
import * as React from "react";

interface ERROR {
    title: string,
    description: string
}

function Error({ title, description }: ERROR): React.ReactElement {
    return (
        <Alert 
        borderRadius={2}
        mb={4}
        status="error" 
        >
            <AlertIcon />
            <AlertTitle>
                {title}
            </AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
            <CloseButton position="absolute" top="8px" right="8px" />
        </Alert>
    );
}

export default Error;