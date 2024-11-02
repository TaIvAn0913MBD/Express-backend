const express = require("express");
const app = express();
app.use(express.json());
const url = require("url");

const fs = require("fs");
const JSONDATA = fs.readFileSync(
  "/Users/24HP6298/Desktop/express-backend/express/JSON/index.json"
);
let MockData;
MockData = JSON.parse(JSONDATA);

app.get("/users", (req, res) => {
  const q = url.parse(req.url, true);
  const qData = q.query;
  const PathId = qData.id;
  console.log(PathId);
  if (PathId === undefined) {
    console.log(MockData);
    res.send(MockData);
  }
  if (PathId !== undefined) {
    console.log(PathId);
    const FindUser = MockData.find((user) => {
      return user.id == PathId;
    });
    const ShowingName = FindUser.name;
    const ShowingId = FindUser.id;
    const SHowingBody = { name: ShowingName, id: ShowingId };
    res.send(SHowingBody);
  }
});

app.post("/login", (req, res) => {
  const PostName = req.body.name;
  const PostPass = req.body.password;
  MockData.map((data) => {
    if (data.name === PostName && data.password === PostPass) {
      console.log(PostName + " " + "succesfully logged in");
      res.send(
        "You're name is " + PostName + " and you're password is " + PostPass
      );
    }
  });
});
app.post("/sign-up", (req, res) => {
  const NewName = req.body.name;
  const NewPass = req.body.password;
  const NewId = MockData.length + 1;
  const NewBody = { name: NewName, password: NewPass, id: String(NewId) };

  const SameUser = MockData.find((user) => {
    return user.name === NewName;
  });
  if (SameUser === undefined) {
    MockData.push(NewBody);
    fs.writeFileSync(
      "/Users/24HP6298/Desktop/express-backend/express/JSON/index.json",
      JSON.stringify(MockData),
      (err) => {
        console.log(err);
      }
    );
    res.send(JSON.stringify({ message: "done" }));
  } else {
    console.log("Already Used");
  }
});
app.post("/delete", (req, res) => {
  const DeleteName = req.body.name;
  const DeletePass = req.body.password;
  const SameUser = MockData.find((user) => {
    return user.name === DeleteName && user.password === DeletePass;
  });
  if (SameUser === undefined) {
    res.send(JSON.stringify({ message: "No such user" }));
    console.log("no such user");
  }
  if (SameUser !== undefined) {
    const result = MockData.filter((item) => {
      return item.name !== DeleteName && item.password !== DeletePass;
    });
    fs.writeFileSync(
      "/Users/24HP6298/Desktop/express-backend/express/JSON/index.json",
      JSON.stringify(result),
      (err) => {
        console.log(err);
      }
    );
    res.send("hi");
    console.log("Succesfully deleted");
    console.log(result);
  }
});
app.listen(3000, console.log("running"));
