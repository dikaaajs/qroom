import connectMongoDB from "@/libs/database/mongodb"
import Account from "@/models/account"

export async function check(data: {name: string, password: string, email:string}, err: {name: string; msg: string}[]){
    const {name, password, email} = data

    await connectMongoDB()
    const checkName = /^[a-zA-Z0-9 ]{1,22}$/.test(name)
    if(!checkName){
        err.push({name: "name", msg: "name tidak sesuai aturan"})
    }

    const checkPassword = /^[a-zA-Z0-9]{8,22}$/.test(password)
    if(!checkPassword){
        err.push({name: "password", msg: "password tidak sesuai aturan"})
    }

    const user = await Account.findOne({email})
    if(user !== null){
        err.push({name: "email", msg:"email sudah digunakan"})
    }

    return err
}