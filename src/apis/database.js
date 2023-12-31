// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  remove,
  update,
} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkbBVBMZO7CpALpXkZrEbSIwpqheW0MJ0",
  authDomain: "phan-mem-quan-ly-du-an.firebaseapp.com",
  databaseURL:
    "https://phan-mem-quan-ly-du-an-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "phan-mem-quan-ly-du-an",
  storageBucket: "phan-mem-quan-ly-du-an.appspot.com",
  messagingSenderId: "99101813519",
  appId: "1:99101813519:web:649043d9fbb3016b2f2c7a",
  measurementId: "G-L1W6HR8E3G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

// export async function writeUserData(userId, name, email, imageUrl) {
//   await set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
//   return {
//     userId: userId,
//     name: name,
//     email: email,
//     imageUrl: imageUrl,
//   }
// }

// category
export async function createCategory(obj, objName) {
  // const id = Math.random().toString(36).substring(2, 9)
  // await set(ref(db, 'danh_muc/loai_du_an/' + id), obj)

  const id = push(child(ref(db), `category/${objName}`)).key;
  const updates = {};
  updates[`category/${objName}/` + id] = obj;
  await update(ref(db), updates);
}

export async function updateCategory(id, obj, objName) {
  const updates = {};
  updates[`category/${objName}/` + id] = obj;
  await update(ref(db), updates);
}

export async function deleteCategory(id, objName) {
  // Handle cascading delete for ${objName}
  if (objName === "techStack") {
    // Iterate through management to find references
    handleCascadingDeleteInCenter({ id: id, objName: objName });

    const personnelObjects = await getListManagement("personnel");
    for (const personnelId in personnelObjects) {
      const personnel = personnelObjects[personnelId];
      const updatedObjList = personnel[objName].filter(
        (stack) => stack.id !== id
      );
      await updateManagement(
        personnelId,
        { ...personnel, [objName]: updatedObjList },
        "personnel"
      );
    }

    handleCascadingDeleteInProject({ id: id, objName: objName });
  } else if (objName === "projectType" || objName === "projectStatus") {
    handleCascadingDeleteInProject({ id: id, objName: objName });
  }

  const nodeRef = ref(db, `category/${objName}/${id}`);
  await remove(nodeRef);
}

export async function getListCategory(objName) {
  try {
    const snapshot = await get(child(ref(db), `category/${objName}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function getCategory(id, objName) {
  try {
    const snapshot = await get(child(ref(db), `category/${objName}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
  return;
}

// management
export async function createManagement(obj, objName) {
  const id = push(child(ref(db), `management/${objName}`)).key;
  const updates = {};
  updates[`management/${objName}/` + id] = obj;
  await update(ref(db), updates);
}

export async function updateManagement(id, obj, objName) {
  const updates = {};
  updates[`management/${objName}/` + id] = obj;
  await update(ref(db), updates);
}

async function handleCascadingDeleteInCenter({ id, objName }) {
  const centerObjects = await getListManagement("center");
  for (const centerId in centerObjects) {
    const center = centerObjects[centerId];
    if (center[objName]) {
      const updatedObjList = center[objName].filter((objId) => objId !== id);
      await updateManagement(
        centerId,
        { ...center, [objName]: updatedObjList },
        "center"
      );
    }
  }
}

async function handleCascadingDeleteInPersonnel({ id, objName }) {
  const personnelObjects = await getListManagement("personnel");
  for (const personnelId in personnelObjects) {
    const personnel = personnelObjects[personnelId];
    if (personnel[objName]) {
      const updatedObjList = personnel[objName].filter((objId) => objId !== id);
      await updateManagement(
        personnelId,
        { ...personnel, [objName]: updatedObjList },
        "personnel"
      );
    }
  }
}

async function handleCascadingDeleteInProject({ id, objName }) {
  const projectObjects = await getListManagement("project");
  for (const projectId in projectObjects) {
    const project = projectObjects[projectId];
    if (project[objName]) {
      const updatedObjList = project[objName].filter((objId) => objId !== id);
      await updateManagement(
        projectId,
        { ...project, [objName]: updatedObjList },
        "project"
      );
    }
  }
}

export async function deleteManagement(id, objName) {
  if (objName === "center") {
    handleCascadingDeleteInProject({ id: id, objName: objName });
  } else if (objName === "personnel") {
    handleCascadingDeleteInCenter({ id: id, objName: objName });
    handleCascadingDeleteInProject({ id: id, objName: objName });
  } else if (objName === "project") {
    handleCascadingDeleteInCenter({ id: id, objName: objName });
    handleCascadingDeleteInPersonnel({ id: id, objName: objName });
  }

  const nodeRef = ref(db, `management/${objName}/${id}`);
  await remove(nodeRef);
}

export async function getListManagement(objName) {
  try {
    const snapshot = await get(child(ref(db), `management/${objName}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return {};
    }
  } catch (error) {
    console.error(error);
    return {};
  }
}

export async function getManagement(id, objName) {
  try {
    const snapshot = await get(child(ref(db), `management/${objName}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
  return;
}
