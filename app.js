const express = require("express");
const app = express();
const port = 3000;

//sequelize
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize("personalWebsite", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

//view engine
app.set("view engine", "hbs");
app.set("views", "views");

//static file access
app.use("/assets", express.static("assets"));

//body parser (parse from string to obj)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//data and controllers
const projects = [];

const renderHome = async (req, res) => {
  try {
    const fetchQuery = `SELECT * FROM "Projects" p`;

    const projects = await sequelize.query(fetchQuery, {
      type: QueryTypes.SELECT,
    });

    res.render("home", { data: [...projects] });
  } catch (err) {
    console.log(err);
  }
};

const renderProject = (req, res) => {
  res.render("project", { projects });
};

const createProject = async (req, res) => {
  try {
    const {
      title,
      startDate,
      endDate,
      content,
      technologies = true,
      imageUrl = "test.jpg",
      UserId = 1,
      createdAt,
      updatedAt,
    } = req.body;

    const insertQuery = `INSERT INTO "Projects"("projectName", "startDate", "endDate", "description", "technologies", "imageUrl", "UserId", "createdAt", "updatedAt")
    VALUES('${title}', NOW(), NOW(), '${content}', '${technologies}', '${imageUrl}', '${UserId}', NOW(), NOW())`;

    await sequelize.query(insertQuery, { type: QueryTypes.INSERT });

    res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
};

const renderProjectDetail = async (req, res) => {
  try {
    const id = req.params.projectId;

    const queryProjectDetailById = `SELECT * FROM "Projects" WHERE id=${id}`;

    const projectById = await sequelize.query(queryProjectDetailById, {
      type: QueryTypes.SELECT,
    });

    res.render("projectDetail", { projectById });
  } catch (err) {
    console.log(err);
  }
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
