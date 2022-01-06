import React from 'react'
import { useQuery } from "react-query"

interface QueryResult {
  isLoading: boolean
  isError: boolean
  data: any
  error: any
}

export default function UserData() {
  // API call
  // ---------------------------------------------------------------------------
  const fetchUsers = async () => {
    const response = await fetch("/api/users", {})
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized")
      }
      throw new Error("Network response was not ok")
    }
    const payload = await response.json()
    return payload.data
  }
  const { isLoading, isError, data, error }: QueryResult = useQuery(
    ["users"],
    fetchUsers
  )

  // What to do while waiting for data-load or error-condition
  // ---------------------------------------------------------------------------
  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
    
  return (
    <div>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>
            {user.attributes.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
