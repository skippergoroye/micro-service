import { hash, genSalt }  from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { APP_SECRET } from '../config'
import { Request } from 'express'



export async function GenerateSalt () {
    return await genSalt()
}



export async function GeneratePassword (password: string, salt:string) {
    return await hash(password, salt)
}



export async function GenerateSignature (payload: string | object | Buffer ){
    return sign(payload, APP_SECRET, {expiresIn: '1d'})
}



export async function FormatData (data: any){
    if(data){
        return data
    }
    throw new Error("Data not found")
}


export async function ValidateSignature(req: Request | any) {
    try {
        const signature = req.get('Authorization')
        console.log(signature)

        const payload = verify(signature.split(" ")[1], APP_SECRET)

        req.user = payload
        return true
    } catch (error) {
        return false
    }
}


