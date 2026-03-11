# 🚢 ShipShape — DevOps & Containerization

**ShipShape** is a short, practical introduction to the **DevOps workflow**: taking an application from a developer laptop to a live deployment.

Built with a **neon-retro classroom vibe**, this site guides students through four focused days of modern delivery workflow: **local development → containerization → deployment**.

The emphasis is on **practical confidence**, not exhaustive coverage.

---

## 💥 Modules

| Module | Title                                             | Description                                                                                                                                                                                                                                              |
| ------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 00     | **Course Introduction**                           | Overview of DevOps concepts, course workflow, and the modern application lifecycle from development to production.                                                                                                                                       |
| 01     | **Containers with Docker**                        | Introduction to containers, images, and the Docker runtime. Students write a Dockerfile and run their Node application inside a container.                                                                                                               |
| 02     | **Multi-Service Development with Docker Compose** | Running full application stacks locally using Docker Compose. Students connect their Node API to MongoDB in a multi-container environment and learn about environment variables and persistent volumes.                                                  |
| 03     | **Deployment with Render & MongoDB Atlas**        | Preparing an application for production and deploying it to the internet. Students configure environment variables, connect to MongoDB Atlas, and deploy their Node application as a Render Web Service.                                                 |
| 04     | **Production Awareness & Wrap-Up**                | A lightweight final session discussing production realities: logging, monitoring, versioning, deployment history, and the broader DevOps ecosystem. The program concludes with reflection on the full application lifecycle from laptop to live service. |

---

## 🎯 Learning Outcome

By the end of the course, students will understand how to:

- containerize a Node.js application with Docker
- run multi-service application stacks locally with Docker Compose
- manage environment configuration for production systems
- deploy a containerized application to a cloud platform
- understand the core workflow that moves software from **development → deployment → operation**

---

## 🧠 Teaching Approach

ShipShape keeps the focus on the essentials.

Students are not expected to master the full DevOps universe in four days. Instead, they build a working mental model of how applications move from source code to running service, with just enough tooling to make that journey real and repeatable.

The tone is practical, visual, and intentionally a little electric: **retro terminal glow, classroom energy, and clean deployment thinking**.

---

## 🏃 Run Locally

```bash
npm install
npm run dev
```

Build + preview:

```bash
npm run build
npm run preview
```

---

## 🛠 Tech Stack

- [Astro](https://astro.build/)
- [Starlight](https://starlight.astro.build/)
- Markdown / MDX
- Vercel for deployment

---

## 🔒 License

© 2026 **Joshua Solomon (Professor Solo)**  
Licensed for educational and learner use under the **Professor Solo Learner License 1.0**  
(**ProfessorSolo-LEARN-1.0**).

Full terms in [LICENSE](./LICENSE)

For licensing inquiries, contact:  
📧 [writesideup@joshinbox.com](mailto:writesideup@joshinbox.com)

---

## 📬 Contact

**Professor Solo**  
🌐 [professorsolo.com](https://professorsolo.com)  
💬 [github.com/ProfessorSolo](https://github.com/ProfessorSolo)

---

**ShipShape** focuses on the essential DevOps skills developers need to confidently **ship software into the real world**.

> _“Build it. Containerize it. Deploy it. Keep it shipshape.”_
