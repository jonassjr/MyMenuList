import { supabase } from "./client"

export const uploadImage = async (file: File, filePath: string) => {
  const fileName = `coverImg-${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage.from('images').upload(filePath, file, { upsert: true })

  if (error) {
    console.error('Error uploading file:', error)
    throw error
  }

  const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)

  return publicUrl

}

export const deleteImage = async (filePath: string) => {
  const { error } = await supabase.storage.from('images').remove([filePath])

  if (error) {
    throw error
  }
}