import { readFile } from 'node:fs'
import { join, dirname } from 'node:path'

export const readTextFileAsync = (relativePath: string) =>{
    return new Promise((resolve, reject)=>{
      const rootDirPath = dirname(require.main.filename)

      const filePath = join(rootDirPath, relativePath)

        readFile(filePath, {encoding: 'utf-8'}, (error, content )=> {
            if(error){
              console.error(error)
              reject(error)
            }
            resolve(content)
          })
    })
}