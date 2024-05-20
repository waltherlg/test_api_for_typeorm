import fs from 'node:fs'

export const readTextFileAsync = (path: string) =>{
    return new Promise((resolve, reject)=>{
        fs.readFile(path, {encoding: 'utf-8'}, (error, content )=> {
            if(error){
              console.error(error)
              reject(error)
            }
            resolve(content)
          })
    })
}