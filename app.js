const express = require("express");
const app = express();
const port = 3000;

//bcrypt
const bcrypt = require("bcrypt");
//session
const session = require("express-session");
//flash
const flash = require("express-flash");
//multer
const multer = require("multer");
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    const uniqSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqSuffix + ".jpg");
  },
});

const upload = multer({ storage: multerConfig });

//sequelize
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize("personalWebsite", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

//flash and session
app.use(flash());
app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "luckyCat",
  })
);

//view engine
app.set("view engine", "hbs");
app.set("views", "views");

//static file access and uploads
app.use("/assets", express.static("assets"));
app.use("/uploads", express.static("src/uploads"));

//body parser (parse from string to obj)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//data and controllers
const projects = [];

const renderHome = async (req, res) => {
  try {
    // const fetchQuery = `SELECT * FROM "Projects" p`;
    const fetchQuery = `SELECT p.id, p."projectName", p."imageUrl", p.description, u."userName"
FROM "Projects" p
LEFT JOIN "Users" u ON p."UserId" = u.id`;

    const projects = await sequelize.query(fetchQuery, {
      type: QueryTypes.SELECT,
    });

    const obj = projects.map((data) => {
      return {
        ...data,
      };
    });

    res.render("home", {
      data: obj,
      isLogin: req.session.isLogin,
      user: req.session.user,
    });
  } catch (err) {
    console.log(err);
  }
};

const renderContact = (req, res) => {
  res.render("contact", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
};

const renderProject = (req, res) => {
  res.render("project", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
};

const createProject = async (req, res) => {
  try {
    const {
      title,
      startDate,
      endDate,
      content,
      technologies = true,
      UserId = req.session.idUser,
      createdAt,
      updatedAt,
    } = req.body;

    const imageUrl = req.file.filename;

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

    res.render("projectDetail", {
      projectById: projectById[0],
      isLogin: req.session.isLogin,
      user: req.session.user,
    });
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

    res.render("editProject", {
      data: projectById[0][0],
      isLogin: req.session.isLogin,
      user: req.session.user,
    });
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

const renderFormRegister = async (req, res) => {
  await res.render("register");
};

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    bcrypt.hash(password, 10, async (err, hasedPassword) => {
      if (err) {
        res.redirect("/register");
      } else {
        const createUser = `INSERT INTO "Users" ("userName", "email", "password", "createdAt", "updatedAt") VALUES ('${userName}', '${email}', '${hasedPassword}', NOW(), NOW())`;

        await sequelize.query(createUser);

        req.flash("success", "You are successfuly Register");
        res.redirect("/login");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const renderFormLogin = async (req, res) => {
  await res.render("login");
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const queryLoginByEmail = `SELECT * FROM "Users" WHERE email = '${email}'`;

    const isCheckEmail = await sequelize.query(queryLoginByEmail, {
      type: QueryTypes.SELECT,
    });

    if (!isCheckEmail.length) {
      req.flash("danger", "Email is not found");
      return res.redirect("/login");
    }

    bcrypt.compare(password, isCheckEmail[0].password, (err, result) => {
      if (!result) {
        req.flash("danger", "Wrong Password!");
        return res.redirect("/login");
      } else {
        req.session.isLogin = true;
        req.session.user = isCheckEmail[0].userName;
        req.session.idUser = isCheckEmail[0].id;
        req.flash("success", "Login Success");

        return res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

//routes
app.get("/", renderHome);
app.get("/home", renderHome);
app.get("/project", renderProject);
app.post("/project", upload.single("image"), createProject);
app.get("/contact", renderContact);
app.get("/register", renderFormRegister);
app.post("/register", registerUser);
app.get("/login", renderFormLogin);
app.post("/login", login);
app.get("/logout", logout);
app.get("/projectDetail/:projectId", renderProjectDetail);
app.get("/editProject/:projectId", renderFormEditProject);
app.post("/editProject/:projectId", editProject);
app.get("/deleteProject/:projectId", deleteProject);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
