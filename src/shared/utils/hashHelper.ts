import bcrypt from "bcrypt";
import crypto from "crypto";

const DEFAULT_SALT_ROUNDS = 12;

const hashValue = (value: string) => {
  return crypto.createHash("sha256")
               .update(value)
               .digest("hex");
};

const createHash = () => {
    return crypto.randomBytes(64).toString("hex");
};

const hashPassword = async (
  password: string,
  saltRouns: number = DEFAULT_SALT_ROUNDS,
) => {
  return bcrypt.hash(password, saltRouns);
};

const comparePassword = async (
    password: string,
    passwordHash: string
    )=> {
        return bcrypt.compare(password, passwordHash);
};

const compareHash = (
    receivedToken:string,
    storedTokenHash:string
)=>{
    const receivedTokenHash = hashValue(receivedToken);
    const receivedBuffer = Buffer.from(receivedTokenHash,'utf8');
    const storededBuffer = Buffer.from(storedTokenHash,'utf8');
    if(receivedBuffer.length !== storededBuffer.length){
        return false;
    }
    return crypto.timingSafeEqual(receivedBuffer,storededBuffer);
}

const generateRandomToken = ( size:number = 32)=>{
    //size === 32 by default, so size as an arg is optional 
    //randomBytes generates 32 octets (bytes) => Buffer
    //toString("hex") => client dhould get a String(64 chars) 
    return crypto.randomBytes(size).toString("hex");
}

export {
    hashValue,
    hashPassword,
    comparePassword,
    compareHash,
    generateRandomToken,
    createHash,
};