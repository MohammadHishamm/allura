import { ProjectModel } from "../modules/projectsModel";

export const addProject = async (projectData: {
  name: string;
  description: string;
  video: string;
  tags: string[];
  githubLink?: string;
}) => {
  try {
    const isExist = await ProjectModel.findOne({ name: projectData.name });
    if (isExist) {
      return { data: "Project already exists", statusCode: 400 };
    }
    const newProject = new ProjectModel(projectData);
    await newProject.save();
    return {
      data: newProject,
      message: "Project created successfully",
      statusCode: 201,
    };
  } catch (error) {
    return { message: "failed creating project", statusCode: 500 };
  }
};

export const getAllProjects = async () => {
  try {
    const projects = await ProjectModel.find();
    if (projects.length === 0) {
      return { data: "No projects found", statusCode: 404 };
    }
    return { data: projects, statusCode: 200 };
  } catch (err) {
    return { data: "Internal Server Error", statusCode: 500 };
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await ProjectModel.findByIdAndDelete(projectId);
    return { data: "Project deleted successfully", statusCode: 200 };
  } catch (err) {
    return { data: "Internal Server Error", statusCode: 500 };
  }
};

export const updateProject = async (
  projectId: string,
  updateData: {
    name?: string;
    description?: string;
    video?: string;
    tags?: string[];
    githubLink?: string;
  }
) => {
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true }
    );
    return { data: updatedProject, statusCode: 200 };
  } catch (err) {
    return { data: "Internal Server Error", statusCode: 500 };
  }
};
