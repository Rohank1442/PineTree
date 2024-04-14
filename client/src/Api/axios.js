import axios from 'axios'

export const axiosTopic = axios.create({
    baseURL: 'http://localhost:5000'
})

export const getUsersPage = async (pageParam = 1) => {
    const response = await axiosTopic.get(`/?page=${pageParam}`)
    return response.data
}

export const getSubTopic = async (pageParam = 1) => { 
    const response = await axiosTopic.get(`/subTopics/?page=${pageParam}`)
    return response.data
}