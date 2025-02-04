import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

// Initialize DynamoDB client
const dynamoDb = new DynamoDBClient({ region: "us-east-1" });

export const handler = async () => {
  try {
    // Parameters for the Scan command to fetch all items from the "Events" table
    const params = {
      TableName: "Events",  // Replace with your table name
    };

    // Perform the Scan operation to get all events
    const data = await dynamoDb.send(new ScanCommand(params));

    // Return the successful response with all the events
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Retrieved all events successfully",
        events: data.Items,  // The scanned items from DynamoDB
      }),
    };
  } catch (error) {
    // Handle any errors that occurred during the Scan operation
    console.error("Error retrieving events:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving events",
        error: error.message,
      }),
    };
  }
};
