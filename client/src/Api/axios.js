import axios from 'axios'

export const axiosTopic = axios.create({
    baseURL: 'http://localhost:5000'
})

export const getUsersPage = async (pageParam = 1) => {
    console.log("hmmmm");
    const response = await axiosTopic.get(`/?page=${pageParam}`)
    return response.data
}

export const getSubTopic = async (id, pageParam = 1) => { 
    const response = await axiosTopic.get(`/topics/${id}/?page=${pageParam}`)
    return response.data
}