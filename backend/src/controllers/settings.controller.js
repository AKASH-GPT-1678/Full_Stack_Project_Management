const { PrismaClient } = require("../../output/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { sendEmail } = require("../configs/twilio.config.js")
const Otp = require("../models/otpModel.js");


async function changeName(req, res) {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized request" });
        };

        const id = req.user.id;
        const { name } = req.body;

        if (!name) {
            throw new Error("Name is needed to Update")
        }

        const update = await prisma.user.update({
            where: {
                id: id,

            },
            data: {
                name: name
            }
        });

        if (update) {
            res.status(200).json({ message: "Name Updated Sucessfully" })
        }





    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong", error: error.message })

    }

}

async function chnageEmail(req,res) {
    if(!req.user){
        return res.status(401).json({ message: "Unauthorized request" });
    }

    const { email } = req.body;
    const id = req.user.id;
    try {
        const email = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: email
            }
        });


        
    } catch (error) {
        
    }


}

async function checkPassword(req, res) {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized request" });
        };

        const { data } = req.body;
        console.log(data)


        const id = req.user.id;
        const passwordd = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                password: true
            }
        });
        const storedPassword = passwordd.password;
        const check = bcrypt.compareSync(data, storedPassword);
        if (check) {
            res.status(200).json({ message: "Password Matched" });

        }
        else {
            res.status(404).json({ message: "The Password didn't matched" });

        }









    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })

    }


}

async function changePassword(req, res) {

    const { data } = req.body;
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized request" });
    };

    if (!data) {
        res.status(400).json({ message: "New Password is required for Change" });
    };

    const hashPassword = await bcrypt.hash(data, 10);
    const id = req.user.id;

    try {
        const update = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                password: hashPassword
            },


        });

        return res.status(200).json({ message: "Password Update Sucessfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }






}



async function checkEmail(req) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    }

    const userEmail = req.user.email;
    console.log(userEmail);
    const { email } = req.body;
    console.log(email)

    if (userEmail !== email) {
        return { verified: false, status: 400, message: "Email does not match registered user" };
    }

    return { verified: true };
}

async function changeEmail(req, res) {
    try {
        const verification = await checkEmail(req);

        if (!verification.verified) {
            return res.status(verification.status).json({ message: verification.message });
        };


        console.log(req.user)

        const emaill = req.user.email;
        const id = req.user.id;



        const otp = [];
        for (i = 0; i < 4; i++) {
            const number = Math.floor(Math.random() * 10);
            otp.push(number)


        }


        const OTP = otp.join("");

        await sendEmail(emaill, "OTP Verification", OTP.toString()).finally(
            console.log(emaill)


        );




        const saveOtp = new Otp({
            otp: OTP,
            userid: id,
            email: emaill,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 3 * 60 * 1000),
            used: false




        });


        await saveOtp.save().then(() => console.log('OTP SAVED'));


        res.status(200).json({ message: "Email sent successfully" })











    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

async function addContact(req, res) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };

    };

    const { contact } = req.body;
    if (contact.length < 10) {
        return { verified: false, status: 401, message: "Invalid Contact Number" };


    }

    const userid = req.user.id;
    const user = await prisma.user.findUnique({
        where: {
            id: userid
        },
        select: {
            email: true
        }
    })




    try {
        const otp = [];
        for (i = 0; i < 4; i++) {
            const number = Math.floor(Math.random() * 10);
            otp.push(number)


        }

        const OTP = otp.join("");
        console.log(user.email);

        await sendEmail(user.email, "OTP Verification", OTP.toString()).finally(
            console.log(contact)
        )

      

        const saveOtp = new Otp({
            otp: OTP,
            userid: userid,
            email: contact,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
            used: false




        });


        await saveOtp.save().then(() => console.log('OTP SAVED'));

        return res.status(200).json({ message: "Sent Sucessfylly" , success: true});



    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });

    }

}

async function verifyContact(req, res) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    };

    const userid = req.user.id;
    const { otp } = req.body;

    try {

        const SavedOtps = await Otp.find({
            userid: userid
        });
        console.log(SavedOtps[0].otp);
        console.log(otp);

        if (SavedOtps[0].otp == Number(otp)) {
            const user = await prisma.user.update({
                where: {
                    id: userid
                },
                data: {
                    contact: BigInt(Number(SavedOtps[0].email))
                }


            })
            return res.status(200).json({
                message: "OTP Verified Sucesssfully", user: {
                    ...user,
                    contact: user.contact.toString()
                }

            })

        }
        else {
            res.status(500).json({ message: "OTP Not verified" });

        }


    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })

    }

}


async function profileStaus(req,res) {
    if(!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    };

    try {
        const status =await prisma.jobProfile.findUniqueOrThrow({
            where: {
                id: req.user.id
            },
            select: {
                status: true
            }
        })


        return res.status(200).json({ status: "success", data: status.status });
        
    } catch (error) {
        
    }
    
}

async function verifyOtp(req, res) {



    try {
        if (!req.user) {
            return { verified: false, status: 401, message: "Unauthorized request" };
        }


        const id = req.user.id;
        const { otp } = req.query;
        console.log(otp);

        const SavedOtps = await Otp.find({
            userid: id
        });
        console.log(SavedOtps);
        console.log(SavedOtps[0].otp);


        if (SavedOtps[0].otp == otp) {
            res.status(200).json({ message: "OTP Verified Sucesssfully" })

        }
        else {
            res.status(500).json({ message: "OTP Not verified" });

        }




    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });

    }

}



module.exports = {
    changeName,
    checkPassword,
    changePassword,
    changeEmail,
    verifyOtp,
    addContact,
    verifyContact,
    profileStaus
}