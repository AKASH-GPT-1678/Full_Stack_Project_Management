// const {PrismaClient} = require("../../output/client");
const { PrismaClient } = require("../../output/client")
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { storage, bucketName } = require("../configs/cloud.config.js");
const path = require("path");
const fs = require('fs');
const { pathname } = require("../configs/multer.config.js")




let JWT_SECRET = process.env.JWT_SECRET;
async function verifyToken(token) {
    try {
        const verfication = await jwt.verify(token, JWT_SECRET)
        return verfication
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return { message: "Token Expired" }
        } else {
            return null
        }
    }

}

async function createProject(req, res) {
    console.log(req.body)

    const { name, description, category ,mpin } = req.body;

    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    }
 
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(req.file.originalname);

    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
    });

    blobStream.on("error", (err) => {
        console.error("Upload error:", err);
        res.status(500).json({ message: "Failed to upload file" });
    });

    blobStream.on("finish", () => {
        const fileUrl = `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(req.file.originalname)}`;
        res.status(200).json({ message: "Upload successful", fileUrl });
     
    });

      const fileUrl = `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(req.file.originalname)}`;
    

    blobStream.end(req.file.buffer);

    try {
        const data = await prisma.project.create({
            data: {
                name: name,
                description: description,
                category: category,
                userid: idd,
                coverimgUrl: fileUrl

            }
        });
        const finance = await prisma.finance.create({
            data: {
                id: data.id,
                MPIN: mpin
            }
        });

        fs.unlinkSync(localFilePath);

        return res.status(201).json({ success: true, message: "Project Created Successfully", data, finance });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });

    }







}
async function verifyMPIN(req, res) {
    if(!req.user){
        return { verified: false, status: 401, message: "Unauthorized request" };
    };
    const { mpin } = req.body;
   
    try {
       
        const projectid = req.params.projectid;
        const verify  =await prisma.finance.findUnique({
            where : {
                id : projectid,
            },
            select : {
                MPIN : true
            }
        });
        const verificaion = verify.MPIN;
        if(verificaion == mpin){
            return res.status(200).json({success : true , message: "MPIN Verified" })
        }
        else{
            return res.status(400).json({ success : false , message: "Invalid MPIN" })
        };


    
        
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" , error: error.message })
        
    }
    
}


async function getProjects(req, res) {

    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };
    }



    let id = req.user.id;


    try {
        const Project = await prisma.user.findMany({
            where: {
                id: id

            },
            select: {
                projects: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        category: true

                    }
                }

            }
        });
        res.status(200).json({ message: "Found Projects", Project })

    } catch (error) {
        res.status(500).json({ message: "Something went badly wrong", error: error.message })

    }


}

async function addTask(req, res) {
    const projectid = req.params.projectid;
    if (!projectid) {
        res.status(401).json({ message: "Project Not Found " })
    }

    const { task, amount, startdate, deadline, description, priority, teamlead, team, suppliers, subtasks, inventories } = req.body;
    if (!task || !startdate || !deadline || !description || !priority) {
        res.status(400).json({ message: "Invalid Request" })

    }



    try {
        const tasks = await prisma.task.create({
            data: {
                task: task,
                amount: amount,
                startdate: startdate,
                deadline: deadline,
                description: description,
                priority: priority,
                teamlead: teamlead,
                team: team,
                supplier: suppliers,
                subtasks: subtasks,
                inventories: inventories,
                status: true,
                projectId: projectid




            }
        });

        res.status(201).json({ message: "Task added sucessfully", tasks })



    } catch (error) {
        res.status(400).json({ message: "Bad request Madarchod", error: error.message })

    }





}
async function getTasks(req, res) {
    const projectid = req.params.projectid;
    if (!projectid) {
        res.status(401).json({ message: "Project Not Found " })
    }


    try {
        const tasks = await prisma.project.findUnique({
            where: {
                id: projectid
            },
            select: {
                Task: {
                    select: {
                        id :true,
                        task: true,
                        amount: true,
                        startdate: true,
                        deadline: true,
                        description: true,
                        priority: true,
                        teamlead: true,
                        team: true,
                        supplier: true,
                        subtasks: true,
                        inventories: true,
                        status: true,

                    }
                }
            }
        })


        res.status(201).json({ message: "Tasks Collected Successfully", tasks });



    } catch (error) {
        res.status(400).json({ message: "Bad request Madarchod", error: error.message })

    }





}

