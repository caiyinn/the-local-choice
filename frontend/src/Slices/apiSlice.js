import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'


const baseQuery = fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL})
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    tagTypes: [ 'Store',
                'Product',
                'Order',
                'User'],
    endpoints: (builder) => ({})
})

export const { usePrefetch } = apiSlice