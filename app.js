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

    res.render("projectDetail", { projectById: projectById[0] });
  } catch (err) {
    console.log(err);
  }
};

const renderFormEditProject = async (req, res) => {
  try {
    const id = req.params.projectId;
    // const projectById = projects.find((project) => project.id == id);
    const projectById = await sequelize.query(
      `SELECT * FROM "Projects" WHERE id = ${id}`
    );

    res.render("editProject", { data: projectById[0][0] });
  } catch (err) {
    console.log(err);
  }
};

const editProject = async (req, res) => {
  try {
    const id = req.params.projectId;

    const editedProject = {
      title: req.body.title,
      description: req.body.content,
    };

    const editQuery = `
    UPDATE "Projects" 
    SET 
    "projectName" = '${editedProject.title}',
    "description" = '${editedProject.description}'
    WHERE id = ${id}`;

    await sequelize.query(editQuery);

    res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const deleteQuery = `DELETE FROM "Projects" WHERE id = ${projectId}`;

    await sequelize.query(deleteQuery);

    res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
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
