// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { child, get, getDatabase, push, ref, remove, update } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkbBVBMZO7CpALpXkZrEbSIwpqheW0MJ0",
  authDomain: "phan-mem-quan-ly-du-an.firebaseapp.com",
  databaseURL: "https://phan-mem-quan-ly-du-an-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "phan-mem-quan-ly-du-an",
  storageBucket: "phan-mem-quan-ly-du-an.appspot.com",
  messagingSenderId: "99101813519",
  appId: "1:99101813519:web:649043d9fbb3016b2f2c7a",
  measurementId: "G-L1W6HR8E3G"
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

// danh-muc
export async function taoMoiDanhMuc(obj, objName) {
  // const id = Math.random().toString(36).substring(2, 9)
  // await set(ref(db, 'danh_muc/loai_du_an/' + id), obj)

  const id = push(child(ref(db), `danhmuc/${objName}`)).key;
  const updates = {}
  updates[`danhmuc/${objName}/` + id] = obj
  await update(ref(db), updates)
}

export async function suaDanhMuc(id, obj, objName) {
  const updates = {}
  updates[`danhmuc/${objName}/` + id] = obj
  await update(ref(db), updates)
}

export async function xoaDanhMuc(id, objName) {
  const nodeRef = ref(db, `danhmuc/${objName}/${id}`);
  await remove(nodeRef);
}

export async function getDSDanhMuc(objName) {
  try {
    const snapshot = await get(child(ref(db), `danhmuc/${objName}`));
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

export async function getDanhMuc(id, objName) {
  try {
    const snapshot = await get(child(ref(db), `danhmuc/${objName}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
  return
}

// quan-ly
export async function taoMoiQuanLy(obj, objName) {
  const id = push(child(ref(db), `quanly/${objName}`)).key;
  const updates = {}
  updates[`quanly/${objName}/` + id] = obj
  await update(ref(db), updates)
}

export async function suaQuanLy(id, obj, objName) {
  const updates = {}
  updates[`quanly/${objName}/` + id] = obj
  await update(ref(db), updates)
}

export async function xoaQuanLy(id, objName) {
  const nodeRef = ref(db, `quanly/${objName}/${id}`);
  await remove(nodeRef);
}

export async function getDSQuanLy(objName) {
  try {
    const snapshot = await get(child(ref(db), `quanly/${objName}`));
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

export async function getQuanLy(id, objName) {
  try {
    const snapshot = await get(child(ref(db), `quanly/${objName}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
  return
}

