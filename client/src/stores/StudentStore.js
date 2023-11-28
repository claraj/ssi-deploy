import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students')

export const useStudentStore = defineStore('students', () => {

    const sortedStudents = ref([])
    const mostRecentStudent = ref( {} )

    const addNewStudentErrors = ref([])

    function getAllStudents() {
       studentAPI.get().then( students => {  // students is the JSON response from the API 
        sortedStudents.value = students
       }).catch( err => {
            console.log(err)
       })
    }

    function addNewStudent(student) {
        studentAPI.post(student).then( () => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
    }

    function deleteStudent(studentToDelete) {
         //  make api request
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            getAllStudents()
        }).catch( err => {
            console.log(err)
       })
    }

    function arrivedOrLeft(student) {
        //  make api request
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            getAllStudents()
        }).catch( err => {
            console.log(err)
       })
    }

    const studentCount = computed( () => {
        return sortedStudents.value.length
    })

    return { 
        // reactive data
        sortedStudents,
        mostRecentStudent, 
        addNewStudentErrors,

        // functions
        getAllStudents,
        addNewStudent, 
        deleteStudent, 
        arrivedOrLeft, 

        // computed properties
        studentCount
    }
})

