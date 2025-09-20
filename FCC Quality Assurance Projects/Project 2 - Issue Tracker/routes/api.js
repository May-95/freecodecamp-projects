"use strict";

const issues = require("../models/issue");

// Validates MongoDB ObjectId format (24 hex characters)
function isValidId(id) {
  return typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);
}

module.exports = function (app) {
  app
    .route("/api/issues/:project")
    .get(function (req, res) {
      // Merge project param with query filters for flexible searching
      const filter = { project: req.params.project, ...req.query };

      issues
        // Exclude project and version fields from response
        .find(filter, { project: 0, __v: 0 })
        .then((result) => res.json(result))
        .catch((err) => res.json({ error: "fetch failed" }));
    })

    .post(function (req, res) {
      const { issue_title, issue_text, created_by, assigned_to, status_text } =
        req.body;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: "required field(s) missing" });
      }

      const newIssue = new issues({
        project: req.params.project,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
      });

      newIssue
        .save()
        .then(() => res.json(newIssue))
        .catch(() => res.json({ error: "could not create issue" }));
    })

    .put(function (req, res) {
      const { _id, ...update } = req.body;

      // Validate _id is present and not empty string
      if (_id === undefined || (typeof _id === "string" && _id.trim() === ""))
        return res.json({ error: "missing _id" });
      if (!isValidId(_id))
        return res.json({ error: "could not update", _id: _id });

      Object.keys(update).forEach((key) => {
        if (update[key] === "") {
          delete update[key];
        }
      });

      if (Object.keys(update).length === 0) {
        return res.json({ error: "no update field(s) sent", _id });
      }

      update.updated_on = new Date();

      issues
        .findByIdAndUpdate(_id, update)
        .then((result) => {
          // Check if document was found and updated
          if (!result) return res.json({ error: "could not update", _id });
          res.json({ result: "successfully updated", _id });
        })
        .catch(() => res.json({ error: "could not update", _id }));
    })

    .delete(function (req, res) {
      if (!req.body._id) return res.json({ error: "missing _id" });

      issues
        // Delete only if both _id and project match for security
        .deleteOne({ _id: req.body._id, project: req.params.project })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json({ error: "could not delete", _id: req.body._id });
          }
          res.json({ result: "successfully deleted", _id: req.body._id });
        })
        .catch(() =>
          res.json({ error: "could not delete", _id: req.body._id })
        );
    });
};
