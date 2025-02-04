export const handler = async (event) => {
    const customerIssue = event.issue;
    
    // Create a support ticket (mocked process)
    const ticketId = `TICKET-${Math.floor(Math.random() * 10000)}`;
    
    return {
        statusCode: 200,
        body: JSON.stringify({ ticketId: ticketId })
    };
  };


//   {
//     "issue": "Unable to make outgoing calls"
//   }
  
