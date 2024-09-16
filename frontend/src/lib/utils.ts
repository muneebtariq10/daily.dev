import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Env from "./env"
import moment from "moment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageURL = (image:string):string => {
  return `${Env.API_URL}/storage/${image}`
}

export const isValidUrl = (url:string):boolean => {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export const formatDate = (date:string):string => {
  return moment(date).format("DD MMM YYYY")
}

export const trimString = (data:string):string => {
  if (data.length <= 50) {
    return data;
  }
  
  return data.slice(0, 50) + "..."
}