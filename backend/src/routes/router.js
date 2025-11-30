const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMyid, checktoken, googleLogin } = require("../controllers/register.controller.js");
const { createProject, getProjects, addTask, getTasks, getProject, addMember, getMembers, groupProjects, deleteProject, deleteTask, verifyMPIN, MyMembers } = require("../controllers/project.controller.js")
const { recordTransaction, saveNotes, setReminderMessage, setReminders, setBudget, getFinance, getTransactions, getMonthly, getWeekly, Mytransactions, getFinanceNotes } = require("../controllers/finance.controller.js")
const { upload, uploadToS3 } = require("../configs/multer.config.js")
const { getAllProducts, saveProduct, getdisplyproducts, setInventory, addtoWishlist, getWishList, getProduct, getServices } = require("../controllers/ecommerce.controller.js");
const { createDealer, getDealers } = require("../controllers/dealer.controller.js");
const { changeName, addContact, changePassword, checkPassword, changeEmail, verifyOtp, verifyContact, profileStaus, handleProfileImage } = require("../controllers/settings.controller.js");
const { getAllJobs, applyforJob, getMyJobs, getMyApplications, enableJobprofile, disableJobProfile, getProfileDetails } = require("../controllers/jobs.controller.js");
const { saveDocuments, saveLegalNotes, getAllDocuments,
    getAllNotes,
    deleteDocument, createInventory, getInventory } = require("../controllers/document.controller.js");
const { createProductQuery, addReview, createOrder, getAllReviews } = require("../controllers/order.controller.js");
const { androidPlans, testUpload } = require("../controllers/android.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/project", upload.single("cover"), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded or invalid file type"
        });
    }
    createProject(req, res).catch(next);
});
router.get("/myprojects", getProjects);
router.get("/checktoken", checktoken);
router
    .route("/tasks/:projectid")
    .get(getTasks)
    .post(addTask);


router.get("/gproject", getProject);
router.post("/upload", upload.single("proof"), recordTransaction);
router.post("/savenotes/:financeid", saveNotes);
router.post("/setreminder/:financeId", setReminders);
router.post("/setmessage/:projectid", setReminderMessage);
router.get("/mytransactions/:projectid", Mytransactions);
router.get("/products", getAllProducts);
router.put("/setbudget/:projectid", setBudget);
router
    .route("/dealers")
    .get(getDealers)
    .post(createDealer);
router.post("/saveproduct", upload.single("coverimage"), saveProduct);
router.put("/cname", changeName);
router.put('/checkpassword', checkPassword);
router.put("/changepassword", changePassword);
router.put("/dpprofile", upload.single("profile"), handleProfileImage);
router.post("/email", changeEmail);
router.get('/myid', getMyid);
router.get('/verifyotp', verifyOtp);
router.get('/display', getdisplyproducts);
router.get('/finance', getFinance);
router.get('/transactions/:projectid', getTransactions);
router.get('/monthly/:projectid', getMonthly);
router.get('/weekly/:projectid', getWeekly);
router.get('/getfnotes/:projectid', getFinanceNotes);
router.post("/document/:projectid", upload.single("document"), saveDocuments);
router.put("/inventory/:productid", setInventory);
router.post('/legalnote/:projectid', saveLegalNotes);
router.get('/documents/:projectid', getAllDocuments);
router.get('/notes/:projectid', getAllNotes);
router.delete('/deletedocs/:documentid', deleteDocument);
router
    .route("/inventory/:projectid")
    .get(getInventory)
    .post(createInventory);
router.post('/wishlist/:productid', addtoWishlist);
router.get("/getwishlist", getWishList);
router.get('/getproduct/:productid', getProduct);
router.get('/services', getServices);
router.post('/google', googleLogin);
router.post('/addmember/:projectid', addMember);
router.get('/members/:projectid', getMembers);
router.get('/mymembers', MyMembers);
router.get('/groupproject', groupProjects);
router.post('/applyjob/:id', applyforJob);
router.get('/getjobs', getMyJobs);
router.get('/applications', getMyApplications);
router.delete('/deleteproject/:projectid', deleteProject);
router.delete('/deletetask/:id', deleteTask);
router.post('/verifympin/:projectid', verifyMPIN);
router.post('/addcontact', addContact);
router.post('/verifycontact', verifyContact);
router.post('/productquery/:productid', createProductQuery);
router.post('/addreview/:productid', addReview);
router.get('/getreviews/:productid', getAllReviews);
router.post('/createorder/:productid', createOrder);
router.post('/enableJob', enableJobprofile);
router.post('/disableJob', disableJobProfile);
router.get('/getjobprofile', getProfileDetails);
router.get('/alljobs', getAllJobs);
router.get('/myjobs', getMyJobs);
router.get('/myapplications/:jobid', getMyApplications);
router.get('/profilestatus', profileStaus);
router.get('/plans', androidPlans);


router.post("/test" , testUpload);
module.exports = router;




