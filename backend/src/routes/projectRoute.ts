import express from "express";
import validateJWT from "../middleware/validateJWT";
import {addProject, deleteProject, getAllProjects, updateProject} from "../services/projectService";
    
const router = express.Router();

router.post("/", validateJWT, async (req, res) => {
  const { name, description, video, tags, githubLink } = req.body;
  const response = await addProject({ name, description, video, tags, githubLink });
  res.status(response.statusCode).json(response);
});

router.get("/", async (req, res) => {
  const response = await getAllProjects();
  res.status(response.statusCode).json(response);
});

router.delete("/:id", validateJWT, async (req, res) => {
  const productId  = req.params.id;
  const response = await deleteProject(productId);
  res.status(response.statusCode).json(response);
});

router.put("/:id", validateJWT, async (req, res) => {
  const productId = req.params.id;
  const response = await updateProject(productId, req.body);
  res.status(response.statusCode).json(response);
});

export default router;
