import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from './config'
import { Expense } from '../models/expense'

export async function save(data: Expense) {
    try {
        const dbCollection = collection(db, 'expenseList')
        const expenseData = data.toFirestoreObject()
        const docRef = await addDoc(dbCollection, expenseData);
        console.log('Expense saved successfully with ID:', docRef.id);
        return docRef.id
      } catch (e) {
        console.error('Error saving expense:', e);
        return null
      }
}

export async function update(id: string, data: any) {
    try {
        const docRef = doc(db, 'expenseList', id)
        await updateDoc(docRef, data)
        return true
    } catch (e) {
        return false
    }
  }

export async function remove(id: string){
    try {
        const docRef = doc(db, 'expenseList', id)
        await deleteDoc(docRef)
        return true
    } catch (e) {
        return false
    }
    
}