const { PrismaClient } = require("../../output/client");
const prisma = new PrismaClient();
const dayjs = require('dayjs');
const weekOfYear = require('dayjs/plugin/weekOfYear');
const path = require("path");
const pathname = require("../configs/multer.config.js").pathname;
const { storage, bucketName } = require("../configs/cloud.config.js");
const fs = require("fs");
dayjs.extend(weekOfYear);
async function recordTransaction(req, res) {
    try {
        const { amount, type, status, dealer, gstrate } = req.body; //gstrate
        console.log(type)
        const { projectid } = req.query;

        const amountNumber = Number(amount);
        const gstRate = Number(gstrate) * 100;

        if (!req.file) {
            return res.status(400).json({ message: "File is missing" });
        }

        const localFilePath = path.join(pathname, req.file.filename);

        const bucket = storage.bucket(bucketName);

        await bucket.upload(localFilePath, {
            destination: req.file.originalname,
            resumable: false,
        });

        const fileUrl =  `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(req.file.originalname)}`;
        ;
        console.log("File uploaded:", fileUrl);

        let income = 0;
        let expenditure = 0;

        if (type === "Credit") {
            income = amountNumber;
        } else if (type === "Debit") {
            expenditure = amountNumber;
        } else {
            return res.status(400).json({ message: "Invalid transaction type" });
        }

        const revenue = await prisma.finance.findUnique({
            where: { id: projectid },
            select: { income: true, expenditure: true }
        });


        if (!revenue) {
            return res.status(404).json({ message: "Finance project not found" });
        }

        const transaction = await prisma.$transaction([
            prisma.transaction.create({
                data: {
                    amount: amountNumber,
                    gstrate: gstRate,
                    dealer: dealer,
                    status: status,
                    proof: fileUrl,
                    type: type,
                    createdAt: new Date(),
                    financeId: projectid,
                }
            }),
            prisma.finance.update({
                where: { id: projectid },
                data: {
                    income: revenue.income + income,
                    expenditure: revenue.expenditure + expenditure,


                }
            })
        ]);


        fs.unlinkSync(localFilePath);

        res.status(201).json({ message: "Transaction recorded successfully", transaction });

    } catch (error) {
        console.error("Error recording transaction:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}



async function saveNotes(req, res) {
    if(!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized request" });
    };

    const userid = req.user.id;
    const { content } = req.body;
    const { financeid } = req.params;
    // const { financeId } = req.query;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userid
            },
            select : {
                name : true
            }
        })
        const note = await prisma.note.create({
            data: {
                content: content,
                type : "Finance",
                title : user.name,
                finance: {
                    connect: { id: financeid }
                }
            }
        });

        res.status(201).json({ message: "Note added successfully", note });
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}
async function getFinanceNotes(req, res) {
    const financeId = req.params.financeid;

    try {
        const notes = await prisma.note.findMany({
            where: {
                type: "Finance",
                financeId: financeId
            }
        });

        return res.status(200).json({ success: true, notes :notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}


async function setReminders(req, res) {
    if(!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized request" });
    };
    const { date, dealer, amount } = req.body;
    const financeId = req.params.financeId;

    try {
        const note = await prisma.remainders.create({
            data: {
                date: new Date(date),
                dealer: dealer,
                amount: Number(amount), 
             
                finance: {
                    connect: { id: financeId }
                }
            }
        });

        res.status(201).json({ message: "Note added successfully", note });
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}


const setReminderMessage = async (req, res) => {
    try {
        const { email, phonenum, datetime, type, message } = req.body;
        const { projectid } = req.params;
        console.log(datetime);

        const project = await prisma.scheduleMsg.create({
            data: {
                email: email,
                phonenum: phonenum,
                Datetime: datetime,
                type: type,
                text: message,
                status: "Pending",
                project: {
                    connect: {
                        id: projectid
                    }
                }




            }
        });

        res.status(201).json({ message: "Your Message set Sucessfully", project });




    } catch (error) {
        res.status(500).json({ error: "Something Went Wrong", message: error.message });
    }
}

const setBudget = async (req, res) => {
    try {
        const { amount } = req.body;
        const { projectid } = req.params;
        if (!req.user) {
            return { verified: false, status: 401, message: "Unauthorized request" };
        }
        const id = req.user.id;
        const ogamount = Number(amount);


        const budget = await prisma.project.update({
            where: {
                id: projectid
            },
            data: {
                budget: ogamount,

            }
        });
        const finance = await prisma.finance.update({
            where: {
                id: projectid
            },
            data: {
                budget: ogamount,
            }
        })



        res.status(200).json({ message: "Budget set successfully", budget: budget, finance: finance })



    } catch (error) {
        res.status(500).json({ error: error.message });

    }
};

async function getFinance(req, res) {
    const { projectid } = req.query;
    try {
        const data = await prisma.finance.findUnique({
            where: {
                id: projectid
            },
            select: {
                income: true,
                expenditure: true,
                budget: true

            }

        });

        return res.status(200).json({ status: "success", data: data });

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }

}



async function Mytransactions(req,res) {
    if(!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized request" });
    };

    const financeId = req.params.projectid
    try {
        const transaction = await prisma.transaction.findMany({
            where: {
                financeId: financeId
            },select : {
                id : true,
                createdAt : true,
                amount : true,
                type : true,
                dealer : true
            }
        });

        return res.status(200).json({ status: "success", data: transaction });
        
    } catch (error) {
        
        return res.status(500).json({message : "Something went wrong", error: error.message });
    }
    
}

async function getTransactions(req, res) {
    try {
        const projectId = req.params.projectid;
        const transactions = await prisma.transaction.findMany({
            where: {
                financeId: projectId
            }
        })
        const Income = {};
        const Expenditure = {};

        const sortedData = transactions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        console.log(sortedData)
        for (let i = 0; i < sortedData.length; i++) {
            const date = new Date(sortedData[i].createdAt).toLocaleDateString();
            if (sortedData[i].type === "Credit") {
                if (!(date in Income)) {
                    Income[date] = sortedData[i].amount;
                }
                else {
                    Income[date] += sortedData[i].amount;
                }
            }
            else {
                if (!(date in Expenditure)) {
                    Expenditure[date] = sortedData[i].amount;
                }
                else {
                    Expenditure[date] += sortedData[i].amount;
                }
            }
        }
        return res.status(200).json({ status: "success", data: transactions, Income : Income , Expenditure : Expenditure});

    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });

    }

}


async function getMonthly(req, res) {
    try {
        const projectid = req.params.projectid;
        const transactions = await prisma.transaction.findMany({
            where: {
                financeId: projectid
            }
        });
        const MonthlyIncome = {};
        const MonthlyExpenditure = {};

        const sortedData = transactions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        for (i = 0; i < sortedData.length; i++) {
            const date = new Date(sortedData[i].createdAt).getMonth();
            if (sortedData[i].type === "Credit") {
                if (!(date in MonthlyIncome)) [
                    MonthlyIncome[date] = sortedData[i].amount
                ]
                else {
                    MonthlyIncome[date] += sortedData[i].amount

                }
            }
            else {
                if (!(date in MonthlyExpenditure)) [
                    MonthlyExpenditure[date] = sortedData[i].amount
                ]
                else {
                    MonthlyExpenditure[date] += sortedData[i].amount

                }

            }


        };
        return res.status(200).json({ status: "success", MonthlyIncome :MonthlyIncome , MonthlyExpenditure : MonthlyExpenditure});



    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });


    }

}

