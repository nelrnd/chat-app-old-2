import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

const apiBaseUrl = "http://localhost:5000"

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      await axios.post(`${apiBaseUrl}/api/user/register`, { name, email, password }, config)
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const loginUser = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(`${apiBaseUrl}/api/user/login`, { email, password }, config)
    localStorage.setItem("userToken", data.userToken)
    return data
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
})
