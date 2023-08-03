import { getCategory, getManagement } from "./database";

// get category's object from list id
export async function getCategoryObjects(idList, objName, forDetail) {
  try {
    const objects = await Promise.all(
      idList.map(async (id) => {
        const object = await getCategory(id, objName);
        // console.log(id);
        return forDetail
          ? object
          : {
              name: object.name,
              id: id,
            };
      })
    );
    return objects;
  } catch (error) {
    console.error(`Error fetching ${objName} objects:`, error);
    return [];
  }
}

// get management's object from list id
export async function getManagementObjects(idList, objName, forDetail) {
  try {
    const objects = await Promise.all(
      idList.map(async (id) => {
        const object = await getManagement(id, objName);
        return forDetail
          ? object
          : {
              name: object.name,
              id: id,
            };
      })
    );
    return objects;
  } catch (error) {
    console.error(`Error fetching ${objName} objects:`, error);
    return [];
  }
}

export async function populateData(data, forDetail = false) {
  if(forDetail){
    const obj = data
    if (obj.projectType && Array.isArray(obj.projectType)) {
        obj.projectType = await getCategoryObjects(
          obj.projectType,
          "projectType", forDetail
        );
      } else {
        obj.projectType = []; // Provide a default empty array
      }

      if (obj.projectStatus && Array.isArray(obj.projectStatus)) {
        obj.projectStatus = await getCategoryObjects(
          obj.projectStatus,
          "projectStatus", forDetail
        );
      } else {
        obj.projectStatus = []; // Provide a default empty array
      }

      if (obj.techStack && Array.isArray(obj.techStack)) {
        obj.techStack = await getCategoryObjects(obj.techStack, "techStack", forDetail);
      } else {
        obj.techStack = []; // Provide a default empty array
      }

      if (obj.center && Array.isArray(obj.center)) {
        obj.center = await getManagementObjects(obj.center, "center", forDetail);
      } else {
        obj.center = []; // Provide a default empty array
      }

      if (obj.personnel && Array.isArray(obj.personnel)) {
        obj.personnel = await getManagementObjects(obj.personnel, "personnel", forDetail);
      } else {
        obj.personnel = []; // Provide a default empty array
      }

      if (obj.project && Array.isArray(obj.project)) {
        obj.project = await getManagementObjects(obj.project, "project", forDetail);
      } else {
        obj.project = []; // Provide a default empty array
      }
  } else
    {await Promise.all(
    Object.values(data).map(async (obj) => {
      if (obj.projectType && Array.isArray(obj.projectType)) {
        obj.projectType = await getCategoryObjects(
          obj.projectType,
          "projectType", forDetail
        );
      } else {
        obj.projectType = []; // Provide a default empty array
      }

      if (obj.projectStatus && Array.isArray(obj.projectStatus)) {
        obj.projectStatus = await getCategoryObjects(
          obj.projectStatus,
          "projectStatus", forDetail
        );
      } else {
        obj.projectStatus = []; // Provide a default empty array
      }

      if (obj.techStack && Array.isArray(obj.techStack)) {
        obj.techStack = await getCategoryObjects(obj.techStack, "techStack", forDetail);
      } else {
        obj.techStack = []; // Provide a default empty array
      }

      if (obj.center && Array.isArray(obj.center)) {
        obj.center = await getManagementObjects(obj.center, "center", forDetail);
      } else {
        obj.center = []; // Provide a default empty array
      }

      if (obj.personnel && Array.isArray(obj.personnel)) {
        obj.personnel = await getManagementObjects(obj.personnel, "personnel", forDetail);
      } else {
        obj.personnel = []; // Provide a default empty array
      }

      if (obj.project && Array.isArray(obj.project)) {
        obj.project = await getManagementObjects(obj.project, "project", forDetail);
      } else {
        obj.project = []; // Provide a default empty array
      }
      return obj;
    })
  );}
}
