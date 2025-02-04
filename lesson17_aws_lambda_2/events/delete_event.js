import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

// Initialize DynamoDB client
const dynamoDb = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  // Extract the event ID from the query parameters or path parameters
  const eventId = event.queryStringParameters?.id || event.pathParameters?.id;

  if (!eventId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Event ID is required" }),
    };
  }

  try {
    // Parameters for the DeleteItem command to delete an event by its ID
    const params = {
      TableName: "Events",  // Replace with your table name
      Key: {
        id: { S: eventId },  // Assuming "id" is the partition key
      },
    };

    // Execute the DeleteItem command
    const data = await dynamoDb.send(new DeleteItemCommand(params));

    // Check if the item was actually deleted (check if the response is empty)
    if (data.Attributes) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Event not found" }),
      };
    }

    // Return success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Event deleted successfully" }),
    };
  } catch (error) {
    // Handle any errors during the DeleteItem operation
    console.error("Error deleting event:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error deleting event",
        error: error.message,
      }),
    };
  }
};


// {
//   "queryStringParameters": {
//     "id": "12345"
//   }
// }
