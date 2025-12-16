import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../index.css";

export const Private = () => {
    const token = sessionStorage.getItem("jwt-token")
    const APIURL = import.meta.env.VITE_BACKEND_URL;
    const [userData, setUserData] = useState({
        email: "",
        id: ""
    })
    const getUserData = async () => {
        try {
            const response = await fetch(
                APIURL + "/protected",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer" + token
                    }
                }
            )
            if (response.status === 403) {
                throw Error("missing or invalid token")
            }
            if (!response.ok) {
                throw Error("issue with log in request")
            }
            const data = await response.json()
            setUserData(data)
            console.log("this is the data you requested", data)
            return data
        } catch (error) {
            console.error("error fetching protected data", error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserData()
        }
    }, [token])
    return (
        <div>
            {token ? (
                <div>
                    <h1>
                        This is the private page.
                    </h1>
                    <div>
                        {userData.email}
                    </div>
                </div>
            ) : (
                <h1>
                    You are not authorized.
                </h1>
            )}
        </div>
    )
}