async function getWeekly(req, res) {
    try {
        const projectId = req.params.projectid;
        const transactions = await prisma.transaction.findMany({
            where: {
                financeId: projectId
            }
        });
        const WeeklyIncome = {};
        const WeeklyExpenditure = {};

        const sortedData = transactions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        for (i = 0; i < sortedData.length; i++) {
            const date = dayjs(new Date(sortedData[i].createdAt)).week();
            console.log(date)
            if (sortedData[i].type === "Credit") {
                if (!(date in WeeklyIncome)) [
                    WeeklyIncome[date] = sortedData[i].amount
                ]
                else {
                    WeeklyIncome[date] += sortedData[i].amount

                }
            }
            else {
                if (!(date in WeeklyExpenditure)) [
                    WeeklyExpenditure[date] = sortedData[i].amount
                ]
                else {
                    WeeklyExpenditure[date] += sortedData[i].amount

                }

            }


        };
        return res.status(200).json({ status: "success", WeeklyIncome : WeeklyIncome , WeeklyExpenditure : WeeklyExpenditure});



    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal Server Error", error: error.message });


    }

};

module.exports = {
    recordTransaction,
    saveNotes,
    setReminders,
    setReminderMessage,
    setBudget,
    getFinance,
    getTransactions,
    getMonthly,
    getWeekly,
    Mytransactions,
    getFinanceNotes
}