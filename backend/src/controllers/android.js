const Plans = [
    {
        "planId": "PLAN001",
        "price": 199.0,
        "dataInGB": 1.5,
        "validityDays": 28,
        "isUnlimitedCalls": true,
        "smsPerDay": 100,
        "description": "1.5GB/day, Unlimited Calls, 100 SMS/day for 28 days",
        "provider": "Jio"
    },
    {
        "planId": "PLAN002",
        "price": 299.0,
        "dataInGB": 2.0,
        "validityDays": 28,
        "isUnlimitedCalls": true,
        "smsPerDay": 100,
        "description": "2GB/day, Unlimited Calls, 100 SMS/day for 28 days",
        "provider": "Airtel"
    },
    {
        "planId": "PLAN003",
        "price": 149.0,
        "dataInGB": 1.0,
        "validityDays": 24,
        "isUnlimitedCalls": false,
        "smsPerDay": 50,
        "description": "1GB/day, 300 minutes calls, 50 SMS/day for 24 days",
        "provider": "Vi"
    },
    {
        "planId": "PLAN004",
        "price": 399.0,
        "dataInGB": 3.0,
        "validityDays": 56,
        "isUnlimitedCalls": true,
        "smsPerDay": 100,
        "description": "3GB/day, Unlimited Calls, 100 SMS/day for 56 days",
        "provider": "BSNL"
    },
    {
        "planId": "PLAN005",
        "price": 129.0,
        "dataInGB": 0.5,
        "validityDays": 14,
        "isUnlimitedCalls": false,
        "smsPerDay": 30,
        "description": "0.5GB/day, Limited Calls, 30 SMS/day for 14 days",
        "provider": "Jio"
    },
    {
        "planId": "PLAN006",
        "price": 509.0,
        "dataInGB": 2.5,
        "validityDays": 84,
        "isUnlimitedCalls": true,
        "smsPerDay": 100,
        "description": "2.5GB/day, Unlimited Calls, 100 SMS/day for 84 days",
        "provider": "Airtel"
    },
    {
        "planId": "PLAN007",
        "price": 99.0,
        "dataInGB": 0.75,
        "validityDays": 7,
        "isUnlimitedCalls": true,
        "smsPerDay": 50,
        "description": "0.75GB/day, Unlimited Calls, 50 SMS/day for 7 days",
        "provider": "Vi"
    },
    {
        "planId": "PLAN008",
        "price": 599.0,
        "dataInGB": 3.5,
        "validityDays": 90,
        "isUnlimitedCalls": true,
        "smsPerDay": 100,
        "description": "3.5GB/day, Unlimited Calls, 100 SMS/day for 90 days",
        "provider": "BSNL"
    },
    {
        "planId": "PLAN009",
        "price": 251.0,
        "dataInGB": 50.0,
        "validityDays": 30,
        "isUnlimitedCalls": false,
        "smsPerDay": 0,
        "description": "50GB total data, no calls, no SMS for 30 days",
        "provider": "Jio"
    },
    {
        "planId": "PLAN010",
        "price": 649.0,
        "dataInGB": 1.5,
        "validityDays": 365,
        "isUnlimitedCalls": true,
        "smsPerDay": 100,
        "description": "1.5GB/day, Unlimited Calls, 100 SMS/day for 365 days",
        "provider": "Airtel"
    }
]


const androidPlans = (req, res) => {

    res.status(200).json(Plans);



}

module.exports ={
    androidPlans
}