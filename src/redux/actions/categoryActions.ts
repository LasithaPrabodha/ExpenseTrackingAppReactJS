import {createAsyncThunk} from '@reduxjs/toolkit';
import {collection, deleteDoc, doc, getDocs, setDoc, writeBatch} from 'firebase/firestore';
import {firestore} from '../../database/config';
import {Category} from '../../models/category';
import IndexDbManager from "../../lib/indexdb-manager";

export const fetchCategoriesAction = createAsyncThunk(
  'categories/fetch',
  async (_, {rejectWithValue}) => { 

    try {
      let categoriesIndexDb = (await IndexDbManager.getFromStore(IndexDbManager.catStoreName)) as any[];
    categoriesIndexDb = categoriesIndexDb.map((e) => new Category(e));

    if (!navigator.onLine) {
      return { data: categoriesIndexDb };
    }
      const ref = collection(firestore, 'users', 'test-user', 'category-list');
      const querySnapshot = await getDocs(ref);
      let categories: any[] = [];

      querySnapshot?.forEach(doc => {
        const data = doc.data();
        const category = {...data, id: doc.id};
        categories.push(category);
      });

      return {data: categories};
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  },
);

export const addCategoryAction = createAsyncThunk(
  'categories/add',
  async (category: Category, {rejectWithValue}) => { 

    try {
      const id = doc(
        collection(firestore, 'users', 'test-user', 'category-list'),
      ).id;
       // save in indexdb
    IndexDbManager.addToStore({ ...category, id }, IndexDbManager.catStoreName);

    if (!navigator.onLine) return {data: category};

      // save in firestore
      await setDoc(
        doc(firestore, 'users', 'test-user', 'category-list', id),
        category.toFirestoreObject(),
      );

      return {data: category};
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (categoryId: string, thunkAPI) => {

    try {
      await deleteDoc(
        doc(firestore, 'users', 'test-user', 'category-list', categoryId),
      );
      await thunkAPI.dispatch(fetchCategoriesAction());
      return {data: null};
    } catch (error: any) {
      console.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const deleteAllCategory = createAsyncThunk(
  'categories/deleteAll',
  async (_, thunkAPI) => {
    try {

      const ref = collection(firestore, 'users', 'test-user', 'category-list');
      const querySnapshot = await getDocs(ref);

      querySnapshot?.forEach(doc => {
        deleteDoc(doc.ref);
      });

      await thunkAPI.dispatch(fetchCategoriesAction());
      return {data: null};
    } catch (error: any) {
      console.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const addMultipleCategoriesAction = createAsyncThunk("categories/add-multiple", async (categories: any[], thunkAPI) => {
  try {
    if (!categories.length) return { data: [] };

    const ref = collection(firestore, "users/test-user/category-list");
    const querySnapshot = await getDocs(ref);
    let categoriesInFirestore: any[] = [];

    querySnapshot?.forEach((doc) => {
      const data = doc.data();
      const category = { ...data, id: doc.id };
      categoriesInFirestore.push(category);
    });

    let categoriesNotInFirestore = categories.reduce((prev, curr) => {
      const index = categoriesInFirestore.findIndex((ei) => ei.id === curr.id);
      if (index === -1) {
        prev.push(curr);
      }

      return prev;
    }, []);

    const batch = writeBatch(firestore);

    categoriesNotInFirestore.forEach(({ id, ...e }: any) => {
      const docRef = doc(firestore, "users/test-user/category-list", id);

      batch.set(docRef, e);
    });
    await batch.commit();

    await thunkAPI.dispatch(fetchCategoriesAction())

    return { data: categoriesNotInFirestore };
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
});