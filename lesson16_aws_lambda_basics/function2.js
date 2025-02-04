import { SNSClient, PublishCommand } from "@aws-sdk/client-sns"; // Importing specific parts of the AWS SDK v3

// Create an SNS client
const snsClient = new SNSClient({ region: "us-east-1" });

export const handler = async (event) => {
    try {
        // Get the phone number from the event object
        const phoneNumber = event.phoneNumber;
        
        // Your SMS message content
        const message = "Your telecom service is due for renewal!";
        
        // Define the parameters for sending SMS
        const params = {
            Message: message,
            PhoneNumber: phoneNumber
        };

        // Create the publish command and send the message
        const command = new PublishCommand(params);
        await snsClient.send(command); // Send SMS

        // Return a success message
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "SMS sent successfully!" })
        };
    } catch (error) {
        // Handle errors
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to send SMS", error: error.message })
        };
    }
};

// Input
// {
//   "phoneNumber": "+919916393865"
// }


// import { SNSClient, PublishCommand } from "@aws-sdk/client-sns"; // Importing SNS from AWS SDK v3

// // Create an SNS client
// const snsClient = new SNSClient({ region: "us-east-1" });

// export const handler = async (event) => {
//     try {
//         // Get the phone number from the event object (ensure event contains phoneNumber)
//         const phoneNumber = event.phoneNumber;
        
//         if (!phoneNumber) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ message: "Phone number is required!" })
//             };
//         }

//         // Your SMS message content
//         const message = "Your telecom service is due for renewal!";
        
//         // Define the parameters for sending SMS
//         const params = {
//             Message: message,
//             PhoneNumber: phoneNumber // Ensure the phone number is in international format
//         };

//         // Create the publish command and send the message
//         const command = new PublishCommand(params);
//         const data = await snsClient.send(command); // Send SMS

//         // Return a success message
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: "SMS sent successfully!", data })
//         };
//     } catch (error) {
//         // Handle errors
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ message: "Failed to send SMS", error: error.message })
//         };
//     }
// };
