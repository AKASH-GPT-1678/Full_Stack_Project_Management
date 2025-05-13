const Job = require("../models/jobModel.js");
const Application = require("../models/applicationModel.js");
const { PrismaClient } = require("../../output/client");
const prisma = new PrismaClient();

async function saveJob(id, wages, category, description, location, expire) {
    if (!id || !wages || !category || !description) {
        console.log("All fields are required");
        return { status: 400, message: "Bad Request: All fields are required" }
    }
    try {
        const newJob = new Job({
            userId: id,
            wages: wages,
            skills: category,
            description: description,
            location: location,
            expire: expire
        });

        await newJob.save()
            .then(() => console.log('Job saved!'))
    } catch (error) {
        console.error("Error saving the job:", error);
    }
}

const getAllJobs = async (req, res) => {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    }

    try {
        const jobs = await Job.find();
      
        return res.status(200).json({ message: "Jobs Fetched SUcessfully", jobs: jobs })
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return { status: 500, message: "Internal Server Error", error: error.message };
    }
}
async function enableJobprofile(req, res) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    };

    const { location } = req.body;
    const userid = req.user.id

    try {

        const isVerified = await prisma.jobProfile.findUnique({
            where: {
                id: userid
            }, select: {
                lastdisabled: true,
                status: true


            }
        });


        if (!isVerified) {
            const jobprofile = await prisma.jobProfile.create({
                data: {
                    location: location,
                    status: true,
                    User: {
                        connect: {
                            id: userid
                        }
                    }

                }
            }

            );

            return res.status(201).json({ status: "success", message: "Job Profile created successfully" });
        }
        else if (isVerified.status) {
            return res.status(403).json({ message: "Your job profile is already enabled" });

        }
        else {
            const todaydate = new Date().getDate();
            const lastdisabled = new Date(isVerified.lastdisabled).getDate();
            if (todaydate - lastdisabled <= 7) {
                return res.status(403).json({ message: "You can enable job profile after 7 days" });
            }
            const update = await prisma.jobProfile.update({
                where: {
                    id: userid
                },
                data: {
                    location: location,

                    status: true,
                    User: {
                        connect: {
                            id: userid
                        }
                    }
                }
            });


            return res.status(200).json({ status: "success", message: "Job Profile Enabled Successfully" });
        }





    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });

    }
}


async function disableJobProfile(req, res) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    };

    try {


        const jobProfile = await prisma.jobProfile.findUniqueOrThrow({
            where: {
                id: req.user.id,


            }, select: {
                status: true
            }
        });

        if (!jobProfile.status) {
            return res.status(403).json({ message: "Your job profile is already disabled" });
        }
        const update = await prisma.jobProfile.update({
            where: {
                id: req.user.id
            },
            data: {
                lastdisabled: new Date(),
                status: false
            }
        })
        return res.status(200).json({ status: "success", message: "Job Profile Disabled Successfully", update });




    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal Server Error" });

    }


}


async function getProfileDetails(req, res) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    };

    try {

        const profile = await prisma.jobProfile.findUniqueOrThrow({
            where: {
                id: req.user.id
            },
            select: {
                status: true,
                User: {
                    select: {
                        name: true,
                        email: true,
                        contact: true,


                    },


                },
                workdone: true,
                location: true,
                rating: true
            }
        });
        if (profile.status === false) {
            return res.status(403).json({ message: "Job Profile is Disabled", verified: false })
        }

        return res.status(200).json({
            message: "Found", verified: true
            , profile: profile
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });



    }

}



async function applyforJob(req, res) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    };

    const { message } = req.body;
    const userid = req.user.id;
    const creatorid = req.params.id;
    const jobid = req.query.jobid;
    if (!message || !userid || !creatorid || !jobid) {
        return res.status(400).json({ message: "One of the fields is empty", verified: false });
    }

    try {
        const jobProfile = await prisma.jobProfile.findUniqueOrThrow({
            where: {
                id: userid
            },
            select: {
                status: true,
                workdone :true,
                jobsapplied :true,
                location :true,
                rating :true,
                User : {
                    select :{
                        email :true,
                        name :true,
                        contact :true
                    }
                }
                
            }
        });

     

        if (!jobProfile.status) {
            return res.status(403).json({ message: "Your job profile is disabled" });
        };


        const application = new Application({
            creatorid: creatorid,
            userid: userid,
            name: jobProfile.User.name,
            contact: jobProfile.User.contact,
            message: message,
            rating: jobProfile.rating,
            workdone: jobProfile.workdone,
            location: jobProfile.location,
            jobid: jobid

        });

        await application.save().then(() => console.log("Application Saved"));

        return res.status(201).json({ message: "Application Created", Applied: application });

    } catch (error) {
        console.error("Error Saving Application:", error);
        return { status: 500, message: "Internal Server Error", error: error.message };

    }






};

async function getMyJobs(req, res) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    }
    const creatorid = req.user.id;

    try {

        const user = await Job.find({
            userId: creatorid

        });

        return res.status(200).json({ message: "Found", jobs: user });



    } catch (error) {
        return { status: 500, message: "Internal Server Error", error: error.message };

    }

};

async function getMyApplications(req, res) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    };

    const userid = req.user.id;
    const jobid = req.params.jobid;



    try {
        const applications = await Application.find({
            creatorid: userid,
            jobid: jobid

        });
        return res.status(200).json({ message: "Found", application: applications });

    } catch (error) {
        return { status: 500, message: "Internal Server Error", error: error.message };

    }

};


module.exports = {
    saveJob,
    getAllJobs,
    applyforJob,
    getMyJobs,
    getMyApplications,
    enableJobprofile,
    disableJobProfile,
    getProfileDetails

}