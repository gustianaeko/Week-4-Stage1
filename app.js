const express = require("express");
const app = express();
const port = 3000;

//view engine
app.set("view engine", "hbs");
app.set("views", "views");

//static file access
app.use("/assets", express.static("assets"));

//body parser (parse from string to obj)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//data and controllers
const projects = [];

const renderHome = (req, res) => {
  res.render("home", { data: [...projects] });
};

const renderProject = (req, res) => {
  res.render("project", { projects });
};

const createProject = (req, res) => {
  const newProject = {
    id: projects.length + 1,
    title: req.body.title,
    content: req.body.content,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    createdAt: new Date().getFullYear(),
  };

  projects.push(newProject);
  res.redirect("/home");
};

const renderProjectDetail = (req, res) => {
  const id = req.params.projectId;
  const projectById = projects.find((project) => project.id == id);

  res.render("projectDetail", { projectById });
};

const renderFormEditProject = (req, res) => {
  const id = req.params.projectId;

  const projectById = projects.find((project) => project.id == id);

  res.render("editProject", { projectById });
};

const editProject = (req, res) => {
  const id = req.params.projectId;

  const editedProject = {
    id: id,
    title: req.body.title,
    content: req.body.content,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    createdAt: new Date().getFullYear(),
  };

  const index = projects.findIndex((project) => project.id == id);

  projects[index] = editedProject;

  res.redirect("/home");
};

const deleteProject = (req, res) => {
  const id = req.params.projectId;

  const index = projects.findIndex((project) => project.id == id);

  projects.splice(index, 1);

  res.redirect("/home");
};

const renderContact = (req, res) => {
  res.render("contact");
};

//routes
app.get("/", renderHome);
app.get("/home", renderHome);
app.get("/project", renderProject);
app.post("/project", createProject);
app.get("/projectDetail/:projectId", renderProjectDetail);
app.get("/editProject/:projectId", renderFormEditProject);
app.post("/editProject/:projectId", editProject);
app.get("/deleteProject/:projectId", deleteProject);
app.get("/contact", renderContact);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
