import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from './firebase'



function ListView() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const q = query(collection(db, 'spots'), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setTasks(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    console.log(tasks)

    return (
        <>
        <h1>listview</h1>
            {tasks.map((task) => (
                <h1>
                    {/* {task} */}
                </h1>
            ))}

        </>
    )
}

export default ListView;