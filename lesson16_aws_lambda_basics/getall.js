
exports.handler = async (event) => {

    const bills = [{
        id: 1,
        amount: 100
    },
    {
        id: 2,
        amount: 200
    }]
    return {
        statusCode: 200,
        body: JSON.stringify({ status: 200, data: bills }),
    };
};
