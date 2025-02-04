// ES Module handler to update billing information
export const handler = async (event) => {
    try {
        // Ensure the event contains records
        if (!event.Records || event.Records.length === 0) {
            throw new Error('No records found in the event.');
        }

        // Extract usage data from the DynamoDB stream record
        const usageData = event.Records[0].dynamodb.NewImage;

        // Extract customerId and usageAmount from the NewImage
        const customerId = usageData.CustomerId ? usageData.CustomerId.S : null;
        const usageAmount = usageData.UsageAmount ? usageData.UsageAmount.N : null;

        // Check if required fields are present
        if (!customerId || !usageAmount) {
            throw new Error('Missing required customer data (CustomerId or UsageAmount).');
        }

        // Log the usage data being processed
        console.log(`Updating billing for customer ${customerId} with usage: ${usageAmount}`);

        // Perform the billing update (this is where your business logic goes)
        // Example: Calculate charges, update billing in the database, etc.
        // For this example, we'll assume the update is successful.

        // Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Billing updated successfully!' })
        };

    } catch (error) {
        // Log and handle errors
        console.error('Error updating billing:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to update billing', error: error.message })
        };
    }
};


const record = {
    "Records": [
        {
            "dynamodb": {
                "NewImage": {
                    "CustomerId": { "S": "12345" },
                    "UsageAmount": { "N": "100" }
                }
            }
        }
    ]
}


handler(record)
