import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  const { ID } = event.pathParameters;
  const { amount, status } = JSON.parse(event.body);

  // Input validation
  if (typeof amount !== 'number' || amount <= 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Amount must be a positive number" }),
    };
  }

  if (typeof status !== 'string' || status.trim() === '') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Status must be a non-empty string" }),
    };
  }

  try {
    const params = {
      TableName: "Events",
      Key: { ID },
      UpdateExpression: "set amount = :amount, status = :status",
      ExpressionAttributeValues: {
        ":amount": amount,
        ":status": status,
      },
      ReturnValues: "ALL_NEW",  // Return updated attributes
    };

    const result = await dynamoDb.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),  // Return the updated item
    };
  } catch (error) {
    console.error("Error updating the event:", error);  // Log the error
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error updating event",
        error: error.message || "Unknown error",
      }),
    };
  }
};
