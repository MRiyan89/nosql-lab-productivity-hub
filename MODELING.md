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
  _id: ObjectId,
  userId: ObjectId (required) — ref: users._id,
  name: string (required),
  description: string (optional),
  Status: boolean (required, default: false),
  createdAt: Date (required)
}
```

### tasks
```
{
  _id: ObjectId,
  projectId: ObjectId (required) — ref: projects._id,
  userId: ObjectId (required) — ref: users._id,
  title: string (required),
  status: string (required) — enum: 'todo' | 'in-progress' | 'done',
  priority: number (optional)
  tags: [string (optional array)],
  subtasks: [
    {
      title: string (required),
      completed: boolean (required, default: false)
    }
  ],
  dueDate: Date (optional),
  createdAt: Date (required)
}
```

### notes
```
{
  _id: ObjectId,
  userId: ObjectId (required) — ref: users._id,
  projectId: ObjectId (optional) — ref: projects._id,
  title: "string (required),
  body: string (required),
  tags: [string (optional array)],
  createdAt: Date (required)
}
```

---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                       | Embed or Reference? | Why? |
|-----------------------------------|---------------------|------|
| Subtasks inside a task            |        embedded     | Subtasks are always fetched with their parent task. so, embedding avoids a separate query.     |
| Tags on a task                    |        embedded     | Tags are plain strings, not shared entities, so there is nothing to reference.     |
| Project → Task ownership          |       reference     | A project can own many tasks over time - referencing via projectId on the task prevents unbounded document growth on the project.     |
| Note → optional Project link      |       reference     | notes have the project_id and with that we can access the project link     |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> The projectId field on a **note** document exists only when a note is linked to a project - notes without a project simply omit the field entirely. This is acceptable in MongoDB because the document model does not require every document in a collection to share the same shape.
