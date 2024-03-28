import axios from 'axios'

export const axiosTopic = axios.create({
    baseURL: 'https://reqres.in/api'
})

export const getUsersPage = async (pageParam = 1) => {
    const response = await axiosTopic.get(`/users?page=${pageParam}`)
    return response.data
}

export const getTopic = async () => {
    const response = await axiosTopic.get(`/posts`)
    return response.data
}