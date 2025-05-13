
const { PrismaClient } = require("../../output/client");
const prisma = new PrismaClient();
const path = require("path");
const { storage, bucketName } = require("../configs/cloud.config.js");
const { pathname } = require("../configs/multer.config.js")
const fs = require("fs");


async function saveDocuments(req, res) {
    if (!req.user) {
        return res.json({ verified: false, status: 401, message: "Unauthorized Request" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const { title, description } = req.body;
    const projectid = req.params.projectid;
    try {
        const localFilePath = path.join(pathname, req.file.filename);
        const bucket = storage.bucket(bucketName);
        if (req.file) {

            await bucket.upload(localFilePath, {
                destination: req.file.originalname,
                resumable: false,


            });




        }

        const fileUrl = `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(req.file.originalname)}`;;

        const document = await prisma.document.create({
            data: {
                title: title,
                originalName: req.file.originalname,
                storageUrl: fileUrl,
                notes: description,
                Project: {
                    connect: {
                        id: projectid
                    }
                }


            }

        });

        fs.unlinkSync(localFilePath);

        return res.status(201).json({ sucesss: true, document: document });


    } catch (error) {
        res.status(500).json({ message: "Interbal Server Error", error: error.message });

    }

}

async function saveLegalNotes(req, res) {
    const { content } = req.body;
    const projectid = req.params.projectid;

    try {
        const note = await prisma.note.create({
            data: {
                content: content,
                type: "Legal",
                finance: {
                    connect: { id: projectid }
                }
            }
        });

        res.status(201).json({ message: "Note added successfully", note });
    } catch (error) {
        console.error("Error adding note:", error);
        return res.status(500).json({ error: "Something went wrong" , error : error.message});
    }
};


async function getAllDocuments(req, res) {
    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });
    };

    try {
        const documents = await prisma.document.findMany({
            where: {
                Project: {
                    id: req.params.projectid
                }
            }
        });
        return res.status(200).json({ sucesss: true, documents: documents });

    } catch (error) {
        return res.status(500).json({ sucesss: false, message: "Internal Server Error", error: error.message });

    }
};


async function getAllNotes(req, res) {
    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });
    };
    const projectid = req.params.projectid
    try {
        const notes = await prisma.note.findMany({
            where: {
                type : "Legal",
                financeId : req.params.projectid
            
               
            }
        });
        return res.status(200).json({ sucesss: true, notes: notes });

    } catch (error) {
        return res.status(500).json({ sucesss: false, message: "Internal Server Error", error: error.message });


    }


}

async function deleteDocument(req, res) {
    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });
    };
    const documentid = req.params.docuemntid;
    try {

        const document= await prisma.document.delete({
            where: {
                id: documentid
            }
        });
        return res.status(200).json({ sucesss: true, delete: document });

    } catch (error) {
        return res.status(500).json({ sucesss: false, message: "Internal Server Error", error: error.message });


    }

};

async function createInventory(req, res) {

    if(!req.user){
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });
    }
    const { name, description, value, valueperpeice, stock, available, createdAt } = req.body;
    const projectId = req.params.projectid;
  
    try {
      const inventory = await prisma.inventory.create({
        data: {
          name : name,
          description : description,
          value: BigInt(value),
          valueperpeice : valueperpeice,
          stock : stock,
          available : available,
          createdAt : createdAt,
          Project: {
            connect: { id: projectId }
          }
        }
      });
      const response = {
        message: "Inventory created successfully",
        inventory: {
            ...inventory,
            value: inventory.value.toString() // Convert BigInt to string
        }
    };
  
      return res.status(201).json(response);
  
     
    } catch (error) {
      console.error("Error creating inventory:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }

  async function getInventory(req, res) {
    if (!req.user) {
      return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });
    }
  
    const projectid = req.params.projectid;
  
    try {
      const inventories = await prisma.inventory.findMany({
        where: {
          projectId: projectid
        }
      });
  
      const formatted = inventories.map(inv => ({
        ...inv,
        value: inv.value.toString()
      }));
  
      res.status(200).json({ message: "Inventory fetched successfully", data: formatted });
    } catch (error) {
      console.error("Error fetching inventory:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
  
module.exports = {
    saveDocuments,
    saveLegalNotes,
    getAllDocuments,
    getAllNotes,
    deleteDocument,
    createInventory,
    getInventory
}
