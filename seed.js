// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');
const { ObjectId } = require('mongodb');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
  //
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  //        const u = await db.collection('users').insertOne({ ... });
  //        const userId = u.insertedId;
  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).
  //
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================
  const u1= new ObjectId();
  const u2= new ObjectId();
  await db.collection('users').insertMany([
    {
      _id: u1,
      email: 'riyan@gmail.com',
      passwordHash: await bcrypt.hash('user123', 10),
      name: 'Riyan',
      createdAt: new Date()
    },
    {
      _id: u2,
      email: 'ahmed@gmail.com',
      passwordHash: await bcrypt.hash('user123', 10),
      name: 'Ahmed',
      createdAt: new Date()
    }
  ]);

  const p1 = new ObjectId();
  const p2 = new ObjectId();
  const p3 = new ObjectId();
  const p4 = new ObjectId();

  await db.collection('projects').insertMany([
    {
      _id: p1,
      userId: u1,
      name: 'Project 1',
      description: 'First project description',
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: p2,
      userId: u2,
      name: 'Project 2',
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: p3,
      userId: u1,
      name: 'Project 3',
      status: 'active',
      createdAt: new Date()
    },
    {
      _id: p4,
      userId: u2,
      name: 'Project 4',
      description: 'Forth project description',
      status: 'active',
      createdAt: new Date()
    },
  ]);
  const t1 = new ObjectId();
  const t2 = new ObjectId();
  const t3 = new ObjectId();
  const t4 = new ObjectId();
  const t5 = new ObjectId();

  await db.collection('tasks').insertMany([
    {
      _id: t1,

    }
  ]);
  console.log('TODO: implement seed.js');
  process.exit(0);
})();
