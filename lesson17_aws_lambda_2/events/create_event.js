import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// Initialize DynamoDB client
const dynamoDb = new DynamoDBClient({ region: "us-east-1" });

// Random ID generator function
const generateRandomId = () => {
  return 'xxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const handler = async (event) => {
  // Log the incoming event for debugging
  console.log("Received event:", JSON.stringify(event));

  // Check if event.body exists
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Request body is missing" }),
    };
  }

  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON in request body", error }),
    };
  }

  const { amount, status } = parsedBody;

  if (!amount || !status) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Amount and status are required" }),
    };
  }

  // Generate a unique ID for the new event
  const newEvent = {
    id: generateRandomId(),  // Generate a random ID
    amount,
    status,
    createdAt: new Date().toISOString(),  // Timestamp as a string
  };

  // Log the generated event object to ensure `id` is being set
  console.log("Generated event:", JSON.stringify(newEvent));

  // DynamoDB parameters to insert the event
  const params = {
    TableName: "Events",  // Assuming "Events" table in DynamoDB
    Item: {
      ID: { S: newEvent.id },  // Ensure ID is included here
      amount: { N: newEvent.amount.toString() }, 
      status: { S: newEvent.status },
      createdAt: { S: newEvent.createdAt },
    },
  };

  try {
    // Create a DynamoDB command to put the new item
    const command = new PutItemCommand(params);
    // Execute the command to store the event in DynamoDB
    await dynamoDb.send(command);

    // Return the successful response
    return {
      statusCode: 201,
      body: JSON.stringify(newEvent),
    };
  } catch (error) {
    console.error("Error storing event:", JSON.stringify(error, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error storing event", error }),
    };
  }
};



// input
// {
//   "body": "{\"amount\": 100, \"status\": \"PAID\"}"
// }