async function deleteTask(req,res) {
    if(!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });
    };

    const projectId = req.params.projectid;
    const taskid = req.params.id;
    try {
        const task = await prisma.task.delete({
            where: {
                
                id: taskid,
               
            }
        });

        return res.status(201).json({ message: "Task Deleted Successfully", task });
        
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
    
}


async function addMember(req, res) {

    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });

    }
    const projectid = req.params.projectid;
    const id = req.user.id;
    const { name, email } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).json({ verified: false, status: 404, message: "Member Must be Registered With Platform" });

        };

        const member = await prisma.member.findFirst({
            where: {
                useremail: email,
                projectId: projectid,
                userid: id

            }
        });

        if (member) {
            return res.status(403).json({ message: "Same Member Canoot be Added Multiple Times" });
        };

        const addmember = await prisma.member.create({
            data: {
                name: name,
                useremail: email,
                projectId: projectid,
                userid: id


            }
        });

        return res.status(201).json({ message: "Created", user: addmember });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });

    }

};


async function getMembers(req, res) {
    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });

    };

  
    const projectid = req.params.projectid;

    try {
        const members = await prisma.member.findMany({
            where: {
                projectId: projectid
               
            }
        });
        return res.status(200).json({
            message: "Found", members: members
        })

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });

    }

};


async function MyMembers(req,res) {
    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });

    };


    try {
        const members = await prisma.member.findMany({
            where : {
                userid : req.user.id
            }
        });
        if(!members){
            return res.status(404).json({message : "Not Found" , verified : false , statuscode :404})
        }

        return res.status(200).json({ message: "Found", members: members })
        
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });

        
    }

    
}


async function groupProjects(req, res) {
    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });
    }

    try {
        const email = req.user.email;
        const groupProjects = await prisma.member.findMany({
            where: {
                useremail: email
            },
            include: {
                Project: true
            }
        });
        return res.status(200).json({ message: "Found", projects: groupProjects.map((project) => project.Project) });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }

}
async function getProject(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized Request" });
    }

    try {
        const decoded = await verifyToken(token);
        if (decoded.message === "Token Expired") {
            return res.status(401).json({ message: "Invalid Token" });
        }

        const projectid = req.query.projectid;
        if (!projectid) {
            return res.status(400).json({ message: "Project ID Not Found" });
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectid
            },
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                userid: true,
                createdAt: true
            }
        });

        if (!project) {
            return res.status(404).json({ message: "Project Not Found" });
        }

        return res.status(200).json({ message: "Found Project", project });

    } catch (error) {
        return res.status(500).json({ message: "Something went badly wrong", error: error.message });
    }
}

async function deleteProject(req, res) {
    // Authentication check
    if (!req.user) {
      return res.status(401).json({ 
        message: "Unauthorized", 
        status: 401, 
        verified: false 
      });
    }
    
    const userId = req.user.id;
    const projectId = req.params.projectid;
    
    try {
      // Check if project exists and belongs to user
      const project = await prisma.project.findUnique({
        where: {
          id: projectId,
          userid: userId
        }
      });
  
      if (!project) {
        return res.status(404).json({
          message: "Project not found or you don't have permission to delete it",
          status: 404,
          verified: false
        });
      }
  

      const deleted = await prisma.$transaction(async (tx) => {
    
        await tx.member.deleteMany({ 
          where: { projectId: projectId } 
        });
        
        await tx.task.deleteMany({ 
          where: { projectId: projectId } 
        });
        
       
        await tx.note.deleteMany({
          where: { financeId: projectId }
        });
        
        await tx.remainders.deleteMany({
          where: { financeId: projectId }
        });
        
        await tx.transaction.deleteMany({
          where: { financeId: projectId }
        });
        
        await tx.finance.delete({
          where: { id: projectId }
        });
        
        await tx.document.deleteMany({ 
          where: { projectId: projectId } 
        });
        
        await tx.scheduleMsg.deleteMany({ 
          where: { projectId: projectId } 
        });
        
        await tx.inventory.deleteMany({ 
          where: { projectId: projectId } 
        });
        
   
        return await tx.project.delete({
          where: {
            id: projectId,
            
          }
        });
      });
      console.log("deleted");
      
      return res.status(200).json({
        message: "Project and related data deleted successfully",
        status: 200,
        verified: true,
        data: deleted
      });
      
    } catch (error) {
      console.error("Error deleting project:", error);
      
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }



module.exports = {
    createProject,
    verifyToken,
    getProjects,
    addTask,
    getTasks,
    getProject,
    addMember,
    getMembers,
    groupProjects,
    deleteProject,
    deleteTask,
    verifyMPIN,
    MyMembers
}