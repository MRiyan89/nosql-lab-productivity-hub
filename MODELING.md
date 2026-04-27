# Schema Design — Personal Productivity Hub

> Fill in every section below. Keep answers concise.

---

## 1. Collections Overview

Briefly describe each collection (1–2 sentences each):

- **users** — stores the users that have regestered into the system 
- **projects** — It is a grouping of tasks. Each project belongs to one user and will have an active statud.
- **tasks** — Represents an individual to-do item belonging to a project and a user.
- **notes** — Stores text notes written by a user.

---

## 2. Document Shapes

For each collection, write the document shape (field name + type + required/optional):

### users
```
{
  _id: ObjectId,
  email: string (required, unique),
  passwordHash: string (required),
  name: string (required),
  createdAt: Date (required)
}
```

### projects
```
{
  "_id": ObjectId,
  "userId": "ObjectId (required) — ref: users._id",
  "name": "string (required)",
  "description": "string (optional)",
  "Status": "boolean (required, default: false)",
  "createdAt": "Date (required)"
}
```

### tasks
```
{
  "_id": ObjectId,
  "projectId": "ObjectId (required) — ref: projects._id",
  "userId": "ObjectId (required) — ref: users._id",
  "title": "string (required)",
  "status": "string (required) — enum: 'todo' | 'in-progress' | 'done'",
  "tags": ["string (optional array)"],
  "subtasks": [
    {
      "title": "string (required)",
      "completed": "boolean (required, default: false)"
    }
  ],
  "dueDate": "Date (optional)",
  "createdAt": "Date (required)"
}
```

### notes
```
TODO
```

---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                       | Embed or Reference? | Why? |
|-----------------------------------|---------------------|------|
| Subtasks inside a task            |                     |      |
| Tags on a task                    |                     |      |
| Project → Task ownership          |                     |      |
| Note → optional Project link      |                     |      |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> _Your answer here._
