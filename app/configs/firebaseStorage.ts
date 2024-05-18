import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { firebaseApp } from "./firebaseConfig";

const storage = getStorage(firebaseApp);

//upload file
const uploadFile = async (path: any, file: any) => {
  try {
    const storageRef = ref(storage, path);
    let res = await uploadBytes(storageRef, file);
    let url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log("Error in uploading file: ", error);
  }
};

const deleteFile = async (path: any) => {
  try {
    const storageRef = ref(storage, path);
    let res = await deleteObject(storageRef);
  } catch (error) {
    console.log("Error in deleting file: ", error);
  }
};

const deleteFolder = async (path: any) => {
  try {
    const storageRef = ref(storage, path);
    listAll(storageRef).then((dir) => {
      dir.items.forEach((fileRef) => deleteFile(fileRef));
    });
  } catch (error) {
    console.log(error);
  }
};

export { uploadFile, deleteFile, deleteFolder };
export default storage;
