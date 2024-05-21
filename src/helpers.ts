import fs from 'node:fs'
import path, { dirname } from 'node:path'

export const readTextFileAsync = (relativePath: string) =>{
    return new Promise((resolve, reject)=>{
      const rootDirPath = dirname(require.main.filename)

      const filePath = path.join(rootDirPath, relativePath)

        fs.readFile(filePath, {encoding: 'utf-8'}, (error, content )=> {
            if(error){
              console.error(error)
              reject(error)
            }
            resolve(content)
          })
    })
}