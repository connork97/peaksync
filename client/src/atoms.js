import { atom } from "recoil"

export const userState = atom({
    key: "userState",
    default: "Guest"
})

export const allUsersAtomState = atom({
    key: "allUsersAtomState",
    default: null
})