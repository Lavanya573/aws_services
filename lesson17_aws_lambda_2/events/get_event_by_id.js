import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

// Initialize DynamoDB client
const dynamoDb = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  // Extract the event ID from the query parameters or request body
  const eventId = event.queryStringParameters?.id || event.pathParameters?.id;

  if (!eventId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Event ID is required" }),
    };
  }

  try {
    // Parameters for the GetItem command to fetch an event by its ID
    const params = {
      TableName: "Events",  // Replace with your table name
      Key: {
        id: { S: eventId },  // Assuming "id" is the partition key
      },
    };

    // Execute the GetItem command
    const data = await dynamoDb.send(new GetItemCommand(params));

    // Check if the item was found
    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Event not found" }),
      };
    }

    // Return the event details
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Event retrieved successfully",
        event: data.Item,  // The event data returned by DynamoDB
      }),
    };
  } catch (error) {
    // Handle any errors during the GetItem operation
    console.error("Error retrieving event:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving event",
        error: error.message,
      }),
    };
  }
};



// {
//   "queryStringParameters": {
//     "ID": "b8b293-db89-4925-8853-481a468eeb2"
//   }
// }

// {
//   "pathParameters": {
//     "id": "b8b293-db89-4925-8853-481a468eeb2"
//   }
// }
