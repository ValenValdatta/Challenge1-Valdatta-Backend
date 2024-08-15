import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (password) => {
   const salt = genSaltSync(10);
   const hash = hashSync(password, salt);
   return hash;
};

const verifyHash = (reqBodyPass, mongoPass) => {
   console.log('Provided Password:', reqBodyPass);
   console.log('Stored Hash:', mongoPass);
   const verify = compareSync(reqBodyPass, mongoPass);
   console.log('Password Verified:', verify);
   return verify;
};

export { createHash, verifyHash };
