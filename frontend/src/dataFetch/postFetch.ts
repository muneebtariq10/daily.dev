import { API_URL, POST_URL } from "@/lib/apiEndPoints"

export async function postFetch(token:string) {
    let data = await fetch(API_URL + POST_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }
    
    return data.json()
}