const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  let firstCreatedIssueId;
  let secondCreatedIssueId;

  const createdIssue = {
    issue_title: "Test issue",
    issue_text: "Test description",
    created_by: "Test User",
    assigned_to: "Test Assignee",
    status_text: "In progress",
  };

  // Helper function to verify all required issue properties are present
  function assertIssueProperties(issue) {
    assert.property(issue, "_id");
    assert.property(issue, "issue_title");
    assert.property(issue, "issue_text");
    assert.property(issue, "created_by");
    assert.property(issue, "assigned_to");
    assert.property(issue, "status_text");
    assert.property(issue, "open");
    assert.property(issue, "created_on");
    assert.property(issue, "updated_on");
    assert.isBoolean(issue.open);
  }

  test("Create an issue with every field", (done) => {
    chai
      .request(server)
      .post("/api/issues/testproject")
      .send(createdIssue)
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        firstCreatedIssueId = res.body._id;
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, createdIssue.issue_title);
        assert.equal(res.body.issue_text, createdIssue.issue_text);
        assert.equal(res.body.created_by, createdIssue.created_by);
        assert.equal(res.body.assigned_to, createdIssue.assigned_to);
        assert.equal(res.body.status_text, createdIssue.status_text);
        assert.equal(res.body.open, true);
        assert.exists(res.body._id);
        assert.exists(res.body.created_on);
        assert.exists(res.body.updated_on);
        done();
      });
  });

  test("Create an issue with only required fields", (done) => {
    chai
      .request(server)
      .post("/api/issues/testproject")
      .send({
        issue_title: createdIssue.issue_title,
        issue_text: createdIssue.issue_text,
        created_by: createdIssue.created_by,
      })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        secondCreatedIssueId = res.body._id;
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, createdIssue.issue_title);
        assert.equal(res.body.issue_text, createdIssue.issue_text);
        assert.equal(res.body.created_by, createdIssue.created_by);
        assert.equal(res.body.assigned_to, "");
        assert.equal(res.body.status_text, "");
        assert.equal(res.body.open, true);
        assert.exists(res.body._id);
        assert.exists(res.body.created_on);
        assert.exists(res.body.updated_on);
        done();
      });
  });

  test("Create an issue with missing required fields", (done) => {
    chai
      .request(server)
      .post("/api/issues/testproject")
      .send({
        issue_title: createdIssue.issue_title,
      })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "required field(s) missing");
        done();
      });
  });

  test("View issues on a project", (done) => {
    chai
      .request(server)
      .get("/api/issues/testproject")
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.isNotEmpty(res.body);
        assert.isArray(res.body);
        if (res.body.length > 0) {
          assertIssueProperties(res.body[0]);
        }
        done();
      });
  });

  test("View issues on a project with one filter", (done) => {
    chai
      .request(server)
      .get("/api/issues/testproject")
      .query({ assigned_to: createdIssue.assigned_to })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.isNotEmpty(res.body);
        assert.isArray(res.body);
        if (res.body.length > 0) {
          assertIssueProperties(res.body[0]);
          assert.equal(res.body[0].assigned_to, createdIssue.assigned_to);
        }
        done();
      });
  });

  test("View issues on a project with multiple filters", (done) => {
    chai
      .request(server)
      .get("/api/issues/testproject")
      .query({
        assigned_to: createdIssue.assigned_to,
        issue_title: createdIssue.issue_title,
      })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.isNotEmpty(res.body);
        assert.isArray(res.body);
        if (res.body.length > 0) {
          assertIssueProperties(res.body[0]);
          assert.equal(res.body[0].assigned_to, createdIssue.assigned_to);
          assert.equal(res.body[0].issue_title, createdIssue.issue_title);
        }
        done();
      });
  });

  test("Update one field on an issue", (done) => {
    chai
      .request(server)
      .put("/api/issues/testproject")
      .send({ _id: firstCreatedIssueId, issue_title: "Updated title" })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.result, "successfully updated");
        assert.equal(res.body._id, firstCreatedIssueId);
        done();
      });
  });

  test("Update multiple fields on an issue", (done) => {
    chai
      .request(server)
      .put("/api/issues/testproject")
      .send({
        _id: firstCreatedIssueId,
        issue_title: "Updated title again",
        issue_text: "Updated text",
        open: false,
      })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.result, "successfully updated");
        assert.equal(res.body._id, firstCreatedIssueId);
        done();
      });
  });

  test("Update an issue with missing _id", (done) => {
    chai
      .request(server)
      .put("/api/issues/testproject")
      .send({
        issue_title: "Updated title",
      })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "missing _id");
        done();
      });
  });

  test("Update an issue with no fields to update", (done) => {
    chai
      .request(server)
      .put("/api/issues/testproject")
      .send({
        _id: firstCreatedIssueId,
      })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "no update field(s) sent");
        done();
      });
  });

  test("Update an issue with an invalid _id", (done) => {
    chai
      .request(server)
      .put("/api/issues/testproject")
      .send({ _id: 5 })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "could not update");
        done();
      });
  });

  test("Delete an issue", (done) => {
    chai
      .request(server)
      .delete("/api/issues/testproject")
      .send({ _id: firstCreatedIssueId })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.result, "successfully deleted");
        assert.equal(res.body._id, firstCreatedIssueId);
        done();
      });
  });

  test("Delete an issue with an invalid _id", (done) => {
    chai
      .request(server)
      .delete("/api/issues/testproject")
      .send({ _id: 2 })
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "could not delete");
        assert.equal(res.body._id, 2);
        done();
      });
  });

  test("Delete an issue with missing _id", (done) => {
    chai
      .request(server)
      .delete("/api/issues/testproject")
      .send({})
      .end((err, res) => {
        if (err) return done(err);
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "missing _id");
        done();
      });
  });

  // Cleanup test data after all tests complete
  suiteTeardown(async function () {
    if (firstCreatedIssueId || secondCreatedIssueId) {
      // Attempt to delete test issues, ignore errors if already deleted
      try {
        await chai
          .request(server)
          .delete("/api/issues/testproject")
          .send({ _id: firstCreatedIssueId });
      } catch (err) {}

      try {
        await chai
          .request(server)
          .delete("/api/issues/testproject")
          .send({ _id: secondCreatedIssueId });
      } catch (err) {}
    }
  });
});
