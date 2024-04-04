import axios from 'axios'

export const axiosTopic = axios.create({
    baseURL: 'http://localhost:5000'
})

export const getUsersPage = async (pageParam = 1) => {
    const response = await axiosTopic.get(`/topics?page=${pageParam}`)
    return response.data
}

// export const getTopic = async () => {
//     const response = await axiosTopic.get(`/topics`)
//     console.log(response.data)
//     return response.data
// }